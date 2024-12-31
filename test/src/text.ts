import { DynamicContext } from '../../src';
import { DynamicContextService } from '../../src';
import { readFileSync } from 'fs';
import { LogicService } from '../../src';

const input = JSON.parse(
  readFileSync('./test/files/text.json').toString('utf-8'),
);

const context: DynamicContext = DynamicContextService.createContext(
  input['props'] ?? {},
);
const test = input['test'];

const result = LogicService.resolve(test, context, true);
console.log('Result:', result);
