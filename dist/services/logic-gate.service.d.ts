import { Condition } from '../interfaces/condition.interface';
import { AndConditionDto } from '../dto/conditions/logic/and.condition.dto';
import { NandConditionDto } from '../dto/conditions/logic/nand.condition.dto';
import { NorConditionDto } from '../dto/conditions/logic/nor.condition.dto';
import { OrConditionDto } from '../dto/conditions/logic/or.condition.dto';
import { XorConditionDto } from '../dto/conditions/logic/xor.condition.dto';
import { LogicGateDto } from '../dto/conditions/logic/logic-gate.dto';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
export declare const LogicGateService: {
    test(logicGate: LogicGateDto, context: DynamicContext, debug?: boolean): true | Condition;
    _testAnd(condition: AndConditionDto, conditions: [Condition, true | Condition][], debug?: boolean): true | Condition;
    _testNAnd(condition: NandConditionDto, conditions: [Condition, true | Condition][], debug?: boolean): true | Condition;
    _testNor(condition: NorConditionDto, conditions: [Condition, true | Condition][], debug?: boolean): true | Condition;
    _testOr(condition: OrConditionDto, conditions: [Condition, true | Condition][], debug?: boolean): true | Condition;
    _testXOr(condition: XorConditionDto, conditions: [Condition, true | Condition][], debug?: boolean): true | Condition;
};
//# sourceMappingURL=logic-gate.service.d.ts.map