import Auth from "../Auth";


export default class Matrix extends Auth {
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;

    constructor(private updateAuthState, protected cognitoConfig) {
        super();
    }

    public async checkLocalAuth(){
       
    }

    public async signIn(email: string, password: string) {
       
        
    }

    public async signUp(email: string, password: string) {
       
    }

    public async confirmSignUp(email: string, confirmationCode: string) {
       
    }

    public async resendSignUpConfirmation(username: string) {
       
    }

    public async signOut() {
       
    }

}