import express from "express";
import logger from "./middlewares/logger.middleware.js";
import taskRoutes from ".//routes/task.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("", taskRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    name: "Task manager app",
    now: new Date().toLocaleString(),
  });
});

app.listen(PORT, () => {
  console.log(`Task Manager server is running on http://localhost:${PORT}`);
});
