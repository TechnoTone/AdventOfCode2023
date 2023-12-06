module Day02Tests exposing (..)

import Day02
import Day02Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


parsing : Test
parsing =
    let
        expectedParsedGame =
            Just <|
                Day02.Game 1
                    [ Day02.Round 4 0 3
                    , Day02.Round 1 2 6
                    , Day02.Round 0 2 0
                    ]
    in
    describe "Parsing"
        [ test "x" <|
            always <|
                Expect.equal expectedParsedGame <|
                    Day02.toGame "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        ]


part1 : Test
part1 =
    describe
        "Part 1"
        [ test "Example" <| always <| Expect.equal 8 <| Day02.part1 example
        , test "Puzzle" <| always <| Expect.equal 2505 <| Day02.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example" <| always <| Expect.equal 2286 <| Day02.part2 example
        , test "Puzzle" <| always <| Expect.equal 70265 <| Day02.part2 input
        ]
