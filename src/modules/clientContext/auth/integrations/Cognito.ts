import Auth from "../Auth";
import { CoreConstants } from "../../../../Core";
import { PlatformState } from "../../../../constants/Platform";
import { AuthenticationState } from "../../../../constants/Authentication";

export interface AmazonCognitoInjection {
  amplify: any,
  auth: any
}

//(window as any).LOG_LEVEL = 'DEBUG' -> Enable this if you want more logging from Cognito
export default class Cognito extends Auth {
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;
    private _amplify;
    private _auth;

    constructor(private updateAuthState, protected cognitoConfig, protected amazonCognitoDependencies: AmazonCognitoInjection) {
        super();

        this._amplify = amazonCognitoDependencies.amplify;
        this._auth = amazonCognitoDependencies.auth;

        let amplifyAuthConfig = {
            region: cognitoConfig.REGION,
            userPoolId: cognitoConfig.USER_POOL_ID,
            userPoolWebClientId: cognitoConfig.APP_CLIENT_ID,
        }

        if (CoreConstants.platform.state === PlatformState.Web) {
            amplifyAuthConfig = {...amplifyAuthConfig, ...{
                cookieStorage: {
                // REQUIRED - Cookie domain (only required if cookieStorage is provided)
                    domain: window.location.hostname,
                // OPTIONAL - Cookie path
                    path: '/',
                // OPTIONAL - Cookie expiration in days
                    expires: 365,
                // OPTIONAL - Cookie secure flag
                // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
                    secure: false
                }
            }}
        }

        this._amplify.configure({
            Auth : amplifyAuthConfig
        })

    }

    protected async checkLocalAuth(){
        const response = await this._auth.currentAuthenticatedUser()

        const tokens = await this._auth.currentSession()
        this.idToken = tokens.getIdToken().getJwtToken();
        this.accessToken = tokens.getAccessToken().getJwtToken();
        this.refreshToken = tokens.getRefreshToken().getToken();

        this.updateAuthState(AuthenticationState.success, response, response.username);
    }

    public async signIn(email: string, password: string) {
        try {
            const response = await this._auth.signIn(email, password);
            const tokens = await this._auth.currentSession()
            this.idToken = tokens.getIdToken().getJwtToken();
            this.accessToken = tokens.getAccessToken().getJwtToken();
            this.refreshToken = tokens.getRefreshToken().getToken();

            this.updateAuthState(AuthenticationState.success, response, email);
		} catch (e) {
            console.log("Auth sign in error : ", e);
            this.updateAuthState(AuthenticationState.failed);
            throw e;
        }
        
    }

    public async signUp(email: string, password: string) {
        try {
			await this._auth.signUp({
				username: email,
				password: password
            });
            this.updateAuthState(AuthenticationState.emailConfirmation, undefined, email);
		} catch (e) {
            console.log("Auth sign up error : ", e)
            this.updateAuthState(AuthenticationState.failed);
            throw e;
		}
    }

    public async confirmSignUp(email: string, confirmationCode: string) {
        try {
			const response = await this._auth.confirmSignUp(email, confirmationCode)
            this.updateAuthState(AuthenticationState.success, response, email);
		} catch (e) {
            console.log("Auth confrim error : ", e)
            this.updateAuthState(AuthenticationState.emailConfirmationFailed);
            throw e;
		}
    }

    public async resendSignUpConfirmation(username: string) {
        this.updateAuthState(AuthenticationState.emailConfirmation, undefined, username);
        try {
            await this._auth.resendSignUp(username);
        } catch (e) {
            console.log("Auth resend confirm error : ", e)
           throw e; 
        }
    }

    public async signOut() {
       await this._auth.signOut(); 
    }

}