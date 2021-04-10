import { Stack } from "tstl/container";
import { isNumber } from "./helpers";
import { BinaryOperationType, mathOperators, UnaryOperationType } from "./mathOperators";

export type PolishNotationToken = number | BinaryOperationType | UnaryOperationType;

const isOperation = (item: string) => mathOperators.hasOwnProperty(item)
export const parseToReversePolishNotation = (line: string) : PolishNotationToken[] => 
{
    const input = line.split(" ");
    const stack =  new Stack<PolishNotationToken>() 
    const output = Array<PolishNotationToken>()
    
    //Dejkstra Shunting-yard algorithm
    input.reduce<PolishNotationToken[]>((result, item, _) => {
      
        if(isNumber(item)){
            result.push(Number(item))
            return result;
        }

        if(isOperation(item))
        {
            //todo compare with stack.top prority            
            stack.push(mathOperators[item])
            return result;
        }

        if(item == "("){
            //todo push to stack
            return result;
        }

        if(item == ")")
        {
            //todo pop all from stack
            return result;
        }

        throw new TypeError("Unexpected token");
      
    }, output);
    return output;

}