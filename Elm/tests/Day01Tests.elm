module Day01Tests exposing (..)

import Day01
import Day01Input exposing (example1, example2, input)
import Expect
import Test exposing (Test, describe, test)


part1 : Test
part1 =
    describe "Part 1"
        [ test "toCalibrationValue 38" <| always <| Expect.equal (Just 38) <| Day01.toCalibrationValue "pqr3stu8vwx"
        , test "toCalibrationValue 77" <| always <| Expect.equal (Just 77) <| Day01.toCalibrationValue "treb7uchet"
        , test "Example" <| always <| Expect.equal 142 <| Day01.part1 example1
        , test "Puzzle" <| always <| Expect.equal 54573 <| Day01.part1 input
        ]


part2 : Test
part2 =
    describe "Part 2"
        [ test "getFirstDigitWord two1nine" <| always <| Expect.equal "two" <| Day01.getFirstDigitWord "two1nine"
        , test "getFirstDigitWord abcone2threexyz" <| always <| Expect.equal "one" <| Day01.getFirstDigitWord "abcone2threexyz"
        , test "getLastDigitWord two1nine" <| always <| Expect.equal "nine" <| Day01.getLastDigitWord "two1nine"
        , test "getLastDigitWord 7pqrstsixteen" <| always <| Expect.equal "six" <| Day01.getLastDigitWord "7pqrstsixteen"
        , test "toCalibrationValueIncludingWords" <| always <| Expect.equal (Just 76) <| Day01.toCalibrationValueIncludingWords "7pqrstsixteen"
        , test "Example" <| always <| Expect.equal 281 <| Day01.part2 example2
        , test "Puzzle" <| always <| Expect.equal 54591 <| Day01.part2 input
        ]
