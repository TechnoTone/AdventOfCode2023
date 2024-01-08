module Day08Tests exposing (..)

import Day08
import Day08Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example 1" <| always <| Expect.equal 2 <| Day08.part1 example1
        , test "Example 2" <| always <| Expect.equal 6 <| Day08.part1 example2
        , test "Puzzle" <| always <| Expect.equal 17287 <| Day08.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example" <| always <| Expect.equal 6 <| Day08.part2 example3
        , test "Puzzle" <| always <| Expect.equal 18625484023687 <| Day08.part2 input
        ]


getPrimesUpTo : Test
getPrimesUpTo =
    describe "getPrimesUpTo"
        [ test "getPrimesUpTo 100" <|
            always <|
                Expect.equal [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ] <|
                    Day08.getPrimesUpTo 100
        ]


getPrimeFactors : Test
getPrimeFactors =
    let
        sut =
            Day08.getPrimeFactors (Day08.getPrimesUpTo 100)
    in
    describe "getPrimeFactors"
        [ test "getPrimeFactors 20" <| always <| Expect.equal [ ( 2, 2 ), ( 5, 1 ) ] <| sut 20
        , test "getPrimeFactors 53144" <| always <| Expect.equal [ ( 2, 3 ), ( 7, 1 ), ( 13, 1 ), ( 73, 1 ) ] <| sut 53144
        ]
