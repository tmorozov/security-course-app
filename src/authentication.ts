import { Credentials } from "./credentials";
import { IStore } from "./store";

// use cases level
export class Authentication {
    constructor(private store: IStore) {}
    signup(username: string, password: string) {
        const credentials = Credentials.fromLogin(username, password);
        this.store.add(credentials);
    }
    login(username: string, password: string): boolean {
        const storedCredentials = this.store.getByUsername(username);
        if (!storedCredentials) {
            return false;
        }
        const credentials = Credentials.fromLogin(username, password, storedCredentials.salt);
        return credentials.hash === storedCredentials.hash;
    }
}