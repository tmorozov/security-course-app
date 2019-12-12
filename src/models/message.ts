const crypto = require('crypto');
const ALGORITHM = 'aes-256-cbc';

export class Message {
    private constructor(private _iv: string, private _encryptedData: string) {}
    get iv() {
        return this._iv;
    }
    get encryptedData() {
        return this._encryptedData;
    }
    static fromStore(iv: string, encryptedData: string) {
        return new Message(iv, encryptedData);
    }
    static fromKeyAndMessage(key: string, message: string) {
        const iv = crypto.randomBytes(16);
        const key256 = crypto.createHmac('sha256', key).digest();
        const cipher = crypto.createCipheriv(ALGORITHM, key256, iv);
        let encryptedData = cipher.update(message);
        encryptedData = Buffer.concat([encryptedData, cipher.final()]);
        return new Message(iv.toString('hex'), encryptedData.toString('hex'));
    }

    decrypt(key: string): string {
        const iv = Buffer.from(this.iv, 'hex');
        const key256 = crypto.createHmac('sha256', key).digest();
        const encryptedText = Buffer.from(this.encryptedData, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, key256, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}