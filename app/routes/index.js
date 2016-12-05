// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import React from 'react'
import {Router} from 'react-router'
import App from './container/App'

const rootRoute = {
    path:'/',
    component: App,

    getIndexRoute(partialNextState, callback) {
        require.ensure([], function (require) {
            callback(null, {
                component: require('./components/Intro').default,
            })
        })
    },

    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
            require('./routes/Questions'),
            require('./routes/Question')
        ])
      })
    }
}

export { rootRoute }
export default function(history, renderProps) {
    return <Router history={history} routes={rootRoute} {...renderProps}/>
}