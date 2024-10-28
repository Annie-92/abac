import { Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';

const publicRoutes = [
  <Route path="/" element={<Home />} />,
  <Route path="/Login" element={<Login />} />,
  <Route path="/Register" element={<Register />} />,
  <Route path="/ForgotPassword" element={<ForgotPassword />} />,
];

export default publicRoutes;