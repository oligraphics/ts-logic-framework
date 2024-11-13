import { DynamicContext } from '../interfaces/dynamic-context.interface';

export const DynamicContextService = new (class DynamicContextService {
  createContext(
    props: { [key: string]: any },
    variables?: { [key: string]: any },
  ): DynamicContext {
    const result: DynamicContext = {};
    for (const [key, value] of Object.entries(props)) {
      result[`{${key}}`] = value;
    }
    if (variables) {
      for (const [key, value] of Object.entries(variables)) {
        result[`#${key}`] = value;
      }
    }
    return result;
  }

  cloneContext(input: DynamicContext): DynamicContext {
    return { ...input };
  }
})();
