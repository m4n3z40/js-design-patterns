function Task(data = {}) {
    this.name = data.name || '';
    this.priority = data.priority || Infinity;
    this.project = data.project || '';
    this.user = data.user || '';
    this.completed = data.completed || false;
}

function TaskCollection() {
    const tasks = {};
    let count = 0;

    return {
        add(data) {
            tasks[data.name] = new Task(data);
            count++;
        },
        get(name) {
            return tasks[name];
        },
        getCount() {
            return count;
        }
    };
}

// const tasks = new TaskCollection();

const projects = ['none', 'courses', 'training', 'project'];
const priorities = [1, 2, 3, 4, 5];
const users = ['Jon', 'Erica', 'Amanda', 'Nathan'];
const completed = [true, false];

const initialMemory = process.memoryUsage().heapUsed;
const pick = arr => Math.floor(Math.random() * arr.length);

for (let i = 0; i < 100000; i++) {
    tasks.add({
        name: `task-${i}`,
        priority: pick(priorities),
        project: pick(projects),
        user: pick(users),
        completed: pick(completed)
    });
}

const afterMemory = process.memoryUsage().heapUsed;

// // High memory footprint using collections
console.log(`used memory ${(afterMemory - initialMemory) / 1000000}`);
console.log(`tasks: ${tasks.getCount()}`);


// Flyweight implementation
function Flyweight({ project, priority, user, completed }) {
    this.priority = priority;
    this.project = project;
    this.user = user;
    this.completed = completed;
}

const FlyweightFactory = (() => {
    const flyweights = {};

    function get({ project, priority, user, completed }) {
        const flyKey = project + priority + user + completed;

        if (!flyweights[flyKey]) {
            flyweights[flyKey] = new Flyweight({ project, priority, user, completed });
        }

        return flyweights[flyKey];
    }

    function getCount() {
        let count = 0;

        for (let f in flyweights) count++;

        return count;
    }

    return { get, getCount };
})();

function FlyweightTask(data = {}) {
    this.flyweight = FlyweightFactory.get(data);
    this.name = data.name || '';
}

const initialMemoryFlightweight = process.memoryUsage().heapUsed;
const flyweightTasks = new TaskCollection;

for (let i = 0; i < 100000; i++) {
    flyweightTasks.add({
        name: `task-${i}`,
        priority: pick(priorities),
        project: pick(projects),
        user: pick(users),
        completed: pick(completed)
    });
}

const afterMemoryFlightweight = process.memoryUsage().heapUsed;

// High memory footprint using collections
console.log(`used memory ${(initialMemoryFlightweight - afterMemoryFlightweight) / 1000000}`);
console.log(`tasks: ${flyweightTasks.getCount()}`);
console.log(`flyweights: ${FlyweightFactory.getCount()}`);
