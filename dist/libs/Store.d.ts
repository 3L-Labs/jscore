import Core from "../Core";
import HTTP from "../modules/clientContext/server/libs/HTTP";
import PubSub from "../modules/clientContext/server/libs/PubSub";
export default class Store {
    protected core: Core<any>;
    isLoading: boolean;
    private isRendered;
    private initCallbacks;
    private foregroundCallbacks;
    private backgroundCallbacks;
    protected http: HTTP | undefined;
    protected pubsub: PubSub;
    constructor(core: Core<any>, children?: any[]);
    protected createStore(Store: any, ...args: any[]): any;
    protected connectionObjects(): void;
    protected onRender(): void;
    protected onDeRender(): void;
    protected init(...funcs: any[]): void;
    protected foreground(...args: any[]): void;
    protected background(...args: any[]): void;
}
