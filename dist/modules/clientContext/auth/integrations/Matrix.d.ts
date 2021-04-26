import Auth from "../Auth";
interface MatrixTokens {
    accessToken: string;
}
export default class Matrix extends Auth<MatrixTokens> {
    private updateAuthState;
    protected cognitoConfig: any;
    private matrix;
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;
    constructor(updateAuthState: any, cognitoConfig: any, matrix: any);
    checkLocalAuth(): Promise<boolean>;
    signIn(username: string, password: string): Promise<void>;
    signUp(email: string, password: string): Promise<void>;
    confirmSignUp(email: string, confirmationCode: string): Promise<void>;
    resendSignUpConfirmation(username: string): Promise<void>;
    signOut(): Promise<void>;
}
export {};
