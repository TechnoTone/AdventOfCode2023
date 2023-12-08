module Day04Tests exposing (..)

import Day04
import Day04Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 13 <| Day04.part1 example
        , test "Puzzle" <| always <| Expect.equal 25174 <| Day04.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example" <| always <| Expect.equal 30 <| Day04.part2 example
        , test "Puzzle" <| always <| Expect.equal 6420979 <| Day04.part2 input
        ]
