const storageKey = "STORAGE_KEY";
const btnTambahkan = document.querySelector("#addToDoList");
const tbody = document.querySelector("#content-list");

function randomString(length) {
  const characters = "1234567890";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

function saveData(data) {
  const todos = getData();
  todos.unshift(data);
  if (todos.length > 5) {
    todos.pop();
  }
  localStorage.setItem(storageKey, JSON.stringify(todos));
}

function getData() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function renderData() {
  const todos = getData();
  tbody.innerHTML = "";

  todos.forEach((todo) => {
    const tr = document.createElement("tr");
    tr.classList.add("task-row");
    tr.setAttribute("data-aos", "zoom-in");

    const tdTask = document.createElement("td");
    tdTask.innerHTML = todo.content;
    if (todo.isComplete) {
      tdTask.style.textDecoration = "line-through double";
      tdTask.style.backgroundColor = "#ff6666";
    }

    const tdDate = document.createElement("td");
    tdDate.innerHTML = todo.date || "";
    tdDate.innerHTML = todo.date;
    if (todo.isComplete) {
      tdDate.style.textDecoration = "line-through double";
      tdDate.style.backgroundColor = "#ff6666";
    }

    const tdAction = document.createElement("td");

    const btnCeklist = createButton("✔️", "#00FFD1", `ceklist-${todo.id}`);
    btnCeklist.addEventListener("click", () => completeTask(todo.id));

    const btnDelete = createButton("❌", "#FF6666", `delete-${todo.id}`);
    btnDelete.addEventListener("click", () => deleteTask(todo.id));

    tdAction.appendChild(btnCeklist);
    tdAction.appendChild(btnDelete);

    tr.appendChild(tdTask);
    tr.appendChild(tdDate);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });

  AOS.init();
}

function createButton(text, backgroundColor, id) {
  const btn = document.createElement("button");
  btn.setAttribute("class", "btn");
  btn.innerHTML = text;
  btn.style.backgroundColor = backgroundColor;
  btn.id = id;
  return btn;
}

function completeTask(id) {
  const todos = getData();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].isComplete = true;
    localStorage.setItem(storageKey, JSON.stringify(todos));
    renderData();
  }
}

function deleteTask(id) {
  const todos = getData();
  const updatedTodos = todos.filter((todo) => todo.id !== id);

  if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    localStorage.setItem(storageKey, JSON.stringify(updatedTodos));
    renderData();
  }
}

btnTambahkan.addEventListener("click", () => {
  const textList = document.querySelector("#titleToDoList").value;
  const dateList = document.querySelector("#dateToDoList").value;

  if (textList) {
    const newTodo = {
      id: randomString(5),
      content: textList,
      date: dateList,
      isComplete: false,
    };

    saveData(newTodo);
    renderData();
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem(storageKey)) {
    renderData();
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }
});
