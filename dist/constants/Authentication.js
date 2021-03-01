var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { action, observable } from "mobx";
import Constant from "./Constant";
export var AuthenticationState;
(function (AuthenticationState) {
    AuthenticationState[AuthenticationState["SUCCESS"] = 0] = "SUCCESS";
    AuthenticationState[AuthenticationState["EMAIL_CONFIRMATION"] = 1] = "EMAIL_CONFIRMATION";
    AuthenticationState[AuthenticationState["EMAIL_CONFIRMATION_FAILED"] = 2] = "EMAIL_CONFIRMATION_FAILED";
    AuthenticationState[AuthenticationState["ERROR"] = 3] = "ERROR";
    AuthenticationState[AuthenticationState["UNKNOWN"] = 4] = "UNKNOWN";
})(AuthenticationState || (AuthenticationState = {}));
export default class Authentication extends Constant {
    constructor() {
        super(...arguments);
        this.state = AuthenticationState.UNKNOWN;
    }
    update(state) {
        this.state = state;
    }
}
__decorate([
    observable
], Authentication.prototype, "state", void 0);
__decorate([
    action
], Authentication.prototype, "update", null);
//# sourceMappingURL=Authentication.js.map