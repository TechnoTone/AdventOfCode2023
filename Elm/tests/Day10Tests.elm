module Day10Tests exposing (..)

import Day10
import Day10Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 8 <| Day10.part1 example_1
        , test "Puzzle" <| always <| Expect.equal 7102 <| Day10.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example_2" <| always <| Expect.equal 8 <| Day10.part2 example_2
        , test "Example_3" <| always <| Expect.equal 10 <| Day10.part2 example_3
        , test "Puzzle" <| always <| Expect.equal 363 <| Day10.part2 input
        ]
