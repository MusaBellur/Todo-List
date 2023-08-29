//! Selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoSelector = document.querySelector(".todo-filter");
const todoList = document.querySelector(".todo-list");

//? Alerts
const alertSuccess = document.querySelector(".alert-success");
const alertWarning = document.querySelector(".alert-warning");

//! Events
document.addEventListener("DOMContentLoaded", function(){
    getTodos();
})
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoSelector.addEventListener("click", changeFilter);

//! Funtions
function addTodo(e) {

    e.preventDefault();

    const isEmpty = str => !str.trim().length;

    if (isEmpty(todoInput.value)) {
        alertWarning.style.display = "block";
        setTimeout(() => {
            alertWarning.style.display = "none"
        }, 2000);

        //? Clear Todo Input Value
        todoInput.value = "";
    }
    else {

        alertSuccess.style.display = "block";
        setTimeout(() => {
            alertSuccess.style.display = "none"
        }, 2000);

        saveLocalTodos(todoInput.value);

        //? Creat Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //? Check Mark Complated
        const complatedButton = document.createElement("button");
        complatedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        complatedButton.classList.add("complated-btn");
        todoDiv.appendChild(complatedButton);

        //? Creat Todo List
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //? Check Mark Trash
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //? Append To List
        todoList.appendChild(todoDiv);

        //? Clear Todo Input Value
        todoInput.value = "";

    }

}

function deleteCheck(e) {

    const item = e.target;

    //? Delete Todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalStorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //? Check Mark
    if (item.classList[0] === "complated-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("complated");
    }
}

function changeFilter(e) {

    //? Filter Todo
    const todos = todoList.childNodes;

    todos.forEach(function (item) {

        switch (e.target.value) {

            case "all":
                item.style.display = "flex";
                break;

            case "complated":
                if (item.classList.contains("complated")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;

            case "uncomplated":
                if (!item.classList.contains("complated")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;

            default:
                break;
        }
    })

}

//? Local Storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {

        //? Creat Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //? Check Mark Complated
        const complatedButton = document.createElement("button");
        complatedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
        complatedButton.classList.add("complated-btn");
        todoDiv.appendChild(complatedButton);

        //? Creat Todo List
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //? Check Mark Trash
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //? Append To List
        todoList.appendChild(todoDiv);
    });
}
function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}