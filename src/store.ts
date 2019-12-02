import { Credentials } from "./credentials";
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { CollectionChain } from "lodash";

export interface IStore {
    add(credentials: Credentials): void,
    has(credentials: Credentials): boolean
}

const COLLECTION_NAME = 'credentials';
export class Store implements IStore {
    private collection: CollectionChain<any>;
    constructor(dbPath: string) {
        const adapter = new FileSync(dbPath);
        const db = low(adapter);

        db.defaults({ [COLLECTION_NAME]: []}).write();
        this.collection = db.get(COLLECTION_NAME) as CollectionChain<any>;
    }
    add(credentials: Credentials) {
        if (this.doesKeyExist('username', credentials.username)) {
            throw new Error(`Already exists ${credentials.username}`);
        }
        this.collection
            .push({ 
                username: credentials.username,
                passwordHash: credentials.password.hash
            })
            .write()
    }
    has(credentials: Credentials): boolean {
        const raw = this.collection.find({ 
            username: credentials.username,
            passwordHash: credentials.password.hash
         })
        .value()
        return !!raw;
    }
    private doesKeyExist(key: string, value: any) {
        return !! this.collection.find({ 
            [key]: value,
         })
        .value()
    }
}