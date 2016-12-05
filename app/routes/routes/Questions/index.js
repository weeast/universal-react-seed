// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import {Router} from 'react-router'

export default {
    path:'questions',
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('./container/Questions'))
        })
    }
}