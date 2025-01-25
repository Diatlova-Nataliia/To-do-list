import { TaskApi } from "./api.js";
import { getUrlParam } from "./utilities";

const taskApi = new TaskApi();
const form = document.getElementById("data-form");
const editedId = Number(getUrlParam("id"));

if (editedId) {
  window.fillForm(editedId);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const task = {};

  formData.forEach((value, key) => {
    task[key] = key === "fulfillment" ? Number(value) : value;
  });

  editedId ? taskApi.update(editedId, task) : taskApi.create(task);

  window.location.href = "index.html";
});

function fillForm(taskId) {
  const currentTasks = taskApi.readAll();
  const taskToUpdate = currentTasks.find((task) => task.id === taskId);

  for (const key in taskToUpdate) {
    const input = form.querySelector(`[name="${key}"]`);

    if (input) {
      input.value = taskToUpdate[key];
    }
  }
}

Object.assign(window, {
  fillForm,
});
