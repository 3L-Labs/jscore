import SSE from "./SSE";
import Socket from "./Socket";
export declare enum PubSubTypes {
    SSE = 0,
    Socket = 1
}
export default class PubSub {
    private sse;
    private socket;
    private numberOfSSEConnections;
    constructor();
    newPubsub(type: PubSubTypes, obj: SSE | Socket): Promise<void>;
    newEventSource(path?: string): Promise<SSE | undefined>;
    on(event: string, cb: () => void): any;
    send(event: string, data: any): void;
}
