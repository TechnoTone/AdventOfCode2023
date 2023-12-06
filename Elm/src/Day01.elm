module Day01 exposing (..)

import Dict exposing (Dict)


part1 : String -> Int
part1 input =
    input
        |> String.lines
        |> List.filterMap toCalibrationValue
        |> List.sum


toCalibrationValue : String -> Maybe Int
toCalibrationValue input =
    let
        digits : String
        digits =
            input
                |> String.filter Char.isDigit
    in
    String.left 1 digits
        ++ String.right 1 digits
        |> String.toInt


part2 input =
    input
        |> String.lines
        |> List.filterMap toCalibrationValueIncludingWords
        |> List.sum


toCalibrationValueIncludingWords : String -> Maybe Int
toCalibrationValueIncludingWords input =
    case
        [ getFirstDigitWord input
        , getLastDigitWord input
        ]
            |> List.filterMap (\digit -> Dict.get digit digitDictionary)
    of
        [ a, b ] ->
            Just (a * 10 + b)

        _ ->
            Nothing


getFirstDigitWord : String -> String
getFirstDigitWord input =
    if input == "" then
        ""

    else
        digitWords
            |> List.filter (\word -> String.startsWith word input)
            |> List.head
            |> Maybe.withDefault
                (getFirstDigitWord (String.right (String.length input - 1) input))


getLastDigitWord : String -> String
getLastDigitWord input =
    if input == "" then
        ""

    else
        digitWords
            |> List.filter (\word -> String.endsWith word input)
            |> List.head
            |> Maybe.withDefault
                (getLastDigitWord (String.left (String.length input - 1) input))


digitDictionary : Dict String Int
digitDictionary =
    Dict.fromList
        [ ( "one", 1 )
        , ( "two", 2 )
        , ( "three", 3 )
        , ( "four", 4 )
        , ( "five", 5 )
        , ( "six", 6 )
        , ( "seven", 7 )
        , ( "eight", 8 )
        , ( "nine", 9 )
        , ( "1", 1 )
        , ( "2", 2 )
        , ( "3", 3 )
        , ( "4", 4 )
        , ( "5", 5 )
        , ( "6", 6 )
        , ( "7", 7 )
        , ( "8", 8 )
        , ( "9", 9 )
        ]


digitWords : List String
digitWords =
    Dict.keys digitDictionary
