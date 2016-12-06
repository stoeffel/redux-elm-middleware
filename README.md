# redux-elm-middleware

> Elm middleware for redux :sparkles:

<img src="https://cdn.rawgit.com/stoeffel/redux-elm-middleware/v017/logo/logo.svg" alt="logo" width="250" height="252">

[![Build Status](https://travis-ci.org/stoeffel/redux-elm-middleware.svg?branch=master)](https://travis-ci.org/stoeffel/redux-elm-middleware)
[![codecov](https://codecov.io/gh/stoeffel/redux-elm-middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/stoeffel/redux-elm-middleware)
[![Dependency Status](https://david-dm.org/stoeffel/redux-elm-middleware.svg)](https://david-dm.org/stoeffel/redux-elm-middleware)
[![npm version](https://badge.fury.io/js/redux-elm-middleware.svg)](https://badge.fury.io/js/redux-elm-middleware)

## Installation

You need to install redux-elm-middleware for js and elm.

```bash
$ npm i redux-elm-middleware -S
```

Redux-elm-middleware is currently only published to npm.
You will need to add the following to you `elm-package.json`

```json
  "source-directories": ["node_modules/redux-elm-middleware/src", ...]
```

## Usage

### Setup Redux Middleware

```js
import createElmMiddleware from 'redux-elm-middleware'
import { reducer as elmReducer } from 'redux-elm-middleware'

// Import your Elm Reducer
import Elm from '../build/elm'

const reducer = combineReducers({
  elm: elmReducer
  // ...middlewares
})


// create a worker of your elm reducer
const elmStore = Elm.Reducer.worker();

// create the middleware
const { run, elmMiddleware } = createElmMiddleware(elmStore)

// create the redux store and pass the elmMiddleware
const store = createStore(reducer, {}, compose(
  applyMiddleware(elmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// you need to run the elm middleware and pass the redux store
run(store)
```

#### Elm root reducer

The root reducer from redux-elm-middleware simply takes all actions from your elm reducers and returns the payload as the next state.

The new model returned in your elm reducers update function is dispatched as a new action to the redux store.

f.e.

```js
{
  type: '@@elm/Increment',
  payload: {
    counter: 3
  }
}
```


### Creating a Reducer in Elm

A reducer in elm looks like a normal [TEA](https://github.com/evancz/elm-architecture-tutorial) module without the view.
```elm
port module Reducer exposing (Model, Msg, init, update, subscriptions) -- Name of the module must match the worker


import Redux

-- define ports for all actions which should be handled by the elm reducer
port increment : ({} -> msg) -> Sub msg

-- define all subscriptions of your reducer
subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ increment <| always Increment
        -- ...
        ]

-- In order for the Elm model to cross the border safely it must be encoded as a JSON value.
encode : Model -> Json.Encode.Value
encode model =
    ...

-- MODEL
-- UPDATE

-- START THE REDUCER
main =
    Redux.program
        { init = init
        , update = update
        , encode = encode
        , subscriptions = subscriptions
        }
```


## Motivation

* write bulletproof businesslogic
* handle state and effects
  * pure
  * in one place
  * with a safetynet
* still have the rich react/redux ecosystem at your paws
  * components
  * middlewares
    * routing
    * persistent state (localstorage)
    * offline support
    * ui state ( redux-ui )
* sneak a nice functional language into your projects
* don't have to commit 100% to it
* slowly convert a redux/react app into elm

## Running the Example

* `npm install`
* `npm run example`
* open 127.0.0.1:8080


## Feedback and contributons welcome!
