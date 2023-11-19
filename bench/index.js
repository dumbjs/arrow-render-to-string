const Benchmark = require('benchmark')
const { renderToString } = require('../dist/index.js')
const fs = require('fs'),
  path = require('path'),
  sysInfo = require('systeminformation')

let html, reactive, pretty

importArrow().then(async _ => {
  createSuite('simple', () => simple())
  createSuite('partials', () => partial())
  createSuite('dynamic-partials', () => dynamicPartial())
  createSuite('reactive', () => reactiveView())
  createSuite('dynamic-reactive', () => dynamicReactiveView())
  createSuite('real', () => realWorld())
  createSuite('goBonkers', () => goBonkers())
  const cpuInfo = await sysInfo.cpu()
  const memInfo = await sysInfo.mem()
  const base = {
    manufacturer: cpuInfo.manufacturer,
    brand: cpuInfo.brand,
    memory: {
      total: memInfo.total,
      totalPretty: pretty(memInfo.total),
    },
  }

  base.benchmarks = Object.fromEntries(
    Object.entries(recordedStats).map(([k, v]) => {
      const n = v.map(x => {
        x.stats.sample = undefined
        return x
      })
      return [k, n]
    })
  )
  fs.writeFileSync(
    path.join(__dirname, '..', 'bench.json'),
    JSON.stringify(base, null, 2),
    'utf8'
  )
})

async function importArrow() {
  const mod = await import('@arrow-js/core')
  const pmod = await import('pretty-bytes')
  html = mod.html
  reactive = mod.reactive
  pretty = pmod.default
}

const recordedStats = {}
let running = ''

function createSuite(name, arg) {
  const suite = new Benchmark.Suite(name)
  suite
    .add('arrow-render-to-string', () => {
      renderToString(arg())
    })
    .on('start', function (e) {
      running = e.currentTarget.name
      recordedStats[running] = []
      console.log('\nStarting:', e.currentTarget.name)
    })
    .on('error', e => console.log(e))
    .on('cycle', function (event) {
      console.log('▸', String(event.target))
      recordedStats[running].push(event.target)
    })
    .on('complete', function () {
      const fastest = this.filter('fastest').map('name')[0]
      console.log('\nFastest is: ' + fastest)
    })
    .run()
}

function simple() {
  return html`<p>hello</p>`
}

function partial() {
  const partial = html`<span>World</span>`
  return html`<p>hello ${partial}</p>`
}

function dynamicPartial() {
  const partial = html`<span>World</span>`
  return html`<p>hello ${() => partial}</p>`
}

function reactiveView() {
  const r = reactive({ count: 0 })
  return html`<p>${r.count}</p>`
}

function dynamicReactiveView() {
  const r = reactive({ count: 0 })
  return html`<p>${() => r.count}</p>`
}

function realWorld() {
  const Layout = child => html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        ${child}
      </body>
    </html>
  `

  const NavBar = () => html`
    <header>
      <nav>
        <ul></ul>
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

  return Layout(html` ${() => NavBar()} ${() => Counter()} `)
}

function goBonkers() {
  const Layout = child => html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        ${child}
      </body>
    </html>
  `

  const links = Array.from(new Array(1000).fill(0)).map((x, ind) => ind)
  const NavBar = () => html`
    <header>
      <nav>
        <ul>
          ${() =>
            links.map(x => html`<li>${links.map(y => html`<p>${y}</p>`)}</li>`)}
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

  return Layout(html` ${() => NavBar()} ${() => Counter()} `)
}
