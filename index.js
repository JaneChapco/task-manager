import express from "express";

const app = express();

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

app.get("/", (req, res) => {
  res.json({
    name: "Task manager app",
    now: new Date().toLocaleString(),
  });
});

app.listen(PORT, () => {
  console.log(`Task Manager server is running on http://localhost:${PORT}`);
});
