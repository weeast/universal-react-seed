
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, match } from 'react-router'

import configureStore from 'APP/store/configureStore'
import * as route from 'APP/routes/index'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import _ from 'lodash'

import 'STYLE/layout.less'

let reduxState = {}
if (window.__REDUX_STATE__) {
  try {
    let plain = JSON.parse(unescape(__REDUX_STATE__))
    _.each(plain, (val, key)=> {
      reduxState[key] = Immutable.fromJS(val)
    })
  } catch (e) {
  }
}

const store = configureStore(reduxState)
let routes = route.rootRoute
let history = browserHistory

match({ history, routes }, (error, redirectLocation, renderProps) => {
  const { location } = renderProps
  ReactDOM.render(
    <Provider store={store} key="provider">
        { route.default(browserHistory, renderProps) }
    </Provider>,
    document.getElementById('root')
  )
})
/*
ReactDOM.render((
  <Provider store={store}>
    { createRoutes(browserHistory) }
  </Provider>
), document.getElementById('root'))*/
