import Feathers from "@feathersjs/feathers";
export declare enum SOCKET {
    CONNECT = "CONNECT",
    RECONNECT = "RECONNECT",
    RECONNECT_FAILURE = "RECONNECT_FAILURE",
    SERVER_DISCONNECT = "SERVER_DISCONNECT",
    CLIENT_DISCONNECT = "CLIENT_DISCONNECT",
    PING_TIMEOUT = "PING_TIMEOUT ",
    ERROR = "ERROR ",
    CONNECT_ERROR = "CONNECT_ERROR "
}
interface FeathersOpts {
    url: string;
    useSocket: boolean;
    headers?: any;
}
export default class FeathersClass {
    private opts;
    private client;
    private socket;
    constructor(opts: FeathersOpts);
    setupClient(): Promise<void>;
    setup(rawData: any): Promise<any>;
    configure(conf: any): Feathers.Application<{}>;
    getClient(): Feathers.Application<{}>;
    proxyService(service: any): any;
}
export {};
