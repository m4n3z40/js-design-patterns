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

const mediator = (() => {
    const channels = {};

    function subscribe(channel, context, fn) {
        if (!channels[channel]) {
            channels[channel] = [];
        }

        channels[channel].push({ context, fn });
    }

    function publish(channel, ...args) {
        if (!channels[channel]) {
            return false;
        }

        channels[channel].forEach(({ context, fn }) => fn.apply(context, args));
    }

    return { subscribe, publish };
})();

// Somewhere else
const task1 = new Task({ name: 'learn function programming', user: 'Jon' });

const notifications = new NotificationService();
const logging = new LoggingService();
const auditing = new AuditingService();

mediator.subscribe('complete', notifications, notifications.update);
mediator.subscribe('complete', logging, logging.update);
mediator.subscribe('complete', auditing, auditing.update);

task1.complete = function complete() {
    Task.prototype.complete.call(this);

    mediator.publish('complete', this);
};

task1.complete();
