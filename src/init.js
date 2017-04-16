import { createElement } from 'react'
import { render } from 'react-dom'
// Redux code to build store.
import configureStore from './configureStore'
// Root React component.
import Root from './Root'

/* global window */

// @param initState Define our inital state object.
// This could be a fetch() to an API endpoint or something saved to window.reactData for example.
export default function init(initialState = {}) {
  // Configure and create our Redux store.
  const store = configureStore(initialState)

  // Define our destination where we insert our root react component.
  const destEl = window.document.getElementById('root')

  render(createElement(Root, { store }), destEl)
}