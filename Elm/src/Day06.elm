module Day06 exposing (..)

import List.Extra as List



-- part1 : String -> Int


part1 input =
    input
        |> parseInput
        |> List.map countWins


part2 : String -> Int
part2 input =
    0


parseInput : String -> List ( Int, Int )
parseInput input =
    case String.lines input of
        [ a, b ] ->
            List.zip (parseLine a) (parseLine b)

        _ ->
            []


parseLine : String -> List Int
parseLine line =
    line
        |> String.split " "
        |> List.filterMap String.toInt


countWins : ( Int, Int ) -> Int
countWins ( t, d ) =
    let
        a =
            toFloat 1

        b =
            toFloat -t

        c =
            toFloat d

        discriminant =
            b * b - 4 * a * c

        x1 =
            Debug.log "x1" <|
                (-b - sqrt discriminant)
                    / (2 * a)

        x2 =
            Debug.log "x2" <|
                (-b + sqrt discriminant)
                    / (2 * a)

        lower =
            ceiling x1

        upper =
            floor x2
    in
    upper - lower + 1
