import Auth from "../Auth";
export interface AmazonCognitoInjection {
    amplify: any;
    auth: any;
}
interface CognitoTokens {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}
export default class Cognito extends Auth<CognitoTokens> {
    private updateAuthState;
    protected cognitoConfig: any;
    protected amazonCognitoDependencies: AmazonCognitoInjection;
    private _amplify;
    private _auth;
    constructor(updateAuthState: any, cognitoConfig: any, amazonCognitoDependencies: AmazonCognitoInjection);
    checkLocalAuth(): Promise<boolean>;
    signIn(email: string, password: string): Promise<void>;
    signUp(email: string, password: string): Promise<void>;
    confirmSignUp(email: string, confirmationCode: string): Promise<void>;
    resendSignUpConfirmation(username: string): Promise<void>;
    signOut(): Promise<void>;
}
export {};
