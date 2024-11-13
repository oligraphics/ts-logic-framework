import { DynamicContext } from '../interfaces/dynamic-context.interface';
export declare const DynamicContextService: {
    createContext(props: {
        [key: string]: any;
    }, variables?: {
        [key: string]: any;
    }): DynamicContext;
    cloneContext(input: DynamicContext): DynamicContext;
};
//# sourceMappingURL=dynamic-context.service.d.ts.map