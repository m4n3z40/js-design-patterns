// Default implementation
function Task(title, description = '', done = false) {
    this.title = function titleProp(value) {
        if (value === undefined) {
            return title;
        }

        title = value;
    };

    this.description = function descriptionProp(value) {
        if (value === undefined) {
            return title;
        }

        description = value;
    };

    this.isDone = function isDone() {
        return done;
    };

    this.toggle = function toggle() {
        done = !done;
    };
}

// Prototypes implementation
function Task(title, description = '', done = false) {
    this._title = title;
    this._description = description;
    this._done = done;
}

Task.prototype.title = function titleProp(value) {
    if (value === undefined) {
        return this._title;
    }

    this._title = value;
};

Task.prototype.description = function descriptionProp(value) {
    if (value === undefined) {
        return this._description;
    }

    this._description = value;
};

Task.prototype.isDone = function isDone() {
    return this._done;
};

Task.prototype.toggle = function toggle() {
    this._done = !this._done;
};

// Class implementation
class Task {
    constructor(title, description = '', done = false) {
        this._title = title;
        this._description = description;
        this._done = done;
    }

    title(value) {
        if (value === undefined) {
            return this._title;
        }

        this._title = value;
    }

    description(value) {
        if (value === undefined) {
            return this._description;
        }

        this._description = value;
    }

    isDone() {
        return this._done;
    }

    toggle() {
        this._done = !this._done;
    }
}

// Using it
const task = new Task('learn scala', 'learn scala to improve FP knowledge');

console.log(task.title(), task.isDone());

task.toggle();

console.log(task.title(), task.isDone());
