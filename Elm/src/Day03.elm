module Day03 exposing (..)

import Parser exposing (number)
import Set exposing (Set)


part1 : String -> Int
part1 input =
    input
        |> getPartNumbers
        |> List.filter (isAdjacentToSymbol (getSymbolCoordinates input))
        |> List.map .number
        |> List.sum


isAdjacentToSymbol : Set Symbol -> PartNumber -> Bool
isAdjacentToSymbol symbols partnumber =
    let
        surroundings =
            getPartNumberSurroundings partnumber
    in
    symbols
        |> Set.map Tuple.first
        |> Set.intersect surroundings
        |> Set.isEmpty
        |> not


part2 : String -> Int
part2 input =
    0


type alias Symbol =
    ( Coordinate, Char )


type alias PartNumber =
    { number : Int
    , coordinate : Coordinate
    }


type alias Coordinate =
    ( Int, Int )


reduceLines : (Int -> String -> List a) -> String -> List a
reduceLines reducer input =
    input
        |> String.lines
        |> List.indexedMap reducer
        |> List.concat


getSymbolCoordinates : String -> Set Symbol
getSymbolCoordinates =
    reduceLines getSymbolCoordinatesFromLine
        >> Set.fromList


getSymbolCoordinatesFromLine : Int -> String -> List Symbol
getSymbolCoordinatesFromLine y line =
    line
        |> String.toList
        |> List.indexedMap (\x char -> ( ( x, y ), char ))
        |> List.filter (\( _, char ) -> char /= '.' && not (Char.isDigit char))


getPartNumbers : String -> List PartNumber
getPartNumbers =
    reduceLines getPartNumbersFromLine


getPartNumbersFromLine : Int -> String -> List PartNumber
getPartNumbersFromLine y line =
    --ensure all lines end in a dot so that all numbers are followed by a dot
    --this is to cater for when a number is at the end of a line
    (line ++ ".")
        |> String.toList
        |> List.indexedMap Tuple.pair
        |> List.foldl (updatePartNumbersFound y) ( Nothing, [] )
        |> Tuple.second


updatePartNumbersFound :
    Int
    -> ( Int, Char )
    -> ( Maybe ( Int, Coordinate ), List PartNumber )
    -> ( Maybe ( Int, Coordinate ), List PartNumber )
updatePartNumbersFound y =
    \( x, char ) ( nextNumber, partNumbers ) ->
        case ( nextNumber, char |> String.fromChar |> String.toInt ) of
            ( Just ( number, coordinate ), Just digit ) ->
                ( Just ( number * 10 + digit, coordinate ), partNumbers )

            ( Nothing, Just digit ) ->
                ( Just ( digit, ( x, y ) ), partNumbers )

            ( Just ( number, coordinate ), Nothing ) ->
                ( Nothing, List.append partNumbers [ PartNumber number coordinate ] )

            ( Nothing, Nothing ) ->
                ( Nothing, partNumbers )


getPartNumberSurroundings : PartNumber -> Set Coordinate
getPartNumberSurroundings partNumber =
    let
        ( left, y ) =
            partNumber.coordinate

        length =
            partNumber.number |> String.fromInt |> String.length
    in
    List.concat
        [ List.range (left - 1) (left + length)
            |> List.map (\x -> ( x, y - 1 ))
        , List.range (left - 1) (left + length)
            |> List.map (\x -> ( x, y + 1 ))
        , [ ( left - 1, y ), ( left + length, y ) ]
        ]
        |> Set.fromList
