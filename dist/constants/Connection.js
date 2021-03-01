var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, observable } from "mobx";
import Constant from "./Constant";
export var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["ERROR"] = 0] = "ERROR";
    ConnectionState[ConnectionState["CONNECTED"] = 1] = "CONNECTED";
    ConnectionState[ConnectionState["DISCONNECTED"] = 2] = "DISCONNECTED";
    ConnectionState[ConnectionState["UNKNOWN"] = 3] = "UNKNOWN";
})(ConnectionState || (ConnectionState = {}));
export default class Connection extends Constant {
    constructor() {
        super(...arguments);
        this.state = ConnectionState.UNKNOWN;
    }
    update(state) {
        this.state = state;
    }
}
__decorate([
    observable
], Connection.prototype, "state", void 0);
__decorate([
    action
], Connection.prototype, "update", null);
//# sourceMappingURL=Connection.js.map