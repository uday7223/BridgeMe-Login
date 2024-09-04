import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   const navigate =  useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, password });
            if (response.data.success) {
                alert('User registered successfully');
                navigate('/')
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
       <>
            <div className="login">

            <form onSubmit={handleRegister}>
            <div className="login-con">
            <div className="logo">
              <h1 className="text-center font-sans text-purple-600 text-4xl pb-4">BRIDGEME</h1>
              <p className="text-center text-purple-600">Sign Up to BridgeMe</p>
            </div>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="">forgot password ?</a>
            <div className="btn flex flex-row gap-3">
              <button className='main-btn' type='submit'>Register</button>
              <button className='main-btn bg-green-400' onClick={() => { navigate('/') }}>Login</button>
            </div>
          </div>
</form>


            </div>

       </>
    );
};

export default Register;
