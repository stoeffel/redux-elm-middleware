module Redux exposing (program)

{-| Redux elm middleware
@docs program
-}

import Html exposing (div)
import Html.App as Html
import Native.Redux


view : model -> Html.Html msg
view model =
    div [] []


{-| Creates a [Program](http://package.elm-lang.org/packages/elm-lang/core/4.0.0/Platform#Program) that defines how your reducer works. This is a convinient wrapper arround [Html.App.programm](http://package.elm-lang.org/packages/elm-lang/html/1.0.0/Html-App#program).
    main = Redux.program(
        { init = init
        , update = update
        , subscriptions
        })
-}
program :
    { init : ( model, Cmd msg )
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program Never
program app =
    let
        reducer :
            action
            -> ( model, Cmd msg )
            -> ( model, Cmd msg )
        reducer action ( message, cmd ) =
            ( message
            , Cmd.batch [ cmd, Native.Redux.dispatch action message ]
            )

        wrap :
            (action -> model -> ( model, Cmd msg ))
            -> action
            -> model
            -> ( model, Cmd msg )
        wrap update msg model =
            reducer msg <| update msg model
    in
        Html.program
            { init = app.init
            , update = wrap app.update
            , subscriptions = app.subscriptions
            , view = view
            }
