
import axios from 'axios';

import { API_URL } from '../constants/apiConstants';

const getToken = () => localStorage.getItem('token');


const fetchUserData = async () => {
  try {
    const token = getToken();
    const response = await axios.get(API_URL + "UserData.php", {
      headers: {
       token: `${token}`
       }
    });




    response.data.is_teacher = parseInt(response.data.is_teacher, 10);



    
   return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
};

export { fetchUserData };