import React, { useState, useEffect } from 'react';
import { Button, Modal } from "antd";
import Sidebar from "../components/Sidebar";
import { ImCalculator } from "react-icons/im";
import { Link } from 'react-router-dom';
import { MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import { FaRegPauseCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuSearchCheck } from "react-icons/lu";
import Switch from 'react-switch';
import withProtectedPage from '../withProtectedPage';

const MentalCalculation = () => {
  const [numbers, setNumbers] = useState([]);
  const [displayedNumbers, setDisplayedNumbers] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isAnswerEnabled, setIsAnswerEnabled] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [settings, setSettings] = useState({
    digits: 1,
    rows: 5,
    flash: 500,
    timeout: 1000,
    neg: false,
    handsFree: false,
    lang: 'en',
    fontSize: 20,
    fontColor: '#000000',
    backgroundColor: '#ffffff'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState(''); // New state for result message


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const generateNumbers = (count, digits, allowNegative) => {
    const numArr = [];
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
  
    let sum = 0;
    for (let i = 0; i < count; i++) {
      let num;
      if (allowNegative && Math.random() > 0.5) {
        num = -Math.floor(Math.random() * (max - min + 1)) + min;
        sum += num;
        if (sum < 0) {
          num = -num; // Make sure the sum is positive
          sum = 0;
        }
      } else {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
        sum += num;
      }
      numArr.push(num);
    }
  
    return numArr;
  };
  useEffect(() => {
    if (isRunning && !isPaused && currentNumberIndex < numbers.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedNumbers(prevDisplayedNumbers => [...prevDisplayedNumbers.slice(1), numbers[currentNumberIndex]]);
        setCurrentNumberIndex(currentNumberIndex + 1);
      }, settings.flash);

      if (currentNumberIndex === numbers.length - 1) {
        setTimeout(() => {
          setDisplayedNumbers(prevDisplayedNumbers => [...prevDisplayedNumbers, '?']);
          setIsRunning(false);
          setIsAnswerEnabled(true);
        }, settings.timeout + settings.flash); // Ensure timeout is correctly applied
      }

      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [currentNumberIndex, isRunning, isPaused, numbers, displayedNumbers, settings]);

  useEffect(() => {
    if (isRunning) {
      setDisplayedNumbers([]);
      setCurrentNumberIndex(0);
      setNumbers(generateNumbers(settings.rows, settings.digits, settings.neg));
    }
  }, [isRunning, settings]);

  useEffect(() => {
    if (settings.handsFree && isRunning) {
      // Automatically start the exercise if hands-free mode is on
      startExercise();
    }
  }, [settings.handsFree, isRunning]);

  const startExercise = () => {
    setIsRunning(true);
    setIsAnswerEnabled(false);
  };

  const togglePause = () => {
    setIsPaused(prevIsPaused => !prevIsPaused);
  };

  const checkAnswer = () => {
    if (!isRunning) {
      let sum = numbers.reduce((acc, val) => acc + val, 0);
      if (sum === Number(answer)) {
        setResultMessage('Correct!');
      } else {
        setResultMessage(`Incorrect. The correct answer is ${sum}.`);
      }
      setAnswer('');
    }
  };

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <div>
            <div className='practice-box'>
            <div className='head green-bg'>
            <ImCalculator  className="white-color"/>
              <h1>Mental Calculation</h1>
              </div>

              <div className='flex-center'>
                <div className='practice-area'>

                <p className='MentalCalcNbr'>
                {displayedNumbers.map((num, i) => (
                  <span key={i} style={{ visibility: i === displayedNumbers.length - 1? 'visible' : 'hidden' }}>
                    {num}
                    {i < displayedNumbers.length - 2 && <span> + </span>}
                  </span>
                ))}
              </p>
              <div className='w-100'>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!isAnswerEnabled}
              />
           
              <button onClick={checkAnswer} disabled={!isRunning && displayedNumbers[displayedNumbers.length - 1]!== '?'} className='practice-btn lilac-bg m-15-auto'  type="button">
          <LuSearchCheck />
              Check
          </button>
              </div>
             
              {resultMessage && (
                    <div className={`result-message ${resultMessage.startsWith('Correct') ? 'correct' : 'incorrect'}`}>
                      {resultMessage}
                    </div>
                  )}
                </div>
                </div>

              <div className='flex-center'>
          <button onClick={startExercise} disabled={isRunning || isPaused} className='practice-btn green-bg'  type="button">
          <MdPlayCircleOutline />
              Start
          </button>

          <button onClick={togglePause} disabled={!isRunning} className='practice-btn green-bg'  type="button">
          <FaRegPauseCircle />
              Pause
          </button>

          <button onClick={showModal}  className='practice-btn green-bg'  type="button">
          <IoMdSettings />
          Setting
          </button>

    
          <Link to="/my-practices" replace>
          <button className='practice-btn green-bg'  type="button">
          <IoPlaySkipBackCircleOutline />
              Go Back
          </button>
          </Link>
        </div>

    
            

      
            </div>
          </div>
        </div>
      </div>
      {/* Add the hidden class to the modal by default */}
      <Modal
  title="Settings"
  open={isModalOpen}
  onOk={handleOk}
  onCancel={handleCancel}
  className="custom-modal" // Apply the custom class here
>
  {/* Modal content */}
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title" id="myModalLabel">Settings</h4>
        <button type="button" className="btn-close" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div id="options">
          <form className="form">
            <h4>Number</h4>
            <div className='flex-space-between'>
            <div className="input-group mb-50">
              <label htmlFor="digits" className="input-group-text col-9">Number of digits</label>
              <input className="form-control col-3 text-center" type="number" min="1" max="9" value={settings.digits} onChange={(e) => setSettings({ ...settings, digits: Math.max(1, Math.min(9, e.target.value)) })} id="digits" />
            </div>
            <div className="input-group mb-50">
              <label htmlFor="rows" className="input-group-text col-9">Number of rows</label>
              <input className="form-control col-3 text-center" type="number" min="2" max="25" value={settings.rows} onChange={(e) => setSettings({ ...settings, rows: Math.max(2, Math.min(25, e.target.value)) })} id="rows" />
            </div>
            </div>
          
            <h4>Time</h4>
            <div className='flex-space-between'>
            <div className="input-group mb-50">
              <label htmlFor="flash" className="input-group-text col-9">Flash (ms)</label>
              <input className="form-control col-3 text-center" type="number" min="50" max="5000" value={settings.flash} onChange={(e) => setSettings({ ...settings, flash: Math.max(50, Math.min(5000, e.target.value)) })} step="50" id="flash" />
            </div>
            <div className="input-group mb-50">
              <label htmlFor="timeout" className="input-group-text col-9">Timeout (ms)</label>
              <input className="form-control col-3 text-center" type="number" min="50" max="5000" value={settings.timeout} onChange={(e) => setSettings({ ...settings, timeout: Math.max(50, Math.min(5000, e.target.value)) })} step="50" id="timeout" />
            </div>
            </div>
           
            <h4>Mode of operation</h4>
            <div className="form-check flex-start">
              <label htmlFor="neg" className="form-check-label">Subtractions</label>
              <Switch
          onChange={(checked) => setSettings({ ...settings, neg: checked })}
          checked={settings.neg}
          onColor="#01BFA6"
          onHandleColor="#A3DBD1"
          handleDiameter={20}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
          activeBoxShadow="0px 1px 5px rgba(0, 0, 0, 0.3)"
          height={20}
          width={48}
          id="neg"
        />
            </div>
      
          </form>
        </div>
      </div>
    </div>
  </div>
</Modal>



      </div>
  );
};

export default withProtectedPage(MentalCalculation);