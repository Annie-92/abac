import React, { useState, useRef, useEffect } from "react";
import {Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";
import TextField from '@mui/material/TextField';
import axios from "axios";
import './LoginForm.css';
import Footer from '../components/Footer';
import LoginBG from "../assets/images/illustrations/forgot-pass.svg";
import LoginBgGray from "../assets/images/light-gray-bg.png";
import { API_URL } from '../constants/apiConstants';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';



const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const emailRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user?.token) {
      navigate('/dashboard');
    } else {
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
        props.updateLoggedInState(true);
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
              <h2>Forgot Password 🔒</h2>
              <div className="brief">Enter your email and we'll send you instructions to reset your password</div>
            </div>

            {error &&   <div className="login-other-area"> <Alert severity="error">{error}</Alert> </div> }
      
            <form onSubmit={handleSubmit} className="login-form">

              <TextField id="email" className="login-field"
                type="email"
                name="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={email? "false" : "true"}
                aria-describedby="emailnote"
              label="Email" variant="outlined"
              />

         

            <div className="flex-center login-other-area">
   
             </div>

              <button className="login-button"> <span>Send Reset Link</span> </button>


            </form>

            <div className="flex-center login-other-area">
              
              <Link to="/login">
              <a> Back to Login</a>  
        </Link>
           </div>

          
          </div>
        </div>
    
      </div>

    </div>
  );
};

export default Login;