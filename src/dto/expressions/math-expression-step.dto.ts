import {MathExpressionDto} from "./math-expression.dto.ts";

export type MathExpressionStepDto = {
    /**
     * Optionally store the result in a specific variable, otherwise
     * it will be stored in #value
     */
    result?: string;
} & MathExpressionDto