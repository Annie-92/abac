import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withProtectedPage = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the user is authenticated
      if (!isAuthenticated()) {
        // Redirect to the login page
        navigate('/Login');
      }
    });

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

// Replace this function with your own authentication logic
function isAuthenticated() {
  // Return true if the user is authenticated, false otherwise
  return localStorage.getItem('token') !== null;
}

export default withProtectedPage;