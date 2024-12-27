import { MathExpressionService } from '../../src';

const testFormula = '0.24 + {year} * 0.0048';
console.log('Original:', testFormula);

const parsed = MathExpressionService.parse(testFormula);
console.log('Parsed:', parsed);

const stringified = MathExpressionService.stringify(parsed);
console.log('Stringified:', stringified);
console.log('Success:', testFormula === stringified);
