module Day11Tests exposing (..)

import Day11
import Day11Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 374 <| Day11.part1 example
        , test "Puzzle" <| always <| Expect.equal 9609130 <| Day11.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example" <| always <| Expect.equal 82000210 <| Day11.part2 example
        , test "Puzzle" <| always <| Expect.equal 702152204842 <| Day11.part2 input
        ]
