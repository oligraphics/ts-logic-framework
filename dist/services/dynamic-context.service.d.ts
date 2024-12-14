import { DynamicContext } from '../interfaces/dynamic-context.interface';
export declare const DynamicContextService: {
    createContext<TProps extends {
        [key: string]: unknown;
    }>(props: TProps, variables?: {
        [key: string]: unknown;
    }): DynamicContext & TProps;
    cloneContext(input: DynamicContext): DynamicContext;
};
//# sourceMappingURL=dynamic-context.service.d.ts.map