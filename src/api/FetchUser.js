
import axios from 'axios';

import { API_URL } from '../constants/apiConstants';

const getToken = () => localStorage.getItem('token');

console.log('localStorage');
console.log(localStorage);

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

    
   return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error (redirect to login page, display error message, etc.)
    return null; // or throw error, depending on your use case
  }
};

export { fetchUserData };