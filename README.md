# redux-elm-middleware

> Elm middleware for redux :sparkles:

> **NOTE**: This is a forked version of the original package. The reason behind forking is to provide better and faster support for this package, including bug fixes and improvements.

## Installation

You need to install `redux-elm-middleware` for JS and Elm.

```bash
$ npm i -S @cureous/redux-elm-middleware
```

`redux-elm-middleware` is currently only published to npm. You will need to add
the following to your `elm-package.json`:

```json
  "source-directories": [
    ".",
    "node_modules/@cureous/redux-elm-middleware/src",
    ...
  ]
```

## Usage

### Setup Redux Middleware

```js
import createElmMiddleware, { reducer as elmReducer } from '@cureous/redux-elm-middleware';

// Import your Elm Reducer
import Elm from './Reducer.elm';

const reducer = combineReducers({
  elm: elmReducer
  // ...reducers
});

// create a worker of your Elm reducer
const elmStore = Elm.Reducer.worker();

// create the middleware
const { run, elmMiddleware } = createElmMiddleware(elmStore);

// create the Redux store and pass the elmMiddleware
const store = createStore(reducer, {}, compose(
  applyMiddleware(elmMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// you need to run the elm middleware and pass the Redux store
run(store)
```

Since v6.0.0, `redux-elm-middleware` will dispatch actions that correspond to
external ports.

Example:

Using such a port in Reducer:

```elm
port externalCmd : String -> Cmd msg
```

Will result in dispatching the following action:

```json
{
    "type": "@@elm.out/EXTERNAL_CMD",
    "payload": ""
}
```

#### Elm root reducer

The root reducer from `redux-elm-middleware` simply takes all actions from your
elm reducers and returns the payload as the next state.

The new model returned in your elm reducers update function is dispatched as a
new action to the Redux store.

E.g.

```js
{
  type: '@@elm.in/Increment',
  payload: {
    counter: 3
  }
}
```


### Creating a Reducer in Elm

A reducer in Elm looks like a normal [TEA](https://github.com/evancz/elm-architecture-tutorial) module without the view.

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

#### Flags support

In 5.0.0 `programWithFlags` was added and now you can pass down needed flags from JavaScript to your Elm reducer. `programWithFlags` works the same way as Elm works with flags.

Updated version from the example above will be the following:

```js
// create a worker of your elm reducer
// and pass flags to it
const elmStore = Elm.Reducer.worker({
    bar: 'baz'
});
```

```elm
type alias Flags =
    { bar : String }

type alias Model =
    { foo: String }

init : Flags -> ( Model, Cmd Msg )
init { bar } =
    ({ foo = bar }, Cmd.none)

main =
    Redux.programWithFlags
        { init = init
        , update = update
        , encode = encode
        , subscriptions = subscriptions
        }
```

## Running the Example

> **NOTE**: Example is not fully updated to show all features of the forked
version.

* `npm install`
* `npm run example`
* open 127.0.0.1:8080


## Feedback and contributons welcome!
