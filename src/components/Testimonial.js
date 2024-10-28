import React, { useState, useEffect } from 'react';
import ProfilePic from "../assets/images/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from 'antd';
import axios from 'axios';
import { API_URL } from '../constants/apiConstants';



const Testimonial = () => {

  const [testimonials, SetTestimonials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL +'GetTestimonials.php');
        SetTestimonials(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="PageSection light-blue">
    <div id="TestimonialPage" className="sectionContainer">
      <div className="work-section-top">
    
        <h1 className="primary-heading">Testimonials</h1>
      </div>
      <Carousel afterChange={onChange} slidesToShow={3}> 

      {testimonials.map(testimonial => (
           <div className="testimonial-section-bottom">
           <img src={testimonial.imageUrl} alt="" />
           <p>
           {testimonial.text}
           </p>
           <div className="testimonials-stars-container">
             <AiFillStar />
             <AiFillStar />
             <AiFillStar />
             <AiFillStar />
             <AiFillStar />
           </div>
           <h2>   {testimonial.fullname}</h2>
         </div>
      ))} 
   
      </Carousel>
     
    </div>
    </div>
  );
};

export default Testimonial;
