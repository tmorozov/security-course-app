import { Authentication } from "./authentication";
import { Credentials } from "./credentials";

export class InputHandler {
    constructor(private auth: Authentication) {}
    
    signup(username: string, password: string) {
        try {
            const credentials = new Credentials(username, password);
            this.auth.signup(credentials);    
            console.log(`Signup ${credentials.username} success`);
        } catch (e) {
            console.error(e.message);
        }
    }
    login(username: string, password: string) {
        try {
            const credentials = new Credentials(username, password);
            if (this.auth.login(credentials)) {
                console.log(`Login ${credentials.username} success`);
            } else {
                console.log(`Login ${credentials.username} failed`);
            }
        } catch (e) {
            console.error(e.message);
        }
    }
}