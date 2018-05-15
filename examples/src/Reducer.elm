port module Reducer exposing (Model, Msg)

import Redux
import Task exposing (..)
import Process
import Time exposing (..)
import Json.Encode exposing (..)
import Json.Decode exposing (..)


{-| the Elm middleware will transform the action.type-s to camel case
Ex with an action like :
{ type : "ASYNC_INCREMENT" }
will be sent to the "asyncIncrement" port
-}
port increment : (Json.Encode.Value -> msg) -> Sub msg


port asyncIncrement : (Json.Encode.Value -> msg) -> Sub msg


port asyncDecrement : (Json.Encode.Value -> msg) -> Sub msg


port decrement : (Json.Encode.Value -> msg) -> Sub msg


type alias Model =
    { modelValue : Int
    , modelCount : Int
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ decrement <| always Decrement
        , increment <| always Increment
        , asyncIncrement <| always AsyncIncrement
        , asyncDecrement <| always AsyncDecrement
        ]



-- MODEL


type alias ReduxModel =
    { value : Int
    , count : Int
    }


fallBackModel =
    { modelCount = 1000, modelValue = 3 }


init : Json.Decode.Value -> ( Model, Cmd Msg )
init flags =
    case Json.Decode.decodeValue flagsDecoder flags of
        Ok f ->
            ( reduxToModel f, Cmd.none )

        Err err ->
            Debug.log ("Error parsing flag, falling back to default value => " ++ toString flags ++ err)
                ( fallBackModel, Cmd.none )


flagsDecoder : Json.Decode.Decoder ReduxModel
flagsDecoder =
    Json.Decode.map2 ReduxModel
        (field "value" Json.Decode.int)
        (field "count" Json.Decode.int)


reduxToModel : ReduxModel -> Model
reduxToModel reduxModel =
    { modelValue = reduxModel.value
    , modelCount = reduxModel.count
    }


modelToRedux : Model -> Json.Encode.Value
modelToRedux { modelValue, modelCount } =
    object
        [ ( "value", Json.Encode.int modelValue )
        , ( "count", Json.Encode.int modelCount )
        , ( "randomStuff", Json.Encode.int modelCount )
        ]



-- ACTIONS


type Msg
    = NoOp
    | Increment
    | Decrement
    | AsyncIncrement
    | AsyncDecrement



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case action of
        Increment ->
            ( { model | modelValue = model.modelValue + model.modelCount }, Cmd.none )

        Decrement ->
            ( { model | modelValue = model.modelValue - model.modelCount }, Cmd.none )

        AsyncIncrement ->
            ( model, asyncTask Increment )

        AsyncDecrement ->
            ( model, asyncTask Decrement )

        NoOp ->
            ( model, Cmd.none )


asyncTask : Msg -> Cmd Msg
asyncTask msg =
    Process.sleep (Time.second)
        |> Task.perform (always msg)


main =
    Redux.programWithFlags
        { init = init
        , update = update
        , encode = modelToRedux
        , subscriptions = subscriptions
        }
