"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionService = void 0;
const logic_service_1 = require("./logic.service");
const dynamic_context_service_1 = require("./dynamic-context.service");
const condition_service_1 = require("./condition.service");
exports.SelectionService = new (class SelectionService {
    resolve(selection, context, debug) {
        const { from, where, orderBy, limit, offset, groupBy, debug: _debug, } = selection.select;
        debug = debug || _debug;
        if (!from) {
            console.error("Selection has no 'from' property", selection);
            return [];
        }
        const items = logic_service_1.LogicService.resolve(from, context, debug);
        if (items === undefined) {
            if (debug) {
                console.error('Selection returns invalid pool', selection);
            }
            return [];
        }
        if (debug) {
            console.debug('Selection found', items.length, 'possible items', selection);
        }
        let validItems = where
            ? items.filter((i) => condition_service_1.ConditionService.testCondition(where, {
                ...context,
                ...dynamic_context_service_1.DynamicContextService.createContext({
                    value: i,
                }),
            }, debug) === true)
            : [...items];
        if (debug) {
            console.debug('Valid items:', validItems.length);
        }
        if (orderBy) {
            if (debug) {
                console.debug('Apply sorting:', orderBy);
            }
            throw new Error('Not yet implemented');
        }
        if (limit !== undefined || offset !== undefined) {
            const limitValue = logic_service_1.LogicService.resolve(limit ?? -1, context, debug) ?? -1;
            const offsetValue = logic_service_1.LogicService.resolve(offset ?? 0, context, debug) ?? 0;
            validItems = validItems.slice(offsetValue, limitValue >= 0 ? offsetValue + limitValue : Number.MAX_VALUE);
        }
        if (groupBy) {
            if (debug) {
                console.debug('Apply grouping:', groupBy);
            }
            const property = logic_service_1.LogicService.resolve(groupBy, context, debug);
            if (property) {
                const result = new Map();
                for (const item of validItems) {
                    const value = item[property];
                    if (value === undefined) {
                        continue;
                    }
                    const list = result.get(value) ?? [];
                    list.push(item);
                    result.set(value, list);
                }
                return [...result.entries()];
            }
            else if (debug) {
                console.error('Group by did not specify a property', groupBy);
                return [];
            }
        }
        return validItems;
    }
})();
//# sourceMappingURL=selection.service.js.map