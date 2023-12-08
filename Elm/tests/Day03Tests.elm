module Day03Tests exposing (..)

import Day03
import Day03Input exposing (..)
import Expect
import Set
import Test exposing (Test, describe, test)


parsing : Test
parsing =
    describe "Parsing"
        [ test "getSymbolCoordinates" <|
            always <|
                Expect.equalSets
                    (Set.fromList
                        [ ( ( 3, 1 ), '*' )
                        , ( ( 6, 3 ), '#' )
                        , ( ( 3, 4 ), '*' )
                        , ( ( 5, 5 ), '+' )
                        , ( ( 3, 8 ), '$' )
                        , ( ( 5, 8 ), '*' )
                        ]
                    )
                <|
                    Day03.getSymbolCoordinates example
        , test "getPartNumbers" <|
            always <|
                Expect.equalLists
                    [ Day03.PartNumber 467 ( 0, 0 )
                    , Day03.PartNumber 114 ( 5, 0 )
                    , Day03.PartNumber 35 ( 2, 2 )
                    , Day03.PartNumber 633 ( 6, 2 )
                    , Day03.PartNumber 617 ( 0, 4 )
                    , Day03.PartNumber 58 ( 7, 5 )
                    , Day03.PartNumber 592 ( 2, 6 )
                    , Day03.PartNumber 755 ( 6, 7 )
                    , Day03.PartNumber 664 ( 1, 9 )
                    , Day03.PartNumber 598 ( 5, 9 )
                    ]
                <|
                    Day03.getPartNumbers example
        , test "getPartNumberSurroundings" <|
            always <|
                Expect.equalSets
                    (Set.fromList
                        [ ( 1, 1 )
                        , ( 2, 1 )
                        , ( 3, 1 )
                        , ( 4, 1 )
                        , ( 1, 2 )
                        , ( 4, 2 )
                        , ( 1, 3 )
                        , ( 2, 3 )
                        , ( 3, 3 )
                        , ( 4, 3 )
                        ]
                    )
                <|
                    Day03.getPartNumberSurroundings (Day03.PartNumber 35 ( 2, 2 ))
        ]


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 4361 <| Day03.part1 example
        , test "Puzzle" <| always <| Expect.equal 551094 <| Day03.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example" <| always <| Expect.equal 467835 <| Day03.part2 example
        , test "Puzzle" <| always <| Expect.equal 80179647 <| Day03.part2 input
        ]
