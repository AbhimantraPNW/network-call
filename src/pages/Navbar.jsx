import React from 'react'

const Navbar = () => {
    return (
        <div className='min-h-screen w-screen'>
          <nav className='bg-teal-800'>
            <div className='max-w-7xl mx-auto px-4 py-3'>
              <div className='flex justify-between items-center'>
                <div className='flex-shrink-0'>
                  <h1 className='text-white text-lg font-bold'>Network Call Practice</h1>
                </div>
                <div className='flex items-center'>
                  <a href='/users' className='text-white mr-4 hover:text-gray-300'>Users</a>
                  <a href='/register' className='text-white hover:text-gray-300'>Register</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )
}

export default Navbar