import React, { useState } from 'react';
import { useAuth } from '../context/Auth_context';
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Enter username and password");
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      navigate(`/view`); // Redirect on successful login
    } else {
      setError(result.error || 'Invalid username or password');
      return;
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className='flex justify-center items-center'>

      <div className='max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white'>
            <h2 className='text-4xl text-center'>Log In</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-6'>

              <div className='flex flex-col'>
                <label>Enter username:</label>
                <input 
                  className='p-2 border border-white rounded bg-gray-700 text-white' 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder='Username' 
                  type='text' 
                  value={username} 
                />
              </div>

              <div className='flex flex-col'>
                <label>Enter password:</label>
                <input 
                  className='p-2 border border-white rounded bg-gray-700 text-white' 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder='Password' 
                  type='password' 
                  value={password} 
                />
              </div>

              {error && <div className='text-center text-red-500'>{error}</div>}

              <button 
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition' 
                type='submit'
              >
                Log In
              </button>

              <p className='text-center'>
                Don't have an account? <Link to='/signUp' className='text-blue-500'>Sign Up</Link>
              </p>
            </form>
          </div>
    </div>
  );
}

export default LogIn;
