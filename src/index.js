import casex from 'casex';

const camelCase = text => casex(text.toLowerCase(), 'caSe')
const upperSnakeCase = text => casex(text, 'CA_SE')

export const ELM = '@@elm'

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
        if (elm && elm.ports) {
            if (elm.ports.elmToRedux) {
                elm.ports.elmToRedux.subscribe(([action, payload]) => {
                    const [actionType, ...rest] = action.split(' ')
                    store.dispatch({
                        type: `${ELM}/${actionType}`,
                        payload
                    })
                })
            }
            Object.keys(elm.ports).forEach(portName => {
                if (typeof elm.ports[portName].subscribe === 'function' &&
                    portName !== 'elmToRedux') {
                    elm.ports[portName].subscribe(payload => {
                        const actionType = upperSnakeCase(portName)
                        store.dispatch({
                            type: `${ELM}/${actionType}`,
                            payload
                        })
                    })
                }
            })
        }
    }

    return { elmMiddleware, run }
}

export default createElmMiddleware

export const createElmReducer = (init) => (state = init, action) => {
    const [elmAction, type] = action.type.split('/')
    if (elmAction === ELM) {
        return action.payload
    }

    return state
}

export const reducer = createElmReducer({})
