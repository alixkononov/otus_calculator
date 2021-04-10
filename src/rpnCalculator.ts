import {Stack} from "tstl/container";
import {isNumber} from "./helpers";
import {BinaryOperationType, MathOperation, mathTokens, UnaryOperationType} from "./mathOperators";


type Parentheses = "(" | ")"
export type RPNToken = number | MathOperation | Parentheses

const isOperationToken = (item: string) => mathTokens.hasOwnProperty(item)

const isMathOperation = (op: RPNToken): op is MathOperation => {
    const mathOp = op as MathOperation;

    return mathOp?.Precedence !== undefined && mathOp?.Operation !== undefined;
}

const isBinaryOperation = (op: Function) : op is BinaryOperationType => {
   return op.length == 2
}


export const parseToReversePolishNotation = (line: string): RPNToken[] => {
    const input = line.trim().split(" ");
    const stack = new Stack<RPNToken>()
    const output = Array<RPNToken>()

    //Dejkstra Shunting-yard algorithm
    input.reduce<RPNToken[]>((result, item, _) => {

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
            while (stack.top() !== "(") {
                result.push(stack.top());
                stack.pop()
            }
            stack.pop();
            return result;
        }

        throw new TypeError("Unexpected token");

    }, output);
    //check if stack not empty
    while (!stack.empty()) {
        const stackTop = stack.top();
        if (isMathOperation(stackTop)) {
            output.push(stackTop)
        }
        stack.pop()
    }
    return output;

}

export const calcRpn = (tokens: Array<RPNToken>): number => {
    const stack = new Stack<number>()
    tokens.forEach((token) => {
        if (typeof(token) === "number") {
            stack.push(token)
        } else {
            const operation = token as MathOperation;

            if (isBinaryOperation(operation.Operation)) {
                const second = stack.top();
                stack.pop()
                const first = stack.top()
                stack.pop()
                const binaryOp = operation.Operation as BinaryOperationType;
                stack.push(binaryOp(first, second))
                return;
            }

            const first = stack.top();
            stack.pop()

            const unaryOp = operation.Operation as UnaryOperationType;
            stack.push(unaryOp(first))

        }
    })
    return stack.top();
}