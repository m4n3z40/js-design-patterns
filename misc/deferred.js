const STATUS_PENDING = 'pending';
const STATUS_RESOLVED = 'resolved';
const STATUS_FAILED = 'failed';

class Deferred {
    constructor() {
        this._data = null;
        this._doneHandlers = []];
        this._failHandlers = [];
        this._status = STATUS_PENDING;
    }

    done(handler) {
        this._doneHandlers.push(handler);

        if (this._status === STATUS_RESOLVED) {
            handler(this._data);
        }

        return this;
    }

    failed() {
        this._failHandlers.push(handler);

        if (this._status === STATUS_FAILED) {
            handler(this._data);
        }

        return this;
    }

    resolve(result) {
        if (this._status !== STATUS_PENDING) {
            throw new Error(`Deferred has already been resolved with status '${this._status}'`);
        }

        this._status = STATUS_RESOLVED;
        this._data = result;
        
        this._doneHandlers.forEach(handler => handler(result));
    }

    fail(reason) {
        if (this._status !== STATUS_PENDING) {
            throw new Error(`Deferred has already been resolved with status '${this._status}'`);
        }

        this._status = STATUS_FAILED;
        this._data = reason;
        
        this._failHandlers.forEach(handler => handler(reason));
    }
}