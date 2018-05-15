export const basicCounterReducer = (state = {value: 12}, action) => {
  switch (action.type) {
    case 'BASIC_INCREMENT':
      return {...state, value: state.value + 1}
    case 'BASIC_DECREMENT':
      return {...state, value: state.value - 1}
    default:
      return state
  }
}

export const loggerMiddleware = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}
