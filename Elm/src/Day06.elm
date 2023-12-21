module Day06 exposing (..)

import List.Extra as List


part1 : String -> Int
part1 input =
    let
        parseLine : String -> List Int
        parseLine line =
            line
                |> String.split " "
                |> List.filterMap String.toInt
    in
    input
        |> parseInput parseLine
        |> List.map countWins
        |> List.product


part2 : String -> Int
part2 input =
    let
        parseLine : String -> List Int
        parseLine line =
            line
                |> String.split ":"
                |> List.reverse
                |> List.head
                |> Maybe.map (String.replace " " "")
                |> Maybe.andThen String.toInt
                |> Maybe.withDefault 0
                |> List.singleton
    in
    input
        |> parseInput parseLine
        |> List.head
        |> Maybe.map countWins
        |> Maybe.withDefault 0


parseInput : (String -> List Int) -> String -> List ( Int, Int )
parseInput lineParser input =
    case String.lines input of
        [ a, b ] ->
            List.zip (lineParser a) (lineParser b)

        _ ->
            []


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
            (-b - sqrt discriminant) / (2 * a)

        x2 =
            (-b + sqrt discriminant) / (2 * a)

        lower =
            if (round x1 |> toFloat) == x1 then
                ceiling x1 + 1

            else
                ceiling x1

        upper =
            if (round x2 |> toFloat) == x2 then
                floor x2 - 1

            else
                floor x2
    in
    upper - lower + 1
