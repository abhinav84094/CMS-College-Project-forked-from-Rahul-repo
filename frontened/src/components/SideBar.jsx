import React from 'react'
import { useAuth } from '../context/Auth_context'
import { NavLink, useNavigate } from 'react-router-dom';

function SideBar() {

  const {user, logOut} = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logOut();
    navigate('/login');
  }

  return (
    <div className='bg-gray-600 w-[100vw] flex justify-between fixed top-0 left-0'>
      <h2 className='text-3xl font-bold ml-4'>CMS Portal</h2>
      <nav className=''>
        <ul>
          {user ? (
            <div className="flex gap-12 mr-5 justify-center items-center">
              <li>
                <NavLink to="/add">
                  Add Content
                </NavLink>
              </li>
              <li>
                <NavLink to={`/view/${user.username}`}>
                  View Content
                </NavLink>
              </li>
            </div>
          ):(
            <div className="flex gap-12 mr-5">
              <li>
                <NavLink to="/login" className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "text-white hover:text-yellow-300"
                  }>
                  LogIn
                </NavLink>
              </li>
              <li className='text-white'>
                <NavLink to="/signUp" className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "text-white hover:text-yellow-300"
                  }>
                  SignUp
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
      {user && (
        <div className='mr-10'>
          <button onClick={handleLogout} >LogOut</button>
        </div>
      )}
    </div>
  )
}

export default SideBar