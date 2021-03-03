import Constant from "./libs/Constant";
export declare enum PlatformState {
    Web = 0,
    Mobile = 1,
    Node = 2
}
export default class Platform extends Constant<PlatformState> {
    state: PlatformState;
    constructor();
    update(): void;
}
