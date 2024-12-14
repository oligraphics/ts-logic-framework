import { DynamicContext } from '../interfaces/dynamic-context.interface';

export const DynamicContextService = new (class DynamicContextService {
  createContext<TProps extends { [key: string]: unknown }>(
    props: TProps,
    variables?: { [key: string]: unknown },
  ): DynamicContext & TProps {
    const result: DynamicContext = {
      ...props,
    };
    for (const [key, value] of Object.entries(props)) {
      result[`{${key}}`] = value;
    }
    if (variables) {
      for (const [key, value] of Object.entries(variables)) {
        result[`#${key}`] = value;
      }
    }
    return result as DynamicContext & TProps;
  }

  cloneContext(input: DynamicContext): DynamicContext {
    return { ...input };
  }
})();
