# Experimental !!! WIP !!!

# redux-elm-middleware

> Elm middleware for redux :sparkles:

## Usage

Check out [`index.js`](examples/src/index.js) and [`store.elm`](examples/src/store.elm) for now.

```js
import createElmMiddleware from 'redux-elm-middleware'
import { reducer as elmReducer } from 'redux-elm-middleware'

const reducer = combineReducers({
  elm: elmReducer
, routing: routerReducer
})

const elmStore = window.Elm.worker(window.Elm.Store, {
  decrement: null
});

const { run, elmMiddleware } = createElmMiddleware(elmStore)
const store = createStore(reducer, {}, compose(
  applyMiddleware(elmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
run(store)

```

```elm
port decrement : Signal (Maybe ())

events =
  Signal.mergeMany
    [ Signal.map (always Decrement) decrement
    ]


app =
  StartApp.start
    { init = init 0
    , update = update
    , view = view
    , inputs =
        [ events
        ]
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
* `elm-make src/store.elm --output build/elm.js`
* `npm run serve`
* open 127.0.0.1:8080

## TODO

- [ ] nicer buildprocess
- [x] example with react-router-redux
- [ ] example with redux-ui
- [ ] add recipe to readme
- [ ] cleaner/safer middleware
- [ ] add licence
- [ ] greenkeeper
- [ ] tests
- [ ] cleanup code and example

## Feedback and contributons welcome!
