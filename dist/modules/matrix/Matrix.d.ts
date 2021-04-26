import Module from "../Module";
import Core from "../../Core";
interface Config {
    home: string;
}
interface DependencyInjection {
}
export default class Matrix extends Module {
    private config;
    client: any;
    constructor(core: Core<{}>, config: Config, _dependencyInjection: DependencyInjection);
    start(): Promise<void>;
}
export {};
