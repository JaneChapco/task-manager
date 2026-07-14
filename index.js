import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

const TASKS = [
  {
    id: 1,
    task: "Make cookies",
    complete: false,
  },
  {
    id: 2,
    task: "Make coffee",
    complete: true,
  },
  {
    id: 3,
    task: "Make dinner",
    complete: false,
  },
];
let idCounter = 4;

app.get("/", (req, res) => {
  res.json({
    name: "Task manager app",
    now: new Date().toLocaleString(),
  });
});

app.get("/tasks", (req, res) => {
  res.json({
    status: "SUCCESS",
    data: TASKS,
  });
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const task = TASKS.find((t) => t.id == id);

  if (!task) {
    return res.status(404).json({
      status: "FAILED",
      message: "Task not found",
    });
  }

  res.json({
    status: "SUCCESS",
    data: task,
  });
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;

  const newTask = {
    id: idCounter++,
    task,
    complete: false,
  };

  TASKS.push(newTask);

  res.status(201).json({
    status: "SUCCESS",
    message: "Task created",
  });
});

app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const taskToUpdate = TASKS.find((t) => t.id == id);

  if (!taskToUpdate) {
    return res.status(404).json({
      status: "FAILED",
      message: "Task not found",
    });
  }

  const { task, complete } = req.body;

  if (task !== undefined) {
    taskToUpdate.task = task;
  }

  if (complete !== undefined) {
    taskToUpdate.complete = complete;
  }

  res.json({
    status: "SUCCESS",
    message: "Task updated",
  });
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = TASKS.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({
      status: "FAILED",
      message: "Task not found",
    });
  }

  const deletedTask = TASKS.splice(taskIndex, 1);

  res.json({
    status: "SUCCESS",
    message: "Task deleted",
    data: deletedTask[0],
  });
});
app.listen(PORT, () => {
  console.log(`Task Manager server is running on http://localhost:${PORT}`);
});
