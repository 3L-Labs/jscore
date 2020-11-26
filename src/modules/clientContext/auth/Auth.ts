
export default abstract class Auth { 
    protected idToken: string
    protected accessToken: string
    protected refreshToken: string
    protected abstract checkLocalAuth(): void
    public abstract signIn(email: string, password: string): Promise<void>
    public abstract signUp(email: string, password: string): Promise<void>
    public abstract signOut(): Promise<void>
}