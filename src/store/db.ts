import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { CollectionChain } from "lodash";

export class Db {
    private db: low.LowdbSync<any>;
    constructor(dbPath: string) {
        const adapter = new FileSync(dbPath);
        this.db = low(adapter);        
    }
    getCollection(collectionName: string): CollectionChain<any> {
        const collection = this.db.has(collectionName).value();
        if(!collection) {
            this.db.set(collectionName, []).write();
        }
        return this.db.get(collectionName) as CollectionChain<any>;
    }
}