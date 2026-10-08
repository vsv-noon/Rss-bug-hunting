const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value.trim();
  errorEl.hidden = true;

  if (text.length < 1) {
    errorEl.hidden = false;
  } else {
    tasks.push({ id: nextId++, text: text, done: false });
    render();
  }

  input.value = "";
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  render();
}

function getVisibleTasks() {
  if (currentFilter === "all") {
    return tasks;
  } else if (currentFilter === "done") {
    return tasks.filter((t) => t.done);
  } else {
    return tasks.filter((t) => !t.done);
  }
}

function updateCounter() {
  counter.textContent =
    "Активных задач: " + (tasks.length - tasks.filter((t) => t.done).length);
}

function render() {
  list.textContent = "";

  const visible = getVisibleTasks();
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
