import Cookies from 'js-cookie';

let userData = null; 

const auth = {
  login: (user, token, expiresAt) => {
    // Set the authentication token in a cookie
    Cookies.set('token', token, {
      expires: new Date(expiresAt),
      secure: process.env.NODE_ENV === 'production', // Enable secure flag in production
      sameSite: 'trict', // Prevent client-side access to the cookie
    });

    userData = user;
    console.log('userData after login:');
    console.log(userData); // This will log the correct value of userData
  },
  logout: () => {
    // Remove the authentication token from the cookie
    Cookies.remove('token');
    userData = null;
  },
  isLoggedIn: () => {
    // Get the authentication token from the cookie
    const token = Cookies.get('token');
    if (token) {
      // Check if the token is still valid
      //...
      return true;
    } else {
      return false;
    }
  },

  isTeacher: () => {
    if (userData && userData.is_teacher === 1) {
      return true;
    }
    return false;
  },
};

export default auth;