import Core from "..";
interface Dependencies {
    package: string;
    version: string;
}
export interface ModuleConfig {
    version: string;
    dependencies: Dependencies;
}
export default class Module {
    protected core: Core<{}>;
    constructor(core: Core<{}>);
    static init(core: Core<{}>, name: any, config: any, dependencies: any): Promise<void>;
    protected start(): Promise<void>;
    protected postStart(): Promise<void>;
    protected restart(): Promise<void>;
    protected stop(): Promise<void>;
}
export {};
