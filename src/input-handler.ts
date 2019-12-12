import { UseCases } from "./use-cases";

export class InputHandler {
    constructor(private facade: UseCases) {}
    
    signup(username: string, password: string) {
        try {
            this.facade.signup(username, password);    
            console.log(`Signup ${username} success`);
        } catch (e) {
            console.error(e.message);
        }
    }

    login(username: string, password: string) {
        try {
            this.facade.login(username, password)
            console.log(`Login ${username} success`);
        } catch (e) {
            console.error(e.message);
        }
    }

    saveMessage(username: string, password: string, message: string) {
        try {
            this.facade.login(username, password);
            this.facade.saveUserMessage(username, password, message);
            console.log(`Message stored for ${username}`);
        } catch (e) {
            console.error(e.message);
        }
    }

    loadMessage(username: string, password: string) {
        try {
            this.facade.login(username, password);
            const messgeStr = this.facade.loadUserMessage(username, password);
            console.log(`Message: ${messgeStr}`);
        } catch (e) {
            console.error(e.message);
        }
    }
}