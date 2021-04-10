import { sum } from "./sum";
import {parseToReversePolishNotation, calcRpn } from "./rpnCalculator"

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("", () => {
  const qq =  parseToReversePolishNotation("sqrt ( 3 + sin ( 3.14 ) - 1 / 2 ^ 2 )" )
  const result = calcRpn(qq);
})