import Express from 'express'
import session from 'express-session'
import http from 'http'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useRouterHistory, RouterContext, match } from 'react-router'

import { createMemoryHistory, useQueries } from 'history'
import compression from 'compression'
import Promise from 'bluebird'

// import { createSocketServe } from 'SERVER/common/socketio'

import configureStore from 'APP/store/configureStore'
import { rootRoute } from 'APP/routes/index'

import apiRouter from './api_router'
// import componentsRouter from './dev/components.dev'
import env from 'ROOT/configs/environments'

import { Provider } from 'react-redux'

let app = Express()
let port = env.SERVER_PORT || 4000
let scriptSrcs = []
env.ON_SERVER = true

let styleSrc
if ( env.NODE_ENV !== 'production' ) {
  scriptSrcs = [
    env.PUBLIC_PATH+'/vendor.js',
    env.PUBLIC_PATH+'/app.js'
  ]
  styleSrc = [env.PUBLIC_PATH+'/css/app.css',env.PUBLIC_PATH+'/css/vendor.css']
}

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(compression())

if (env.NODE_ENV === 'production') {
  // app.use(Express.static(path.join(__dirname, '..', 'public')))
  app.use(Express.static(env.inProject('public')))
} else {
  // app.use(Express.static(path.join(__dirname, '..', 'dist')))
  app.use(Express.static(env.inProject('dist')))
}

app.set('views', './server/views')
app.set('view engine', 'ejs')

// apis
app.use('/api', apiRouter)

// app.use(componentsRouter)

app.get('*', (req, res, next)=> {
  let history = useRouterHistory(useQueries(createMemoryHistory))()
  let store = configureStore()
  let routes = rootRoute//createRoutes(history)

  let location = history.createLocation(req.url)

  match({ routes, location, history }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      res.status(500).send(error.message)
    } else if (renderProps == null) {
      res.status(404).send('Not found')
    } else {
      let [ getCurrentUrl, unsubscribe ] = subscribeUrl()
      let reqUrl = location.pathname + location.search

      getReduxPromise().then(()=> {
        let reduxState = escape(JSON.stringify(store.getState()))
        let html = ReactDOMServer.renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        )

        if ( getCurrentUrl() === reqUrl ) {
          res.render('index', { html, scriptSrcs, reduxState, styleSrc })
        } else {
          res.redirect(302, getCurrentUrl())
        }
        unsubscribe()
      })
      .catch((err)=> {
        unsubscribe()
        next(err)
      })
      function getReduxPromise () {
        let { query, params } = renderProps
        let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent
        let promise = comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve()

        return promise
      }
    }
  })
  function subscribeUrl () {
    let currentUrl = location.pathname + location.search
    let unsubscribe = history.listen((newLoc)=> {
      if (newLoc.action === 'PUSH') {
        currentUrl = newLoc.pathname + newLoc.search
      }
    })
    return [
      ()=> currentUrl,
      unsubscribe
    ]
  }
})

app.use((err, req, res, next)=> {
  console.log(err.stack)
  // TODO report error here or do some further handlings
  res.status(500).send("something went wrong...")
})


let server = http.Server(app)
// socket
// createSocketServe(server)

console.log(`Server is listening to port: ${port}`)

server.listen(port)
