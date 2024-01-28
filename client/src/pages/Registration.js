import { useState} from 'react'; // Import React if needed
import { Link, useNavigate} from 'react-router-dom'; // Import Link
import "./styles.css";
import Navigation from '../components/Navigation';

function RegistrationPage () {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const navigate = useNavigate();
  

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsButtonDisabled(newPassword.length < 6 || newPassword !== confirmPassword);
    setPasswordErrorMessage(newPassword.length >= 6 ? '' : 'Password must be at least 6 characters long');
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsPasswordMatch(newConfirmPassword === password);
    setIsButtonDisabled(password.length < 6 || newConfirmPassword !== password);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:4000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Necessary for cookies to be sent
            body: JSON.stringify({ username, password, userRole, email })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful:', data);
            navigate('/');
        } else {
            // Handle errors
            console.log('Registration failed');
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
};
  

return (
  <div>
    <Navigation/>
    <div className='row g-0 vh-100 justify-content-center align-items-center sign-up-container'>
      <div className='col-10 row g-0 align-items-center border rounded-3 bg-white'>
        <div className='col-6'>
          <img src="https://i.ibb.co/MG5Pk6j/logoMax.png" alt='' className='img-fluid' />
        </div>

      <form className='col-5 py-4 px-3' onSubmit={handleSubmit}>
          <h4 className='sign-up-title text-center py-2 mb-4'>Registration</h4>
          <div class="form-floating mb-3">
                <input 
                  type='username'
                  className='form-control'
                  id='username'
                  placeholder='name@example.com'
                  onChange={(e)=> {setUsername(e.target.value)}}
                />
              <label for="floatingInput">Username</label>
          </div>
              <select className="form-select mb-5" aria-label="Default select example" onChange={(e)=> {setUserRole(e.target.value)}}>
                <option value="">Choose role</option>
                <option value="customer">Customer</option>
                <option value="freelancer">Freelancer</option>
            </select>
            
          <div class="form-floating mb-3">
              <input 
                type="email" 
                class="form-control" 
                id="floatingInput" 
                placeholder="name@example.com"
                onChange={(e)=> {setEmail(e.target.value)}}
              />
                <label for="floatingInput">Email address</label>
          </div>
          <div className='form-floating mb-3'>
        <input
        class="form-control"
        id="floatingPassword"
          type="password"
          name="password" 
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}/>
        {passwordErrorMessage && <p style={{ color: 'red' }}>{passwordErrorMessage}</p>}
          <label for="floatingPassword">Password</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          class="form-control"
          id="floatingPassword"
          type="password"
          name="password" 
          placeholder="Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}/>
                <label for="floatingPassword">Confirm password</label>
              {!isPasswordMatch && (
               <p style={{ color: 'red' }}>The passwords do not match. Please check the entered passwords.</p>
              )}
              </div>
          
          <div className='text-center'>
        
            <button type='submit' className='sign-up-btn py-3 rounded-4' disabled={isButtonDisabled}>
              Registrate
            </button>
            
          
          </div>

          <div className='text-center mt-5'>
          Already registered ? <Link to="/login">Log In</Link>
          </div>

        </form>
      </div>
    </div>
    </div>
  );
};


  
export default RegistrationPage;