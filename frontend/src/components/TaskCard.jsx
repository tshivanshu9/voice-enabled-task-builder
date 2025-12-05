import { Link } from 'react-router-dom';
import { formatDate, formatPriority, formatTaskStatus } from '../utils/formatters';

function TaskCard({ task }) {
  const priorityColors = {
    high: 'border-l-red-500 bg-red-50',
    medium: 'border-l-yellow-500 bg-yellow-50',
    low: 'border-l-green-500 bg-green-50',
    null: 'border-l-gray-500 bg-gray-50'
  };

  const statusColors = {
    'todo': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'done': 'bg-green-100 text-green-800'
  };

  return (
    <Link to={`/task/${task._id}`}
      className={`block p-6 border-l-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${priorityColors[task.priority] || priorityColors.null}`}>
      
      <div className='flex justify-between items-start mb-3'>
        <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.taskStatus]}`}>
          {formatTaskStatus(task.taskStatus)}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 leading-relaxed">{task.description}</p>
      
      <div className='flex flex-wrap gap-4 text-sm'>
        <div className='flex items-center gap-2 text-gray-700'>
          <span className='text-blue-500'>📅</span>
          <span>{formatDate(task.dueDate)}</span>
        </div>
        <div className='flex items-center gap-2 text-gray-700'>
          <span className='text-orange-500'>⭐</span>
          <span>{formatPriority(task.priority)}</span>
        </div>
      </div>
    </Link>
  )
}

export default TaskCard
