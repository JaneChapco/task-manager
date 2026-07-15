import { Router } from "express";
import validateTaskBody from "../middlewares/validator.middleware.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks", getTasks);

router.get("/tasks/:id", getTask);

router.post("/tasks", validateTaskBody, createTask);

router.patch("/tasks/:id", validateTaskBody, updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;
