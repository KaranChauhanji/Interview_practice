const container = document.querySelector(".container");
const form = document.getElementById("form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const priority = document.getElementById("priority");

let arr = JSON.parse(localStorage.getItem("todos")) || [];
let isEdit = false;
let editedId = null;

function addTodo() {
  container.innerHTML = ``;
  arr.forEach((elem) => {
    const div = document.createElement("div");
    div.className = "todo-card";
    div.innerHTML = `
        <div class="todo-card">
            <p>${elem.title}</p>
            <p>${elem.description}</p>
            <p>${elem.priority}</p>
            <div style="display:grid; grid-template-columns: repeat(2,1fr); gap:12px;">
            <button onClick="handleDelete('${elem.id}')">Delete</button>
            <button onClick="handleEdit('${elem.id}')">Edit</button>
            </div>
        </div>
        `;
    container.append(div);
  });
}

const handleDelete = (id) => {
  arr = arr.filter((elem) => elem.id !== id);
  localStorage.setItem("todos", JSON.stringify(arr));
  addTodo();
};

const handleEdit = (id) => {
  const find = arr.find((elem) => elem.id == id);
  console.log(find);

  title.value = find.title;
  description.value = find.description;
  priority.value = find.priority;
  editedId = id;
  isEdit = true;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (isEdit) {
    arr = arr.map((el) => {
      if (el.id === editedId) {
        el.title = title.value;
        el.description = description.value;
        el.priority = priority.value;
      }
      return el
    });
    isEdit = false
    editedId = null
  
  } else {
    let obj = {
      id: Date.now().toString(),
      title: title.value,
      description: description.value,
      priority: priority.value,
    };
    arr.push(obj);
  
  }
  localStorage.setItem("todos", JSON.stringify(arr));
  addTodo();
};

form.addEventListener("submit", handleSubmit);
addTodo();
