import { Sidebar } from "react-pro-sidebar";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/MyAccount";
import Practice from "./pages/MyPractices";
import FlashAnzan from "./pages/FlashAnzan";
import FlashAnzanStart from "./pages/FlashAnzanStart";
import FlashCards from "./pages/FlashCards";
import MentalArithmetic from "./pages/MentalArithmetic";
import MentalCalculation from "./pages/MentalCalculation";
import SpeadDrill from "./pages/SpeadDrill";
import SpeadDrillStart from "./pages/SpeadDrillStart";
import Quizzes from "./pages/Quizzes";
import Competition from "./pages/Competition";
import Abacus from "./pages/Abacus";
import Students from "./pages/MyStudents";
import PrivateRoute from "./components/PrivateRoute";
import auth from "./utils/auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, []);

  const updateLoggedInState = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <>
      <Navbar updateLoggedInState={updateLoggedInState} setIsLoggedIn={setIsLoggedIn} />
      <Sidebar setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login updateLoggedInState={updateLoggedInState} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          
          {/* Private Routes */}
          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/my-account" element={<Account />} />
            <Route path="/Logout" element={<Logout />} />
            <Route path="/my-practices" element={<Practice />} />
            <Route path="/FlashAnzan" element={<FlashAnzan />} />
            <Route path="/FlashAnzanStart" element={<FlashAnzanStart />} />
            <Route path="/FlashCards" element={<FlashCards />} />
            <Route path="/MentalArithmetic" element={<MentalArithmetic />} />
            <Route path="/MentalCalculation" element={<MentalCalculation />} />
            <Route path="/SpeadDrill" element={<SpeadDrill />} />
            <Route path="/SpeadDrillStart" element={<SpeadDrillStart />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/competition" element={<Competition />} />
            <Route path="/abacus" element={<Abacus type={0} />} />
            <Route path="/my-students" element={<Students />} />
          </Route>
        </Routes>
      </Sidebar>
    </>
  );
};

export default App;