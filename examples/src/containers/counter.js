import React from 'react'
import { connect } from 'react-redux'

class Counter extends React.Component {
  render () {
    return (
      <div>
        <div>
          <h1>Handled by elm</h1>
          <button onClick={() => this.props.asyncInc()}>2 sec +</button>
          <button onClick={() => this.props.inc()}>+</button>
          <h2>{this.props.value}</h2>
          <button onClick={() => this.props.asyncDec()}>2 sec -</button>
          <button onClick={() => this.props.dec()}>-</button>
        </div>
        <br/>
        <br/>
        <div style={{backgroundColor:"grey"}}>
          <h1>Handled by react</h1>
          <button onClick={() => this.props.basicInc()}>+</button>
          <h2>{this.props.basicValue}</h2>
          <button onClick={() => this.props.basicDec()}>-</button>
        </div>
      </div>
    )
  }
}

// REDUCER
const mapStateToProps = ({elmReducer, reactReducer}) => {
  return {
    value: elmReducer.value,
    basicValue: reactReducer.value,
  }
}

// ACTIONS that will be intercepted by the Elm Middleware,
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

// REACT ONLY ACTIONS
export const basicIncrementAction = () => ({
  type: 'BASIC_INCREMENT'
})

export const basicDecrementAction = () => ({
  type: 'BASIC_DECREMENT'
})

const mapDispatchToProps = dispatch => ({
  asyncInc: () => dispatch(asyncIncrementAction()),
  inc: () => dispatch(incrementAction()),
  asyncDec: () => dispatch(asyncDecrementAction()),
  dec: () => dispatch(decrementAction()),
  basicInc: () => dispatch(basicIncrementAction()),
  basicDec: () => dispatch(basicDecrementAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
