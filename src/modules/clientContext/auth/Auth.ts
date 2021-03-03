export default abstract class Auth { 

    //TODO: Create generic object for token options
    protected idToken: string
    protected accessToken: string
    protected refreshToken: string

    public abstract checkLocalAuth(): void
    public abstract signIn(email: string, password: string): Promise<void>
    public abstract signUp(email: string, password: string): Promise<void>
    public abstract signOut(): Promise<void>

}