import camelCase from 'camelcase'

const ELM = '@@elm'
const subscriptionPort = 'elmToRedux'

// createElmReducer will only handle actions with type starting with @@elm
export const createElmReducer = init => (state = init, action) => {
  if (isElmAction(action)) {
    return action.payload
  }

  return state
}

const createElmMiddleware = elmModule => {
  const sendActionsToElm = () => next => action => {
    const elmPortName = actionTypeToElmPortName(action.type)

    if (elmPortName === subscriptionPort) {
      console.error(`you're attempting to send to the elm reserved out port : ${subscriptionPort}. 
      Please change your action type to something else than ${action.type}`)
      return next(action)
    }

    if (elmInPortExists(elmModule, elmPortName)) {
      elmModule.ports[elmPortName].send(forgedPayload(action))
    }

    return next(action)
  }

  const subscribeToElm = store => {
    if (elmOutPortReady(elmModule)) {
      elmModule.ports[subscriptionPort].subscribe(
        ([action, nextState]) => {
          store.dispatch({
            type: `${ELM}/${action.split(' ')[0]}`,
            payload: nextState
          })
        }
      )
    }
  }

  return {sendActionsToElm, subscribeToElm}
}

// default export
export default createElmMiddleware

// for backward compatibility
export const reducer = createElmReducer({})

// private Helpers
const isElmAction = (action) => action.type.split('/')[0] === ELM
const elmInPortExists = (elmModule, portName) => elmModule.ports && elmModule.ports[portName]
const forgedPayload = action => typeof action.payload === undefined ? null : action.payload
const elmOutPortReady = elmModule => elmModule && elmModule.ports && elmModule.ports[subscriptionPort]
const actionTypeToElmPortName = actionType => camelCase(actionType) // elm doesn't like capital case variables


