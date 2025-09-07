/**
 * The greeting-app web component.
 * 
 * @file components/greeting-app
 * @module Generates a random greeting for the user.
 */

const template = document.createElement('template')
template.innerHTML = `
<style>
    .greeting-app {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f4f1de;
        color: #e07a5f;
        font-size: 1.4rem;
        font-family: 'Monaco', monospace;
        font-weight: bold;
        margin: 0;
    }

    .greeting-app h1 {
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    .greeting-app input {
        margin-top: 10px;
        padding: 10px;
        font-size: 1rem;
        border: 2px solid black;
        border-radius: 5px;
        width: 200px;
    }

    .greeting-app button {
        padding: 10px 15px;
        font-family: 'Monaco', monospace;
        font-size: 1rem;
        color: white;
        background-color: #e07a5f;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .greeting-app button:hover {
        background-color: #e1b8abff;
    }

    .greeting-app h3 {
        margin-top: 40px;
    }
</style>

<div class="greeting-app">
    <h1>Welcome to the greeting app!</h1>
    <label for="name">Please enter your name:</label>
    <input type="text" id="name" name="name"><br><br>
    <button type="button">GENERATE GREETING</button>
    <h3></h3>
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

        this.abortController = new AbortController()
    }

    /**
     * Called when the element is appended to the DOM.
     */
    connectedCallback () {
        this.inputBox.select()

        this.button.addEventListener('click', () => this.runProgram(), { signal: this.abortController.signal })
        this.inputBox.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                this.runProgram()
            }
        }, { signal: this.abortController.signal })
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
        this.abortController.abort()
    }

    /**
     * Reads the input and generates a random greeting.
     */
    generateGreeting () {
        const userName = this.inputBox.value.trim()
        if (!userName) {
            return 'Please enter a name.'
        }

        const greetings = {
            Swedish: 'Goddag',
            English: 'Good day',
            French: 'Bonjour',
            Spanish: 'Buen día',
            Tagalog: 'Magandang araw',
            German: 'Guten tag',
            Polish: 'Dzień dobry',
            Italian: 'Buongiorno',
            Australian: `G'day`,
            Cowboyian: 'Howdy',
        }

        const keys = Object.keys(greetings)
        const randomIndex = Math.floor(Math.random() * keys.length)
        const randomGreeting = greetings[keys[randomIndex]]

        return `${randomGreeting}, ${userName}!`
    }

    /**
     * Gets a greeting and displays it on the page.
     */
    runProgram () {
        const greeting = this.generateGreeting()

        this.greeting.innerText = greeting
    }
})
