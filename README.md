# arrow-render-to-string

![](https://img.shields.io/bundlephobia/min/arrow-render-to-string?display_name=tag&sort=semver&style=flat&colorA=181819&colorB=181819)
![](https://img.shields.io/npm/v/arrow-render-to-string?display_name=tag&sort=semver&style=flat&colorA=181819&colorB=181819)

Render [ArrowJS](http://arrow-js.com) templates and partials to string.

Works wherever JS does.

## Installation

```bash
npm install arrow-render-to-string
```

## Usage/Examples

### Basic

```javascript
import { html } from '@arrow-js/core'
import { renderToString } from 'arrow-render-to-string'

const message = 'Hello World'
const view = html`<p>${message}</p>`

renderToString(view) //=> <p>Hello World</p>
```

### Reactive Variables

```javascript
import { html, reactive } from '@arrow-js/core'
import { renderToString } from 'arrow-render-to-string'

const state = reactive({
  count: 0,
})
const view = html`<p>${() => state.count}</p>`

renderToString(view) //=> <p>0</p>
```

### Events

Events are stripped out, for you to re-hydrate on the client

```javascript
import { html, reactive } from '@arrow-js/core'
import { renderToString } from 'arrow-render-to-string'

const state = reactive({
  count: 0,
})
const view = html`<button @click="${() => (state.count += 1)}">
  ${() => state.count}
</button>`

renderToString(view) //=> <button @click="<!--➳❍-->">0</button>
```

## License

[MIT](/LICENSE)
