export interface Task {
  name?: string;
  description?: string;
  category?: string;
  date?: string;
  time?: string;
  priority?: string;
  fulfillment?: number;
  id?: number;
}

export class TaskApi {
  create(task: Task) {
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

  read(taskId: number) {
    const currentTasks = this.readAll();
    return currentTasks.find((task: Task) => task.id === taskId);
  }

  update(id: number, payload: Omit<Task, "id">) {
    const tasks = this.readAll();
    const taskToUpdate = tasks.find((task: Task) => task.id === id);
    if (taskToUpdate) {
      Object.assign(taskToUpdate, payload);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  delete(taskId: number) {
    const currentTasks = this.readAll();
    const filteredTasks = currentTasks.filter(
      (task: Task) => task.id !== taskId,
    );
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
