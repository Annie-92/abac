import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import withProtectedPage from '../withProtectedPage';



const Account = () => {
  return (
    <div className="dashboard">
    <div className="SideMenu">
    <Sidebar />
    </div>
    <div className="dashboard__content">
    <div className="db_content">
    <h2>My Account</h2>
    <div className="sep"></div>

     <div className="account-info ">
      <div>First Name</div>
      <div>Annie</div>
     </div>

     <div className="account-info ">
      <div>Last Name</div>
      <div>Yan</div>
     </div>

     <div className="account-info ">
      <div>Username</div>
      <div>bjjkbbkj</div>
     </div>

     <div className="account-info ">
      <div>Password</div>
      <div>********</div>
     </div>



  </div>
     
    </div>
  </div>
  );
};

export default withProtectedPage(Account);