module Day07 exposing (..)

import Dict exposing (Dict)
import List.Extra as List


part1 : String -> Int
part1 input =
    input
        |> String.lines
        |> List.filterMap (parseHand False)
        |> List.sortWith compareHands
        |> List.map .bid
        |> List.indexedMap Tuple.pair
        |> List.foldl
            (\( index, bid ) acc ->
                acc + (bid * (index + 1))
            )
            0


part2 : String -> Int
part2 input =
    input
        |> String.lines
        |> List.filterMap (parseHand True)
        |> List.sortWith compareHands
        |> List.map .bid
        |> List.indexedMap Tuple.pair
        |> List.foldl
            (\( index, bid ) acc ->
                acc + (bid * (index + 1))
            )
            0


type alias Hand =
    { hand : String
    , bid : Int
    , handScore : Int
    , cardScores : List Int
    }


parseHand : Bool -> String -> Maybe Hand
parseHand jokers input =
    case String.split " " input of
        [ hand, bidStr ] ->
            Just
                { hand = hand
                , bid = String.toInt bidStr |> Maybe.withDefault 0
                , handScore = getHandScore jokers hand
                , cardScores = getCardScores jokers hand
                }

        _ ->
            Nothing


getHandScore : Bool -> String -> Int
getHandScore jokers hand =
    let
        handleJokers : List ( Char, Int ) -> List ( Char, Int )
        handleJokers cardCounts =
            if jokers then
                let
                    jokerCount =
                        List.filter (\( c, _ ) -> c == 'J') cardCounts
                            |> List.head
                            |> Maybe.withDefault ( 'J', 0 )
                            |> Tuple.second

                    nonJokers =
                        List.filter (\( c, _ ) -> c /= 'J') cardCounts
                in
                case ( jokerCount, nonJokers ) of
                    ( 5, _ ) ->
                        [ ( 'J', 5 ) ]

                    ( _, ( card, count ) :: rest ) ->
                        ( card, count + jokerCount ) :: rest

                    _ ->
                        []

            else
                cardCounts
    in
    hand
        |> String.toList
        |> List.sort
        |> List.group
        |> List.map (Tuple.mapSecond (List.length >> (+) 1))
        |> List.sortBy Tuple.second
        |> List.reverse
        |> handleJokers
        |> List.map Tuple.second
        |> (\x ->
                case x of
                    [ 5 ] ->
                        7

                    [ 4, 1 ] ->
                        6

                    [ 3, 2 ] ->
                        5

                    [ 3, 1, 1 ] ->
                        4

                    [ 2, 2, 1 ] ->
                        3

                    [ 2, 1, 1, 1 ] ->
                        2

                    [ 1, 1, 1, 1, 1 ] ->
                        1

                    _ ->
                        0
           )


getCardScores : Bool -> String -> List Int
getCardScores jokers hand =
    let
        cardScore : Dict Char number
        cardScore =
            Dict.fromList
                [ ( 'A', 14 )
                , ( 'K', 13 )
                , ( 'Q', 12 )
                , ( 'J'
                  , if jokers then
                        1

                    else
                        11
                  )
                , ( 'T', 10 )
                , ( '9', 9 )
                , ( '8', 8 )
                , ( '7', 7 )
                , ( '6', 6 )
                , ( '5', 5 )
                , ( '4', 4 )
                , ( '3', 3 )
                , ( '2', 2 )
                ]
    in
    hand
        |> String.toList
        |> List.filterMap (\c -> Dict.get c cardScore)


compareHands : Hand -> Hand -> Order
compareHands a b =
    case compare a.handScore b.handScore of
        LT ->
            LT

        GT ->
            GT

        EQ ->
            List.zip a.cardScores b.cardScores
                |> List.map
                    (\( x, y ) ->
                        case compare x y of
                            LT ->
                                LT

                            GT ->
                                GT

                            EQ ->
                                EQ
                    )
                |> List.filter ((/=) EQ)
                |> List.head
                |> Maybe.withDefault EQ
