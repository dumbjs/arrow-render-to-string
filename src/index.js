// https://github.com/justin-schroeder/arrow-js/blob/31c1861075aabe29b67620b58a33c7fecb209c8f/src/html.ts#L166C1-L166C23
const delimiter = '➳❍'
const bookend = '❍⇚'
const delimiterComment = `<!--${delimiter}-->`
const bookendComment = `<!--${bookend}-->`

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
  if (expressions.length > 0) {
    expressions.forEach(expressionInstance => {
      const isExpressionReactive = expressionInstance && expressionInstance.e
      const isExpressionPartial = isExpressionReactive.isT

      if (!isExpressionReactive) {
        htmlString = htmlString.replace(delimiterComment, expressionInstance())
        return
      }

      if (isExpressionPartial) {
        htmlString = htmlString.replace(
          delimiterComment,
          renderToString(expressionInstance.e)
        )
        return
      }

      const watcherReturn = expressionInstance.e()

      if (
        typeof watcherReturn !== 'object' &&
        typeof watcherReturn !== 'function'
      ) {
        htmlString = htmlString.replace(delimiterComment, watcherReturn)
        return
      }

      if (watcherReturn && watcherReturn.isT) {
        const _nestedHtmlString = renderToString(watcherReturn)
        htmlString = htmlString.replace(delimiterComment, _nestedHtmlString)
        return
      }
    })
  }

  return htmlString
}
