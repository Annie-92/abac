import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import MyAccount from "./MyAccount";
import Practices from "./Practices";
import Quizzes from "./Quizzes";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard__content">
       my prac
      </div>
    </div>
  );
};

export default Dashboard;