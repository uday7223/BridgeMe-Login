import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import '../CSS/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.data.success) {
        login(response.data.token); // Call login from AuthContext
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handleLogin}>
          <div className="login-con">
            <div className="logo">
              <h1 className="text-center font-sans text-purple-600 text-4xl pb-4">BRIDGEME</h1>
              <p className="text-center text-purple-600">Log In to BridgeMe</p>
            </div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="">forgot password ?</a>
            <div className="btn flex flex-row gap-3">
              <button className='main-btn' type='submit'>Log In</button>
              <button className='main-btn bg-purple-500' onClick={() => { navigate('/register') }}>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
