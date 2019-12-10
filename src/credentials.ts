
const crypto = require('crypto');

export class Credentials {
    private constructor(
        private _username: string, 
        private _hash: string, 
        private _salt: string) {}

    get username() {
        return this._username;
    }

    get hash() {
        return this._hash
    }

    get salt() {
        return this._salt
    }

    static generateSalt(): string {
        return crypto.randomBytes(64).toString('hex');
    }

    static fromLogin(username: string, password: string, salt?: string): Credentials {
        // TODO: improve vaildation
        if (!username || !password) {
            throw new Error('invalid credentials')
        }

        salt = salt || Credentials.generateSalt();
        const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');;

        return new Credentials(username, hash, salt);
    }

    static fromStore(username: string, hash: string, salt: string): Credentials {
        return new Credentials(username, hash, salt);
    }
}