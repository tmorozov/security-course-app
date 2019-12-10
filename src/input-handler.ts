import { Authentication } from "./authentication";

export class InputHandler {
    constructor(private auth: Authentication) {}
    
    signup(username: string, password: string) {
        try {
            this.auth.signup(username, password);    
            console.log(`Signup ${username} success`);
        } catch (e) {
            console.error(e.message);
        }
    }
    login(username: string, password: string) {
        try {
            if (this.auth.login(username, password)) {
                console.log(`Login ${username} success`);
            } else {
                console.log(`Login ${username} failed`);
            }
        } catch (e) {
            console.error(e.message);
        }
    }
}