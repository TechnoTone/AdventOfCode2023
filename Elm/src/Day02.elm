module Day02 exposing (..)


part1 : String -> Int
part1 input =
    let
        validGame : Game -> Bool
        validGame game =
            game.rounds
                |> List.all
                    (\round ->
                        round.red <= 12 && round.green <= 13 && round.blue <= 14
                    )
    in
    input
        |> String.lines
        |> List.filterMap toGame
        |> List.filter validGame
        |> List.map .id
        |> List.sum


part2 : String -> Int
part2 input =
    input
        |> String.lines
        |> List.filterMap toGame
        |> List.map toGamePower
        |> List.sum


type alias Game =
    { id : Int
    , rounds : List Round
    }


type alias Round =
    { red : Int, green : Int, blue : Int }


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
        |> List.map toRound


toRound : String -> Round
toRound input =
    --3 blue, 4 red
    input
        |> String.split ", "
        |> List.foldl
            (\numberAndCube round ->
                case String.split " " numberAndCube of
                    [ numberStr, cube ] ->
                        String.toInt numberStr
                            |> Maybe.map
                                (\number ->
                                    case cube of
                                        "red" ->
                                            { round | red = number }

                                        "green" ->
                                            { round | green = number }

                                        "blue" ->
                                            { round | blue = number }

                                        _ ->
                                            round
                                )
                            |> Maybe.withDefault round

                    _ ->
                        round
            )
            (Round 0 0 0)


toGamePower : Game -> Int
toGamePower game =
    game.rounds
        |> List.foldl
            (\round acc ->
                Round
                    (max round.red acc.red)
                    (max round.green acc.green)
                    (max round.blue acc.blue)
            )
            (Round 0 0 0)
        |> toRoundPower


toRoundPower : Round -> Int
toRoundPower round =
    round.red * round.green * round.blue
