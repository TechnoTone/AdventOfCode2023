module Day05Tests exposing (..)

import Day05 exposing (MapTransformation, SeedRange)
import Day05Input exposing (..)
import Expect
import Test exposing (Test, describe, test)



-- part1 : Test
-- part1 =
--     describe "Part 1"
--         [ test "Example" <| always <| Expect.equal 35 <| Day05.part1 example
--         , test "Puzzle" <| always <| Expect.equal 650599855 <| Day05.part1 input
--         ]
-- mapSeedRangeTests : Test
-- mapSeedRangeTests =
--     describe "mapSeedRange"
--         [ test "No overlap (left)" <| always <| Expect.equal [ SeedRange 10 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 21 4 0 ]
--         , test "No overlap (right)" <| always <| Expect.equal [ SeedRange 10 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 5 9 0 ]
--         , test "Part overlap (left)" <| always <| Expect.equal [ SeedRange 110 112, SeedRange 13 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 8 12 100 ]
--         , test "Part overlap (right)" <| always <| Expect.equal [ SeedRange 10 17, SeedRange 118 120 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 18 22 100 ]
--         , test "Contained within" <| always <| Expect.equal [ SeedRange 110 120 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 1 30 100 ]
--         , test "Overlaps both sides" <| always <| Expect.equal [ SeedRange 10 12, SeedRange 113 117, SeedRange 18 20 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 13 17 100 ]
--         , test "Doesn't chain-react with other map ranges" <| always <| Expect.equal [ SeedRange 30 40 ] <| Day05.applyMapping (SeedRange 10 20) [ MapTransformation 10 20 20, MapTransformation 30 40 20 ]
--         ]
-- part2 : Test
-- part2 =
--     describe "Part 2"
--         [ test "Example" <| always <| Expect.equal "46" <| Debug.toString <| Day05.part2 example
--         -- , test "Puzzle" <| always <| Expect.equal 0 <| Day05.part2 input
--         ]


debuging : Test
debuging =
    describe "Debugging 79 14"
        [ test "seed-to-soil" <|
            always <|
                Expect.equal [ SeedRange 81 94 ] <|
                    Day05.applyMapping (SeedRange 79 92) <|
                        [ MapTransformation 98 99 -48 -- 50 98 2
                        , MapTransformation 50 97 2 -- 52 50 48
                        ]
        , test "soil-to-fertilizer" <|
            always <|
                Expect.equal [ SeedRange 81 94 ] <|
                    Day05.applyMapping (SeedRange 81 94) <|
                        [ MapTransformation 15 51 -15 -- 0 15 37
                        , MapTransformation 52 53 -15 -- 37 52 2
                        , MapTransformation 0 14 39 -- 39 0 15
                        ]
        , test "fertilizer-to-water" <|
            always <|
                Expect.equal [ SeedRange 81 94 ] <|
                    Day05.applyMapping (SeedRange 81 94) <|
                        [ MapTransformation 53 60 -4 -- 49 53 8
                        , MapTransformation 11 52 -11 -- 0 11 42
                        , MapTransformation 0 6 42 -- 42 0 7
                        , MapTransformation 7 10 50 -- 57 7 4
                        ]
        , test "water-to-light" <|
            always <|
                Expect.equal [ SeedRange 74 87 ] <|
                    Day05.applyMapping (SeedRange 81 94) <|
                        [ MapTransformation 18 24 70 -- 88 18 7
                        , MapTransformation 25 94 -7 -- 18 25 70
                        ]
        , test "light-to-temperature" <|
            always <|
                Expect.equal [ SeedRange 78 80, SeedRange 45 55 ] <|
                    Day05.applyMapping (SeedRange 74 87) <|
                        [ MapTransformation 77 99 -32 -- 45 77 23
                        , MapTransformation 45 63 36 -- 81 45 19
                        , MapTransformation 64 76 4 -- 68 64 13
                        ]
        , test "light-to-temperature multiFragmentSeedRange" <|
            always <|
                Expect.equal [ SeedRange 74 76, SeedRange 77 87 ] <|
                    Day05.multiFragmentSeedRange (SeedRange 74 87)
                        [ MapTransformation 77 99 -32 -- 45 77 23
                        , MapTransformation 45 63 36 -- 81 45 19
                        , MapTransformation 64 76 4 -- 68 64 13
                        ]
        , test "temperature-to-humidity 74 76" <|
            always <|
                Expect.equal [ SeedRange 74 76 ] <|
                    Day05.applyMapping (SeedRange 74 76) <|
                        [ MapTransformation 69 70 -69 -- 0 69 1
                        , MapTransformation 0 68 1 -- 1 0 69
                        ]
        , test "temperature-to-humidity 77 87" <|
            always <|
                Expect.equal [ SeedRange 77 87 ] <|
                    Day05.applyMapping (SeedRange 77 87) <|
                        [ MapTransformation 69 70 -69 -- 0 69 1
                        , MapTransformation 0 68 1 -- 1 0 69
                        ]
        ]


humidity-to-location map:
60 56 37
56 93 4