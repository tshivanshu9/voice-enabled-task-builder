import { useState, useEffect } from 'react'
import { getTasks } from '../api/tasks';
import AppLayout from '../components/AppLayout';
import TaskCard from '../components/TaskCard';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(res => setTasks(res.data));
  }, [])

  return (
    <AppLayout>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-4">No tasks yet!</p>
            <p className="text-gray-400">Start by creating your first task</p>
          </div>
        ) : (
          tasks?.map(t => (
            <TaskCard key={t._id} task={t} />
          ))
        )}
      </div>
    </AppLayout>
  )
}

export default TaskList
