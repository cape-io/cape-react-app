import { createElement } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { get, isFunction } from 'lodash'

// It just uses a specific component given a prop value.
// Less declaritive perhaps but really easy to reason about.
// You can use this concept anywhere!

function Router({ RouteIndex, loading, ...props }) {
  if (loading) {
    return createElement(RouteIndex.loading, null)
  }
  // Select your component from the routeIndex defined above.
  // Provide default Component if there is no match.
  const MainElement = get(RouteIndex, props.route.id, RouteIndex.home)
  // Render that component. Send along any props this component got.
  return createElement(MainElement, props)
}

Router.propTypes = {
  loading: PropTypes.bool.isRequired,
  route: PropTypes.shape({
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
  RouteIndex: PropTypes.objectOf(PropTypes.func).isRequired,
}

export function selectSessionId(state) {
  return state.socket.sessionId
}
export function socketLoading() {
  return false
  // return !isString(selectSessionId(state))
}
function mapStateToProps(state, ownProps) {
  const { route: { isLoading } } = ownProps
  const checkLoading = isLoading || socketLoading
  const loading = isFunction(checkLoading) && !!checkLoading(state)
  return {
    loading,
  }
}
export default connect(mapStateToProps)(Router)
