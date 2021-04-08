var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Auth from "../Auth";
export default class Matrix extends Auth {
    constructor(updateAuthState, cognitoConfig) {
        super();
        this.updateAuthState = updateAuthState;
        this.cognitoConfig = cognitoConfig;
    }
    checkLocalAuth() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
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