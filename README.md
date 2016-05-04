# Experimental !!! WIP !!!

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

## Feedback and contributons welcome!
