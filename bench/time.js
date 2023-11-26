// JUST A SAMPLE FILE USING THE UTILITY TO BE USED WITH PERF CHECKS AND GRAPHS

const { renderToString } = require('../dist/index.js')
const fs = require('fs')

let html, reactive

async function importArrow() {
  const mod = await import('@arrow-js/core')
  html = mod.html
  reactive = mod.reactive
  return
}

importArrow().then(_ => {
  const Layout = child =>
    html`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
        </head>
        <body>
          ${child}
        </body>
      </html>
    `

  const links = Array.from(new Array(10000).fill(0)).map((x, ind) => ind)
  const outerLinks = Array.from(new Array(100).fill(0)).map((x, ind) => ind)
  const outerLinkComponents = outerLinks.map(
    _ => html`<li>${links.map(y => html`<p>${y}</p> `)}</li>`
  )
  const NavBar = () =>
    html`
      <header>
        <nav>
          <ul>
            ${outerLinkComponents}
          </ul>
        </nav>
      </header>
    `

  const state = reactive({
    count: 0,
  })

  const Counter = () => {
    return html`
      <button @click="${() => (state.count += 1)}">${() => state.count}</button>
    `
  }
  const template = NavBar()
  const out = renderToString(template)
  const str = fs.createWriteStream('example.html', 'utf8')
  str.write(out)
  str.end()
})
