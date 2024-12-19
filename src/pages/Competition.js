import React, { useState, useEffect } from 'react';
import { Button, Result } from "antd";
import Sidebar from "../components/Sidebar";
import "./Quiz.css";
import axios from "axios";
import { API_URL } from '../constants/apiConstants';
import moment from 'moment';
import CountDownImg from "../assets/images/illustrations/countdown3.svg";

const getToken = () => localStorage.getItem('token');

const Competition = () => {
  const [tables, setTables] = useState([]);
  const [quizTables, setQuizTables] = useState([]);
  const [quizTimeLeft, setQuizTimeLeft] = useState(null); // Timer for the quiz
  const [timeLeft, setTimeLeft] = useState(6 * 60); // 6 minutes

  const [countdownTimeLeft, setCountdownTimeLeft] = useState(null); // Timer for the countdown
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [grades, setGrades] = useState([]);
  const [averageGrade, setAverageGrade] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false); // Track if the quiz is currently active
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const initializeAnswers = (totalAnswers) => {
    setAnswers(Array.from({ length: totalAnswers }, () => []));
  };

  const fetchCompetitionData = async () => {
    try {
        const token = getToken();
        const response = await axios.get(API_URL + "GetCompetition.php", {
            headers: { token: `${token}` },
        });

        const data = response.data;
        setQuizTables(data);

        const currentDate = moment();
        const upcomingQuiz = data.find(quiz => {
            const startDate = moment(quiz.start_date, "YYYY-MM-DD HH:mm:ss");
            return startDate.isSameOrAfter(currentDate);
        });

        if (upcomingQuiz) {
            setCountdownTimeLeft(moment(upcomingQuiz.start_date).diff(currentDate, 'seconds'));
            setIsQuizActive(false);
        } else {
            const activeQuiz = data.find(quiz => {
                const startDate = moment(quiz.start_date, "YYYY-MM-DD HH:mm:ss");
                const endDate = moment(quiz.end_date, "YYYY-MM-DD HH:mm:ss");
                return currentDate.isBetween(startDate, endDate);
            });

            if (activeQuiz) {
                setIsQuizActive(true);
                const tablesData = activeQuiz.quiz_tables.map(qt => ({
                    table: qt.table.quiz_data,
                    quiz_answers: qt.table.quiz_answers,
                    quiz_type: qt.quiz_type,
                }));
                setTables(tablesData);
            }
        }
    } catch (error) {
        console.error("Error fetching competition data:", error);
    }
};


  useEffect(() => {
    fetchCompetitionData();
  }, []);

  useEffect(() => {
    let countdownTimerId;
    if (countdownTimeLeft > 0) {
        countdownTimerId = setTimeout(() => {
            setCountdownTimeLeft(prev => prev - 1);
        }, 1000);
    }

    if (countdownTimeLeft === 0) {
        setIsQuizActive(true);
        setCountdownTimeLeft(null);
    }

    return () => clearTimeout(countdownTimerId);
}, [countdownTimeLeft]);

useEffect(() => {
  let quizTimerId;
  if (isQuizActive && timeLeft > 0) {
      quizTimerId = setInterval(() => {
          setTimeLeft(prev => prev - 1);
      }, 1000);
  }

  if (timeLeft === 0) {
      handleSubmit(); // Automatically submit when time is up
  }

  return () => clearInterval(quizTimerId);
}, [isQuizActive, timeLeft]);


