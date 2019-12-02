import { Credentials } from "./credentials";
import { IStore } from "./store";

// use cases level
export class Authentication {
    constructor(private store: IStore) {}
    signup(credentials: Credentials) {
        this.store.add(credentials);
    }
    login(credentials: Credentials): boolean {
        return this.store.has(credentials);
    }
}