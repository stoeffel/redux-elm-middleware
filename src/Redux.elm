port module Redux exposing (program)

{-| Redux elm middleware
@docs program
-}

import Html exposing (div)
import Html.App as Html
import Json.Encode as Json

view : model -> Html.Html msg
view model =
    div [] []

port elmToRedux : (String, Json.Value) -> Cmd msg


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
    , encode : model -> Json.Value
    , subscriptions : model -> Sub msg
    }
    -> Program Never
program app =
    let
        reducer action ( message, cmd ) =
            ( message
            , Cmd.batch
                [ cmd
                , ( toString action
                  , app.encode message
                  ) |> elmToRedux
                ]
            )

        wrap update msg model =
            reducer msg <| update msg model
    in
        Html.program
            { init = app.init
            , update = wrap app.update
            , subscriptions = app.subscriptions
            , view = view
            }
