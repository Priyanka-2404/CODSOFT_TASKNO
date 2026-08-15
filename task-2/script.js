const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");

const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const filterButtons = document.querySelectorAll(".filter-btn");
const themeBtn = document.getElementById("themeBtn");


// LOAD TASKS FROM LOCAL STORAGE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ADD TASK

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();

    // Validation
    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    // Create new task
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        category: categoryInput.value,
        priority: priorityInput.value,
        dueDate: dateInput.value
    };

    // Add task to array
    tasks.push(newTask);

    saveTasks();

    // Clear inputs
    taskInput.value = "";
    dateInput.value = "";

    displayTasks();
}

// SAVE TASKS
function saveTasks() {
    localStorage.setItem(
        "tasks", JSON.stringify(tasks)
    );
}


// DISPLAY TASKS
function displayTasks() {
    taskList.innerHTML = "";
    let filteredTasks = [...tasks];

    // FILTER
    if (currentFilter === "completed") {
        filteredTasks = filteredTasks.filter(function(task) {
            return task.completed === true;
        });
    }

    if (currentFilter === "pending") {
        filteredTasks = filteredTasks.filter(function(task) {
          return task.completed === false;

        });
    }

    // SEARCH
    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    if (searchText !== "") {

        filteredTasks = filteredTasks.filter(function(task) {
            return task.text
                .toLowerCase()
                .includes(searchText);

        });
    }


    // EMPTY MESSAGE
    if (filteredTasks.length === 0) {
    taskList.innerHTML = `
            <div class="empty">
                <h3>📋 No tasks found</h3>
                <p>Add a new task to get started.</p>
            </div>`;

        updateCounts();
        return;
    }

    // CREATE TASK ELEMENT
    filteredTasks.forEach(function(task) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // Priority class
        let priorityClass = "";

        if (task.priority === "High") {
            priorityClass = "priority-high";
        } else if (task.priority === "Medium") {
            priorityClass = "priority-medium";
        } else {
            priorityClass = "priority-low";
        }

    taskElement.innerHTML = `
            <div class="task-left">

                <inputtype="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${task.id})">

                <div class="task-info">
                    <span class="task-title">${escapeHTML(task.text)}</span>

                    <div class="task-details">

                     <span class="badge">📁 ${task.category}</span>
                     <span class="badge ${priorityClass}">⚡ ${task.priority}</span>
                    
                     ${
                            task.dueDate
                      ? `<span class="badge">📅 ${task.dueDate}</span>`: ""
                     }

                    </div>

                </div>

            </div>

        <div class="task-actions">
            <button class="edit-btn" onclick="editTask(${task.id})"> ✏️ Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Delete</button>
        </div> `;
        taskList.appendChild(taskElement);
    });

    updateCounts();
}

// COMPLETE / PENDING
function toggleTask(id) {
    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (task) {
        task.completed = !task.completed;
        saveTasks();
        displayTasks();
    }
}

// DELETE TASK
function deleteTask(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    displayTasks();

}

// EDIT TASK
function editTask(id) {
    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (!task) {
        return;
    }

    const newText = prompt(
        "Edit your task:",
        task.text
    );
    if (newText === null) {
        return;
    }

    const updatedText = newText.trim();
    if (updatedText === "") {
        alert("Task cannot be empty!");
        return;
    }
    task.text = updatedText;

    saveTasks();
    displayTasks();
}

// SEARCH
searchInput.addEventListener("input", function() {
    displayTasks();
});

// FILTER
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        currentFilter = button.dataset.filter;
        displayTasks();
    });

});

// UPDATE COUNTS
function updateCounts() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;
    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;

}

// DARK MODE
themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");

    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }

});

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";

}

// SECURITY HELPER
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;

}
// INITIAL DISPLAY
displayTasks();