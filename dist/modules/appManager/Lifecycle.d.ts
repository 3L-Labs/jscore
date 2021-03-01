export declare type Callback = () => void;
export declare enum LifecycleState {
    active = 0,
    inactive = 1
}
export default class Lifecycle {
    state: LifecycleState;
    protected initCallbacks: Array<Callback>;
    protected foregroundCallbacks: Array<Callback>;
    protected backgroundCallbacks: Array<Callback>;
    addInitCallback: (cb: Callback) => number;
    addForegroundCallback: (cb: Callback) => number;
    addBackgroundCallback: (cb: Callback) => number;
    protected start(): void;
}
