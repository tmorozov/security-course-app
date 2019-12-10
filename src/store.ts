import { Credentials } from "./credentials";
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { CollectionChain } from "lodash";

export interface IStore {
    add(credentials: Credentials): void,
    getByUsername(username: string): Credentials | undefined;
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
        if (!!this.getByUsername(credentials.username)) {
            throw new Error(`Already exists ${credentials.username}`);
        }
        this.collection
            .push({ 
                username: credentials.username,
                hash: credentials.hash,
                salt: credentials.salt
            })
            .write()
    }
    getByUsername(username: string) {
        const value = this.collection.find({ username }).value();

        if (value) {
            return Credentials.fromStore(value.username, value.hash, value.salt)
        }
    }
}