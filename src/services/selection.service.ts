import { SelectionDto } from '../dto/selection/selection.dto';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { LogicService } from './logic.service';
import { DynamicContextService } from './dynamic-context.service';
import { ConditionService } from './condition.service';
import { SelectionTypeEnum } from '../enums/selection-type.enum';

export const SelectionService = new (class SelectionService {
  resolve<T>(
    selection: SelectionDto,
    context: DynamicContext,
    debug?: boolean,
  ): T {
    const {
      type,
      from,
      where,
      orderBy,
      limit,
      offset,
      groupBy,
      map,
      debug: _debug,
    } = selection.select;
    debug = debug || _debug;
    if (!from) {
      console.error("Selection has no 'from' property", selection);
      return [] as T;
    }
    const items = LogicService.resolve<[]>(from, context, debug);
    if (items === undefined) {
      if (debug) {
        console.error('Selection returns invalid pool', selection);
      }
      return [] as T;
    }
    if (debug) {
      console.debug(
        'Selection found',
        items.length,
        'possible items',
        selection,
      );
    }
    let validItems = where
      ? items.filter(
          (i) =>
            ConditionService.testCondition(
              where,
              {
                ...context,
                ...DynamicContextService.createContext({
                  value: i,
                }),
              },
              debug,
            ) === true,
        )
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
      const limitValue =
        LogicService.resolve<number>(limit ?? -1, context, debug) ?? -1;
      const offsetValue =
        LogicService.resolve<number>(offset ?? 0, context, debug) ?? 0;
      validItems = validItems.slice(
        offsetValue,
        limitValue >= 0 ? offsetValue + limitValue : Number.MAX_VALUE,
      );
    }
    if (groupBy) {
      if (debug) {
        console.debug('Apply grouping:', groupBy);
      }
      const property = LogicService.resolve<string>(groupBy, context, debug);
      if (property) {
        const result: Map<string, []> = new Map();
        for (const item of validItems) {
          const value = item[property];
          if (value === undefined) {
            continue;
          }
          const list = result.get(value) ?? [];
          list.push(item);
          result.set(value, list);
        }
        return [...result.entries()] as T;
      } else if (debug) {
        console.error('Group by did not specify a property', groupBy);
        return [] as T;
      }
    }
    let resultItems: unknown[];
    switch (type ?? SelectionTypeEnum.DEFAULT) {
      case SelectionTypeEnum.ONE:
        resultItems = validItems.slice(0, Math.min(validItems.length, 1));
        break;
      default:
        resultItems = validItems;
        break;
    }
    if (map !== undefined) {
      resultItems = resultItems.map((value) =>
        LogicService.resolve(map, {
          ...context,
          ...DynamicContextService.createContext({
            value,
          }),
        }),
      );
    }
    return (
      type === SelectionTypeEnum.ONE
        ? resultItems.find(() => true)
        : resultItems
    ) as T;
  }
})();
