module Day10 exposing (..)

import Dict exposing (Dict)


part1 : String -> Int
part1 input =
    input
        |> parsePipeDiagram
        |> explorerPipeLoop
        |> Dict.size
        |> (\n -> n // 2)


part2 : String -> Int
part2 input =
    input
        |> parsePipeDiagram
        |> toTuple explorerPipeLoop
        |> Tuple.mapFirst Tuple.first
        |> toPipeLoopDiagram
        |> countInsideGroundLocations


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


parsePipeDiagram : String -> ( PipeDiagram, Coordinate )
parsePipeDiagram input =
    let
        ( parsedInput, startCoordinate ) =
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
                |> toTuple findStartCoordinate
    in
    ( replaceStartPipe parsedInput startCoordinate
    , startCoordinate
    )


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


getStartPipe : PipeDiagram -> Coordinate -> Pipe
getStartPipe pipeDiagram ( x, y ) =
    let
        getPipeAt : Int -> Int -> Pipe
        getPipeAt dx dy =
            Dict.get ( x + dx, y + dy ) pipeDiagram |> Maybe.withDefault Ground

        up =
            [ Vertical, TopLeft, TopRight ]
                |> List.member (getPipeAt 0 -1)

        down =
            [ Vertical, BottomLeft, BottomRight ]
                |> List.member (getPipeAt 0 1)

        left =
            [ Horizontal, TopLeft, BottomLeft ]
                |> List.member (getPipeAt -1 0)

        right =
            [ Horizontal, TopRight, BottomRight ]
                |> List.member (getPipeAt 1 0)
    in
    case [ up, left, down, right ] of
        [ True, True, False, False ] ->
            BottomRight

        [ True, False, True, False ] ->
            Vertical

        [ True, False, False, True ] ->
            BottomLeft

        [ False, True, True, False ] ->
            TopRight

        [ False, True, False, True ] ->
            Horizontal

        [ False, False, True, True ] ->
            TopLeft

        _ ->
            Start


replaceStartPipe : PipeDiagram -> Coordinate -> PipeDiagram
replaceStartPipe pipeDiagram startCoordinate =
    pipeDiagram
        |> Dict.insert startCoordinate (getStartPipe pipeDiagram startCoordinate)


explorerPipeLoop : ( PipeDiagram, Coordinate ) -> Dict Coordinate Pipe
explorerPipeLoop ( pipeDiagram, start ) =
    let
        getPipeAt : ( Int, Int ) -> Pipe
        getPipeAt coordinate =
            Dict.get coordinate pipeDiagram |> Maybe.withDefault Ground

        step : List Coordinate -> Dict Coordinate Pipe -> Dict Coordinate Pipe
        step locations loop =
            case locations of
                [] ->
                    loop

                location :: rest ->
                    if Dict.member location loop then
                        step rest loop

                    else
                        case getPipeAt location of
                            Horizontal ->
                                step
                                    (rest
                                        ++ [ Tuple.mapFirst add1 location
                                           , Tuple.mapFirst subtract1 location
                                           ]
                                    )
                                    (Dict.insert location Horizontal loop)

                            Vertical ->
                                step
                                    (rest
                                        ++ [ Tuple.mapSecond add1 location
                                           , Tuple.mapSecond subtract1 location
                                           ]
                                    )
                                    (Dict.insert location Vertical loop)

                            TopLeft ->
                                step
                                    (rest
                                        ++ [ Tuple.mapFirst add1 location
                                           , Tuple.mapSecond add1 location
                                           ]
                                    )
                                    (Dict.insert location TopLeft loop)

                            TopRight ->
                                step
                                    (rest
                                        ++ [ Tuple.mapFirst subtract1 location
                                           , Tuple.mapSecond add1 location
                                           ]
                                    )
                                    (Dict.insert location TopRight loop)

                            BottomLeft ->
                                step
                                    (rest
                                        ++ [ Tuple.mapFirst add1 location
                                           , Tuple.mapSecond subtract1 location
                                           ]
                                    )
                                    (Dict.insert location BottomLeft loop)

                            BottomRight ->
                                step
                                    (rest
                                        ++ [ Tuple.mapFirst subtract1 location
                                           , Tuple.mapSecond subtract1 location
                                           ]
                                    )
                                    (Dict.insert location BottomRight loop)

                            Ground ->
                                step rest loop

                            _ ->
                                step rest loop
    in
    step [ start ] Dict.empty


toPipeLoopDiagram : ( PipeDiagram, Dict Coordinate Pipe ) -> PipeDiagram
toPipeLoopDiagram ( pipeDiagram, loop ) =
    pipeDiagram
        |> Dict.filter
            (\coordinate _ ->
                Dict.member coordinate loop
            )


countInsideGroundLocations : PipeDiagram -> Int
countInsideGroundLocations pipeDiagram =
    let
        ( width, height ) =
            pipeDiagram
                |> Dict.keys
                |> List.foldl
                    (\( x, y ) ( maxX, maxY ) ->
                        ( max x maxX, max y maxY )
                    )
                    ( 0, 0 )

        getPipeAt : ( Int, Int ) -> Pipe
        getPipeAt coordinate =
            Dict.get coordinate pipeDiagram |> Maybe.withDefault Ground

        foldFn : Coordinate -> ( Int, ( Bool, Maybe Pipe ) ) -> ( Int, ( Bool, Maybe Pipe ) )
        foldFn coordinate ( count, ( inside, lastCorner ) ) =
            case ( getPipeAt coordinate, ( inside, lastCorner ) ) of
                ( Ground, ( True, _ ) ) ->
                    ( count + 1, ( inside, lastCorner ) )

                ( Ground, ( False, _ ) ) ->
                    ( count, ( inside, lastCorner ) )

                ( Horizontal, _ ) ->
                    ( count, ( inside, lastCorner ) )

                ( Vertical, _ ) ->
                    ( count, ( not inside, Nothing ) )

                ( TopLeft, _ ) ->
                    ( count, ( inside, Just TopLeft ) )

                ( BottomLeft, _ ) ->
                    ( count, ( inside, Just BottomLeft ) )

                ( TopRight, ( _, Just TopLeft ) ) ->
                    ( count, ( inside, Nothing ) )

                ( TopRight, ( _, Just BottomLeft ) ) ->
                    ( count, ( not inside, Nothing ) )

                ( TopRight, _ ) ->
                    ( count, ( inside, Nothing ) )

                ( BottomRight, ( _, Just BottomLeft ) ) ->
                    ( count, ( inside, Nothing ) )

                ( BottomRight, ( _, Just TopLeft ) ) ->
                    ( count, ( not inside, Nothing ) )

                ( BottomRight, _ ) ->
                    ( count, ( inside, Nothing ) )

                ( Start, _ ) ->
                    ( count, ( inside, Nothing ) )
    in
    List.range 0 height
        |> List.map
            (\y ->
                List.range 0 width
                    |> List.map (\x -> ( x, y ))
                    |> List.foldl foldFn ( 0, ( False, Nothing ) )
                    |> Tuple.first
            )
        |> List.sum


add1 : Int -> Int
add1 a =
    a + 1


subtract1 : Int -> Int
subtract1 a =
    a - 1


toTuple : (a -> b) -> a -> ( a, b )
toTuple f a =
    ( a, f a )
