import { sum } from "./sum";
import {parseToReversePolishNotation, calcRpn } from "./expressionParser"

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("", () => {
  const qq =  parseToReversePolishNotation("3 + sin ( 3.14 )" )
  const result = calcRpn(qq);
})