import { renderRoot } from 'cape-router-component'
import initializeFirebase, { getConfig } from 'cape-firebase'
// Redux code to build store.
import configureStore from './configureStore'

/* global window */

// @param initState Define our inital state object.
// This could be a fetch() to an API endpoint or something saved to window.reactData for example.
export default function init(initialState, RouteIndex) {
  const firebase = initializeFirebase(getConfig(initialState))
  // Configure and create our Redux store.
  const store = configureStore(initialState, firebase)

  // Define our destination where we insert our root react component.
  const rootDestEl = window.document.getElementById('root')

  renderRoot({ rootDestEl, RouteIndex, store })
  return {
    firebase,
    store,
  }
}
