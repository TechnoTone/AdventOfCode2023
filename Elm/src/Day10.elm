module Day10 exposing (..)

import Dict exposing (Dict)
import Set exposing (Set)



-- part1 : String -> Int


part1 input =
    input
        |> parsePipeDiagram
        -- PipeDiagram
        |> toTuple findStartCoordinate
        -- (PipeDiagram, Coordinate)
        |> toTuple traversePipes


part2 : String -> Int
part2 input =
    0


type alias Coordinate =
    ( Int, Int )


type Pipe
    = Horizontal
    | Vertical
    | TopLeft
    | TopRight
    | BottomLeft
    | BottomRight
    | Start
    | Ground


type alias PipeDiagram =
    Dict Coordinate Pipe



-- type alias State =
--     { originalPipeDiagram : PipeDiagram
--     , startCoordinate : Maybe Coordinate
--     }


parsePipeDiagram : String -> PipeDiagram
parsePipeDiagram input =
    input
        |> String.lines
        |> List.indexedMap
            (\y row ->
                row
                    |> String.toList
                    |> List.indexedMap
                        (\x char ->
                            ( ( x, y ), toPipe char )
                        )
            )
        |> List.concat
        |> Dict.fromList


toPipe : Char -> Pipe
toPipe char =
    case char of
        '-' ->
            Horizontal

        '|' ->
            Vertical

        'F' ->
            TopLeft

        '7' ->
            TopRight

        'L' ->
            BottomLeft

        'J' ->
            BottomRight

        '.' ->
            Ground

        'S' ->
            Start

        _ ->
            Debug.todo <| "toPipe failed with char: " ++ String.fromChar char


findStartCoordinate : PipeDiagram -> Coordinate
findStartCoordinate pipeDiagram =
    pipeDiagram
        |> Dict.toList
        |> List.filterMap
            (\( coordinate, pipe ) ->
                if pipe == Start then
                    Just coordinate

                else
                    Nothing
            )
        |> List.head
        |> Maybe.withDefault ( 0, 0 )


traversePipes : ( PipeDiagram, Coordinate ) -> Dict Coordinate Pipe
traversePipes ( pipeDiagram, start ) =
    let
        startPipe =
            getStartPipe pipeDiagram start
    in
    Dict.fromList [ ( start, startPipe ) ]


getStartPipe : PipeDiagram -> Coordinate -> Pipe
getStartPipe pipeDiagram ( x, y ) =
    let
        get x1 y1 =
            Dict.get ( x1, y1 ) pipeDiagram
    in
    if Set.member (get x y - 1) [ Vertical, TopLeft, TopRight ] then
        Vertical

    else if Set.member (get x y + 1) [ Vertical, BottomLeft, BottomRight ] then
        Vertical

    else if Set.member (get x - 1 y) [ Horizontal, TopLeft, BottomLeft ] then
        Horizontal

    else if Set.member (get x + 1 y) [ Horizontal, TopLeft, BottomLeft ] then
        Horizontal

    else if Set.member (get x - 1 y - 1) [ TopRight, BottomLeft ] then
        TopRight

    else if Set.member (get x + 1 y - 1) [ TopLeft, BottomRight ] then
        TopLeft

    else if Set.member (get x - 1 y + 1) [ BottomRight, TopLeft ] then
        BottomRight

    else if Set.member (get x + 1 y + 1) [ BottomLeft, TopRight ] then
        BottomLeft

    else
        Debug.todo "getStartPipe failed"


toTuple : (a -> b) -> a -> ( a, b )
toTuple f a =
    ( a, f a )
