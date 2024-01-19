module Day11 exposing (..)

import List.Extra as List
import Set exposing (Set)



-- part1 : String -> Int


part1 input =
    input
        |> getParsedInput
        |> getGalaxyDistancesWithExpansionFactor 2
        |> List.sum


part2 : String -> Int
part2 input =
    input
        |> getParsedInput
        |> getGalaxyDistancesWithExpansionFactor 1000000
        |> List.sum


type alias Coordinate =
    ( Int, Int )


type alias ParsedInput =
    { galaxies : List Coordinate
    , emptyRows : List Int
    , emptyColumns : List Int
    }


getParsedInput : String -> ParsedInput
getParsedInput input =
    let
        lines : List ( Int, String )
        lines =
            String.lines input |> List.indexedMap Tuple.pair

        width : Int
        width =
            List.head lines |> Maybe.map (Tuple.second >> String.length) |> Maybe.withDefault 0

        ( galaxies, emptyRows ) =
            lines
                |> List.foldl
                    (\( y, line ) acc ->
                        let
                            rowGalaxies =
                                line
                                    |> String.toList
                                    |> List.indexedMap Tuple.pair
                                    |> List.filterMap
                                        (\( x, char ) ->
                                            case char of
                                                '#' ->
                                                    Just ( x, y )

                                                _ ->
                                                    Nothing
                                        )
                        in
                        case rowGalaxies of
                            [] ->
                                acc |> Tuple.mapSecond (\rest -> rest ++ [ y ])

                            _ ->
                                acc |> Tuple.mapFirst (\rest -> rest ++ rowGalaxies)
                    )
                    ( [], [] )

        emptyColumns : List Int
        emptyColumns =
            let
                occupiedColumns : Set Int
                occupiedColumns =
                    galaxies
                        |> List.map Tuple.first
                        |> Set.fromList
            in
            List.range 0 (width - 1)
                |> List.filter
                    (\x -> not (Set.member x occupiedColumns))
    in
    ParsedInput
        galaxies
        emptyRows
        emptyColumns


getGalaxyDistancesWithExpansionFactor : Int -> ParsedInput -> List Int
getGalaxyDistancesWithExpansionFactor expansionFactor { galaxies, emptyRows, emptyColumns } =
    let
        galaxyPairs : List ( Coordinate, Coordinate )
        galaxyPairs =
            List.uniquePairs galaxies

        getExpansions : ( Coordinate, Coordinate ) -> Int
        getExpansions ( ( x1, y1 ), ( x2, y2 ) ) =
            (emptyColumns |> List.count (between x1 x2))
                + (emptyRows |> List.count (between y1 y2))

        distances : List Int
        distances =
            galaxyPairs
                |> List.map
                    (\pair -> getDistance pair + ((expansionFactor - 1) * getExpansions pair))
    in
    distances


getDistance : ( Coordinate, Coordinate ) -> Int
getDistance ( ( x1, y1 ), ( x2, y2 ) ) =
    abs (x1 - x2) + abs (y1 - y2)


between : Int -> Int -> Int -> Bool
between start end value =
    min start end < value && max start end > value
