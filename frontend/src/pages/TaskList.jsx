import { useState, useEffect } from 'react';
import { getTasks } from '../api/tasks';
import AppLayout from '../components/AppLayout';
import TaskCard from '../components/TaskCard';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const tasksPerPage = 5;

  const fetchTasks = async page => {
    setLoading(true);
    try {
      const response = await getTasks({ page, limit: tasksPerPage });
      if (response) {
        setTasks(response.data);
        setTotalCount(response.paginate?.totalCount);
        setTotalPages(Math.ceil(response.paginate?.totalCount / tasksPerPage));
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 mx-1 rounded ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
        }`}
      >
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded ${
            currentPage === i
              ? 'bg-blue-600 text-white cursor-pointer'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
          }`}
        >
          {i}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 mx-1 rounded ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
        }`}
      >
        Next
      </button>
    );

    return buttons;
  };

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <p className="text-gray-500 text-sm">
          Showing {tasks.length} of {totalCount} tasks
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg mb-4">No tasks yet!</p>
                <p className="text-gray-400">
                  Start by creating your first task
                </p>
              </div>
            ) : (
              tasks.map(t => <TaskCard key={t._id} task={t} />)
            )}
          </div>

          {totalPages >= 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              {renderPaginationButtons()}
            </div>
          )}
        </>
      )}
    </AppLayout>
  );
}

export default TaskList;
