import { merge } from 'lodash'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { middleware as fireMiddleware, reduxFirebase } from 'cape-firebase'
import reducer from 'cape-redux-reducer'
import { createSizeAction, createRemAction, listenResize } from 'redux-windowsize'
import {
  getInitState,
  historyMiddleware,
  syncHistoryWithStore,
} from 'redux-history-sync'

/* global window */

const composeEnhancers = (
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line no-underscore-dangle
) || compose

// Configure and create Redux store.
// Function requires an initialState object.
export default function configureStore(initialState, firebase) {
  const calculatedState = {
    history: getInitState(window.location, window.document.title, window.history),
    session: {
      currentYear: new Date().getFullYear(),
    },
  }
  const store = createStore(
    reducer,
    merge(initialState, calculatedState),
    composeEnhancers(
      applyMiddleware(
        historyMiddleware(window.history),
        // Build func to listen for firebase changes and dispatch to redux.
        fireMiddleware(firebase),
        thunk,
      ),
    )
  )
  syncHistoryWithStore(store, window)
  reduxFirebase(firebase, store)
  store.dispatch(createSizeAction(window))
  store.dispatch(createRemAction(window))
  listenResize(store, window)
  return store
}
