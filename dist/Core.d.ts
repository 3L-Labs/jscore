import ModuleManager from "./modules/ModuleManager";
import ConstantsManager from "./constants/ConstantsManager";
import { AppConfig } from "./constants/AppConfig";
export declare let CoreConstants: ConstantsManager;
declare let _: {
    m<T = any, L = any>(): Core<T, L>;
};
export { _ };
export default class Core<T = any, L = any> {
    private config;
    Constants: ConstantsManager;
    Modules: ModuleManager;
    Stores: T;
    libs: L;
    private delayedInit;
    started: boolean;
    updated: number;
    constructor(config: AppConfig);
    private addConstantListeners;
    private onAuthChanged;
    start(dependencyInjection?: any): Promise<Core<T>>;
    private postStart;
    reset(): Promise<any[]>;
    private get modules();
    private startStores;
    private resetStores;
    private startLibs;
    private resetLibs;
}
declare const jscore: {
    store: (name: string) => (constructor: any) => void;
    lib: (name: string) => (constructor: any) => void;
};
export { jscore };
