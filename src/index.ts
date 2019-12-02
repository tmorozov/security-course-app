import { InputHandler } from './input-handler';
import { Store } from './store';
import { Authentication } from './authentication';
import {
    command,
    username,
    password,
    db
} from './arguments';

const store = new Store(db || './db.json');
const auth = new Authentication(store);
const handler = new InputHandler(auth);

switch(command) {
    case 'login': 
        handler.login(username, password);
    break;
    case 'signup': 
        handler.signup(username, password);
    break;
    default: console.error('unsupported command');
}