export interface Authenticator {
    signUp(email: string, password: string, name: string);
    login(email: string, password: string);
    logout(email:string);
}
