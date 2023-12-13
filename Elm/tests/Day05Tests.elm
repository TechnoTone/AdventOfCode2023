module Day05Tests exposing (..)

import Day05 exposing (MapTransformation, SeedRange)
import Day05Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "Example" <| always <| Expect.equal 35 <| Day05.part1 example
        , test "Puzzle" <| always <| Expect.equal 650599855 <| Day05.part1 input
        ]


mapSeedRangeTests : Test
mapSeedRangeTests =
    describe "mapSeedRange"
        [ --test "No overlap (left)" <| always <| Expect.equal [ SeedRange 10 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 21 4 0 ]
          -- , test "No overlap (right)" <| always <| Expect.equal [ SeedRange 10 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 5 9 0 ]
          -- , test "Part overlap (left)" <| always <| Expect.equal [ SeedRange 110 112, SeedRange 13 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 8 12 100 ]
          -- , test "Part overlap (right)" <| always <| Expect.equal [ SeedRange 10 17, SeedRange 118 120 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 18 22 100 ]
          -- , test "Contained within" <| always <| Expect.equal [ SeedRange 110 120 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 1 30 100 ]
          -- , test "Overlaps both sides" <| always <| Expect.equal [ SeedRange 10 12, SeedRange 113 117, SeedRange 18 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 13 17 100 ]
          test "Doesn't chain-react with other map ranges" <| always <| Expect.equal [ SeedRange 30 40 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 10 20 20, MapTransformation 30 40 20 ]
        ]



-- part2 : Test
-- part2 =
--     describe "Part 2"
--         [-- test "Example" <| always <| Expect.equal "46" <| Debug.toString <| Day05.part2 example
--          -- , test "Puzzle" <| always <| Expect.equal 0 <| Day05.part2 input
--         ]
