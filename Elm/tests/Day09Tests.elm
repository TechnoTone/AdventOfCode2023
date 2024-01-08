module Day09Tests exposing (..)

import Day09
import Day09Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 114 <| Day09.part1 example

        -- , test "Puzzle" <| always <| Expect.equal 0 <| Day09.part1 input
        ]



-- part2 : Test
-- part2 =
--     describe "Part 2"
--         [-- test "Example" <| always <| Expect.equal 0 <| Day09.part2 example
--          -- , test "Puzzle" <| always <| Expect.equal 0 <| Day09.part2 input
--         ]
