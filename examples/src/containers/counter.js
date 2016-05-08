import React from 'react'
import { connect } from 'react-redux'
import { Button } from '../components/button'

export const Counter = connect(
    ({elm}) => ({ value: elm.value, count: elm.count })
  )
  (function({dispatch, value = 0, count = 1}) {
    return (
      <div>
        <Button onClick={() => dispatch({type: 'asyncIncrement'})}>2 sec +</Button>
        <Button onClick={() => dispatch({type: 'increment'})}>+</Button>
        <h2>{value}</h2>
        <Button onClick={() => dispatch({type: 'decrement'})}>-</Button>
        <input type='number' value={count} onChange={({target}) => dispatch({type: 'changeCount', payload: Number(target.value)})} />
      </div>
    );
});

