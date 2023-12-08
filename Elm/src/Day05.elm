module Day05 exposing (..)


part1 : String -> Int
part1 input =
    getMaps input
        |> List.foldl applyMappings (getSeeds input)
        |> List.minimum
        |> Maybe.withDefault 0


part2 : String -> Int
part2 input =
    0


applyMappings : List Mapping -> List Int -> List Int
applyMappings mappings seeds =
    seeds
        |> List.map (mapSeed mappings)


mapSeed : List Mapping -> Int -> Int
mapSeed mappings seed =
    mappings
        |> List.filter (\mapping -> mapping.start <= seed && seed < mapping.start + mapping.length)
        |> List.head
        |> Maybe.withDefault (Mapping 0 0 0)
        |> (\mapping -> seed + mapping.adjustment)


type alias Mapping =
    { start : Int
    , length : Int
    , adjustment : Int
    }


getSeeds : String -> List Int
getSeeds input =
    String.lines input
        |> List.head
        |> Maybe.withDefault ""
        |> String.split " "
        |> List.filterMap String.toInt


getMaps : String -> List (List Mapping)
getMaps input =
    case String.split "\n\n" input of
        _ :: sections ->
            sections
                |> List.map getMap

        _ ->
            []


getMap : String -> List Mapping
getMap input =
    case String.lines input of
        _ :: rows ->
            rows
                |> List.filterMap getMapping

        _ ->
            []


getMapping : String -> Maybe Mapping
getMapping input =
    case input |> String.split " " |> List.filterMap String.toInt of
        [ destination, source, length ] ->
            Just <| Mapping source length (destination - source)

        _ ->
            Nothing
