
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


    console.log('user Data Log'); // Add this line to see what data is being returned
    console.log(response.data); // Add this line to see what data is being returned

    response.data.is_teacher = parseInt(response.data.is_teacher, 10);

    console.log('response');
    console.log(response);

    
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