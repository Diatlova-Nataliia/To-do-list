const saveButton= document.getElementById("save-btn");
const form = document.getElementById("data-form");

const API = {
    create(task) {

        const tasks = API.readAll();
        const id = API.generateId()
        const newTask = {
            ...task,
            id: id
        };

        tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    },

    read(taskId) {
        const currentTasks = API.readAll();
        return currentTasks.find(task => task.id === taskId);
    },

    readAll() {
        const tasksJson = localStorage.getItem("tasks")
        return tasksJson ? JSON.parse(tasksJson) : [];
    },

    update(id, payload) {
        const tasks = API.readAll();
        const taskToUpdate = tasks.find(task => task.id === id);
        if (taskToUpdate) {
            Object.assign(taskToUpdate, payload);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },

    delete(taskId) {
        const currentTasks = API.readAll();
        const filteredTasks = currentTasks.filter(task => task.id !== taskId);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    },

    generateId() {
        const currentIdJson = localStorage.getItem("currentId")
        const currentId =  currentIdJson ? parseInt(currentIdJson) : 0;
        const newId = currentId + 1;
        localStorage.setItem("currentId", JSON.stringify(currentId + 1));
        return newId;
    }
}


const params = new URLSearchParams(window.location.search);
const idParam = params.get("id");
const editedId = Number(idParam);


if (editedId) {
    fillForm(editedId);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const task = {};

    formData.forEach((value, key) => {
        task[key] = key === "fulfillment" ? Number(value) : value;
    });

    editedId ? API.update(editedId, task) : API.create(task);

    window.location.href = "index.html";
})

function fillForm(taskId) {
    const currentTasks = API.readAll();
    const taskToUpdate = currentTasks.find(task => task.id === taskId);

    for (const key in taskToUpdate) {
        const input = form.querySelector(`[name="${key}"]`);

        if (input) {
            input.value = taskToUpdate[key];
        }
    }
}