const handleNextPage = () => {
  setCurrentPage(currentPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage(currentPage - 1);
};



  const handleSubmit = () => {
    setIsSubmitted(true);

    const newGrades = [];
    let totalGrade = 0;
    let totalAnswers = 0;
    const correctAnswersList = [];

    tables.forEach(({ table, quiz_answers, quiz_type }, tableIndex) => {
      if (quiz_type === 'addition') {
        const columnSums = table[0].map((_, colIndex) =>
          table.reduce((sum, row) => sum + parseInt(row[colIndex], 10), 0)
        );
        correctAnswersList.push(columnSums);
        const grade = columnSums.reduce((total, correctSum, colIndex) => {
          const userAnswer = answers[tableIndex]?.[colIndex] || "";
          return total + (String(correctSum) === String(userAnswer) ? 1 : 0);
        }, 0);
        newGrades.push(grade / columnSums.length);
        totalGrade += grade;
        totalAnswers += columnSums.length;
      } else {
        const correctAnswers = quiz_answers.map(answer => parseInt(answer, 10));
        correctAnswersList.push(correctAnswers);
        const grade = correctAnswers.reduce((total, correctAnswer, rowIndex) => {
          const userAnswer = answers[tableIndex]?.[rowIndex] || "";
          return total + (String(correctAnswer) === String(userAnswer) ? 1 : 0);
        }, 0);
        newGrades.push(grade / correctAnswers.length);
        totalGrade += grade;
        totalAnswers += correctAnswers.length;
      }
    });

    setGrades(newGrades);
    setAverageGrade(totalGrade / totalAnswers);
    setCorrectAnswers(correctAnswersList);
  };

  const displayedTables = tables
  .filter((_, i) => i >= currentPage * 4 && i < (currentPage + 1) * 4)
  .map(({ table, quiz_type }, index) => {
    let operation = '';
    if (quiz_type === 'multiplication') {
      operation = 'x';
    } else if (quiz_type === 'division') {
      operation = '/';
    }
    

    if (quiz_type === 'multiplication' || quiz_type === 'division') {
      return (
        <table className='table-2' key={index}>
       
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>

                <td className='col-title'>{rowIndex + 1}</td>
                 <td>{row[0]}</td>
                <td className='operator'>{operation}</td>
                <td>{row[1]}</td>
                <td>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    style={{ width: '60px' }}
                    value={answers[currentPage * 4 + index]?.[rowIndex] || ''}
                    onChange={(e) => {
                      if (!isSubmitted) {
                        const newAnswers = [...answers];
                        newAnswers[currentPage * 4 + index] = [...(newAnswers[currentPage * 4 + index] || [])];
                        newAnswers[currentPage * 4 + index][rowIndex] = e.target.value;
                        setAnswers(newAnswers);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                      }
                    }}
                    disabled={isSubmitted}
                    className={`answer-input ${isSubmitted ? (correctAnswers[currentPage * 4 + index]?.[rowIndex] === parseInt(answers[currentPage * 4 + index]?.[rowIndex] || '', 10) ? 'right-answer' : !answers[currentPage * 4 + index]?.[rowIndex] ? 'empty-answer' : 'wrong-answer') : ''}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      // Original addition logic
      return (
        <table key={index}>
          <thead>
            <tr>
              {Array.from({ length: table[0].length }, (_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
            <tr>
              {table[0].map((_, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    style={{ width: '60px' }}
                    value={answers[currentPage * 4 + index]?.[cellIndex] || ''}
                    onChange={(e) => {
                      if (!isSubmitted) {
                        const newAnswers = [...answers];
                        newAnswers[currentPage * 4 + index] = [...(newAnswers[currentPage * 4 + index] || [])];
                        newAnswers[currentPage * 4 + index][cellIndex] = e.target.value;
                        setAnswers(newAnswers);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                      }
                    }}
                    disabled={isSubmitted}
                    className={`answer-input ${isSubmitted ? (correctAnswers[currentPage * 4 + index]?.[cellIndex] === parseInt(answers[currentPage * 4 + index]?.[cellIndex] || '', 10) ? 'right-answer' : !answers[currentPage * 4 + index]?.[cellIndex] ? 'empty-answer' : 'wrong-answer') : ''}`}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }
  });

  return (
    <div className="dashboard">
    <div className="SideMenu">
      <Sidebar />
    </div>
    <div className="dashboard__content">
      <div className='tableContent'>
        <div className="db_content">
          
        {countdownTimeLeft === null && !isQuizActive && (
            <Result
            status="500"

           title="No Competition at this moment"
            subTitle="we will notify you"
           
          />
          )}
       {isQuizActive && timeLeft > 0 && !isSubmitted && (
            <div className="timer">
               Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}

            </div>
          )}
            {isQuizActive && timeLeft === 0 && !isSubmitted && (
            <div className="timer">
              Quiz has ended
            </div>
          )}
       {!isQuizActive && countdownTimeLeft > 0 && (
            <div className="countdown">
              <h2> Time until competition starts: </h2>
              <div className='sep'></div>
              <div className='flex-center'>
              <div className="timer-box timer-green"> <div> <span> {Math.floor(countdownTimeLeft / 86400)} </span> <span>days</span></div></div>
              <div className="timer-box timer-yellow">  <div> <span>{Math.floor((countdownTimeLeft % 86400) / 3600)} </span> <span>hours</span> </div></div>
              <div className="timer-box timer-pink"> <div> <span>{Math.floor((countdownTimeLeft % 3600) / 60)}</span> <span>minutes</span></div></div>
              <div className="timer-box timer-purple"> <div> <span> {countdownTimeLeft % 60}</span> <span>seconds</span></div></div>
              </div>
              <div className='sep'></div>
              <div className='sep'></div>
              <div className='flex-center'>
              <img className="bg2" src={CountDownImg} /> 
              </div>
      
            </div>
          )}

            <div className="flex-center flex-wrap">{displayedTables}</div>
        
       
          <div className='flex-center'>
          {currentPage > 0 && (
            <button className='pageBtn' type="primary" onClick={handlePrevPage}>
              Previous
            </button>
          )}
          {currentPage < tables.length / 4 - 1 && (
            <button className='pageBtn' type="primary" onClick={handleNextPage}>
              Next
            </button>
          )}
          </div>

                          <div className='flex-center'>
              {isQuizActive && timeLeft !== null && !isSubmitted && ( // Add this condition
                  <button className='submitBtn' type="primary" onClick={handleSubmit}>
                  Submit
                  </button>
              )}
              {isSubmitted ? (
                  <div>
                  <h2>Grade: {(averageGrade * 100).toFixed(1)}/100</h2>
                  <button className='submitBtn' type="primary" onClick={() => window.location.reload()}>
                      Try Again
                  </button>
                  </div>
              ) : null}
              </div>
              {isQuizActive && timeLeft > 0 && !isSubmitted && (
            <div className="timer">
              Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Competition;
