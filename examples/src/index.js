import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { compose } from 'ramda'
import { Router, Route, browserHistory, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createElmMiddleware from 'redux-elm-middleware'
import { reducer as elmReducer } from 'redux-elm-middleware'

const reducer = combineReducers({
  elm: elmReducer
, routing: routerReducer
})


const elmStore = window.Elm.worker(window.Elm.Store, {
  increment: null,
  asyncIncrement: null,
  decrement: null,
  changeCount: 1
});

const { run, elmMiddleware } = createElmMiddleware(elmStore)
const store = createStore(reducer, {}, compose(
  applyMiddleware(elmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
run(store)

window.red = store

const Button = ({children, ...props}) => <a className="waves-effect waves-light btn-large" {...props}>{children}</a>

const Counter = connect(
    ({elm}) => ({ value: elm.value, count: elm.count })
  )
  (function({dispatch, value = 0, count = 1}) {
    return (
      <div>
        <Button onClick={() => dispatch({type: 'asyncIncrement'})}>5 sec +</Button>
        <Button onClick={() => dispatch({type: 'increment'})}>+</Button>
        <h2>{value}</h2>
        <Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
        <input type='number' value={count} onChange={({target}) => dispatch({type: 'changeCount', payload: Number(target.value)})} />
      </div>
    );
});

const TickTock = connect(
    ({elm}) => ({ tickTock: elm.tickTock })
  )
  (function({tickTock}) {
    return (
      <div>
        <h1>{tickTock}</h1>
      </div>
    );
});

const Main = ({children}) => {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Redux-Elm-Middleware</a>
            <ul id="nav-mobile" className="right">
              <li><Link to='/counter'>Counter</Link></li>
              <li><Link to='/ticktock'>TickTock</Link></li>
            </ul>
          </div>
        </nav>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
              {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Main}>
          <Route path="counter" component={Counter}/>
          <Route path="ticktock" component={TickTock}/>
        </Route>
      </Router>
    </Provider>
    , document.getElementById('app'));
