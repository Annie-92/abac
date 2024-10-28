import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_URL } from '../constants/apiConstants'; // Adjust the import based on your API URL constants

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Make an API call to log out the user
        const response = await axios.post(API_URL + 'UserLogout.php', {
          // You can include any necessary data here, e.g., user ID if needed
        });

        console.log('response');
        console.log(response);

        if (response.status === 200) {

          Cookies.remove('token');
        
          // Redirect to the login page
          navigate('/Login', { replace: true });
        } else {
          throw new Error('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
        // Optionally, you can show an error message to the user
      }
    };

    handleLogout(); // Call the logout function
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
};

export default Logout;