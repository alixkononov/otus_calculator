export type BinaryOperationType = (first: number, second: number) => number;
export type UnaryOperationType = (first: number) => number;



export interface MathOperation{
  Operation: BinaryOperationType | UnaryOperationType, 
  Precedence: number
}



export const mul: BinaryOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: BinaryOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: BinaryOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: BinaryOperationType = (
  first: number,
  second: number
): number => first - second;

export const power: BinaryOperationType = (
  first: number,
  second: number
): number => Math.pow(first, second);

export const sinus: UnaryOperationType = (
  first: number, 
): number => Math.sin(first);

export const sqrt: UnaryOperationType = (
  first: number, 
): number => Math.sqrt(first);

export const mathTokens: { [key: string]: MathOperation} = {
  "sqrt": {Operation: sqrt, Precedence: 4},
  "sin": {Operation: sinus, Precedence: 4},
  "^": {Operation: power, Precedence: 3},
  "*": {Operation: mul, Precedence: 2},
  "/": {Operation: div, Precedence: 2},
  "+": {Operation: add, Precedence: 1},
  "-": {Operation: add, Precedence: 1}
 
};


