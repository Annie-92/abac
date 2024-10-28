import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaUser, FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight, FaTachometerAlt, FaRegQuestionCircle, FaTrophy, FaGem, FaList, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { BiMath, BiAbacus } from "react-icons/bi";
import { Link , useNavigate, useLocation} from "react-router-dom";
import sidebarBg from '../assets/images/bg1.png';
import { API_URL } from '../constants/apiConstants';


import axios from 'axios';
import withProtectedPage from '../withProtectedPage';
import './Sidebar.css';
import Cookies from 'js-cookie';

import { fetchUserData } from '../api/FetchUser';


const CustomSubMenu = ({ label, icon, children, onToggle }) => {

const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(label, !isOpen);
  };

  return (
    <SubMenu
      label={label}
      icon={icon}
      onOpenChange={handleToggle}
      opened={isOpen}
    >
      {children}
    </SubMenu>
  );
};




const Sidebar = ({
  image,
  toggled,
  handleToggleSidebar,
 
}) => {
  const [openedSubMenu, setOpenedSubMenu] = useState(["practice-now"]);
  const [isToggled, setToggled] = useState(toggled);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const location = useLocation();
  const isActive = (link) => location.pathname === link;


  useEffect(() => {
    fetchUserData().then((data) => {
      console.log('Sidebar data log'); // Add this line to see what data is being returned
      console.log(data); // Add this line to see what data is being returned
      if (data) {
        setUserData(data);
        setIsTeacher(data.is_teacher === 1);
      }
    });
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // or a loading indicator
  }


  const handleLogout = async () => {
    try {
      const response = await axios.post(API_URL + 'UserLogout.php', {
     
      });
      console.log(response);
  
      if (response.status = 200) {
        setLoggedIn(false);
        Cookies.remove('token');
     
        navigate('/Login');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubMenuToggle = (label, isOpen) => {
    if (isOpen) {
      setOpenedSubMenu((prevOpenedSubMenu) =>
        prevOpenedSubMenu.filter((subMenu) => subMenu !== label)
      );
    } else {
      setOpenedSubMenu((prevOpenedSubMenu) => [...prevOpenedSubMenu, label]);
    }
  };

  const handleCollapsedChange = (collapsed) => {
    setToggled(!isToggled);
  };

  
if(isTeacher){
  return (
    <div className={`SideMenuItem ${isToggled ? 'SideMenuItem--collapsed' : ''}`}>
    <Menu
      className={`ps ${isToggled ? 'ps--collapsed' : ''}`}
      image={image ? sidebarBg : false}
      collapsed={isToggled}
      toggled={isToggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
      onCollapse={handleCollapsedChange}
    >
      {/* Header */}
      {isToggled? (
  <MenuItem
    icon={<FaAngleDoubleRight />}
    onClick={handleCollapsedChange}
  ></MenuItem>
) : (
  <MenuItem
    suffix={<FaAngleDoubleLeft />}
    onClick={handleCollapsedChange}
  >
    <div
      style={{
        padding: "9px",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 15,
        letterSpacing: "1px"
      }}
    >
      Welcome Back
    </div>
  </MenuItem>
)}

      {/* Content */}
      <Menu iconShape="circle">

                    <Link to="/dashboard" replace>
                <MenuItem
                  icon={<FaTachometerAlt />}
                  className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>Dashboard</span>}
                    
                  </span>
                </MenuItem>
              </Link>

              <Link to="/my-account" replace>
                <MenuItem
                  icon={<FaUser />}
                  className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>My account</span>}
                    
                  </span>
                </MenuItem>
              </Link>

              <Link to="/my-students" replace>
                <MenuItem
                  icon={<FaRegQuestionCircle />}
                  className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>My Students</span>}
                    
                  </span>
                </MenuItem>
              </Link>

              <Link to="/abacus" replace>
                <MenuItem
                  icon={<BiAbacus />}
                  className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>Abacus Simulator</span>}
                    
                  </span>
                </MenuItem>
              </Link>
     

      </Menu>

      {/* Footer */}
      <MenuItem
        icon={<FaSignOutAlt />}

        className={`profile-menu-item-bottom ps-menuitem ${isToggled ? 'profile-menu-item-bottom ps-menuitem--collapsed' : ''}`} 

        onClick={handleLogout}
      >
        <div
          style={{
            padding: "9px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 15,
            letterSpacing: "1px"
          }}
        >
          Log Out
        </div>
      
   
       
        
      </MenuItem>
    </Menu>
    </div>
  );
} else {
  return (
    <div className={`SideMenuItem ${isToggled ? 'SideMenuItem--collapsed' : ''}`}>

    <Menu
          className={`ps ${isToggled ? 'ps--collapsed' : ''}`}
        image={image ? sidebarBg : false}
      collapsed={isToggled}
      toggled={isToggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
      onCollapse={handleCollapsedChange}
    >
      {/* Header */}
      {isToggled ? (
        <MenuItem
          icon={<FaAngleDoubleRight />}
          onClick={handleCollapsedChange}
        ></MenuItem>
      ) : (
        <MenuItem
          suffix={<FaAngleDoubleLeft />}
          onClick={handleCollapsedChange}
        >
          <div
            style={{
              padding: "9px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 15,
              letterSpacing: "1px"
            }}
          >
            Welcome Back
          </div>
        </MenuItem>
      )}

      {/* Content */}
      <Menu iconShape="circle">

             
           <Link to="/dashboard" replace>
                <MenuItem
                      icon={<BiMath />}
                      className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>Practices</span>}
                    
                  </span>
                </MenuItem>
              </Link>
  
     
          <Link to="/my-account" replace>
                <MenuItem
                  icon={<FaUser />}
                  className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>My account</span>}
                    
                  </span>
                </MenuItem>
          </Link>
        <Link to="/quizzes" replace>
                <MenuItem
                      icon={<FaRegQuestionCircle />}
                      className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>Quiz</span>}
                    
                  </span>
                </MenuItem>
           </Link>

    
        <Link to="/competition" replace>
                <MenuItem
                      icon={<FaTrophy />}
                      className={`ps-menuitem ${isToggled? 'ps-menuitem--collapsed' : ''} ${isActive('/dashboard')? 'active' : ''}`}

                >
                  <span>
                    {isToggled? null : <span>Competition</span>}
                    
                  </span>
                </MenuItem>
           </Link>
      </Menu>

      {/* Footer */}
      <MenuItem
        icon={<FaSignOutAlt />}

        className="profile-menu-item-bottom"
        onClick={handleLogout}
      >
        <div
          style={{
            padding: "9px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 15,
            letterSpacing: "1px"
          }}
        >
          Log Out
        </div>
      
   
       
        
      </MenuItem>
    </Menu>
    </div>
  );
}
};

export default withProtectedPage(Sidebar);