import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef, useMemo } from 'react';
import Sidebar from "../components/Sidebar";
import withProtectedPage from '../withProtectedPage';
import DOMPurify from 'dompurify';
import axios from 'axios';

const allowedAttributes = ['src', 'frameborder', 'allowfullscreen'];
const iframeAllowed = ['iframe'];

const Abacus = (props) => {
  const iframeHtml = '<iframe style="width:100%;max-width: 900px;margin: auto;height: 500px;" src="https://colitely.com/Abac/abacus-simulator/abacus-sim.html" frameborder="0" allowfullscreen></iframe>';

  const purify = DOMPurify();
  const purifiedHtml = purify.sanitize(iframeHtml, {
    allowedAttributes,
    allowedTags: iframeAllowed,
  });
  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar setLoggedIn={props.setLoggedIn} />
      </div>
      <div className="dashboard__content">
        <div className="db_content flex-center">
          <div className="">
            <h2 className="text-center">Abacus Simulator</h2>
            <div>
            {/* <div className="Abacus-simulator" dangerouslySetInnerHTML={{ __html: iframeHtml }} /> */}
            <div className="Abacus-simulator" key={Math.random()} dangerouslySetInnerHTML={{ __html: iframeHtml }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withProtectedPage(Abacus);