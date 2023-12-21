module Day07Tests exposing (..)

import Day07
import Day07Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 6440 <| Day07.part1 example
        , test "Puzzle" <| always <| Expect.equal 253954294 <| Day07.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "Example" <| always <| Expect.equal 5905 <| Day07.part2 example
        , test "Puzzle" <| always <| Expect.equal 254837398 <| Day07.part2 input
        ]
