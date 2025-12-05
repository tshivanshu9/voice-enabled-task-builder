import { ACTIVE_INACTIVE_ENUM } from '../constants/enums.js';
import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, taskStatus } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      taskStatus,
    });
    const result = await Task.create(newTask);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: ACTIVE_INACTIVE_ENUM.ACTIVE });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskByTaskId = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({
      _id: id,
      status: ACTIVE_INACTIVE_ENUM.ACTIVE,
    });
    if (!task) {
      return res.status(400).json({ error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const updateTaskByTaskId = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(400).json({ error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTaskByTaskId = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndUpdate(
      id,
      { status: ACTIVE_INACTIVE_ENUM.INACTIVE },
      { new: true }
    );
    if (!deletedTask) {
      return res.status(400).json({ error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
