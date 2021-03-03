import Constant from "./libs/Constant";
export var PlatformState;
(function (PlatformState) {
    PlatformState[PlatformState["Web"] = 0] = "Web";
    PlatformState[PlatformState["Mobile"] = 1] = "Mobile";
    PlatformState[PlatformState["Node"] = 2] = "Node";
})(PlatformState || (PlatformState = {}));
export default class Platform extends Constant {
    constructor() {
        super();
        if (typeof document != 'undefined') {
            this.state = PlatformState.Web;
        }
        else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
            this.state = PlatformState.Mobile;
        }
        else {
            this.state = PlatformState.Node;
        }
    }
    update() { }
    ;
}
//# sourceMappingURL=Platform.js.map