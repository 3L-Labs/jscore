import Module from "../Module";
import Core from "../../Core";
interface Config {
    home: string;
}
interface DependencyInjection {
}
export default class Matrix extends Module {
    private config;
    private dependencyInjection;
    constructor(core: Core<{}>, config: Config, dependencyInjection: DependencyInjection);
    start(): Promise<void>;
    signIn(username: string, password: string): Promise<void>;
    createAccount(username: string, password: string): Promise<void>;
    private setup;
}
export {};
