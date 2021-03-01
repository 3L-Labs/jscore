import Module from "../Module";
import Core from "../../Core";
declare enum Environments {
    dev = "dev",
    prod = "prod"
}
interface Config {
    env: Environments;
}
interface DependencyInjection {
}
export default class Log extends Module {
    private config;
    private dependencyInjection;
    constructor(core: Core<{}>, config: Config, dependencyInjection: DependencyInjection);
    start(): Promise<void>;
    private setup;
}
export {};
