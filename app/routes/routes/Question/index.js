// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default {
    path:'questions/:id',
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('./container/Question'))
        })
    }
}