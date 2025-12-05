import mongoose from 'mongoose';
import {
  ACTIVE_INACTIVE_ENUM,
  ACTIVE_INACTIVE_VALUES,
  PRIORITY_VALUES,
  TASK_STATUS_ENUM,
  TASK_STATUS_VALUES,
} from '../constants/enums.js';
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: PRIORITY_VALUES,
  },
  taskStatus: {
    type: String,
    enum: TASK_STATUS_VALUES,
    default: TASK_STATUS_ENUM.TODO,
  },
  status: {
    type: String,
    enum: ACTIVE_INACTIVE_VALUES,
    default: ACTIVE_INACTIVE_ENUM.ACTIVE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Task', TaskSchema);
