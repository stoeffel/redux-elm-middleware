# redux-elm-middleware

> Elm middleware for redux :sparkles:

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

* build lib `babel src/index.js -o .` (in root)
* `cd ./examples`
* `npm install`
* `npm run build:dev`
* `elm-make src/store.elm --output build/elm.js`
* open build/index.html in a browser

## TODO

- [ ] nicer buildprocess
- [ ] example with react-router-redux and redux-ui
- [ ] add recipe to readme
- [ ] publish middleware
- [ ] add licence
- [ ] greenkeeper
- [ ] tests
