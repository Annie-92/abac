import React from "react";
import Logo from "../assets/images/Logo.png";
import { BsInstagram } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";

import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="PageSection light-purple">
    <div id="Footer"  className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        <div className="footer-icons">
           <SiLinkedin />
          <BsInstagram />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>About us</span>
          <span>Testimonials</span>
          <span>Contact Us</span>
          <span>info@abac-academy.org</span>
        </div>
        <div className="footer-section-columns">
      
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
