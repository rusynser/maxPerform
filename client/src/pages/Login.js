import React, { useState } from 'react'; // Import React if needed
import { Link,useNavigate   } from 'react-router-dom'; // Import Link
import { Button, Form, Alert } from 'react-bootstrap';
import "./styles.css";
import { useUser } from '../contexts/UserContex';
import Navigation from '../components/Navigation';

function  LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userData, setUserData } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Necessary for cookies to be sent
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
              const data = await response.json();
              // Store user data in state, context, or other state management solution
              setUserData({
                  userId: data.userId,
                  userRole: data.userRole
                });// Store the user ID
                navigate('/projects'); 
            } else {
                // Handle errors
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
   
  return ( 
    <div>
       <Navigation/>
    <div className='row g-0 vh-100 justify-content-center align-items-center login-container'>
      <div className='col-10 row g-0 align-items-center border rounded-2 bg-white'>
        <div className='col-6'>
          <img src="https://i.ibb.co/MG5Pk6j/logoMax.png" alt='' className='img-fluid' />
        </div>

        <form className='col-6 py-4 px-3' onSubmit={handleSubmit}>
          <h4 className='login-title text-center py-2 mb-4'>Login</h4>
          <div className='form-floating mb-3'>
            <input type='email' className='form-control' id='email' placeholder='name@example.com' onChange={(e)=> {setEmail(e.target.value)}}/>
            <label htmlFor='email'>Enter email</label>
          </div>
          <div className='form-floating mb-3'>
            <input type='password' className='form-control' id='password' placeholder='password' onChange={(e)=> {setPassword(e.target.value)}}/>
            <label htmlFor='password'>Password</label>
          </div>
          
          <div className='text-center'>
            <button type='submit' className='login-btn py-3 rounded-4' >
              Login
            </button>
          </div>

          <div className='text-center mt-4'>
          Not registered ? <Link to="/registration">Sign Up</Link>
          </div>

        </form>
      </div>
    </div>
    </div>
  );
};


  
export default LoginPage;