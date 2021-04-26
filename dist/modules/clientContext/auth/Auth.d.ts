export default abstract class Auth<T> {
    protected tokens: T;
    abstract checkLocalAuth(): Promise<boolean>;
    abstract signIn(email: string, password: string): Promise<void>;
    abstract signUp(email: string, password: string): Promise<void>;
    abstract signOut(): Promise<void>;
}
