import express from "express";
import { createTask, deleteTaskByTaskId, getTaskByTaskId, getTasksByUser, updateTaskByTaskId } from "../services/tasksService.js";
import { body, validationResult } from 'express-validator';
const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const createTaskValidators = [
  body('title').isString().withMessage('Title must be a string').notEmpty().withMessage('Title is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

const updateTaskValidators = [
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
];

router.post('/', createTaskValidators, handleValidationErrors, createTask);
router.put('/:id', updateTaskValidators, handleValidationErrors, updateTaskByTaskId);
router.get('/:id', getTaskByTaskId);
router.get('/', getTasksByUser);
router.delete('/:id', deleteTaskByTaskId);

export default router;