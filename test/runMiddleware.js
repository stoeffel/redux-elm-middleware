import assert from 'assert'
import bro from 'jsdom-test-browser'
import createMiddleware, { ELM } from '../src'
import sinon from 'sinon'

describe('Run', () => {
  before(bro.newBrowser);

  it('should be a function', () => {
    assert.equal(typeof createMiddleware({}).run, 'function')
  })

  it('should subscribe to outgoing elm port', () => {
    const spy = sinon.spy()
    const elm = {
      ports: {
        elmToRedux: {
          subscribe: spy
        }
      }
    }
    const store = {
      dispatch: () => {}
    }
    createMiddleware(elm).run(store)
    assert.ok(spy.getCall(0).args[0] instanceof Function)
  })
})
