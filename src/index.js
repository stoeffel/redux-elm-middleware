import camelCase from 'camelcase'

export const ELM = '@@elm'

const createElmMiddleware = (elm) => {
  const elmMiddleware = ({dispatch}) => next => action => {
      const camelCaseType = camelCase(action.type)
      if (elm.ports && elm.ports[camelCaseType]) {
        elm.ports[camelCaseType].send(action.payload || null)
      }
      next(action)
    }
  const run = store => {
    window.__REDUX_ELM_STORE__ = store;
    elm.ports.elmToRedux.subscribe(payload => {
      store.dispatch({
        type: '@@elm/json',
        payload
      })
    })
  }


  return { elmMiddleware, run }
}

export default createElmMiddleware

export const reducer = function(state = {}, action) {
  const [elmAction, type] = action.type.split('/')
  if (elmAction === ELM) {
    return action.payload
  }

  return state
}
