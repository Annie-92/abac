import React, { useState, useEffect, memo } from 'react';
import { Button, Modal, Select } from "antd";
import {Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import {  MdFlashAuto } from "react-icons/md";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import { FetchNbrExamples } from '../api/FetchAnzanExamples';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
  const [showAnswerInput, setShowAnswerInput] = useState(false);


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
    if (finished) {
        setCurrentNumber(null); // Clear the current number when finished
        setShowAnswerInput(false); // Hide the input
    } else if (data[currentIndex] && Array.isArray(data[currentIndex])) {
        const numbers = data[currentIndex];
        let timeoutId = null;
        let index = 0;

        function showNextNumber() {
            if (index < numbers.length) {
                setCurrentNumber(null); // Temporarily clear the number to trigger re-render
                setTimeout(() => {
                    setCurrentNumber(numbers[index]); // Set the next number
                    index++;
                    timeoutId = setTimeout(showNextNumber, periodicity); // Schedule the next number
                }, 50); // Small delay for proper re-render
            } else {
                setCurrentNumber('?'); // Show `?` at the end
                setShowAnswerInput(true); // Show the answer input
            }
        }

        showNextNumber();
        return () => clearTimeout(timeoutId);
    }
}, [currentIndex, data, periodicity, finished]);

  

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
      setAnswer(''); // Clear the answer input
      setShowAnswerInput(false); // Hide the input

      if (currentIndex < data.length - 1) {
          setCurrentIndex(currentIndex + 1); // Move to the next set of numbers
          setCurrentNumberIndex(0);
      } else {
          setFinished(true); // Mark as finished if no more examples
      }
  }, 1000); // Delay before starting the next set
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
            <div className='head orange-bg'>
            <MdFlashAuto className="white-color"/>
              <h1>Flash Anzan Start</h1>
              </div>

               <div className='problem-box mh200 flex-center flex-wrap'>
         
            {data[currentIndex] ? (
                  <div className='flashAnzanDisplay'>
    {finished ? (
        <button style={{ marginTop: '20px' }}
            className="practice-btn orange-bg"
            onClick={() => navigate(-1)} // Navigate back to the previous page
        >
            Go Back
        </button>
    ) : (
        <CSSTransition
            in={currentNumber !== null} // Animate only when `currentNumber` is not null
            timeout={periodicity}
            classNames="fade" // Ensure matching CSS class
            appear
            unmountOnExit
            onEntering={() => console.log("Entering animation for:", currentNumber)}
            onEntered={() => console.log("Entered animation for:", currentNumber)}
            onExiting={() => console.log("Exiting animation for:", currentNumber)}
            onExited={() => console.log("Exited animation for:", currentNumber)}
        >
            <div className="flashAnzanDisplay__numbers">
                {currentNumber}
            </div>
        </CSSTransition>
    )}

    {showAnswerInput && !finished && (
        <div >
        <form className="flashAnzanDisplay__answer" onSubmit={handleAnswerSubmit}>
            <input
                type="number"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                autoFocus // Automatically focuses on the input
            />
           
                <button className='orange-bg' type="submit">Submit</button>
            </form>
        </div>
    )}
</div>

) : (
    <div>Loading...</div>
)}

             

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