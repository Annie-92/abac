import React from "react";
import Slider from 'react-slick';
import BannerBackground from "../assets/images/v1_abac_LE_auto_x2.jpg";
import BannerImage from "../assets/images/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import About from './About';
import Header from './Header';
import Testimonial from './Testimonial';
import Footer from './Footer';




const Home = () => {

  return (
  
    <div id="HomePage"  className="home-container">
     <Header />
     <About />
     <Testimonial />
     <Footer />
 
    </div>
    
  );
};



export default Home;
