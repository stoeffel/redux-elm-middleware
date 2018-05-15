import React from 'react'
import { connect } from 'react-redux'



class Counter extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.asyncInc()}>2 sec +</button>
        <button onClick={() => this.props.inc()}>+</button>
        <h2>{this.props.value}</h2>
        <button onClick={() => this.props.asyncDec()}>2 sec -</button>
        <button onClick={() => this.props.dec()}>-</button>
      </div>
    )
  }
}

// REDUCER
const mapStateToProps = ({elmReducer}) => ({
  value: elmReducer.value,
  count: elmReducer.count
})

// ACTIONS
const INCREMENT = 'INCREMENT'
export const incrementAction = () => ({
  type: INCREMENT
})

const ASYNC_INCREMENT = 'ASYNC_INCREMENT'
export const asyncIncrementAction = () => ({
  type: ASYNC_INCREMENT
})

const DECREMENT = 'DECREMENT'
export const decrementAction = () => ({
  type: DECREMENT
})

const ASYNC_DECREMENT = 'ASYNC_DECREMENT'
export const asyncDecrementAction = () => ({
  type: ASYNC_DECREMENT
})

const mapDispatchToProps = dispatch => ({
  asyncInc: () => dispatch(asyncIncrementAction()),
  inc: () => dispatch(incrementAction()),
  asyncDec: () => dispatch(asyncDecrementAction()),
  dec: () => dispatch(decrementAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
