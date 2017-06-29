class ObserverList {
    constructor() {
        this.observers = [];
    }

    add(fn) {
        this.observers.push(fn);
    }

    remove(fn) {
        this.observers = this.observers.filter(observer => observer !== fn);
    }

    get(index) {
        return this.observers[index];
    }

    count() {
        return this.observers.length;
    }
}

class Task {
    constructor(data = {}) {
        this.name = data.name;
        this.priority = data.priority;
        this.project = data.project;
        this.user = data.user;
        this.completed = data.completed;
    }

    complete() {
        console.log(`completing task: ${this.name}`);

        this.completed = true;
    }

    save() {
        console.log(`saving task: ${this.name}`);
    }
}

class ObservableTask extends Task {
    constructor(data) {
        super(data);

        this.observers = new ObserverList();
    }

    addObserver(observer) {
        this.observers.add(observer);
    }

    removeObserver(observer) {
        this.observers.remove(observer);
    }

    notify(context) {
        const observersCount = this.observers.count();

        for (let i = 0; i < observersCount; i++) {
            this.observers.get(i)(context);
        }
    }

    save() {
        this.notify(this);

        super.save();
    }
}

function NotificationService() {
    const message = 'Notifying ';

    this.update = function update(task) {
        console.log(message + task.user + ' for task ' + task.name);
    };
}

function LoggingService() {
    const message = 'Logging ';

    this.update = function update(task) {
        console.log(message + task.user + ' for task ' + task.name);
    };
}

function AuditingService() {
    const message = 'Auditing ';

    this.update = function update(task) {
        console.log(message + task.user + ' for task ' + task.name);
    };
}

// Somewhere else
const task1 = new ObservableTask({ name: 'learn function programming', user: 'Jon' });

const notifications = new NotificationService();
const logging = new LoggingService();
const auditing = new AuditingService();

task1.addObserver(notifications.update);
task1.addObserver(logging.update);
task1.addObserver(auditing.update);

task1.save();

task1.removeObserver(auditing.update);
task1.save()
