import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";

import axios from 'axios';
// import { useAuth } from "../hooks/AuthProvider";
import withProtectedPage from '../withProtectedPage';
import { fetchUserData } from '../api/FetchUser';

import { Link , useNavigate} from "react-router-dom";
import { MdOutlineShutterSpeed, MdFlashOn, MdFlashAuto } from "react-icons/md";
import { ImCalculator } from "react-icons/im";
import { TbMathSymbols } from "react-icons/tb";


const Dashboard = (props) => {


  const [userData, setUserData] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isVerified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state


  useEffect(() => {
    fetchUserData().then((data) => {
      console.log('Dashboard data log'); // Add this line to see what data is being returned
      console.log(data); // Add this line to see what data is being returned

      if (data) {
        setUserData(data);
        setIsTeacher(data.is_teacher === 1);
        setVerified(data.is_verified === 1);
        setLoading(false); // Set loading to false when data is fetched
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator
  }

  if (!isTeacher && !isVerified) {
    return (
      <div className="dashboard">
        <div className="SideMenu">
          <Sidebar setLoggedIn={props.setLoggedIn} />
        </div>
        <div className="dashboard__content">
          <div className="db_content">
            <h2>Access Restricted</h2>
            <p>Your account is not verified. Please wait for the admin to verify your account.</p>
          </div>
        </div>
      </div>
    );
  }


  if(isTeacher){
    return (
      <div className="dashboard">
        <div className="SideMenu">
        <Sidebar setLoggedIn={props.setLoggedIn} />
        </div>
        <div className="dashboard__content">
        <div className="db_content">
        <h2>My Dashboard</h2>
        <div className="sep"></div>
  
        <div className="flex-start">
  
        
  
        <div className="card">
        <div className="card-header pink-bg">
         # Students
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-percentage">
           
              <span className="card-number">23</span>
           </div>
          
          </div>
        </div>
      </div>
  
      <div className="card">
        <div className="card-header green-bg">
          # Quiz taken today
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-percentage">
  
              <span className="card-number">7</span>
        
            </div>
          
          </div>
        </div>
      </div>
      </div>

      <h2>Practices</h2>
      <div className="sep"></div>

      <div className="flex-start flex-wrap">
  
  <Link to="/SpeadDrill" replace>
  <div className="card">
    <div className="card-header purple-bg">
    Speed Drill
    </div>
    <div className="card-body">
      <div className="card-content">
        <div className="card-percentage">
    

        <MdOutlineShutterSpeed className="purple-bg-color" />

       
        <span className="card-text">Practice Now</span>

       </div>
      
      </div>
    </div>
  </div>
  </Link>

  <Link to="/MentalCalculation" replace>
  <div className="card">
    <div className="card-header green-bg">
    Mental Calculation
    </div>
    <div className="card-body">
      <div className="card-content">
        <div className="card-percentage">
        <ImCalculator  className="green-bg-color"/>

        <span className="card-text">Practice Now</span>

       </div>
      
      </div>
    </div>
  </div>
  </Link>



  <Link to="/FlashCards" replace>
  <div className="card">
    <div className="card-header red-bg">
    Flash Cards
    </div>
    <div className="card-body">
      <div className="card-content">
        <div className="card-percentage">
        <MdFlashOn className="red-bg-color"/>

        <span className="card-text">Practice Now</span>

       </div>
      
      </div>
    </div>
  </div>
  </Link>

  <Link to="/FlashAnzan" replace>
  <div className="card">
    <div className="card-header orange-bg">
    Flash Anzan
    </div>
    <div className="card-body">
      <div className="card-content">
        <div className="card-percentage">
        <MdFlashAuto className="orange-bg-color"/>

          <span className="card-text">Practice Now</span>
       </div>
      
      </div>
    </div>
  </div>
  </Link>

  



  </div>

      
      
      </div>
         
        </div>
      </div>
    );
  } else {
    return (
      <div className="dashboard">
      <div className="SideMenu">
      <Sidebar />
      </div>
      <div className="dashboard__content">
      <div className="db_content">
      <h2>My Practices</h2>
      <div className="sep"></div>
  
      <div className="flex-start flex-wrap">
  
      <Link to="/SpeadDrill" replace>
      <div className="card">
        <div className="card-header purple-bg">
        Speed Drill
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-percentage">
        
  
            <MdOutlineShutterSpeed className="purple-bg-color" />
  
           
            <span className="card-text">Practice Now</span>
  
           </div>
          
          </div>
        </div>
      </div>
      </Link>
  
      <Link to="/MentalCalculation" replace>
      <div className="card">
        <div className="card-header green-bg">
        Mental Calculation
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-percentage">
            <ImCalculator  className="green-bg-color"/>
  
            <span className="card-text">Practice Now</span>
  
           </div>
          
          </div>
        </div>
      </div>
      </Link>
  
 
  
      <Link to="/FlashCards" replace>
      <div className="card">
        <div className="card-header red-bg">
        Flash Cards
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-percentage">
            <MdFlashOn className="red-bg-color"/>
  
            <span className="card-text">Practice Now</span>
  
           </div>
          
          </div>
        </div>
      </div>
      </Link>
  
      <Link to="/FlashAnzan" replace>
      <div className="card">
        <div className="card-header orange-bg">
        Flash Anzan
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-percentage">
            <MdFlashAuto className="orange-bg-color"/>
  
              <span className="card-text">Practice Now</span>
           </div>
          
          </div>
        </div>
      </div>
      </Link>
  
      
  
  
    
      </div>
  
     
  
  
  
    </div>
       
      </div>
    </div>
    );
  }


};

export default withProtectedPage(Dashboard);