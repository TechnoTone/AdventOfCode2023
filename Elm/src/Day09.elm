module Day09 exposing (..)

import Array


part1 : String -> Int
part1 input =
    input
        |> String.lines
        |> List.map toNumberSequence
        |> List.map getNextNumberInSequence
        |> List.sum


part2 : String -> Int
part2 input =
    0


toNumberSequence : String -> List Int
toNumberSequence input =
    input
        |> String.split " "
        |> List.filterMap String.toInt


getNextNumberInSequence : List Int -> Int
getNextNumberInSequence sequence =
    if List.all ((==) 0) sequence then
        0

    else
        sequence
            |> List.reverse
            |> List.head
            |> Maybe.withDefault 0
            |> (+) (getNextNumberInSequence (getListDifferences sequence))


getListDifferences : List Int -> List Int
getListDifferences sequence =
    let
        arr =
            Array.fromList sequence

        foo : Maybe Int -> Maybe Int -> Maybe Int
        foo a b =
            Maybe.map2 (-) b a

        bar : Int -> Maybe Int
        bar ix =
            foo (Array.get ix arr) (Array.get (ix + 1) arr)
    in
    sequence
        |> List.indexedMap (\ix _ -> bar ix)
        |> List.filterMap identity



-- |> List.indexedMap (\(ix _) -> Maybe.withDefault 0 (Array.get ix arr) - Maybe.withDefault 0 (Array.get (ix + 1) arr))
