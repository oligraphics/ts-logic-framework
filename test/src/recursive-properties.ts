import { DynamicContext } from '../../src';
import { DynamicContextService } from '../../src';
import { readFileSync } from 'fs';
import { LogicService } from '../../src';

const input = JSON.parse(
  readFileSync('./test/files/recursive-properties.json').toString('utf-8'),
);

const context: DynamicContext = DynamicContextService.createContext(
  input['props'] ?? {},
);
const math = input['logic'];

const result = LogicService.resolve(math, context);
console.log('Result:', result);
