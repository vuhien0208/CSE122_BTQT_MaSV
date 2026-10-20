const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const remaining = document.getElementById("remaining");


// Danh sách công việc ban đầu
let todos = [
    { id: 1, text: "Đọc chương HTML5 cơ bản", completed: true },
    { id: 2, text: "Làm bài tập CSS Grid", completed: false },
    { id: 3, text: "Quay video OBS nộp bài", completed: false }
];


let nextId = 4;


// Hiển thị danh sách công việc
function renderTodos() {
    todoList.innerHTML = "";


    if (todos.length === 0) {
        const message = document.createElement("li");
        message.className = "empty-message";
        message.textContent = "Chưa có công việc nào!";
        todoList.appendChild(message);
    }


    todos.forEach(function (todo) {
        const li = document.createElement("li");
        li.className = "todo-item";


        if (todo.completed) {
            li.classList.add("completed");
        }


        // Checkbox đánh dấu hoàn thành
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.checked = todo.completed;
        checkbox.setAttribute("aria-label", "Đánh dấu hoàn thành");


        checkbox.addEventListener("change", function () {
            toggleTodo(todo.id);
        });


        // Nội dung công việc
        const text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;


        text.addEventListener("click", function () {
            toggleTodo(todo.id);
        });


        // Nút xóa
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Xoá";


        deleteButton.addEventListener("click", function () {
            deleteTodo(todo.id);
        });


        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);


        todoList.appendChild(li);
    });


    updateRemaining();
}


// Thêm công việc
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();


    const text = todoInput.value.trim();


    if (text === "") {
        alert("Vui lòng nhập công việc!");
        todoInput.focus();
        return;
    }


    todos.push({
        id: nextId++,
        text: text,
        completed: false
    });


    todoInput.value = "";
    todoInput.focus();


    renderTodos();
});


// Đổi trạng thái hoàn thành
function toggleTodo(id) {
    todos = todos.map(function (todo) {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            };
        }


        return todo;
    });


    renderTodos();
}


// Xóa công việc
function deleteTodo(id) {
    todos = todos.filter(function (todo) {
        return todo.id !== id;
    });


    renderTodos();
}


// Cập nhật số công việc chưa hoàn thành
function updateRemaining() {
    const count = todos.filter(function (todo) {
        return !todo.completed;
    }).length;


    remaining.textContent = "Còn " + count + " việc chưa hoàn thành";
}


// Hiển thị lần đầu
renderTodos();


