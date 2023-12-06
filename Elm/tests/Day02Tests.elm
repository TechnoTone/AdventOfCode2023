module Day02Tests exposing (..)

import Day02
import Day02Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 8 <| Day02.part1 example

        -- , test "Puzzle" <| always <| Expect.equal 2505 <| Day02.part1 input
        ]



-- part2 : Test
-- part2 =
--     describe "Part 2"
--         [-- test "Example" <| always <| Expect.equal 2286 <| Day02.part2 example
--          -- , test "Puzzle" <| always <| Expect.equal 70265 <| Day02.part2 input
--         ]
