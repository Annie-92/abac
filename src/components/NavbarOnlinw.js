import React, { useState } from "react";
import { useMatch, useResolvedPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/images/Logo-abac.png";
import {HiOutlineBars3} from "react-icons/hi2";
import {Box,
        Drawer, 
        ListItem, ListItemButton, 
        ListItemIcon,
        ListItemText}
         from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
        
import HomeIcon from "@mui/icons-material/Home";   
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";   
import auth from '../utils/auth';

const Navbar = () => {
  const isLoggedIn = auth.isLoggedIn();

  const scrollToAbout = () => {
    const section = document.getElementById('AboutPage');
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTestimonials = () => {
    const section = document.getElementById('TestimonialPage');
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'mooth'
      });
    }
  };

  const scrollToContact = () => {
    const section = document.getElementById('Footer');
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: 'mooth'
      });
    }
  };

  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
        {
          text: "Home",
          icon: <HomeIcon />,
        },
        {
          text: "About",
          icon: <InfoIcon />,
        },
        {
          text: "Testimonials",
          icon: <CommentRoundedIcon />,
        },
        {
          text: "Contact",
          icon: <PhoneRoundedIcon />,
        },
        
      ];

  return (
    <div className='NavSection'>
    <nav>
    <Link to="/" className="nav-logo-container">
      <img src={Logo} alt="" />
    </Link>
    <div className="navbar-links-container">
     <Link to="Abac/">Home</Link>
     <Link to="Abac/" onClick={scrollToAbout}>About</Link>
     <Link to="Abac/" onClick={scrollToTestimonials}>Testimonials</Link>
     <Link to="Abac/" onClick={scrollToContact}>Contact</Link>
  
  
  
      
      {isLoggedIn? (
  <Link className="primary-button" to="Abac/dashboard">
    Dashboard
  </Link>
) : (
  <Link className="primary-button" to="Abac/Login">
    Login
  </Link>
)}
    </div>
    <div className="navbar-menu-container">
      <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpenMenu(false)}
        onKeyDown={() => setOpenMenu(false)}
      >
        <List>
          {menuOptions.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>

  </nav>
  </div>
  )
}

export default Navbar