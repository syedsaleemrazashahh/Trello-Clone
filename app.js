const main = document.getElementById("main");
const addColumnButton = document.getElementById("add-column");

let savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || {};

const createTicket = (value) => {
  const ticket = document.createElement("p");
  const elementText = document.createTextNode(value);

  ticket.setAttribute("draggable", "true");
  ticket.appendChild(elementText);

  ticket.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  });

  ticket.addEventListener("dragend", (e) => {
    e.target.classList.remove("hide");
  });

  return ticket;
};

const addTask = (event) => {
  event.preventDefault();

  const recentForm = event.target;
  const value = recentForm.elements[0].value;
  const parent = recentForm.parentElement;
  const ticket = createTicket(value);

  ticket.id = `task-${Date.now()}`;
  parent.insertBefore(ticket, recentForm);
  const h3Value = parent.children[0].innerText;

  if (!Array.isArray(savedTasks[h3Value])) {
    savedTasks[h3Value] = [];
  }

  savedTasks[h3Value].push(value);

  localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  recentForm.reset();
};

const enableDragAndDrop = (column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const ticket = document.getElementById(data);
    column.insertBefore(ticket, column.lastElementChild);
  });
};

const createColumn = (title = "New Column") => {
  const column = document.createElement("div");
  column.classList.add("column");

  const h3 = document.createElement("h3");
  h3.innerText = title;

  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add task";

  form.appendChild(input);
  column.appendChild(h3);
  column.appendChild(form);

  form.addEventListener("submit", addTask);
  enableDragAndDrop(column);

  main.appendChild(column);
};

addColumnButton.addEventListener("click", () => {
  const columnTitle = prompt("Enter column title:");
  if (columnTitle) {
    createColumn(columnTitle);
  }
});

const columns = document.querySelectorAll(".column");
columns.forEach((column) => {
  const form = column.lastElementChild;
  form.addEventListener("submit", addTask);
  enableDragAndDrop(column);
});
