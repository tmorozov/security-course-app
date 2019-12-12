import { Message } from "../models/message";
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { CollectionChain } from "lodash";
import { Db } from "./db";

export interface IMessagesStore {
    saveByUsername(username: string, message: Message): void,
    getByUsername(username: string): Message | undefined;
}

const COLLECTION_NAME = 'messages';
export class MessagesStore implements IMessagesStore {
    private collection: CollectionChain<any>;
    constructor(db: Db) {
        this.collection = db.getCollection(COLLECTION_NAME);
    }
    saveByUsername(username: string, message: Message) {
        this.collection
        .remove({username})
        .write();

        this.collection
        .push({
            username,
            iv: message.iv,
            encryptedData: message.encryptedData
        })
        .write();
    }
    getByUsername(username: string) {
        const value = this.collection.find({username}).value();

        if (value) {
            return Message.fromStore(value.iv, value.encryptedData)
        }
    }
}