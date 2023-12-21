module Day06Tests exposing (..)

import Day06
import Day06Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal "288" <| Debug.toString <| Day06.part1 example

        -- , test "Puzzle" <| always <| Expect.equal 160816 <| Day06.part1 input
        ]



-- part2 : Test
-- part2 =
--     describe "Part 2"
--         [-- test "Example" <| always <| Expect.equal 71503 <| Day06.part2 example
--          -- , test "Puzzle" <| always <| Expect.equal 46561107 <| Day06.part2 input
--         ]
