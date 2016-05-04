import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { compose } from 'ramda'
import createElmMiddleware from 'redux-elm-middleware'
import { reducer as elmReducer } from 'redux-elm-middleware'

const reducer = combineReducers({
  elm: elmReducer
})


const elmStore = Elm.worker(Elm.Store, {
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

const App = connect(
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

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('app'));
