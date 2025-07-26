import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task.model';
import { TaskSchema } from '../validators/task.validator';

let tasks: Task[] = [];

export const createTask = (req: Request, res: Response) => {
  const parsed = TaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { title, description, status } = parsed.data;
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  const newTask: Task = {
    id,
    title,
    description,
    status,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const getAllTasks = (req: Request, res: Response) => {
  const { status, title } = req.query;
  let filtered = tasks;

  if (status && typeof status === 'string') {
    filtered = filtered.filter(task => task.status === status);
  }

  if (title && typeof title === 'string') {
    filtered = filtered.filter(task => task.title.toLowerCase().includes(title.toLowerCase()));
  }

  res.json(filtered);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const updateTaskById = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  const parsed = TaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { title, description, status } = parsed.data;
  const updatedAt = new Date().toISOString();

  tasks[index] = {
    ...tasks[index],
    title,
    description,
    status,
    updatedAt,
  };

  res.json(tasks[index]);
};

export const deleteTaskById = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
};
