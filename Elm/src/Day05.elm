module Day05 exposing (..)

import List.Extra as List


part1 : String -> Int
part1 input =
    let
        startSeeds : List Int
        startSeeds =
            input
                |> String.lines
                |> List.head
                |> Maybe.withDefault ""
                |> String.split " "
                |> List.filterMap String.toInt

        seedInRange : Int -> MapTransformation -> Bool
        seedInRange seed tx =
            tx.start <= seed && seed <= tx.end

        applyMappings1 : List MapTransformation -> List Int -> List Int
        applyMappings1 mappings seeds =
            seeds
                |> List.map (mapSeed mappings)

        mapSeed : List MapTransformation -> Int -> Int
        mapSeed rangeTransformations seed =
            rangeTransformations
                |> List.filter (seedInRange seed)
                |> List.head
                |> Maybe.map (.transformation >> (+) seed)
                |> Maybe.withDefault seed
    in
    getMaps input
        |> List.foldl applyMappings1 startSeeds
        |> List.minimum
        |> Maybe.withDefault 0


part2 : String -> Int
part2 input =
    input
        |> getStartSeedRanges
        |> List.concatMap (applyMappings <| getMaps input)
        |> List.map .start
        |> List.minimum
        |> Maybe.withDefault 0


getStartSeedRanges : String -> List SeedRange
getStartSeedRanges input =
    let
        pair : List Int -> List SeedRange
        pair ints =
            case ints of
                start :: length :: rest ->
                    SeedRange start (start + length - 1) :: pair rest

                _ ->
                    []
    in
    input
        |> String.lines
        |> List.head
        |> Maybe.withDefault ""
        |> String.split " "
        |> List.filterMap String.toInt
        |> pair


applyMappings : List (List MapTransformation) -> SeedRange -> List SeedRange
applyMappings mappings seedRange =
    case mappings of
        [] ->
            [ seedRange ]

        first :: rest ->
            applyMapping seedRange first
                |> List.concatMap (applyMappings rest)


applyMapping : SeedRange -> List MapTransformation -> List SeedRange
applyMapping seedRange mapping =
    mapping
        |> multiFragmentSeedRange seedRange
        |> List.map (applyTransformations mapping)


multiFragmentSeedRange : SeedRange -> List MapTransformation -> List SeedRange
multiFragmentSeedRange seedRange mappings =
    let
        overlaps overlapType =
            overlapType /= None && overlapType /= Inner

        overlappedMapping =
            List.filter (getOverlapType seedRange >> overlaps) mappings
                |> List.head
    in
    case overlappedMapping of
        Just mapping ->
            fragmentSeedRange seedRange mapping
                |> List.concatMap (\sr -> multiFragmentSeedRange sr mappings)

        Nothing ->
            [ seedRange ]


fragmentSeedRange : SeedRange -> MapTransformation -> List SeedRange
fragmentSeedRange seedRange map =
    case getOverlapType seedRange map of
        None ->
            [ seedRange ]

        Outer ->
            [ SeedRange seedRange.start (map.start - 1), SeedRange map.start map.end, SeedRange (map.end + 1) seedRange.end ]

        Left ->
            [ SeedRange seedRange.start (map.start - 1), SeedRange map.start seedRange.end ]

        Right ->
            [ SeedRange seedRange.start map.end, SeedRange (map.end + 1) seedRange.end ]

        Inner ->
            [ seedRange ]


applyTransformations : List MapTransformation -> SeedRange -> SeedRange
applyTransformations mappings seedRange =
    mappings
        |> List.filter (\tx -> tx.start <= seedRange.start && tx.end >= seedRange.end)
        |> List.head
        |> Maybe.map (\tx -> SeedRange (seedRange.start + tx.transformation) (seedRange.end + tx.transformation))
        |> Maybe.withDefault seedRange


getOverlapType : SeedRange -> MapTransformation -> OverlapType
getOverlapType seedRange mapping =
    if seedRange.end < mapping.start then
        None

    else if mapping.end < seedRange.start then
        None

    else if seedRange.start >= mapping.start && seedRange.end <= mapping.end then
        Inner

    else if seedRange.start < mapping.start && seedRange.end > mapping.end then
        Outer

    else if seedRange.start < mapping.start && seedRange.end >= mapping.start then
        Left

    else if seedRange.start <= mapping.end && seedRange.end > mapping.end then
        Right

    else
        None


type alias MapTransformation =
    { start : Int
    , end : Int
    , transformation : Int
    }


type alias SeedRange =
    { start : Int
    , end : Int
    }


type OverlapType
    = None
    | Outer
    | Left
    | Right
    | Inner


getMaps : String -> List (List MapTransformation)
getMaps input =
    case String.split "\n\n" input of
        _ :: sections ->
            sections
                |> List.map getMap

        _ ->
            []


getMap : String -> List MapTransformation
getMap input =
    case String.lines input of
        _ :: rows ->
            rows
                |> List.filterMap getMapping

        _ ->
            []


getMapping : String -> Maybe MapTransformation
getMapping input =
    case input |> String.split " " |> List.filterMap String.toInt of
        [ destination, source, length ] ->
            Just <| MapTransformation source (source + length - 1) (destination - source)

        _ ->
            Nothing
