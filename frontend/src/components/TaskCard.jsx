import { Link } from 'react-router-dom';
import { formatDate, formatPriority } from '../utils/formatters';

function TaskCard({ task }) {
  return (
    <Link to={`/task/${task._id}`}
      className='block p-4 border rounded shadow bg-white hover:bg-gray-50 transition'>
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className='flex gap-4 mt-3 text-sm text-gray-700'>
        <span>📅 {formatDate(task.dueDate)}</span>
        <span>⭐ {formatPriority(task.priority)}</span>
        <span>📌 {task.taskStatus}</span>
      </div>
    </Link>
  )
}

export default TaskCard
