import test from 'tape'
import { createStore } from 'redux'
import reducer from 'cape-redux-reducer'

test('reducer', (t) => {
  const store = createStore(reducer)
  console.log(store.getState())
  t.end()
})
