import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { html, reactive } from '@arrow-js/core'

import { renderToString } from '../src/index.js'
import { inlineSnapshot } from 'uvu-inline-snapshot'

test('basic', async () => {
  const tmp = html`hello`
  const out = renderToString(tmp)
  assert.is(out, 'hello')
})

test('basic', async () => {
  const tmp = html`<p>hello</p>`
  const out = renderToString(tmp)
  assert.is(out, '<p>hello</p>')
})

test('variable', async () => {
  const msg = 'hello world'
  const tmp = html`<p>${msg}</p>`
  const out = renderToString(tmp)
  assert.is(out, '<p>hello world</p>')
})

test('variable attribute', async () => {
  const checked = true
  const tmp = html`<input
    type="checkbox"
    ${() => (checked ? 'checked' : '')}
  />`
  const out = renderToString(tmp)
  assert.is(
    out,
    `<input
    type="checkbox"
    checked
  />`
  )
})

test('reactive variable type string', async () => {
  const rVar = reactive({ message: 'hello world' })
  const tmp = html`<p>${rVar.message}</p>`
  const out = renderToString(tmp)
  assert.is(out, '<p>hello world</p>')
})

test('reactive variable type number', async () => {
  const pageState = reactive({
    count: 0,
  })
  const comp = html`<div
    class="flex-[5] relative p-2 overflow-x-auto flex flex-col gap-2"
  >
    <div class="flex gap-2 items-center">${() => pageState.count}</div>
  </div>`

  await inlineSnapshot(
    renderToString(comp),
    `<div
    class="flex-[5] relative p-2 overflow-x-auto flex flex-col gap-2"
  >
    <div class="flex gap-2 items-center">0</div>
  </div>`
  )
})

test('reactive variable, changing', async () => {
  const rVar = reactive({ message: 'hello world' })
  const tmp = html`<p>${() => rVar.message}</p>`
  const out = renderToString(tmp)
  assert.is(out, '<p>hello world</p>')
})

test('reactive variable, multiple expressions', async () => {
  const rVar = reactive({ start: 'hello', end: 'world' })
  const tmp = html`<p>
    <span>${() => rVar.start}</span>
    <span>${() => rVar.end}</span>
  </p>`

  const out = renderToString(tmp)

  await inlineSnapshot(
    out,
    `<p>
    <span>hello</span>
    <span>world</span>
  </p>`
  )
})

test('with partial', async () => {
  const partial = html`<p>hello</p>`
  const final = html`<div>${partial}</div>`

  const out = renderToString(final)

  await inlineSnapshot(out, `<div><p>hello</p></div>`)
})

test('with expression partial', async () => {
  const partial = html`<p>hello</p>`
  const final = html`<div>${() => partial}</div>`

  const out = renderToString(final)

  await inlineSnapshot(out, `<div><p>hello</p></div>`)
})

test('Mix match partials and', async () => {
  const rVar = reactive({ start: 'hello', end: 'world' })
  const partial = html`<p>hello</p>`
  const final = html`<div>
    ${() => partial}
    <div>
      <span>${() => rVar.start}</span>
      <span>${rVar.end}</span>
    </div>
    ${partial}
  </div>`

  const out = renderToString(final)

  await inlineSnapshot(
    out,
    `<div>
    <p>hello</p>
    <div>
      <span>hello</span>
      <span>world</span>
    </div>
    <p>hello</p>
  </div>`
  )
})

test('events', async () => {
  const rVar = reactive({ count: 0 })
  const final = html`<button @click="${() => rVar.count + 1}">
    ${rVar.count}
  </button>`

  const out = renderToString(final)

  await inlineSnapshot(
    out,
    `<button @click="">
    0
  </button>`
  )
})

test('multiple events', async () => {
  const rVar = reactive({ count: 0 })
  const final = html`<button
    @click="${() => rVar.count + 1}"
    @focus="${() => console.log('focus!')}"
  >
    ${rVar.count}
  </button>`

  const out = renderToString(final)

  await inlineSnapshot(
    out,
    `<button
    @click=""
    @focus=""
  >
    0
  </button>`
  )
})

test('nested events', async () => {
  const rVar = reactive({ count: 0 })
  const partial = html`
    <input
      @focus="${() => {
        console.log('input focused')
      }}"
    />
  `
  const final = html`<button
    value="${() => rVar.count + 1}"
    @click="${() => rVar.count + 1}"
    @focus="${() => console.log('focus!')}"
  >
    ${rVar.count} ${partial}
  </button>`

  const out = renderToString(final)

  await inlineSnapshot(
    out,
    `<button
    value="1"
    @click=""
    @focus=""
  >
    0 
    <input
      @focus=""
    />
  
  </button>`
  )
})

test('function composition basic', async () => {
  const view = () => html`<p>hello world</p>`
  const containerView = html`${view()}`
  const out = renderToString(containerView)
  await inlineSnapshot(out, `<p>hello world</p>`)
})

test('stringify nested array of templates', async () => {
  const tables = [1, 2, 3]

  const templ = html`
    <div class="container">
      <div class="row">
        <div class="col">${() => tables.map(x => html`<p>${x}</p>`)}</div>
      </div>
    </div>
  `

  const out = renderToString(templ)

  await inlineSnapshot(
    out,
    `
    <div class="container">
      <div class="row">
        <div class="col"><p>1</p><p>2</p><p>3</p></div>
      </div>
    </div>
  `
  )
})

test('reactive class attribute', async () => {
  const state = reactive({ count: 0 })

  const comp = html`<div class="${() => (state.count > 10 ? 'active' : '')}">
    Hello
  </div>`

  const nonClass = renderToString(comp)
  state.count = 11
  const withClass = renderToString(comp)

  await inlineSnapshot(
    nonClass,
    `<div class="">
    Hello
  </div>`
  )

  await inlineSnapshot(
    withClass,
    `<div class="active">
    Hello
  </div>`
  )
})

test.run()
