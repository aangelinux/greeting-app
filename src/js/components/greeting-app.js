/**
 * The greeting-app web component.
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
  </style>

  <div class="greeting-app">
    <h1>Welcome to the greeting app!</h1>
  </div>
`

customElements.define('greeting-app',
  /**
   * Represents a greeting-app element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
})
