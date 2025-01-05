import { SelectionDto } from '../dto/selection/selection.dto';
import { DynamicContext } from '../interfaces/dynamic-context.interface';
import { LogicService } from './logic.service';
import { DynamicContextService } from './dynamic-context.service';

export const SelectionService = new (class SelectionService {
  resolve<T extends []>(
    selection: SelectionDto,
    context: DynamicContext,
    debug?: boolean,
  ): T {
    const {
      from,
      where,
      orderBy,
      limit,
      offset,
      groupBy,
      debug: _debug,
    } = selection.select;
    debug = debug || _debug;
    if (!from) {
      console.error("Selection has no 'from' property", selection);
      return [] as T;
    }
    const items = LogicService.resolve<T>(from, context, debug);
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
    let validItems: T = where
      ? (items.filter((i) =>
          LogicService.resolve(
            where,
            {
              ...context,
              ...DynamicContextService.createContext({
                value: i,
              }),
            },
            debug,
          ),
        ) as T)
      : ([...items] as T);
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
      ) as T;
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
    return validItems as T;
  }
})();
