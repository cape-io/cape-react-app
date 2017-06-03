import test from 'tape'
import { routeParam, routeParams } from './'

test('routeParams', (t) => {
  const params = routeParams({}, { params: 'foo' })
  t.equal(params, 'foo')
  t.end()
})
test('routeParam', (t) => {
  const getIdParam = routeParam('id')
  const id = getIdParam({}, { params: { id: 'foo' } })
  t.equal(id, 'foo')
  t.end()
})
