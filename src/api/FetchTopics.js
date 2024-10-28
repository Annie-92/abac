import axios from 'axios';
import { API_URL } from '../constants/apiConstants';

const fetchTopics = async (dim) => {
  try {
    const params = {};
    if (dim) {
      params.dim = dim;
    }
    const response = await axios.get(API_URL + "GetTopics.php", {
      params,
    });

    // console.log('Topics fetched:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error (redirect to login page, display error message, etc.)
    return null; // or throw error, depending on your use case
  }
};

export { fetchTopics };