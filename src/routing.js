import { selectActiveKeyDefault } from 'redux-history-sync'
import { partial } from 'lodash'
import { flow, get } from 'lodash/fp'
import { createSelector } from 'reselect'
import { getProps, select } from 'cape-select'
import { findRoute, selectRoutes } from 'location-info'

export const routeParams = flow(getProps, get('params'))
export const routeParam = partial(select, routeParams)

// We are using the redux-history-sync to put location into state.
function routeInfoSelector(routes, history) {
  if (!history) return history
  return {
    ...findRoute(routes, history.location), // params
    history,
  }
}
// Pass in the state object and return some info about a "route".
// selectActiveKeyDefault() is a helper function to grab the current location info.
export const routingSelector = createSelector(
  selectRoutes,
  selectActiveKeyDefault,
  routeInfoSelector
)
export const getRoute = select(routingSelector, 'route')
export const getRouteId = select(getRoute, 'id')

export default routingSelector
