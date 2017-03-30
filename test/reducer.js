import assert from 'assert'
import testReducer from 'redux-test-reducer'
import { reducer, createElmReducer } from '../src'

describe('Reducer', () => {
  it('should be a function', () => {
    assert.equal(typeof reducer, 'function')
  })

  it('returns the payload of an elm-action as the new state', () => {
    const assertReducer = testReducer(reducer)
    const from = {
      init: true
    }
    const to = {
      elm: true
    }
    const action = {
      type: '@@elm/action',
      payload: {
        elm: true
      }
    }
    assertReducer({
      from, to, action
    })
  })

  it('should return the initial state if not an elm action', () => {
    const assertReducer = testReducer(reducer)
    const from = {
      init: true
    }
    const to = from
    const action = {
      type: 'OTHER_ACTION',
      payload: {
        foo: true
      }
    }
    assertReducer({
      from, to, action
    })
  })

  it('allows setting the initial state with createElmReducer', () => {
    const customInit = 1
    const assertReducer = testReducer(createElmReducer(customInit))
    const from = {
      init: customInit
    }
    const to = from
    const action = {
      type: 'OTHER_ACTION',
      payload: {
        foo: true
      }
    }
    assertReducer({
      from, to, action
    })
  })
})
