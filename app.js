const columns = document.querySelectorAll(".column");

const createTicket = (value) => {
  //
  const ticket = document.createElement("p");
  const elementText = document.createTextNode(value);

  ticket.setAttribute("draggable", "true");
  ticket.appendChild(elementText);

  return ticket;
};

let savedTasks = JSON.parse(localStorage.getItem("savedTasks")); // fetching savedTasks obj and converting

if (!savedTasks) {
  savedTasks = {};
}

const addTask = (event) => {
  event.preventDefault();

  const recentForm = event.target;
  //   line number 23 recent form element k liye hai

  const value = recentForm.elements[0].value; // value written in form's input
  const parent = recentForm.parentElement; // parent of form i.e div.column
  const ticket = createTicket(value); // div to be added

  parent.insertBefore(ticket, recentForm);
  //  ye line number 30 form se pehle task ko add karti hai
  const h3Value = parent.children[0].innerText;

  if (!Array.isArray(savedTasks[h3Value])) {
    // agar array nhi hy tw khali array b rakhna pare q k undefined ma .push() nhi ho sakhta
    savedTasks[h3Value] = [];
  }

  savedTasks[h3Value].push(value);

  localStorage.setItem("savedTasks", JSON.stringify(savedTasks)); // saving data after adding each task
  // ye line number 41 data ko save karti hai har task k baad
  recentForm.reset();
  // line number 43 form se reset karti hai
};

for (let i = 0; i < columns.length; i++) {
  const form = columns[i].lastElementChild;
  //  line number 48 select karti hai har column k form ko  q k form last element hau
  form.addEventListener("submit", addTask);
}
