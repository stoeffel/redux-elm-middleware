port module Redux exposing (program, reducer)

import Html exposing (div)
import Html.App as Html


view : model -> Html.Html msg
view model =
    div [] []


program app =
    Html.program
        { init = app.init
        , update = app.update
        , subscriptions = app.subscriptions
        , view = view
        }


reducer : (model -> Cmd msg) -> ( model, Cmd msg ) -> ( model, Cmd msg )
reducer out ( m, c ) =
    ( m
    , Cmd.batch [ c, out m ]
    )
