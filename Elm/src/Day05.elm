module Day05 exposing (..)


part1 : String -> Int
part1 input =
    let
        applyMappings : List RangeTransformation -> List Int -> List Int
        applyMappings mappings seeds =
            seeds
                |> List.map (mapSeed mappings)

        mapSeed : List RangeTransformation -> Int -> Int
        mapSeed rangeTransformations seed =
            rangeTransformations
                |> List.filter (seedInRange seed)
                |> List.head
                |> Maybe.map (.transformation >> (+) seed)
                |> Maybe.withDefault seed
    in
    getMaps input
        |> List.foldl applyMappings (getSimpleSeeds input)
        |> List.minimum
        |> Maybe.withDefault 0


part2 : String -> Int
part2 input =
    0


type alias RangeTransformation =
    { start : Int
    , length : Int
    , transformation : Int
    }


seedInRange : Int -> RangeTransformation -> Bool
seedInRange seed tx =
    tx.start <= seed && seed < tx.start + tx.length


getSimpleSeeds : String -> List Int
getSimpleSeeds input =
    String.lines input
        |> List.head
        |> Maybe.withDefault ""
        |> String.split " "
        |> List.filterMap String.toInt


getMaps : String -> List (List RangeTransformation)
getMaps input =
    case String.split "\n\n" input of
        _ :: sections ->
            sections
                |> List.map getMap

        _ ->
            []


getMap : String -> List RangeTransformation
getMap input =
    case String.lines input of
        _ :: rows ->
            rows
                |> List.filterMap getMapping

        _ ->
            []


getMapping : String -> Maybe RangeTransformation
getMapping input =
    case input |> String.split " " |> List.filterMap String.toInt of
        [ destination, source, length ] ->
            Just <| RangeTransformation source length (destination - source)

        _ ->
            Nothing
