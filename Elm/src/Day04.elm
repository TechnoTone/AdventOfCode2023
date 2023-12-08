module Day04 exposing (..)

import Day04Input exposing (input)
import Set exposing (Set)


part1 : String -> Int
part1 input =
    input
        |> String.lines
        |> List.map countWinningNumbers
        |> List.map toCardScore
        |> List.sum


part2 : String -> Int
part2 input =
    input
        |> String.lines
        |> List.map countWinningNumbers
        |> List.map (Tuple.pair 1)
        |> countCards


countWinningNumbers : String -> Int
countWinningNumbers input =
    input
        |> getNumberSets
        |> getIntersects
        |> Set.size


getNumberSets : String -> List (Set Int)
getNumberSets input =
    input
        |> String.split ":"
        |> List.reverse
        |> List.head
        |> Maybe.withDefault ""
        |> String.trim
        |> String.split " | "
        |> List.map getNumberSet


getNumberSet : String -> Set.Set Int
getNumberSet input =
    input
        |> String.split " "
        |> List.filter (String.isEmpty >> not)
        |> List.filterMap String.toInt
        |> Set.fromList


getIntersects : List (Set.Set Int) -> Set.Set Int
getIntersects numberSets =
    case numberSets of
        [ a, b ] ->
            Set.intersect a b

        _ ->
            Set.empty


toCardScore : Int -> Int
toCardScore count =
    if count == 0 then
        0

    else
        2 ^ (count - 1)


countCards : List ( Int, Int ) -> Int
countCards cards =
    case cards of
        [] ->
            0

        ( multiple, wins ) :: rest ->
            rest
                |> List.indexedMap
                    (\i ( m, w ) ->
                        if i < wins then
                            ( m + multiple, w )

                        else
                            ( m, w )
                    )
                |> countCards
                |> (+) multiple
