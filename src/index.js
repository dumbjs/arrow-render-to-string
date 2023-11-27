// aliased utils
const isA = Array.isArray

// https://github.com/justin-schroeder/arrow-js/blob/31c1861075aabe29b67620b58a33c7fecb209c8f/src/html.ts#L166C1-L166C23
const delimiter = '➳❍'
const delimiterComment = `<!--${delimiter}-->`
const delimiterRegexGlobal = new RegExp(delimiterComment, 'g')

//FIXME: Don't really need to handle
// const bookend = '❍⇚'
// const bookendComment = `<!--${bookend}-->`

const eventRegex = /(@)(\w+)=["']$/

/**
 *
 * @param {import("@arrow-js/core").ArrowTemplate} template
 * @return {string}
 */
export function renderToString(template) {
  if (!('isT' in template)) {
    return ''
  }

  const [htmlString, expressions] = template._h()

  if (!expressions.length) return htmlString

  return htmlString.replace(delimiterRegexGlobal, matchReplace(expressions))
}

function matchReplace(expressions) {
  let index = -1
  return (...matchers) => {
    index += 1

    const beforeDelim = matchers[2].slice(0, matchers[1])

    // check if we are on a event handler delimiter
    // while rendering strings, we don't need this information
    // so we remove it
    if (eventRegex.test(beforeDelim)) {
      return ''
    }

    return interpolateExpressions(expressions[index])
  }
}

// Replace the htmlString's next occuring
function interpolateExpressions(expressionInstance) {
  const isExpressionReactive = expressionInstance && expressionInstance.e
  const isExpressionPartial = isExpressionReactive.isT

  if (!isExpressionReactive) {
    return expressionInstance()
  }

  if (isExpressionPartial) {
    return renderToString(expressionInstance.e)
  }

  const watcherReturn = expressionInstance.e()

  if (
    typeof watcherReturn !== 'object' &&
    typeof watcherReturn !== 'function'
  ) {
    return watcherReturn
  }

  if (isA(watcherReturn)) {
    return watcherReturn.reduce((acc, x) => {
      if ('isT' in x) {
        return acc + renderToString(x)
      }
      return acc + x
    }, '')
  }

  if (watcherReturn && watcherReturn.isT) {
    return renderToString(watcherReturn)
  }

  return ''
}
