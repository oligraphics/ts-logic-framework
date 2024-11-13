import { DynamicContext } from '../../src/interfaces/dynamic-context.interface.ts';
import { DynamicContextService } from '../../src/services/dynamic-context.service.ts';
import { readFileSync } from 'fs';
import { LogicService } from '../../src/services/logic.service.ts';

const input = JSON.parse(
  readFileSync('./test/files/math.json').toString('utf-8'),
);

const context: DynamicContext = DynamicContextService.createContext(
  input['props'] ?? {},
);
const logic = input['logic'];

const result = LogicService.resolve(logic, context);
console.log('Result: ' + result);
