import assert from 'assert'
import bro from 'jsdom-test-browser'
import createMiddleware, { ELM } from '../src'

describe('Run', () => {
  before(bro.newBrowser);

  it('should be a function', () => {
    assert.equal(typeof createMiddleware({}).run, 'function')
  })

  it('should create a global var on the window object', () => {
    window = {};
    createMiddleware({}).run('foo')
    assert.equal(window.__REDUX_ELM_STORE__, 'foo')
  })
})
