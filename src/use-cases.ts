import { Credentials } from "./models/credentials";
import { ICredentialsStore } from "./store/credentials-store";
import { IMessagesStore } from "./store/messages-store";
import { Message } from "./models/message";

export class UseCases {
    constructor(
        private credentialsStore: ICredentialsStore, 
        private messagesStore: IMessagesStore) {
    }

    signup(username: string, password: string) {
        const credentials = Credentials.fromLogin(username, password);
        this.credentialsStore.add(credentials);
    }
    login(username: string, password: string) {
        const storedCredentials = this.credentialsStore.getByUsername(username);
        if (!storedCredentials) {
            throw new Error(`Invalid credentials for ${username}`);
        }
        const credentials = Credentials.fromLogin(username, password, storedCredentials.salt);
        if (credentials.hash !== storedCredentials.hash) {
            throw new Error(`Invalid credentials for ${username}`);
        }
    }
    saveUserMessage(username: string, key: string, messageStr: string) {
        const message = Message.fromKeyAndMessage(key, messageStr);
        this.messagesStore.saveByUsername(username, message);
    }
    loadUserMessage(username: string, key: string) {
        const message = this.messagesStore.getByUsername(username);
        if(!message) {
            throw new Error(`no message in store for ${username}`);
        }
        return message.decrypt(key);
    }
}