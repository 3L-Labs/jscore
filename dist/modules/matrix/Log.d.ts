import Module from "../Module";
import Core from "../../Core";
interface Config {
}
interface DependencyInjection {
}
export default class Matrix extends Module {
    private config;
    private dependencyInjection;
    constructor(core: Core<{}>, config: Config, dependencyInjection: DependencyInjection);
    start(): Promise<void>;
    private setup;
}
export {};
