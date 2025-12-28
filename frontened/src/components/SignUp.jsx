import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth_context';
import { useNavigate, Link } from 'react-router-dom';
import isNotEmpty from '../utils/validation.js';

function SignUp() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect user if already logged in
  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isNotEmpty(username) || !isNotEmpty(password) || !isNotEmpty(confirmPassword)) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = signUp(username, password);

    console.log(result);

    if (result.success) {
      navigate('/viewContent');
    } else {
      setError("Username already taken");
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-4xl text-center">Sign Up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
        <div className="flex flex-col">
          <label>Enter username:</label>
          <input 
            className="p-2 border border-white rounded bg-gray-700 text-white" 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Username" 
            type="text" 
            value={username} 
          />
        </div>

        <div className="flex flex-col">
          <label>Enter password:</label>
          <input 
            className="p-2 border border-white rounded bg-gray-700 text-white" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            type="password" 
            value={password} 
          />
        </div>

        <div className="flex flex-col">
          <label>Confirm password:</label>
          <input 
            className="p-2 border border-white rounded bg-gray-700 text-white" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            type="password" 
            value={confirmPassword} 
          />
        </div>

        {error && <div className="text-center text-red-500">{error}</div>}

        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full" 
          type="submit"
        >
          Sign Up
        </button>

        {user?.username && (
          <p className="text-center">
            Already have an account? <Link to="/login" className="text-blue-500">Log In</Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
