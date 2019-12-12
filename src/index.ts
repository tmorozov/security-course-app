import { InputHandler } from './input-handler';
import { CredentialsStore } from './store/credentials-store';
import { MessagesStore } from './store/messages-store';
import { UseCases } from './use-cases';
import { Db } from './store/db';
import {
    command,
    username,
    password,
    message,
    db
} from './arguments';

const store = new Db(db || './db.json');
const credentialsStore = new CredentialsStore(store);
const messagesStore = new MessagesStore(store);
const facade = new UseCases(credentialsStore, messagesStore);
const handler = new InputHandler(facade);

switch(command) {
    case 'login': 
        handler.login(username, password);
    break;
    case 'signup': 
        handler.signup(username, password);
    break;
    case 'save': 
        handler.saveMessage(username, password, message);
    break;
    case 'load': 
        handler.loadMessage(username, password);
    break;
    default: console.error('unsupported command');
}