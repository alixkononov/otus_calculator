import { Stack } from "tstl/container";
import { isNumber } from "./helpers";
import { MathOperation, mathTokens } from "./mathOperators";

type Parentheses = "(" | ")"
export type PolishNotationToken = number | MathOperation | Parentheses

const isOperationToken = (item: string) => mathTokens.hasOwnProperty(item)

const isMathOperation = (op: PolishNotationToken): op is MathOperation => {
    const mathOp = op as MathOperation;
    
    return mathOp?.Precedence !== undefined && mathOp?.Operation !== undefined;
}

export const parseToReversePolishNotation = (line: string): PolishNotationToken[] => {
    const input = line.split(" ");
    const stack = new Stack<PolishNotationToken>()
    const output = Array<PolishNotationToken>()

    //Dejkstra Shunting-yard algorithm
    input.reduce<PolishNotationToken[]>((result, item, _) => {

        if (isNumber(item)) {
            result.push(Number(item))
            return result;
        }

        if (isOperationToken(item)) {
            const currentOperation = mathTokens[item];
            const stackTop = stack.top();

            if (isMathOperation(stackTop) && stackTop.Precedence >= currentOperation.Precedence) {
                result.push(stackTop)
                stack.pop()
            }

            stack.push(currentOperation);
            return result;
        }

        if (item == "(") {
            stack.push(item);
            return result;
        }

        if (item == ")") {
            while(stack.top() !== "("){
                result.push(stack.top());
                stack.pop()
            }
            stack.pop();
            return result;
        }

        throw new TypeError("Unexpected token");

    }, output);
    return output;

}