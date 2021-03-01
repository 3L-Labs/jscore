export default abstract class Auth {
    protected idToken: string;
    protected accessToken: string;
    protected refreshToken: string;
    protected abstract checkLocalAuth(): void;
    abstract signIn(email: string, password: string): Promise<void>;
    abstract signUp(email: string, password: string): Promise<void>;
    abstract signOut(): Promise<void>;
}
