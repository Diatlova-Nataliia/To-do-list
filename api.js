export class TaskApi {
  create(task) {
    const tasks = this.readAll();
    const id = this.generateId();
    const newTask = {
      ...task,
      id: id,
    };

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  readAll() {
    const tasksJson = localStorage.getItem("tasks");
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  read(taskId) {
    const currentTasks = this.readAll();
    return currentTasks.find((task) => task.id === taskId);
  }

  update(id, payload) {
    const tasks = this.readAll();
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      Object.assign(taskToUpdate, payload);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  delete(taskId) {
    const currentTasks = this.readAll();
    const filteredTasks = currentTasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }

  generateId() {
    const currentIdJson = localStorage.getItem("currentId");
    const currentId = currentIdJson ? parseInt(currentIdJson) : 0;
    const newId = currentId + 1;
    localStorage.setItem("currentId", JSON.stringify(currentId + 1));
    return newId;
  }
}
