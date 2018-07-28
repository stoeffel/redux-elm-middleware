import casex from 'casex';

const camelCase = text => casex(text.toLowerCase(), 'caSe')
const upperSnakeCase = text => casex(text, 'CA_SE')

// Namespace of action types that produce new state in elm and require
// updating Redux store.
export const ELM_IN = '@@elm.in'

// Namespace of action types that were produced by Elm Reducer and require
// handling them in JS (Redux middlewares, reducers).
export const ELM_OUT = '@@elm.out'

const createElmMiddleware = (elm) => {
    const elmMiddleware = ({dispatch}) => next => action => {
        const camelCaseType = camelCase(action.type)
        if (
            elm.ports &&
            elm.ports[camelCaseType] &&
            typeof elm.ports[camelCaseType].send === 'function'
        ) {
            const payload = typeof action.payload === undefined ? null : action.payload;
            elm.ports[camelCaseType].send(payload)
        }
        next(action)
    }

    const run = store => {
        if (elm && elm.ports && typeof elm.ports === 'object') {
            Object.keys(elm.ports).forEach(portName => {
                if (typeof elm.ports[portName].subscribe === 'function') {
                    if (portName === 'elmToRedux') {
                        // Sync Elm Reducer model with Redux store
                        elm.ports.elmToRedux.subscribe(([action, payload]) => {
                            const [ actionType, ...rest ] = action.split(' ')
                            store.dispatch({
                                type: `${ ELM_IN }/${ upperSnakeCase(actionType) }`,
                                payload
                            })
                        })
                    } else {
                        // Dispatch actions sent from Elm Reducer to Redux store
                        elm.ports[portName].subscribe(payload => {
                            store.dispatch({
                                type: `${ ELM_OUT }/${ upperSnakeCase(portName) }`,
                                payload
                            })
                        })
                    }
                }
            })
        }
    }

    return { elmMiddleware, run }
}

export default createElmMiddleware

export const createElmReducer = (init) => (state = init, action) => {
    const [ actionNameSpace, type ] = action.type.split('/')

    if (actionNameSpace === ELM_IN) {
        return action.payload
    }

    return state
}

export const reducer = createElmReducer({})
