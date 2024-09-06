const root = document.getElementById("root");
const titleInput = document.getElementById("title");
const date = document.getElementById("date");
const time = document.getElementById("time");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");
const editBtn = document.querySelector(".editBtn");
const taskTable = document.querySelector(".taskTable");
const taskItem = document.querySelector(".task");
const formTitle = document.getElementById("formTitle");
const deleteAll = document.getElementById("deleteAll");

let task;
let formFunction = "ADD";
let taskToEdit;
var newTask = {};

renderTask();
localStorage.setItem(
  "Task",
  JSON.stringify([
    {
      id: 1,
      title: "Complete project report",
      date: "2024-09-01",
      time: "14:00",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Prepare presentation",
      date: "2024-09-02",
      time: "09:00",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Submit expense report",
      date: "2024-09-03",
      time: "16:30",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Schedule meeting",
      date: "2024-09-04",
      time: "11:00",
      isCompleted: false,
    },
    {
      id: 5,
      title: "Review project X",
      date: "2024-09-05",
      time: "13:00",
      isCompleted: false,
    },
  ])
);

function addTask(obj) {
  titleInput.value = "";
  date.value = "";
  time.value = "";
  const updatedTask = { ...obj, id: task.length + 1, isCompleted: false };
  task.push(updatedTask);
  newTask = {};
  localStorage.setItem("Task", JSON.stringify(task));
}

function editTask() {
  console.log("edit data", newTask);
  const index = task.findIndex((currentTask) => currentTask.id === taskToEdit);
  if (index !== -1) {
    task[index] = { ...task[index], ...newTask };
    localStorage.setItem("Task", JSON.stringify(task));
  }
  titleInput.value = "";
  date.value = "";
  time.value = "";
  newTask = {};
  formFunction = "ADD";
}

function onEdit(taskId) {
  formFunction = "EDIT";
  formTitle.innerText = "EDIT TASK";
  const currentTask = task.find((tsk) => tsk.id === taskId);
  taskToEdit = taskId;
  if (currentTask) {
    taskToEdit = currentTask.id;
    titleInput.value = currentTask.title;
    date.value = currentTask.date;
    time.value = currentTask.time || "";
  }
}

function deleteTask(taskId) {
  const index = task.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    task.splice(index, 1);
    localStorage.setItem("Task", JSON.stringify(task));
  } else {
    console.log("Task not found");
  }
  renderTask();
}

function toggleTaskComplete(taskId) {
  const index = task.findIndex((task) => task.id == taskId);
  if (index >= 0) {
    console.log("task" + task);
    task[index].isCompleted = !task[index].isCompleted;
    console.log("task" + task);
    localStorage.setItem("Task", JSON.stringify(task));
    renderTask();
  }
}

function renderTask() {
  task = JSON.parse(localStorage.getItem("Task"));
  console.log(task);
  taskTable.innerHTML = `<thead>
                          <tr>
                            <th>Task Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        `;
  for (let i = 0; i < task?.length; i++) {
    taskTable.innerHTML += `<tr>
                              <td id="titleData">
                                ${
                                  task[i].title.length > 30
                                    ? task[i].title.slice(0, 30) + "..."
                                    : task[i].title
                                }
                              </td>
                              <td>${task[i].date ? task[i].date : "-"}</td>
                              <td>${task[i].time ? task[i].time : "-"}</td>
                              <td>
                                <div class="status" 
                                  style="background-color: ${
                                    task[i]["isCompleted"]
                                      ? "transparent"
                                      : "goldenrod"
                                  }; 
                                  background-image: ${
                                    task[i]["isCompleted"]
                                      ? "linear-gradient(135deg, #4caf50, #81c784)"
                                      : "none"
                                  };">
                                  ${task[i]["isCompleted"] ? "Done" : "Pending"}
                                </div>
                              </td>
                              <td>
                                <div id="btnGrp">
                                  <div class="tooltip">
                                    <button class="markCompleteBtn" onclick="toggleTaskComplete(${
                                      task[i]["id"]
                                    })">
                                      <i class="fas fa-check"></i>
                                    </button>
                                    <span class="tooltiptext">Mark as complete</span>
                                  </div>
                                  <div class="tooltip">
                                    <button class="editBtn" onclick="onEdit(${
                                      task[i]["id"]
                                    })">
                                      <i class="fas fa-edit"></i>
                                    </button>
                                    <span class="tooltiptext">Edit task</span>
                                  </div>
                                  <div class="tooltip">
                                    <button class="deleteBtn" onclick="deleteTask(${
                                      task[i]["id"]
                                    })">
                                     <i class="fas fa-trash"></i>
                                    </button>
                                    <span class="tooltiptext">Delete task</span>
                                  </div>
                                </div>
                              </td>
                            <tr>`;
  }
}

titleInput.addEventListener("input", function (e) {
  newTask.title = e.target.value;
});

date.addEventListener("input", function (e) {
  newTask.date = e.target.value;
});

time.addEventListener("input", function (e) {
  newTask.time = e.target.value;
});

submitBtn.addEventListener("click", function () {
  if (formFunction === "ADD") {
    if (newTask.title) {
      addTask(newTask);
      titleInput.value = "";
      date.value = "";
      time.value = "";
      renderTask();
    } else {
      alert("Please enter the task title");
    }
  }
  if (formFunction === "EDIT") {
    editTask();
    renderTask();
  }
});

resetBtn.addEventListener("click", function () {
  titleInput.value = "";
  date.value = "";
  time.value = "";
});

deleteAll.addEventListener("click", function () {
  localStorage.setItem("Task", JSON.stringify([]));
  renderTask();
});
