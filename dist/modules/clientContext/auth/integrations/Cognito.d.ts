import Auth from "../Auth";
export interface AmazonCognitoInjection {
    amplify: any;
    auth: any;
}
export default class Cognito extends Auth {
    private updateAuthState;
    protected cognitoConfig: any;
    protected amazonCognitoDependencies: AmazonCognitoInjection;
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;
    private _amplify;
    private _auth;
    constructor(updateAuthState: any, cognitoConfig: any, amazonCognitoDependencies: AmazonCognitoInjection);
    protected checkLocalAuth(): Promise<void>;
    signIn(email: string, password: string): Promise<void>;
    signUp(email: string, password: string): Promise<void>;
    confirmSignUp(email: string, confirmationCode: string): Promise<void>;
    resendSignUpConfirmation(username: string): Promise<void>;
    signOut(): Promise<void>;
}
