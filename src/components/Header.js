import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Carousel } from 'antd';



import BannerBackground from "../assets/images/v1_abac_LE_auto_x2.jpg";
import BannerImage from "../assets/images/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Header = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8888/abac/webAPI/v1/GetBanners.php');
        setImages(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onChange = (currentSlide) => {

  };
  const props = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    effect: 'fade',
    pauseOnDotsHover: true,
    speed: 500,
    vertical: false
  };
  return (
    <Carousel {...props} afterChange={onChange}>
    
       {images.map(image => (
         <div key={image.index}>
        
         <div style={{ backgroundImage: `url(${image.imageUrl})` }} className="home-banner-container">
          <div className='h-layer'></div>
        
           <div className='App flex-start'>
           <div className="home-text-section">
           <h1 className="primary-heading-white ">
          Accelerate Your Math Mastery
          </h1>
          <p className="primary-text-white m-b-30">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Duis et interdum ipsum, ac cursus leo.
            Nullam vel mauris at nisl rhoncus lacinia at id eros. 
            Aliquam eget maximus velit. 
          </p>
            <button className="secondary-button">
               Start Now <FiArrowRight />{" "}
             </button>
           </div>
           </div>
        </div>
       </div>
      ))} 

   </Carousel>
  );
};



export default Header;
