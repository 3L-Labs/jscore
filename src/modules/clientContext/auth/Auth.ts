
export default abstract class Auth { 
    protected idToken: string
    protected accessToken: string
    protected refreshToken: string
    protected abstract checkLocalAuth(): void
    public abstract async signIn(email: string, password: string): Promise<void>
    public abstract async signUp(email: string, password: string): Promise<void>
    public abstract async signOut(): Promise<void>
}