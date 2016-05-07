const ELM = '@@elm'

const createElmMiddleware = (elm) => {
  const elmMiddleware = ({dispatch}) => next => action => {
      if (elm.ports && elm.ports[action.type])
        elm.ports[action.type].send(action.payload || null)
      next(action)
    }
  const run = store => elm.ports.out.subscribe((x) => store.dispatch({type: ELM, payload: x}))

  return { elmMiddleware, run }
}

export default createElmMiddleware

export const reducer = function(state = {}, action) {
  if (action.type === ELM) {
    return action.payload
  }

  return state
}
