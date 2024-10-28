import React, { useState, useEffect, memo } from 'react';
import { Button, Modal, Select } from "antd";
import {Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import {  MdFlashAuto } from "react-icons/md";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import { FetchNbrExamples } from '../api/FetchAnzanExamples';
import { CSSTransition } from 'react-transition-group';

const FlashAnzanStart = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [currentNumber, setCurrentNumber] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const { gameMode, difficulty, numCards, numImpressions, subject, periodicity, numRows, numExamplesPerRow, spacingBetweenExamples } = location.state;

  useEffect(() => {
    const fetchExamples = async () => {
      const response = await FetchNbrExamples(subject, numRows, numExamplesPerRow);
      setData(response);
    };
    fetchExamples();
  }, []);

  useEffect(() => {
    if (data[currentIndex] && Array.isArray(data[currentIndex])) {
      let numbers = data[currentIndex];
      let timeoutId = null;
      let index = 0;
      function showNextNumber() {
        if (index < numbers.length) {
          console.log(`Updating currentNumber to ${numbers[index]}`);

          setCurrentNumber(numbers[index]);
          timeoutId = setTimeout(() => {
            index++;
            showNextNumber();
          }, periodicity);
        } else {
          setCurrentNumber('?');
        }
      }
      showNextNumber();
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, data, periodicity]);


  

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const correctAnswer = data[currentIndex].reduce((acc, current) => acc + parseInt(current, 10), 0);
    if (parseInt(answer, 10) === correctAnswer) {
      setResult('correct');
      setScore(score + 1);
    } else {
      setResult('incorrect');
    }
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setAnswer('');
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentNumberIndex(0);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  const FlashAnzanDisplay = memo(({ currentNumber }) => {
    return (
      <CSSTransition
        in={currentNumber !== '?'}
        timeout={500}
        classNames={{
          enter: 'fade-enter',
          enterActive: 'fade-enter-active',
          exit: 'fade-exit',
          exitActive: 'fade-exit-active',
        }}
        key={`transition-${currentNumber}`} // Add a unique key for each transition
      >
        <div className="flashAnzanDisplay__numbers" style={{ opacity: 1 }}>
          {console.log('Rendering CSSTransition with currentNumber:', currentNumber)}
          {currentNumber}
        </div>
      </CSSTransition>
    );
  });

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <div>
            <div className='practice-box'>
            <div className='head orange-bg'>
            <MdFlashAuto className="white-color"/>
              <h1>Flash Anzan Start</h1>
              </div>

              <div className="hh">

              <div className='problem-box'>
                <div className='sep'></div>
              {data[currentIndex] ? (
                    <div className='flashAnzanDisplay'>
                    <FlashAnzanDisplay currentNumber={currentNumber} />
               <div className="flashAnzanDisplay__answer">
                   <input type="text" value={answer} onChange={(event) => setAnswer(event.target.value)} />
                   <form onSubmit={handleAnswerSubmit}>
                    <button className='orange-bg' type="submit">Submit</button>
                  </form>
                     </div>
                     
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                  </div>

                  {showResult && (
                    <div className='ResultBx'>
                      {result === 'correct' ? (
                        <div className='result correct'>Correct!</div>
                      ) : (
                        <div className='result incorrect'>Incorrect.</div>
                      )}
                    </div>
                  )}

                  {finished && (
                    <div className='ResultBx'>
                      <h2>Game Over!</h2>
                      <p>Your score is {score} out of {data.length}.</p>
                    </div>
                  )}
              </div>

       

            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default FlashAnzanStart;