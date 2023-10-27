import { paintTasks, Task, paintItemsLeft, activeSelected } from "./js/utils.js";

window.location.hash = "#/";

let tasks = [];
const containerTasks = document.querySelector(".todo-list");
let id = 0 

const dataLocalStorage = JSON.parse(localStorage.getItem("mydayapp-js"));
if (dataLocalStorage) {
  tasks = dataLocalStorage[0]
  id = dataLocalStorage[1]
}

paintTasks(tasks, containerTasks);

// Validamos si hay tareas en la lista tasks
if (tasks.length == 0) {
  document.querySelector(".footer").style.display = "none";
  document.querySelector(".main").style.display = "none";
}

// Evento que agregara una nueva tarea
const li = document.querySelector(".new-todo");
li.addEventListener("keydown", (e) => {
  if (e.keyCode == 13 && e.target.value != "") {
    const nameTask = li.value;

    const task = new Task(id, nameTask, false);
    tasks = [...tasks, task];

    paintTasks(tasks, containerTasks);

    document.querySelector(".footer").style.display = "block";
    document.querySelector(".main").style.display = "block";

    li.value = "";

    id++;
    localStorage.setItem("mydayapp-js", JSON.stringify([tasks, id]));
  }
});

// Marcar una tarea
containerTasks.addEventListener("click", (e) => {
  if (e.target.className == "toggle") {
    const containerElement = e.target.parentElement;
    const idTask = parseInt(containerElement.id.slice(1));

    tasks
      .filter((task) => task.id == idTask)
      .forEach((task) => (task.state = !task.state));

    localStorage.setItem("mydayapp-js", JSON.stringify([tasks, id]));
    document.getElementById(idTask).classList.toggle("completed");

    paintItemsLeft(tasks);
  }

  // Eliminar un tarea
  if (e.target.className == "destroy") {
    const containerElement = e.target.parentElement;
    const idTask = parseInt(containerElement.id.slice(1));

    tasks = tasks.filter((task) => task.id !== idTask);
    paintTasks(tasks, containerTasks);
    console.log(tasks);

    localStorage.setItem("mydayapp-js", JSON.stringify([tasks, id]));

    if (tasks.length == 0) {
      document.querySelector(".footer").style.display = "none";
      document.querySelector(".main").style.display = "none";
    }
  }
});

// Activar editar tarea
containerTasks.addEventListener("dblclick", (e) => {
  if (e.target.tagName == "LABEL") {
    const containerElement = e.target.parentElement;
    const idTask = parseInt(containerElement.id.slice(1));

    const containerTarea = document.getElementById(idTask);
    containerTarea.classList.add("editing");
    const inputUpdate = document.getElementById(`${idTask}c`);
    inputUpdate.focus();
    inputUpdate.setSelectionRange(
      inputUpdate.value.length,
      inputUpdate.value.length
    );
  }
});

// Editar tarea
containerTasks.addEventListener("keydown", (e) => {
  // Cancelar edicion
  if (e.target.className == "edit" && e.keyCode == 27) {
    const containerElement = e.target.parentElement;
    containerElement.classList.remove("editing");
    paintTasks(tasks, containerTasks);
  }
  // Aceptar la edicion
  if (e.target.className == "edit" && e.keyCode == 13) {
    const containerElement = e.target.parentElement;
    const idTask = parseInt(containerElement.id);

    tasks
      .filter((task) => task.id == idTask)
      .forEach((task) => (task.title = e.target.value));

    localStorage.setItem("mydayapp-js", JSON.stringify([tasks, id]));

    containerElement.classList.remove("editing");
    paintTasks(tasks, containerTasks);
  }
});

/*------------------------------ FILTROS --------------------------------*/

// Clear completed
const btnClearCompleted = document.querySelector(".clear-completed");
btnClearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.state);

  paintTasks(tasks, containerTasks);
  localStorage.setItem("mydayapp-js", JSON.stringify([tasks, id]));
  if (tasks.length == 0) {
    document.querySelector(".footer").style.display = "none";
    document.querySelector(".main").style.display = "none";
  }
});

// filtros
window.addEventListener("hashchange", () => {
  // Mostrar todo
  if (window.location.hash == "#/") {
    paintTasks(tasks, containerTasks);
    activeSelected(0);
  }

  // Motrar tareas pendientes
  if (window.location.hash == "#/pending") {
    const filterTasks = tasks.filter((task) => !task.state);
    paintTasks(filterTasks, containerTasks);
    activeSelected(1);
  }

  // Mostrar tareas completadas
  if (window.location.hash == "#/completed") {
    const filterTasks = tasks.filter((task) => task.state);
    paintTasks(filterTasks, containerTasks);
    activeSelected(2);
  }
});
