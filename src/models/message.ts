const crypto = require('crypto');
const ALGORITHM = 'aes-256-cbc-hmac-sha1';

export class Message {
    private constructor(private _iv: string, private _encryptedData: string, private _salt: string) {}
    get iv() {
        return this._iv;
    }
    get salt() {
        return this._salt;
    }
    get encryptedData() {
        return this._encryptedData;
    }

    static generateSalt(): string {
        return crypto.randomBytes(32).toString('hex');
    }
    static generateKey(key: string, salt: string): string {
        return crypto.pbkdf2Sync(key, salt, 80000, 32, 'sha256');
    }

    static fromStore(iv: string, encryptedData: string, salt: string) {
        return new Message(iv, encryptedData, salt);
    }
    static fromKeyAndMessage(key: string, message: string) {
        const iv = crypto.randomBytes(16);
        // const key256 = crypto.createHmac('sha256', key).digest();

        const salt = Message.generateSalt();
        const key256 = Message.generateKey(key, salt);

        const cipher = crypto.createCipheriv(ALGORITHM, key256, iv);
        let encryptedData = cipher.update(message);
        encryptedData = Buffer.concat([encryptedData, cipher.final()]);
        return new Message(iv.toString('hex'), encryptedData.toString('hex'), salt);
    }

    decrypt(key: string): string {
        const iv = Buffer.from(this.iv, 'hex');
        const encryptedText = Buffer.from(this.encryptedData, 'hex');
        const key256 = Message.generateKey(key, this.salt);

        const decipher = crypto.createDecipheriv(ALGORITHM, key256, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}