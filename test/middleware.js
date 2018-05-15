import assert from 'assert'
import sinon from 'sinon'
import configureStore from 'redux-mock-store';
import createMiddleware from '../src'

describe('Middleware', () => {
  it('should be a function', () => {
    assert.equal(typeof createMiddleware, 'function')
  })

  it('should create a middleware', () => {
    const mockStore = configureStore([ createMiddleware({}).sendActionsToElm ])({})
    mockStore.dispatch({ type: 'TEST' })
    assert.deepEqual(mockStore.getActions(), [{ type: 'TEST' }]);
  })

  it('uppercase action types should be valid', () => {
    const spy = sinon.spy()
    const { sendActionsToElm } = createMiddleware({
      ports: {
        testingCamelCase: {
          send: spy
        }
      }
    })

    const mockStore = configureStore([sendActionsToElm])({})

    mockStore.dispatch({ type: 'TESTING_CAMEL_CASE' })
    mockStore.dispatch({
      type: 'TESTING_CAMEL_CASE',
      payload: 'foo'
    })

    assert.deepEqual(mockStore.getActions(), [
      { type: 'TESTING_CAMEL_CASE' },
      { type: 'TESTING_CAMEL_CASE', payload: 'foo' },
    ]);

    assert.ok(spy.getCall(0).args[0] === undefined);
    assert.ok(spy.getCall(1).args[0] === 'foo');
  })

  it('should send an action to a port if present', () => {
    const spy = sinon.spy()
    const { sendActionsToElm } = createMiddleware({
      ports: {
        test: {
          send: spy
        }
      }
    })
    const mockStore = configureStore([sendActionsToElm])({})

    mockStore.dispatch({ type: 'TEST' })
    mockStore.dispatch({ type: 'NO_PORT' })
    mockStore.dispatch({ type: 'TEST', payload: 'foo' })

    assert.deepEqual(mockStore.getActions(), [
      { type: 'TEST' },
      { type: 'NO_PORT' },
      { type: 'TEST', payload: 'foo' }
    ]);
    assert.ok(spy.getCall(0).args[0] === undefined);
    assert.ok(spy.getCall(1).args[0] === 'foo');
  })
})
