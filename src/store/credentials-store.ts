import { Credentials } from "../models/credentials";
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { CollectionChain } from "lodash";
import { Db } from "./db";

export interface ICredentialsStore {
    add(credentials: Credentials): void,
    getByUsername(username: string): Credentials | undefined;
}

const COLLECTION_NAME = 'credentials';
export class CredentialsStore implements ICredentialsStore {
    private collection: CollectionChain<any>;
    constructor(db: Db) {
        this.collection = db.getCollection(COLLECTION_NAME);
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