import { useNavigate } from 'react-router-dom';
import { createTask } from '../api/tasks';
import AppLayout from '../components/AppLayout';
import TaskForm from '../components/TaskForm';

function TaskCreate() {
  const navigate = useNavigate();

  async function handleSubmit(data) {
    await createTask(data);
    navigate('/');
  }

  return (
    <AppLayout>
      <h2 className="text-xl font-semibold mb-4">Create Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </AppLayout>
  );
}

export default TaskCreate;
