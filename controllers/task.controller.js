import data from "../data/tasks.js";
const { TASKS, idCounter } = data;

export const getTasks = (req, res) => {
  const { search } = req.query;

  let result = data.TASKS;

  if (search) {
    result = result.filter((t) => t.title.includes(search));
  }

  res.json({
    status: "SUCCESS",
    data: result,
  });
};

export const getTask = (req, res) => {
  const numericId = Number(req.params.id);

  const task = data.TASKS.find((t) => t.id === numericId);

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
};

export const createTask = (req, res) => {
  const { task, complete } = req.body;

  const newTask = {
    id: data.idCounter++,
    task,
    complete: complete === "true",
  };

  data.TASKS.push(newTask);

  res.status(201).json({
    status: "SUCCESS",
    message: "Task created",
    data: newTask,
  });
};

export const updateTask = (req, res) => {
  const numericId = Number(req.params.id);

  const taskToUpdate = data.TASKS.find((t) => t.id === numericId);

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
};

export const deleteTask = (req, res) => {
  const numericId = Number(req.params.id);

  const taskIndex = data.TASKS.findIndex((t) => t.id === numericId);

  if (taskIndex === -1) {
    return res.status(404).json({
      status: "FAILED",
      message: "Task not found",
    });
  }

  const deletedTask = data.TASKS.splice(taskIndex, 1);

  res.json({
    status: "SUCCESS",
    message: "Task deleted",
    data: deletedTask[0],
  });
};
