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


{-| foo
foo
-}
program :
    { init : ( model, Cmd msg )
    , update : msg -> model -> ( model, Cmd msg )
    , subscriptions : model -> Sub msg
    }
    -> Program Never
program app =
    let
        reducer : a -> ( model, Cmd msg ) -> ( model, Cmd msg )
        reducer action ( m, c ) =
            ( m
            , Cmd.batch [ c, Native.Redux.dispatch action m ]
            )

        wrap fn a m =
            reducer a <| fn a m
    in
        Html.program
            { init = app.init
            , update = wrap app.update
            , subscriptions = app.subscriptions
            , view = view
            }
