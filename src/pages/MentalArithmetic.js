import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { Button, Modal } from "antd";
import Sidebar from "../components/Sidebar";
import { TbMathSymbols } from "react-icons/tb";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import withProtectedPage from '../withProtectedPage';

const MentalArithmetic = () => {

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <div>
            <div className='practice-box'>
            <div className='head yellow-bg'>
            <TbMathSymbols className="white-color" />
              <h1>Mental MentalArithmetic</h1>
              </div>


              <div className='flex-center'>
          <button className='practice-btn yellow-bg'  type="button">
          <MdPlayCircleOutline />
              Start
          </button>

          <Link to="/my-practices" replace>
          <button className='practice-btn yellow-bg'  type="button">
          <IoPlaySkipBackCircleOutline />
              Go Back
          </button>
          </Link>
        </div>
            
            
         
           
            </div>
          </div>
        </div>
      </div>
  
    

      </div>
  );
};

export default withProtectedPage(MentalArithmetic);