import Lifecycle from "../Lifecycle";
export interface MobileLifecycleDependencies {
    AppState: any;
}
export default class MobileLifecycle extends Lifecycle {
    private dependencies;
    constructor(dependencies: MobileLifecycleDependencies);
    protected start(): void;
}
