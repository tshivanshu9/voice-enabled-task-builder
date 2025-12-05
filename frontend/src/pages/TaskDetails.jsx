import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { deleteTask, getTask, updateTask } from '../api/tasks';
import AppLayout from '../components/AppLayout';
import { formatDate, formatPriority, formatTaskStatus } from '../utils/formatters';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getTask(id).then(res => setTask(res.data));
  }, [id]);

  const handleEdit = () => {
    setEditData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      taskStatus: task.taskStatus,
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await updateTask(id, editData);
      setTask(updatedTask.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        navigate('/');
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  if (!task) return <AppLayout>Loading...</AppLayout>;
  return (
    <AppLayout>
      {isEditing ? (
        <form onSubmit={handleUpdate} className='space-y-4'>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input type='text' value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded" rows="3" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={editData.priority}
              onChange={(e) => setEditData({...editData, priority: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">No priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={editData.status}
              onChange={(e) => setEditData({...editData, taskStatus: e.target.value})}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ):(
        <>
          <h2 className="text-2xl font-bold">{task.title}</h2>
          <p className="mt-2 text-gray-700">{task.description}</p>

          <div className="mt-4">
            <p>📅 Due: {formatDate(task.dueDate)}</p>
            <p>⭐ Priority: {formatPriority(task.priority)}</p>
            <p>📌 Status: {formatTaskStatus(task.taskStatus)}</p>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
            >
              Edit Task
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
            >
              🚮 Delete Task
            </button>
          </div>
        </>
      )}
    </AppLayout>
  );
}

export default TaskDetails
