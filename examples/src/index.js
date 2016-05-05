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

const Counter = connect(
    ({elm}) => ({ value: elm.value, count: elm.count })
  )
  (function({dispatch, value = 0, count = 1}) {
    return (
      <div>
        <button onClick={() => dispatch({type: 'asyncIncrement'})}>5 sec +</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        <span>{value}</span>
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
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
        <h1>State</h1>
        <Link to='/counter'>Counter</Link>
        <Link to='/ticktock'>TickTock</Link>
        <div>{children}</div>
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
