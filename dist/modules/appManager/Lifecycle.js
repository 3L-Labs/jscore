export var LifecycleState;
(function (LifecycleState) {
    LifecycleState[LifecycleState["active"] = 0] = "active";
    LifecycleState[LifecycleState["inactive"] = 1] = "inactive";
})(LifecycleState || (LifecycleState = {}));
export default class Lifecycle {
    constructor() {
        this.state = LifecycleState.inactive;
        this.initCallbacks = new Array();
        this.foregroundCallbacks = new Array();
        this.backgroundCallbacks = new Array();
        this.addInitCallback = (cb) => this.initCallbacks.push(cb);
        this.addForegroundCallback = (cb) => this.foregroundCallbacks.push(cb);
        this.addBackgroundCallback = (cb) => this.backgroundCallbacks.push(cb);
    }
    start() { }
    ;
}
//# sourceMappingURL=Lifecycle.js.map