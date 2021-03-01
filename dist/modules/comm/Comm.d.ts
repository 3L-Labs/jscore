import Module from "../Module";
import Core from "../../Core";
import CSComm from "./slots/client-server";
export declare enum Channels {
    'CLIENT_SERVER' = 0
}
interface Config {
    client_server: boolean;
    channels: [Channels];
}
interface DependencyInjection {
}
declare let comm: any;
export { comm, CSComm };
export default class Comm extends Module {
    private config;
    private dependencyInjection;
    private disposers;
    constructor(core: Core<{}>, config: Config, dependencyInjection: DependencyInjection);
    start(): Promise<void>;
}
