module Day10Tests exposing (..)

import Day10
import Day10Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal "8" <| Debug.toString <| Day10.part1 example

        -- , test "Puzzle" <| always <| Expect.equal 0 <| Day10.part1 input
        ]



-- part2 : Test
-- part2 =
--     describe "Part 2"
--         [-- test "Example" <| always <| Expect.equal 0 <| Day10.part2 example
--          -- , test "Puzzle" <| always <| Expect.equal 0 <| Day10.part2 input
--         ]
