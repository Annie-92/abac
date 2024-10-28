import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import axios from 'axios';
import { API_URL } from '../constants/apiConstants';

const Logout = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // set the isLoggedIn state variable to false
    // for example, if you are using Redux, you can dispatch an action to set the isLoggedIn state variable to false
    setLoggedIn(false);
        Cookies.remove('token');
  
    navigate('/Login', { replace: true });
  }, [navigate, setLoggedIn]);
};



export default Logout;