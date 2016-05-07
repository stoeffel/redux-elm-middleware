# redux-elm-middleware

> Elm middleware for redux :sparkles:

[![Build Status](https://travis-ci.org/stoeffel/redux-elm-middleware.svg?branch=master)](https://travis-ci.org/stoeffel/redux-elm-middleware)
[![codecov](https://codecov.io/gh/stoeffel/redux-elm-middleware/branch/master/graph/badge.svg)](https://codecov.io/gh/stoeffel/redux-elm-middleware)
[![Dependency Status](https://david-dm.org/stoeffel/redux-elm-middleware.svg)](https://david-dm.org/stoeffel/redux-elm-middleware)
[![npm version](https://badge.fury.io/js/redux-elm-middleware.svg)](https://badge.fury.io/js/redux-elm-middleware)

## Usage

Check out [`index.js`](examples/src/index.js) and [`Reducer.elm`](examples/src/Reducer.elm) for now.

```js
import createElmMiddleware from 'redux-elm-middleware'
import { reducer as elmReducer } from 'redux-elm-middleware'

const reducer = combineReducers({
  elm: elmReducer
, routing: routerReducer
})

const elmReducer = window.Elm.worker(window.Elm.Reducer, {
  decrement: null
});

const { run, elmMiddleware } = createElmMiddleware(elmReducer)
const store = createStore(reducer, {}, compose(
  applyMiddleware(elmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
run(store)

```

```elm
port decrement : Signal (Maybe ())

inputs =
    [ Signal.map (always Decrement) decrement
    ]


app =
  StartApp.start
    { init = init 0
    , update = update
    , view = view
    , inputs = inputs
    }


-- OUTBOUND PORTS
-- out is needed for redux-elm-middleware


port out : Signal Model
port out =
  app.model

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

## running the example

The build-process will be simplified soon.

* `npm install`
* build lib `babel src/index.js -o .` (in root)
* `cd ./examples`
* `npm install`
* `elm-make src/Reducer.elm --output build/elm.js`
* `npm run serve`
* open 127.0.0.1:8080

## TODO

- [ ] nicer buildprocess for example
- [x] example with react-router-redux
- [ ] add recipes to readme
- [ ] cleaner/safer middleware
- [ ] add warning if no out port present
- [x] add licence
- [x] greenkeeper
- [x] tests
- [ ] cleanup code and example

## Feedback and contributons welcome!
