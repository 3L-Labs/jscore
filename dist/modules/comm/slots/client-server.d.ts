export interface Target {
    id: number;
    path: string;
    type: 'object' | 'function';
}
export interface TargetResponse extends Target {
    val: any;
}
declare const CSComm: {
    req: import("ts-event-bus").Slot<Target, TargetResponse>;
    res: import("ts-event-bus").Slot<TargetResponse, void>;
    disconnect: import("ts-event-bus").Slot<number, void>;
};
export default CSComm;
