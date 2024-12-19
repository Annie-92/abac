import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { MdOutlineShutterSpeed } from "react-icons/md";
import withProtectedPage from '../withProtectedPage';

const SpeadDrillStart = () => {
  const location = useLocation();
  const {
    add,
    sub,
    mul,
    div,
    duration,
    nbrRow,
    additionRanges,
    multiplicationRanges,
  } = location.state;

  const [score, setScore] = useState(0);
  const [timeleft, setTimeleft] = useState(duration);
  const [problem, setProblem] = useState({
    problemStr: '',
    answer: 0,
  });
  const [answer, setAnswer] = useState('');
  const [start_time, setStart_time] = useState(Date.now());
  const [showResult, setShowResult] = useState(false);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    generateProblem();
  }, []);

  const generateProblem = () => {
    const operations = [];
    if (add) operations.push('+');
    if (sub) operations.push('-');
    if (mul) operations.push('*');
    if (div) operations.push('/');
  
    let problemStr = '';
    let left, right;
    
  
    // Select one operation to use for all rows
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let ranges = [];
  
    if (operation === '+') {
        ranges = additionRanges;
    } else if (operation === '-') {
        ranges = additionRanges; // Assuming subtraction uses the same ranges as addition
    } else if (operation === '*') {
        ranges = multiplicationRanges;
    } else if (operation === '/') {
        ranges = multiplicationRanges; // Assuming division uses the same ranges as multiplication
    }
  
    if (ranges.length === 0) {
        console.error(`Ranges not defined for operation: ${operation}`);
        return; // Stop execution if ranges are not found
    }
  
    // Determine the number of rows to generate based on the operation
    const rowsToGenerate = (operation === '*' || operation === '/') ? 2 : nbrRow;
  
    // Generate a problem for each row with ranges applied consecutively
    for (let i = 0; i < rowsToGenerate; i++) {
        const range = ranges[i % ranges.length]; // Use modulo to loop through ranges if nbrRow > length of ranges
  
        if (i === 0) {
            // Generate the first operand
            left = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            problemStr = `${left}`; // Start the problem string with the first operand
        } else {
            // Generate subsequent operands and append the operation
            right = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  
            // Additional handling for division to avoid division by zero and ensure the result is an integer
            if (operation === '/') {
              // For division, ensure no remainder
              let valid = false;
              while (!valid) {
                right = Math.floor(Math.random() * (left - range.min + 1)) + range.min;
                if (right !== 0 && left % right === 0) {
                  valid = true;
                }
              }
              problemStr += ` / ${right}`;
              left = left / right; // Update the left operand for the next iteration
            } else if (operation === '-') {
              right = Math.floor(Math.random() * (left - range.min + 1)) + range.min;
              problemStr += ` - ${right}`;
              left = left - right; // Update the left operand for the next iteration
            } else {
              right = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
              problemStr += ` ${operation} ${right}`;
              left = right; // Update the left operand for the next iteration
            }
  
          

  
            // problemStr += ` ${operation} ${right}`;
        }
    }
  
    console.log('problemStr:', problemStr);
    console.log('rowsToGenerate:', rowsToGenerate);
  
    // Evaluate the problem
    const evaluatedAnswer = eval(problemStr);
    setProblem({ problemStr, answer: evaluatedAnswer });
    setAnswer('');
};



  
  
  const handleAnswerChange = (e) => {
    const userAnswer = e.target.value;
    setAnswer(userAnswer);

    if (!isNaN(parseFloat(userAnswer)) && userAnswer !== '') {
      if (problem && parseFloat(userAnswer) === problem.answer) {
        setScore(score + 1);
        setProblems([...problems, { ...problem, answer: parseFloat(userAnswer) }]);
        generateProblem(); // Generate a new set of problems
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const d = duration - Math.floor((Date.now() - start_time) / 1000);
      setTimeleft(d);

      if (d <= 0) {
        clearInterval(timer);
        setShowResult(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, start_time]);

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <div>
            <div className='practice-box'>
              <div className='head purple-bg'>
                <MdOutlineShutterSpeed className="white-color" />
                <h1>Speed Drill</h1>
              </div>
              <div id='game'>
                <div className="setting-item flex-center">
                  <label className='text-center'>
                    Seconds left: {timeleft}
                  </label>
                </div>
                <div className='banner'>
                  <div className='start'>
                    {showResult ? (
                      <>
                        <p>Game over!</p>
                        <p>Your score is: {score}</p>
                      </>
                    ) : (
                      <>
                        {problem && (
                          <span className='problem'>
                            {problem.problemStr}
                          </span>
                        )}
                        =
                        <input
                          className='answer'
                          value={answer}
                          onChange={handleAnswerChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withProtectedPage(SpeadDrillStart);
