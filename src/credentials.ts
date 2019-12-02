
export class Password {
    private _hash: string;
    constructor(_password: string) {
        // TODO: implement hashing
        this._hash = _password;
    }
    get hash() {
        return this._hash
    }
}

export class Credentials {
    private _username: string;
    private _password: Password;
    constructor(username: string, password: string) {
        // TODO: improve vaildation
        if (!username || !password) {
            throw new Error('invalid credentials')
        }
        this._username = username;
        this._password = new Password(password);
    }

    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
}