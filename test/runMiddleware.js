import assert from 'assert'
import sinon from 'sinon'
import configureStore from 'redux-mock-store';
import createMiddleware, { ELM } from '../src'

describe('Run', () => {
  it('should be a function', () => {
    assert.equal(typeof createMiddleware({}).run, 'function')
  })

  it('should subscribe to the out port', () => {
    const spy = sinon.spy()
    const { run } = createMiddleware({
      ports: {
        out: {
          subscribe: spy
        }
      }
    })

    run()
    assert.ok(spy.called)
  })

  it('should call the subscription callback on event', () => {
    const spy = sinon.spy()
    const { run, elmMiddleware } = createMiddleware({
      ports: {
        out: {
          subscribe: (cb) => cb('foo')
        }
      }
    })

    const mockStore = configureStore([elmMiddleware])({})
    run(mockStore)
    assert.deepEqual(mockStore.getActions(), [{ type: ELM, payload: 'foo' }]);
  })
})
