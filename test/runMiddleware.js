import assert from 'assert'
import bro from 'jsdom-test-browser'
import createMiddleware, { ELM } from '../src'
import sinon from 'sinon'

describe('Run', () => {
  before(bro.newBrowser);

  it('should be a function', () => {
    assert.equal(typeof createMiddleware({}).subscribeToElm, 'function')
  })

  it('should subscribe to outgoing elm port', () => {
    const spy = sinon.spy()
    const noCallSpy = sinon.spy()
    const elm = {
      ports: {
        elmToRedux: {
          subscribe: (fn) => {
            fn(['Increment 5', { value: 5 }])
          }
        }
      }
    }
    const noPortElm = {
      ports: {
        incorrectPortName: {
          subscribe: noCallSpy
        }
      }
    }
    const store = {
      dispatch: spy
    }
    const expectedAction = {
      type: '@@elm/Increment',
      payload: { value: 5 }
    }
    createMiddleware(elm).subscribeToElm(store)
    createMiddleware(noPortElm).subscribeToElm(store)
    assert.deepEqual(
      spy.getCall(0).args[0],
      expectedAction
    )
    assert.ok(noCallSpy.callCount === 0)
  })
})
