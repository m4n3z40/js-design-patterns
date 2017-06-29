const repo = {
    tasks: {},

    commands: [],

    get(id) {
        console.log(`getting task ${id}`);

        return this.tasks[id];
    },

    save(task) {
        this.tasks[task.id] = task;

        console.log(`saving ${task.name} to the db`);
    },

    rawExecute(name, ...args) {
        if (repo[name]) {
            return repo[name].apply(repo, args);
        }
    },

    execute(name, ...args) {
        repo.commands.push({ name, args });

        this.rawExecute(name, ...args);
    },

    replay() {
        this.commands.forEach(({ name, args }) => this.rawExecute(name, ...args));
    }
}

repo.execute('save', {
    id: 1,
    name: 'Task 1',
    completed: false
});

repo.execute('save', {
    id: 2,
    name: 'Task 2',
    completed: false
});

repo.execute('save', {
    id: 3,
    name: 'Task 3',
    completed: false
});

repo.execute('save', {
    id: 4,
    name: 'Task 4',
    completed: false
});

console.log(repo.tasks);

repo.tasks = {};

console.log(repo.tasks);

repo.replay();

console.log(repo.tasks);
