var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthenticationState } from "../../../../constants/Authentication";
import Auth from "../Auth";
export default class Matrix extends Auth {
    constructor(updateAuthState, cognitoConfig, matrix) {
        super();
        this.updateAuthState = updateAuthState;
        this.cognitoConfig = cognitoConfig;
        this.matrix = matrix;
    }
    checkLocalAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("checkign local auth!!");
            try {
                const accessToken = yield this.matrix.client.getAccessToken();
                if (accessToken) {
                    this.updateAuthState(AuthenticationState.SUCCESS);
                    return true;
                }
            }
            catch (e) {
                this.updateAuthState(AuthenticationState.ERROR);
            }
            this.updateAuthState(AuthenticationState.UNKNOWN);
            return false;
        });
    }
    signIn(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.matrix.client.login("m.login.password", {
                    "user": username,
                    "password": password
                });
                this.tokens = response;
                window.localStorage.setItem("matrix", JSON.stringify(this.tokens));
                this.updateAuthState(AuthenticationState.SUCCESS);
            }
            catch (e) {
                this.updateAuthState(AuthenticationState.ERROR);
            }
        });
    }
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    confirmSignUp(email, confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    resendSignUpConfirmation(username) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=Matrix.js.map