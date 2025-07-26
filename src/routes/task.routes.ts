import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/task.controller";

const router = Router();
router.get("/", (req, res) => res.send("Server Running Tester"));
router.post("/tasks", createTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTaskById);
router.delete("/tasks/:id", deleteTaskById);

export default router;
