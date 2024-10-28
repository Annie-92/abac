import React, { useState, useRef, useEffect } from "react";
import {Link, useNavigate, useLocation } from 'react-router-dom';
import auth from "../utils/auth";
import TextField from '@mui/material/TextField';
import axios from "axios";
import './LoginForm.css';
import Footer from '../components/Footer';
import LoginBG from "../assets/images/illustrations/welcome2.svg";
import LoginBgGray from "../assets/images/light-gray-bg.png";
import { API_URL } from '../constants/apiConstants';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';




const Login = (props) => {


  const navigate = useNavigate();

  const location = useLocation(); // Get current location

  const query = new URLSearchParams(location.search); // Parse query parameters




  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const emailRef = useRef();

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (auth.isLoggedIn()) {
      navigate('/dashboard', { replace: true }); // Redirect to dashboard if already logged in
    }
  }, []);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
      if (token) {
        axios.get(API_URL + 'UserData.php', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          if (response.status === 200) {
            setUserData(response.data);
          }
        })
        .catch(error => {
          console.log(error);
          localStorage.removeItem('token');
          navigate('/login');
        });
      }
    
  }, [auth, navigate]);

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post(API_URL + 'UserLoginAuth.php', {
        email: email,
        password: password
      });

      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        // auth.login(response.data.user);
        auth.login(response.data.user); // Use auth.login to log in the user



        props.updateLoggedInState(true);
        setIsLoggedIn(true); // Update the local isLoggedIn state

        const is_teacher = response.data.is_teacher;
          navigate('/dashboard');
     
     
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Wrong Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showNotification = query.get('notification') === '1';


  return (
    <div>
      <div className="LoginGrid">
        <div className="left">

        <div className="LoginBg">
    
        <img className="bg2" src={LoginBgGray} />  
        <img className="bg1" src={LoginBG} />  
    </div>
  </div>

        <div className="right">
          <div className="login-container">
            <div className="PageTitle">
              <h2>Welcome to Abac! 👋🏻</h2>
              <div className="brief">Please sign-in to your account and start the adventure</div>
            </div>

            {error &&   <div className="login-other-area"> <Alert severity="error">{error}</Alert> </div> }

                {/* Show notification message if applicable */}
                {showNotification && (
              <div className="login-other-area">
                <Alert severity="success">Registration successful! You can now log in.</Alert>
              </div>
            )}
      
            <form onSubmit={handleSubmit} className="login-form">

              <TextField id="email" className="login-field"
                type="text"
                name="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={email? "false" : "true"}
                aria-describedby="emailnote"
              label="Email" variant="outlined"
              />

            <TextField id="password" className="login-field"
               name="password"
             onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={password? "false" : "true"}
              aria-describedby="passwordnote"
              label="Password" variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <div className="flex-center login-other-area">
              
                <Link to="/ForgotPassword">
                <a> forgot password?</a>  
          </Link>
             </div>

              <button className="login-button"> <span>Log in</span> </button>


            </form>

            <div className="flex-center login-other-area">

              <span>New on our Platform? </span>
              
              <Link to="/Register">
              <a> Create an account</a>  
        </Link>
           </div>

          
          </div>
        </div>
    
      </div>

    </div>
  );
};

export default Login;