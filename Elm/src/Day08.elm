module Day08 exposing (..)

import Array exposing (Array)
import Dict exposing (Dict)
import List.Extra as List
import Set exposing (Set)


part1 : String -> Int
part1 input =
    traverse (parseInput input) "AAA"



-- part2 : String -> Int


part2 input =
    let
        ( directions, network ) =
            parseInput input

        startPositions =
            network
                |> Dict.keys
                |> List.filter (String.endsWith "A")

        counts =
            List.map (traverse ( directions, network )) startPositions

        primeNumbers =
            counts |> List.maximum |> Maybe.withDefault 0 |> toFloat |> sqrt |> truncate |> getPrimesUpTo

        primeFactors =
            counts
                |> List.concatMap (getPrimeFactors primeNumbers)
                |> List.foldl
                    (\( prime, power ) acc ->
                        acc
                            |> Dict.update
                                prime
                                (Maybe.withDefault 0 >> max power >> Just)
                    )
                    Dict.empty
                |> Dict.toList
    in
    primeFactors
        |> List.foldl
            (\( prime, power ) acc ->
                acc * (prime ^ power)
            )
            1


type alias Directions =
    Array Direction


type Direction
    = Left
    | Right


type alias Network =
    Dict String Node


type alias Node =
    { left : String
    , right : String
    }


parseInput : String -> ( Directions, Network )
parseInput input =
    ( parseDirections input
    , parseNetwork input
    )


parseDirections : String -> Directions
parseDirections =
    String.lines
        >> List.head
        >> Maybe.withDefault ""
        >> String.toList
        >> List.filterMap parseDirection
        >> Array.fromList


parseDirection : Char -> Maybe Direction
parseDirection c =
    case c of
        'L' ->
            Just Left

        'R' ->
            Just Right

        _ ->
            Nothing


parseNetwork : String -> Network
parseNetwork =
    String.lines
        >> List.drop 2
        >> List.map parseNode
        >> Dict.fromList


parseNode : String -> ( String, Node )
parseNode input =
    let
        name =
            String.left 3 input

        left =
            String.slice 7 10 input

        right =
            String.slice 12 15 input
    in
    ( name, Node left right )


traverse : ( Directions, Network ) -> String -> Int
traverse ( directions, network ) start =
    let
        getNode : String -> Node
        getNode nodeName =
            network
                |> Dict.get nodeName
                |> Maybe.withDefault { left = "ZZZ", right = "ZZZ" }

        traverse_ : String -> Int -> Int
        traverse_ node steps =
            if node |> String.endsWith "Z" then
                steps

            else
                case nextDirection directions steps of
                    Left ->
                        traverse_ (getNode node |> .left) (steps + 1)

                    Right ->
                        traverse_ (getNode node |> .right) (steps + 1)
    in
    traverse_ start 0


nextDirection : Directions -> Int -> Direction
nextDirection directions steps =
    directions
        |> Array.get (steps |> modBy (Array.length directions))
        |> Maybe.withDefault Left


getPrimesUpTo : Int -> List Int
getPrimesUpTo n =
    let
        stopSearchingAt =
            n |> toFloat |> sqrt |> truncate

        sieve : List Int -> List Int
        sieve primes =
            case primes of
                [] ->
                    []

                [ x ] ->
                    [ x ]

                x :: xs ->
                    if x > stopSearchingAt then
                        primes

                    else
                        x :: sieve (List.filter (\y -> modBy x y /= 0) xs)
    in
    sieve (List.range 2 n)


getPrimeFactors : List Int -> Int -> List ( Int, Int )
getPrimeFactors primesList n =
    getPrimeFactorsList primesList n
        |> List.group
        |> List.map (Tuple.mapSecond (List.length >> (+) 1))


getPrimeFactorsList : List Int -> Int -> List Int
getPrimeFactorsList primesList n =
    case ( primesList, n ) of
        ( _, 1 ) ->
            []

        ( [], _ ) ->
            [ n ]

        ( x :: xs, _ ) ->
            if modBy x n == 0 then
                x :: getPrimeFactorsList (x :: xs) (n // x)

            else
                getPrimeFactorsList xs n
