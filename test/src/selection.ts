import { DynamicContext } from '../../src';
import { DynamicContextService } from '../../src';
import { readFileSync } from 'fs';
import { LogicService } from '../../src';

const input = JSON.parse(
  readFileSync('./test/files/selection.json').toString('utf-8'),
);

const context: DynamicContext = DynamicContextService.createContext(
  input['props'] ?? {},
);
const logic = input['logic'];

const result = LogicService.resolve(logic, context);
console.log('Fruit:', input['props']['fruit'], 'Berries:', result);
