module Day02 exposing (..)


part1 : String -> Int
part1 input =
    0


part2 : String -> Int
part2 input =
    0


toGame : String -> Maybe Game
toGame input =
    --Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    case String.split ": " input of
        [ game, rounds ] ->
            case game |> String.split " " |> List.filterMap String.toInt of
                [ id ] ->
                    Just (Game id (toRounds rounds))

                _ ->
                    Nothing

        _ ->
            Nothing


toRounds : String -> List Round
toRounds input =
    --3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    input
        |> String.split "; "
        |> List.filterMap toRound


type alias Game =
    { id : Int
    , rounds : List Round
    }


type alias Round =
    List CubeNumberAndColor


type alias CubeNumberAndColor =
    { number : Int
    , color : String
    }
