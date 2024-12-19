import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import withProtectedPage from '../withProtectedPage';
import { fetchUserData } from '../api/FetchUser';



const Account = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        console.log(data); // Log fetched data
        if (data) {
          setUserData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error: Unable to fetch user data.</div>;
  }

  console.log('userData');
  console.log(userData);

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
      <div>{userData.first_name || "N/A"}</div>
     </div>

     <div className="account-info ">
      <div>Last Name</div>
      <div>{userData.last_name || "N/A"}</div>

     </div>

     <div className="account-info ">
      <div>Level</div>
      <div>{userData.level || "N/A"}</div>

     </div>

     <div className="account-info ">
      <div>Username</div>
      <div>{userData.username || "N/A"}</div>
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