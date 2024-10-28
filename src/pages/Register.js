import React, { useState, useRef, useEffect } from "react";
import {Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";
// import TextField from '@mui/material/TextField';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import axios from "axios";
import './LoginForm.css';
import Footer from '../components/Footer';
import LoginBG from "../assets/images/illustrations/signup4.svg";
import LoginBgGray from "../assets/images/light-gray-bg.png";
import { API_URL } from '../constants/apiConstants';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';



const Register = (props) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [grade, setGrade] = useState("");
  const [level, setLevel] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const emailRef = useRef();
  const fullnameRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const usernameRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL + 'GetTeachers.php')
      .then(response => {
        if (response.status === 200) {
          setTeachers(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (teacherId === "") {
      setError("Please select a teacher");
    } else {
    try {
    const response = await axios.post(API_URL + 'UserCreateAccount.php', {
    first_name: firstname,
    last_name: lastname,
    email: email,
    password: password,
    confirm_password: confirmPassword,
    username: username,
    teacher: teacherId,
    level: level,
});

      if(response.status === 200){
        navigate('/login?notification=1');
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError(err.response.data.error.message);
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
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
      <div className="LoginGrid2">
        <div className="left">

        <div className="LoginBg">
    
        <img className="bg2" src={LoginBgGray} />  
        <img className="bg1" src={LoginBG} />  
    </div>
  </div>

        <div className="right">
          <div className="login-container">
            <div className="PageTitle">
              <h2>Abac Adventure starts here 🚀</h2>
              <div className="brief">Register and start the adventure</div>
            </div>

            {error &&   <div className="login-other-area"> <Alert severity="error">{error}</Alert> </div> }
      
            <form onSubmit={handleSubmit} className="login-form">

              <div className="flex-space-between w-100-90">
                
            <TextField id="firstname" className="login-field2"
                type="text"
                name="firstname"
                ref={firstnameRef}
                autoComplete="off"
                onChange={(e) => setFirstname(e.target.value)}
                required
                aria-invalid={email? "false" : "true"}
                aria-describedby="fnamenote"
              label="First Name" variant="outlined"
              />

                  <TextField id="lastname" className="login-field2"
                type="text"
                name="lastname"
                ref={lastnameRef}
                autoComplete="off"
                onChange={(e) => setLastname(e.target.value)}
                required
                aria-invalid={email? "false" : "true"}
                aria-describedby="lnamenote"
              label="Last Name" variant="outlined"
              />


              </div>

              <div className="flex-space-between w-100-90">
              <TextField id="email" className="login-field2"
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

            <TextField id="username" className="login-field2"
                type="text"
                name="username"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-invalid={email? "false" : "true"}
                aria-describedby="usernamenote"
              label="Username" variant="outlined"
              />
              </div>

           
              <div className="flex-space-between w-100-90">
      

                <TextField id="teacher" className="login-field2"
                  name="teacher"
                  onChange={(e) => setTeacherId(e.target.value)}
                  required
                  select
                  value={teacherId}
                  label="Teacher" variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.fullname}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField id="level" className="login-field2"
                  name="level"
                  onChange={(e) => setLevel(e.target.value)}
                  required
                  select
                  value={level}
                  label="Level" variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
                </div>


              <div className="flex-space-between w-100-90">
              <TextField id="password" className="login-field2"
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
            <TextField id="confirmPassword" className="login-field2"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-invalid={confirmPassword? "false" : "true"}
                aria-describedby="confirmPasswordnote"
                label="Confirm Password" variant="outlined"
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
                </div>
  

        

            <div className="flex-center login-other-area">
              <label>
              <input type="checkbox"></input>
              <span> I agree to privacy policy & terms </span>
              </label>
            
              
       
             </div>

              <button className="login-button"> <span>Sign Up</span> </button>


            </form>

            <div className="flex-center login-other-area">

              <span>Already have an account? </span>
              
              <Link to="/Login">
              <a> Sign in instead</a>  
        </Link>
           </div>

          
          </div>
        </div>
    
      </div>

    </div>
  );
};

export default Register;