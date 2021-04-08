import Auth from "../Auth";
export default class Matrix extends Auth {
    private updateAuthState;
    protected cognitoConfig: any;
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;
    constructor(updateAuthState: any, cognitoConfig: any);
    checkLocalAuth(): Promise<void>;
    signIn(email: string, password: string): Promise<void>;
    signUp(email: string, password: string): Promise<void>;
    confirmSignUp(email: string, confirmationCode: string): Promise<void>;
    resendSignUpConfirmation(username: string): Promise<void>;
    signOut(): Promise<void>;
}
