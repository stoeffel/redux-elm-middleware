module Store (..) where

import Effects exposing (Effects, Never)
import Task exposing (..)
import Html exposing (div)
import Time exposing (..)
import Maybe
import StartApp


port increment : Signal (Maybe ())
port asyncIncrement : Signal (Maybe ())
port decrement : Signal (Maybe ())
port changeCount : Signal Payload
clock : Signal Time
clock =
    every second


events =
    Signal.mergeMany
        [ Signal.map (always Decrement) decrement
        , Signal.map (always Increment) increment
        , Signal.map (always AsyncIncrement) asyncIncrement
        , Signal.map ChangeCount changeCount
        , Signal.map (always TickTock) clock
        ]



-- MODEL


init : Int -> ( Model, Effects Action )
init value =
    ( { value = value, count = 1, tickTock = "TICK" }, Effects.none )


type alias Model =
    { value : Int
    , count : Int
    , tickTock : String
    }


type alias Payload =
    Int



-- ACTIONS


type Action
    = NoOp
    | TickTock
    | Increment
    | Decrement
    | AsyncIncrement
    | ChangeCount Payload



-- UPDATE


update : Action -> Model -> ( Model, Effects Action )
update action model =
    case action of
        Increment ->
            ( { model | value = model.value + model.count }, Effects.none )

        Decrement ->
            ( { model | value = model.value - model.count }, Effects.none )

        AsyncIncrement ->
            ( model, Effects.task (asyncIncTask model.count) )

        ChangeCount payload ->
            ( { model | count = payload }, Effects.none )

        TickTock ->
            (case model.tickTock of
                "TICK" ->
                    ( { model | tickTock = "TOCK" }, Effects.none )

                "TOCK" ->
                    ( { model | tickTock = "TICK" }, Effects.none )

                _ ->
                    ( model, Effects.none )
            )

        NoOp ->
            ( model, Effects.none )


asyncIncTask payload =
    Task.sleep (5 * Time.second)
        `andThen` (\_ -> Task.succeed Increment)



-- START STORE
-- fake view needed for startapp


view address model =
    div [] []


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


port tasks : Signal (Task.Task Never ())
port tasks =
    app.tasks
