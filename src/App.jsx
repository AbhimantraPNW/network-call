import { Route, Routes } from 'react-router-dom'
import PageRegister from './components/PageRegister'
import Users from './components/Users'

function App() {
  return (
    <div className='min-h-screen w-screen'>
      <nav className='bg-teal-800'>
        <div className='max-w-7xl mx-auto px-4 py-3'>
          <div className='flex justify-between items-center'>
            <div className='flex-shrink-0'>
            <a href='/' className='text-white text-lg font-bold'>Network Call Practice</a>
            </div>  
            <div className='flex items-center'>
              <a href='/users' className='text-white mr-4 hover:text-gray-300'>Users</a>
              <a href='/register' className='text-white hover:text-gray-300'>Register</a>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/register' element={<PageRegister />} />
        <Route path='/users' element={<Users />} />
        <Route
          path="/"
          element={<div className="flex text-5xl font-bold justify-center items-center h-screen">Dont Have Account? Please Register First!</div>}
        />
      </Routes>
    </div>
  );
  
}

export default App
