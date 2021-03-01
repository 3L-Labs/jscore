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
import { CoreConstants } from "../../../../Core";
import { PlatformState } from "../../../../constants/Platform";
import { AuthenticationState } from "../../../../constants/Authentication";
export default class Cognito extends Auth {
    constructor(updateAuthState, cognitoConfig, amazonCognitoDependencies) {
        super();
        this.updateAuthState = updateAuthState;
        this.cognitoConfig = cognitoConfig;
        this.amazonCognitoDependencies = amazonCognitoDependencies;
        this._amplify = amazonCognitoDependencies.amplify;
        this._auth = amazonCognitoDependencies.auth;
        let amplifyAuthConfig = {
            region: cognitoConfig.REGION,
            userPoolId: cognitoConfig.USER_POOL_ID,
            userPoolWebClientId: cognitoConfig.APP_CLIENT_ID,
        };
        if (CoreConstants.Platform.state === PlatformState.Web) {
            amplifyAuthConfig = Object.assign(Object.assign({}, amplifyAuthConfig), {
                cookieStorage: {
                    domain: window.location.hostname,
                    path: '/',
                    expires: 365,
                    secure: false
                }
            });
        }
        this._amplify.configure({
            Auth: amplifyAuthConfig
        });
    }
    checkLocalAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._auth.currentAuthenticatedUser();
            const tokens = yield this._auth.currentSession();
            this.idToken = tokens.getIdToken().getJwtToken();
            this.accessToken = tokens.getAccessToken().getJwtToken();
            this.refreshToken = tokens.getRefreshToken().getToken();
            this.updateAuthState(AuthenticationState.SUCCESS, response, response.username);
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._auth.signIn(email, password);
                const tokens = yield this._auth.currentSession();
                this.idToken = tokens.getIdToken().getJwtToken();
                this.accessToken = tokens.getAccessToken().getJwtToken();
                this.refreshToken = tokens.getRefreshToken().getToken();
                this.updateAuthState(AuthenticationState.SUCCESS, response, email);
            }
            catch (e) {
                console.log("Auth sign in error : ", e);
                this.updateAuthState(AuthenticationState.ERROR);
                throw e;
            }
        });
    }
    signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._auth.signUp({
                    username: email,
                    password: password
                });
                this.updateAuthState(AuthenticationState.EMAIL_CONFIRMATION, undefined, email);
            }
            catch (e) {
                console.log("Auth sign up error : ", e);
                this.updateAuthState(AuthenticationState.ERROR);
                throw e;
            }
        });
    }
    confirmSignUp(email, confirmationCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._auth.confirmSignUp(email, confirmationCode);
                this.updateAuthState(AuthenticationState.SUCCESS, response, email);
            }
            catch (e) {
                console.log("Auth confrim error : ", e);
                this.updateAuthState(AuthenticationState.EMAIL_CONFIRMATION_FAILED);
                throw e;
            }
        });
    }
    resendSignUpConfirmation(username) {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateAuthState(AuthenticationState.EMAIL_CONFIRMATION, undefined, username);
            try {
                yield this._auth.resendSignUp(username);
            }
            catch (e) {
                console.log("Auth resend confirm error : ", e);
                throw e;
            }
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._auth.signOut();
        });
    }
}
//# sourceMappingURL=Cognito.js.map