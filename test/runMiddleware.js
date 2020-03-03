import assert from 'assert'
import bro from 'jsdom-test-browser'
import createMiddleware from '../src'
import sinon from 'sinon'

describe('Run', () => {
    before(bro.newBrowser);

    it('should be a function', () => {
        assert.equal(typeof createMiddleware({}).run, 'function')
    })

    it('should subscribe to all outgoing elm ports', () => {
        const spy = sinon.spy()
        const callSpy = sinon.spy()
        const elm = {
            ports: {
                elmToRedux: {
                    subscribe: (fn) => {
                        fn(['Increment', { value: 5 }])
                    }
                }
            }
        }
        const noPortElm = {
            ports: {
                incorrectPortName: {
                    subscribe: callSpy
                }
            }
        }
        const store = {
            dispatch: spy
        }
        const expectedAction = {
            type: '@@elm.in/INCREMENT',
            payload: { value: 5 }
        }
        createMiddleware(elm).run(store)
        createMiddleware(noPortElm).run(store)
        assert.deepEqual(
            spy.getCall(0).args[0],
            expectedAction
        )
        assert.ok(callSpy.callCount === 1)
    })
})
