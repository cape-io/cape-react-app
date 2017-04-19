import { createElement, Component, PropTypes } from 'react'
// Component makes Redux store available to the connect() calls in children.
import { connect, Provider } from 'react-redux'
import Router from './Router'
import routing from './routing'

// Using a class for live/hot reload
class Root extends Component {
  render() {
    // Provider only wants a single child.
    const { store, RouteIndex } = this.props
    return createElement(Provider, { store },
      createElement('div', null,
        createElement(connect(routing)(Router), { RouteIndex })
      )
    )
  }
}
// @see cape-redux-reducer
Root.propTypes = {
  store: PropTypes.shape({
    config: PropTypes.object,
    db: PropTypes.object,
    graph2: PropTypes.object,
  }).isRequired,
  RouteIndex: PropTypes.objectOf(PropTypes.node).isRequired,
}
export default Root
