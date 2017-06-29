function TaskRepo(db) {
    let ids = 0;

    return {
        getAll() {
            return Object.values(db.tasks);
        },
        get(id) {
            return db.tasks[id];
        },
        save(task) {
            if (!task.id) {
                task.id = ++ids;
            }

            db.tasks[task.id] = task;
        },
        delete(id) {
            delete db.tasks[id];
        }
    };
}

// Using it
const db = { tasks: {} };
const repo = TaskRepo(db);

console.log(repo.get(1));
