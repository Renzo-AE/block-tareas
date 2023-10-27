export class Task {
  constructor(id, title, state) {
    this.id = id;
    this.title = title;
    this.state = state;
  }
}

const newTask = (id, task, state) => {
  const container = document.createElement("li");
  state && container.classList.add("completed");
  container.id = id;

  const div = document.createElement("div");
  div.classList.add("view");
  container.appendChild(div);
  div.id = `c${id}`;

  const input1 = document.createElement("input");
  input1.type = "checkbox";
  input1.classList.add("toggle");
  state && input1.setAttribute("checked", "true");
  div.appendChild(input1);

  const label = document.createElement("label");
  label.textContent = task;
  div.appendChild(label);

  const button = document.createElement("button");
  button.classList.add("destroy");
  div.appendChild(button);

  const input2 = `
    <input class="edit" value="${task}" id="${id}c">
  `;
  container.innerHTML += input2;

  return container;
};

export const paintTasks = (tasks, containerTasks) => {
  containerTasks.innerHTML = "";
  tasks.forEach((task) => {
    containerTasks.appendChild(newTask(task.id, task.title, task.state));
  });

  paintItemsLeft(tasks);
};

export const paintItemsLeft = (tasks) => {
  let tasksPending = 0;

  tasks.forEach((task) => {
    !task.state && tasksPending++;
  });

  document.querySelector(
    ".todo-count"
  ).innerHTML = `<strong>${tasksPending}</strong> ${
    tasksPending == 1 ? "item" : "items"
  } left`;
};

export function activeSelected(position) {
  const containerFilters = document.querySelector(".filters");
  const filters = containerFilters.querySelectorAll("a");

  filters.forEach((filter, i) => {
    if (i == position) {
      filter.classList.add("selected");
    } else {
      filter.classList.remove("selected");
    }
  });
}
