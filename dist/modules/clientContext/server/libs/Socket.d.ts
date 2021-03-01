import { SpringBootOpts } from "../integrations/SpringBoot";
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
export interface SocketOptions {
    prefix: string;
}
export interface MessageData {
    event: string;
    data: any;
}
export default class Socket {
    private opts;
    private token;
    private sock;
    private header;
    constructor(opts: SpringBootOpts, token: string);
    setup(): Promise<void>;
    onMessage(event: any, cb: any): any;
    send(path: any, data: any): void;
}
