import { DynamicContext, MathExpressionDto, MathExpressionService } from '../../src';
import { DynamicContextService } from '../../src';
import { readFileSync } from 'fs';
import { LogicService } from '../../src';

const input = JSON.parse(
  readFileSync('./test/files/math.json').toString('utf-8'),
);

const context: DynamicContext = DynamicContextService.createContext(
  input['props'] ?? {},
);
const logic = input['logic'];

const result = LogicService.resolve(logic, context);
console.log('Result', result);

// const testFormula = "(0.24 + {year}) * pow(0.0048, 2)";
// const parsed =  MathExpressionService.parse(testFormula);
// const stringified =  MathExpressionService.stringify(parsed);
//
// console.log(testFormula);
// console.log(parsed);
// console.log(stringified);
// console.log(testFormula === stringified);