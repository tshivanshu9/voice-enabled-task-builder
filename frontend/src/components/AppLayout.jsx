import { Link } from 'react-router-dom'

// Enhanced AppLayout
function AppLayout({ children }) {
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-4xl mx-auto p-6'>
        <header className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <Link to='/' className='block text-center mb-6'>
            <h1 className='text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              🎤 Voice Task Manager
            </h1>
            <p className='text-gray-600 mt-2'>Speak your tasks into existence</p>
          </Link>
          <div className="flex gap-4 justify-center">
            <Link
              to='/create'
              className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              ✏️ Create Manually
            </Link>
            <Link
              to='/voice'
              className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              🎤 Voice Create
            </Link>
          </div>
        </header>
        <main className='bg-white rounded-lg shadow-md p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout
