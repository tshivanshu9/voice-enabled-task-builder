import { Link } from 'react-router-dom'

function AppLayout( { children }) {
  return (
    <div className='max-w-3xl mx-auto p-6'>
      <header className='flex flex-col items-center mb-6'>
        <Link to='/'>
          <h1 className='text-3xl font-bold'>Voice Based Task Creator</h1>
        </Link>
        <div className="flex gap-3 my-3">
          <Link to='/create' className='px-4 py-2 rounded bg-blue-600 text-white'>
            + Create manually
          </Link>
          <Link to='/voice' className='px-4 py-2 rounded bg-green-600 text-white'>
            🎤 Speak and create
          </Link>
        </div>
      </header>
      { children }
    </div>
  );
}

export default AppLayout
