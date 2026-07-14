import express from "express";

const app = express();

const logger = (req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
};

const validateTaskBody = (req, res, next) => {
  const { task, complete } = req.body;

  if (req.method === "POST" && task === undefined) {
    return res.status(400).json({
      status: "FAILED",
      message: "Task is required.",
    });
  }

  if (
    task !== undefined &&
    (typeof task !== "string" || task.trim().length < 5)
  ) {
    return res.status(400).json({
      status: "FAILED",
      message: "Invalid task. Task must be at least 5 characters.",
    });
  }

  if (complete !== undefined && complete !== "true" && complete !== "false") {
    return res.status(400).json({
      status: "FAILED",
      message: "Complete must be true or false.",
    });
  }

  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

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
  const numericId = Number(req.params.id);

  const task = TASKS.find((t) => t.id === numericId);

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

app.post("/tasks", validateTaskBody, (req, res) => {
  const { task, complete } = req.body;

  const newTask = {
    id: idCounter++,
    task,
    complete: complete === "true",
  };

  TASKS.push(newTask);

  res.status(201).json({
    status: "SUCCESS",
    message: "Task created",
    data: newTask,
  });
});

app.patch("/tasks/:id", validateTaskBody, (req, res) => {
  const numericId = Number(req.params.id);

  const taskToUpdate = TASKS.find((t) => t.id === numericId);

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
    taskToUpdate.complete = complete === "true";
  }

  res.json({
    status: "SUCCESS",
    message: "Task updated",
    data: taskToUpdate,
  });
});

app.delete("/tasks/:id", (req, res) => {
  const numericId = Number(req.params.id);

  const taskIndex = TASKS.findIndex((t) => t.id === numericId);

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
