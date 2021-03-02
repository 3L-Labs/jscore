import Core from "../Core";
export default class Store {
    protected Core: Core<any>;
    isLoading: boolean;
    private isRendered;
    private initCallbacks;
    private foregroundCallbacks;
    private backgroundCallbacks;
    protected http: any;
    protected pubsub: any;
    constructor(Core: Core<any>, children?: any[]);
    protected createStore(Store: any, ...args: any[]): any;
    protected connectionObjects(): void;
    protected onRender(): void;
    protected onDeRender(): void;
    protected init(...funcs: any[]): void;
    protected foreground(...args: any[]): void;
    protected background(...args: any[]): void;
}
