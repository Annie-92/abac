import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Form from 'react-bootstrap/Form';
import Switch from 'react-switch';
import Sidebar from "../components/Sidebar";
import '../Style/Practice.css';
import { MdOutlineShutterSpeed, MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import withProtectedPage from '../withProtectedPage';


const SpeadDrill = () => {
  const [nbrRow, setNbrRow] = useState(2);
  const [duration, setDuration] = useState(120);
  const [add, setAdd] = useState(true);
  const [sub, setSub] = useState(true);
  const [mul, setMul] = useState(true);
  const [div, setDiv] = useState(true);
  const [additionRanges, setAdditionRanges] = useState(Array(2).fill({ min: 2, max: 100 }));
  const [multiplicationRanges, setMultiplicationRanges] = useState(Array(2).fill({ min: 2, max: 100 }));
  
  const navigate = useNavigate();

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getProblemGen = () => {
    let operandRanges, operation;
  
    if (add) {
      operandRanges = additionRanges;
      operation = '+';
    } else if (sub) {
      operandRanges = additionRanges; // Assuming subtraction uses the same ranges as addition
      operation = '-';
    } else if (mul) {
      operandRanges = multiplicationRanges;
      operation = 'x';
    } else if (div) {
      operandRanges = multiplicationRanges; // Assuming division uses the same ranges as multiplication
      operation = '÷';
    }
  
    const operands = operandRanges.map(range => getRandomNumber(range.min, range.max));
    
    let problemStatement = operands.join(` ${operation} `);
    let solution;
  
    if (operation === '+') {
      solution = operands.reduce((acc, curr) => acc + curr, 0);
    } else if (operation === '-') {
      solution = operands.reduce((acc, curr) => acc - curr);
    } else if (operation === 'x') {
      solution = operands.reduce((acc, curr) => acc * curr, 1);
    } else if (operation === '÷') {
      solution = operands.reduce((acc, curr) => acc / curr);
    }
  
    return [problemStatement, solution];
  };
  

  const handleNbrRowChange = (e) => {
    const newNbrRow = parseInt(e.target.value);
    setNbrRow(newNbrRow);
    // Preserve the existing ranges while adjusting to the new number of rows
    setAdditionRanges(prevRanges => {
      const newRanges = Array(newNbrRow).fill({ min: 2, max: 100 });
      return prevRanges.slice(0, newNbrRow).concat(newRanges.slice(prevRanges.length));
    });

  };

  const handleStart = () => {
    navigate('/SpeadDrillStart', {
      state: {
        add,
        sub,
        mul,
        div,
        duration,
        nbrRow,
        additionRanges,
        multiplicationRanges,
      },
    });
  };

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <div className="practice-box">
            <div className='head purple-bg'>
              <MdOutlineShutterSpeed className="white-color" />
              <h1>Speed Drill</h1>
            </div>
            <Form className="game-options">
              <div className='display-block'>
                <div className='setting-item'>
                  <Switch
                    className='switch-btn'
                    checked={add}
                    onChange={() => setAdd(!add)}
                    id="add"
                    name="add"
                    onColor="#DE9E39"
                  />
                  <label htmlFor="add">Addition</label>
                </div>

           
                  <div className='setting-item'>
                    {additionRanges.map((range, index) => (
                      <div key={index} className="range-input practice-item">
                        <label>
                           Range {index + 1}: (
                          <input
                            type="number"
                            value={range.min}
                            onChange={(e) => {
                              const updatedRanges = [...additionRanges];
                              updatedRanges[index] = { ...updatedRanges[index], min: parseInt(e.target.value) };
                              setAdditionRanges(updatedRanges);
                            }}
                          />{' '}
                          to{' '}
                          <input
                            type="number"
                            value={range.max}
                            onChange={(e) => {
                              const updatedRanges = [...additionRanges];
                              updatedRanges[index] = { ...updatedRanges[index], max: parseInt(e.target.value) };
                              setAdditionRanges(updatedRanges);
                            }}
                          />)
                        </label>
                      </div>
                    ))}
                  </div>
            

                <div className='setting-item'>
                  <Switch
                    className='switch-btn'
                    checked={sub}
                    onChange={() => setSub(!sub)}
                    id="sub"
                    name="sub"
                    onColor="#DE9E39"
                  />
                  <label htmlFor="sub">Subtraction (Addition problems in reverse.)</label>
                </div>

                <div className='setting-item'>
                  <Switch
                    className='switch-btn'
                    checked={mul}
                    onChange={() => setMul(!mul)}
                    id="mul"
                    name="mul"
                    onColor="#DE9E39"
                  />
                  <label htmlFor="mul">Multiplication</label>
                </div>

           
                  <div className='setting-item'>
                    {multiplicationRanges.map((range, index) => (
                      <div key={index} className="range-input practice-item">
                        <label>
                           Range {index + 1}: (
                          <input
                            type="number"
                            value={range.min}
                            onChange={(e) => {
                              const updatedRanges = [...multiplicationRanges];
                              updatedRanges[index] = { ...updatedRanges[index], min: parseInt(e.target.value) };
                              setMultiplicationRanges(updatedRanges);
                            }}
                          />{' '}
                          to{' '}
                          <input
                            type="number"
                            value={range.max}
                            onChange={(e) => {
                              const updatedRanges = [...multiplicationRanges];
                              updatedRanges[index] = { ...updatedRanges[index], max: parseInt(e.target.value) };
                              setMultiplicationRanges(updatedRanges);
                            }}
                          />)
                        </label>
                      </div>
                    ))}
                  </div>
       

                <div className='setting-item'>
                  <Switch
                    className='switch-btn'
                    checked={div}
                    onChange={() => setDiv(!div)}
                    id="div"
                    name="div"
                    onColor="#DE9E39"
                  />
                  <label htmlFor="div">Division (Multiplication problems in reverse.)</label>
                </div>

                <div className='setting-item'>
                  <label htmlFor="nbrRow">Number of Rows: {' '}</label>
                  <select value={nbrRow} onChange={handleNbrRowChange}>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                  </select>
                </div>

                <div className='setting-item'>
                  <label htmlFor="duration">Duration:{' '}</label>
                  <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))}>
                    <option value={30}>30 seconds</option>
                    <option value={60}>60 seconds</option>
                    <option value={120}>120 seconds</option>
                    <option value={300}>300 seconds</option>
                    <option value={600}>600 seconds</option>
                  </select>
                </div>

                <div className='flex-center'>
                  <button className='practice-btn purple-bg' onClick={handleStart} type="button">
                    <MdPlayCircleOutline />
                    Start
                  </button>

                  <Link to="/my-practices" replace>
                    <button className='practice-btn purple-bg' type="button">
                      <IoPlaySkipBackCircleOutline />
                      Go Back
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>


    </div>
  );
};

export default withProtectedPage(SpeadDrill);
