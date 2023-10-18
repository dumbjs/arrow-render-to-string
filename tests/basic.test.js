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

test('reactive variable', async () => {
  const rVar = reactive({ message: 'hello world' })
  const tmp = html`<p>${rVar.message}</p>`
  const out = renderToString(tmp)
  assert.is(out, '<p>hello world</p>')
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

test.run()
