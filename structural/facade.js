function Task(data = {}) {
    this.name = data.name || '';
    this.priority = data.priority || Infinity;
    this.project = data.project || '';
    this.user = data.user || '';
    this.completed = data.completed || false;
    this.completedDate = data.completedDate || null;
}

// Service with a big complex API
const TaskService = {
    complete(task) {
        task.completed = true;
        console.log(`completing task: ${task.name}`);
    },
    setCompleteDate(task) {
        task.completedDate = new Date();
        console.log(`${task.name} completed on ${task.completedDate}`);
    },
    notifyCompletion(task, user) {
        console.log(`Notifying ${user} of the completion of ${task.name}`);
    },
    save(task) {
        console.log(`Saving task: ${task.name}`);
    }
};

const myTask = new Task({
    name: 'My Task',
    priority: 1,
    project: 'Courses',
    user: 'Jon',
    completed: false
});

// Using service directly
TaskService.complete(myTask);
if (myTask.completed === true) {
    TaskService.setCompleteDate(myTask);
    TaskService.notifyCompletion(myTask, myTask.user);
    TaskService.save(myTask);
}

// Using facade
const TaskServiceWrapper = {
    completeAndNotify(task) {
        TaskService.complete(myTask);

        if (myTask.completed === true) {
            TaskService.setCompleteDate(myTask);
            TaskService.notifyCompletion(myTask, myTask.user);
            TaskService.save(myTask);
        }
    }
};

TaskServiceWrapper.completeAndNotify(myTask);
