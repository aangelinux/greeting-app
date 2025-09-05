/**
 * The greeting-app web component.
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0f4f8;
      font-family: 'Georgia';
    }

    .greeting-app {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: darkblue;
      font-size: 1.5rem;
      font-family: 'PressStart2P';
      margin: 7px;
    }

  .greeting-app input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
  }

  .greeting-app button {
    padding: 10px 15px;
    font-size: 1rem;
    color: white;
    background-color: darkblue;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .greeting-app button:hover {
    background-color: #00008b;
  }
  </style>

  <div class="greeting-app">
    <h1>Welcome to the greeting app!</h1>
    <label for="name">Please enter your name:</label>
    <input type="text" id="name" name="name"><br><br>
    <button type="button">Generate greeting!</button>
    <h3><h3>
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

        this.inputBox = this.shadowRoot.querySelector('input')
        this.button = this.shadowRoot.querySelector('button')
        this.greeting = this.shadowRoot.querySelector('h3')
    }

    /**
     * Called when the element is appended to the DOM.
     */
    connectedCallback () {
        this.inputBox.select()

        this.button.addEventListener('click', () => this.runProgram())
        this.inputBox.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                this.runProgram()
            }
        })
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
        this.button.removeEventListener('click')
        this.inputBox.removeEventListener('keypress')
    }

    /**
     * Reads the input and generates a greeting.
     */
    generateGreeting () {
        const userName = this.inputBox.value

        const greetings = {
            Swedish: 'Goddag',
            English: 'Good day',
            French: 'Bonne journée',
            Spanish: 'Buen día',
            Tagalog: 'Magandang araw',
            German: 'Guten tag',
            Australian: `G'day`
        }

        const keys = Object.keys(greetings)
        const randomIndex = Math.floor(Math.random() * keys.length)
        const randomGreeting = greetings[keys[randomIndex]]

        return `${randomGreeting}, ${userName}!`
    }

    /**
     * Displays the greeting on the page.
     * 
     * @param {string} - The greeting to be displayed.
     */
    displayGreeting (greeting) {
        this.greeting.innerText = greeting
    }

    /**
     * Runs the program.
     */
    runProgram () {
        const greeting = this.generateGreeting()
        this.displayGreeting(greeting)
    }
})
