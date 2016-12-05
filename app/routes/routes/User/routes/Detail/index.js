export default {
    path:'detail',
    getComponents(nextState, callback) {
        require.ensure([], function (require) {
            callback(null, require('components/Questions'))
        })
    }
}