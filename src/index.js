// https://github.com/justin-schroeder/arrow-js/blob/31c1861075aabe29b67620b58a33c7fecb209c8f/src/html.ts#L166C1-L166C23
const delimiter = '➳❍'
const delimiterComment = `<!--${delimiter}-->`

//FIXME: Don't really need to handle
const bookend = '❍⇚'
const bookendComment = `<!--${bookend}-->`

const eventRegex = /(@)(\w+)=["']$/

export function renderToString(template) {
  const isT = 'isT' in template

  // FIXME: not a template, throw an error instead,
  //  move the fault tolerant behavior to another function
  if (!isT) {
    return ''
  }

  const renderResult = template._h()

  let htmlString = renderResult[0]
  const expressions = renderResult[1]
  const evntsOnIndex = []
  let index = -1

  if (!expressions.length) return htmlString

  return htmlString.replace(
    new RegExp(delimiterComment, 'g'),
    (...matchers) => {
      const str = matchers[0]
      const matchedAt = matchers[1]
      const matchedString = matchers[2]
      index += 1

      const beforeDelim = matchedString.slice(0, matchedAt)
      const immediatelyFollowed = eventRegex.test(beforeDelim)
      if (immediatelyFollowed) {
        return str
      }
      return interpolateExpressions(str, expressions[index])
    }
  )
}

function interpolateExpressions(htmlString, expressionInstance) {
  const isExpressionReactive = expressionInstance && expressionInstance.e
  const isExpressionPartial = isExpressionReactive.isT

  if (!isExpressionReactive) {
    return htmlString.replace(delimiterComment, expressionInstance())
  }

  if (isExpressionPartial) {
    return htmlString.replace(
      delimiterComment,
      renderToString(expressionInstance.e)
    )
  }

  const watcherReturn = expressionInstance.e()

  if (
    typeof watcherReturn !== 'object' &&
    typeof watcherReturn !== 'function'
  ) {
    return htmlString.replace(delimiterComment, watcherReturn)
  }

  if (watcherReturn && watcherReturn.isT) {
    const _nestedHtmlString = renderToString(watcherReturn)
    return htmlString.replace(delimiterComment, _nestedHtmlString)
  }
}
