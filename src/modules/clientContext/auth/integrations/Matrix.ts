import { AuthenticationState } from "../../../../constants/Authentication";
import Auth from "../Auth";

interface MatrixTokens {
    accessToken: string;
}

export default class Matrix extends Auth<MatrixTokens> {
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;

    constructor(
        private updateAuthState,
        protected cognitoConfig,
        private matrix
    ) {
        super();
    }

    public async checkLocalAuth(){

        return true;
    }

    public async signIn(username: string, password: string) {
        try {
            /*
            const response = await this.matrix.client.login(
                "m.login.password", 
                    {
                        "user": username,
                        "password": password
                    }
                );
            this.tokens.accessToken = response.access_token;*/
            this.updateAuthState(AuthenticationState.SUCCESS);
        } catch (e) {
            this.updateAuthState(AuthenticationState.ERROR);
        }
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