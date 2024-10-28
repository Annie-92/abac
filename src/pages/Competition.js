import React, { useState, useEffect } from 'react';
import { Button, Result } from "antd";
import Sidebar from "../components/Sidebar";
import "./Quiz.css";
import axios from "axios";
import { API_URL } from '../constants/apiConstants';
import moment from 'moment';
import CountDownImg from "../assets/images/illustrations/countdown3.svg";

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

  

  const fetchData = async (token) => {
    try {
      const config = {
        headers: {
          token: `${token}`,
        },
      };
      const response = await axios.get(API_URL + "GetCompetition.php", config);
      setQuizTables(response.data);
              return response.data;
    
    } catch (error) {
  
        console.error('Error response:', error.response);
      throw error;
    }
  };

  const fetchTables = async () => {
    try {
        const token = localStorage.getItem("token");
        const data = await fetchData(token);
        setQuizTables(data);

        const currentDate = moment();

        // Find the quiz with the closest start_date that is greater than or equal to the current date
        const upcomingQuiz = data.find(quiz => {
            const startDate = moment(quiz.start_date, "YYYY-MM-DD HH:mm:ss");
            return startDate.isSameOrAfter(currentDate);
        });

        if (upcomingQuiz) {
            // If there's an upcoming quiz, start the countdown
            setCountdownTimeLeft(moment(upcomingQuiz.start_date, "YYYY-MM-DD HH:mm:ss").diff(currentDate, 'seconds'));
            setIsQuizActive(false); // Quiz is not active yet
        } else {
            // Otherwise, check if a quiz is currently active
            const activeQuizData = data.flatMap(quiz => {
                const startDate = moment(quiz.start_date, "YYYY-MM-DD HH:mm:ss");
                const endDate = moment(quiz.end_date, "YYYY-MM-DD HH:mm:ss");
                const currentDate = moment();

                if (currentDate.isBetween(startDate, endDate, null, '[]')) {
                    return quiz.quiz_tables;
                }

                return [];
            }).filter(Boolean); // Add this filter method to remove undefined values

            if (activeQuizData.length > 0) {
                // If a quiz is active, prepare the tables
                setIsQuizActive(true); // Quiz is active

                const totalAnswers = activeQuizData.reduce((total, pageData) => {
                    if (pageData && pageData.quiz_data && pageData.quiz_data[0]) {
                        return total + pageData.quiz_data[0].length; // Calculate total answers based on the number of columns
                    }
                    return total;
                }, 0);

                setAnswers(Array(totalAnswers).fill(''));

                const tablesData = activeQuizData.map((pageData, index) => {
                    if (!pageData || !pageData.quiz_data) return []; // Return an empty array if pageData or quiz_data is undefined

                    let operation = '';
                    if (pageData.quiz_type === 'multiplication') {
                        operation = 'x';
                    } else if (pageData.quiz_type === 'division') {
                        operation = '/';
                    }

                    return pageData.quiz_data[0].map((column, columnIndex) => {
                        if (Array.isArray(column)) {
                            // Calculate the sum for each column
                            const columnSum = column.reduce((acc, row) => acc + parseInt(row, 10), 0);

                            // Add the sum to the column data
                            const updatedColumn = column.concat(columnSum);

                            return (
                                <tr key={`${index}-${columnIndex}`}>
                                    {updatedColumn.map((cell, cellIndex) => (
                                        <td key={`${index}-${columnIndex}-${cellIndex}`}>{cell}</td>
                                    ))}
                                </tr>
                            );
                          } else {
                            console.error(`column at index ${columnIndex} is not an array:`, column);
                            return null;
                        }
                    });
                });

                setTables(tablesData);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setIsLoading(false); // End loading state
    }
};


useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        fetchTables();
    }
}, []);


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

    tables.forEach(({ table, quiz_type }, tableIndex) => {
        let operation = '';
        if (quiz_type === 'multiplication') {
            operation = (a, b) => a * b;
        } else if (quiz_type === 'division') {
            operation = (a, b) => a / b;
        } else {
            operation = (a, b) => a + b;
        }

        let correctAnswers = [];
        if (quiz_type === 'multiplication' || quiz_type === 'division') {
            correctAnswers = table.map((row) => operation(row[0], row[1]));
            const userAnswers = answers[tableIndex] || [];
            const grade = correctAnswers.reduce((total, correctAnswer, rowIndex) => 
                total + (correctAnswer === parseInt(userAnswers[rowIndex], 10) ? 1 : 0), 0);
            newGrades.push(grade / correctAnswers.length);
            totalGrade += grade;
            totalAnswers += correctAnswers.length;
            correctAnswersList.push(correctAnswers);
        } else {
            const sums = table[0].map((_, i) => table.reduce((a, row) => operation(a, row[i]), 0));
            const userAnswers = answers[tableIndex] || [];
            const grade = sums.reduce((total, sum, i) => total + (sum === parseInt(userAnswers[i], 10) ? 1 : 0), 0);
            newGrades.push(grade / sums.length);
            totalGrade += grade;
            totalAnswers += sums.length;
            correctAnswersList.push(sums);
        }
    });

    setGrades(newGrades);
    setAverageGrade(totalGrade / totalAnswers);
    setCorrectAnswers(correctAnswersList);
};

  const handleTimeUp = () => {
    if (isQuizActive) {
      handleSubmit();
    }
  };

  useEffect(() => {
    let timerId;
    if (isQuizActive && timeLeft > 0 && !isSubmitted) {
        timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
            if (timeLeft <= 0) {
                handleTimeUp();
            }
        }, 1000);
    }

    // Clear the timer when quiz is finished, the user submits, or the component unmounts
    return () => clearInterval(timerId);
}, [timeLeft, isQuizActive, isSubmitted]);


useEffect(() => {
  let countdownTimerId;
  if (countdownTimeLeft > 0) {
      countdownTimerId = setTimeout(() => {
          setCountdownTimeLeft(countdownTimeLeft - 1);
      }, 1000);
  }

  if (countdownTimeLeft === 0) {
      // Start the quiz
      setIsQuizActive(true);
  }

  return () => {
      clearTimeout(countdownTimerId);
  };
}, [countdownTimeLeft]);

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
        <table key={index}>
       
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
  {table[0] && Array.from({ length: table[0].length }, (_, cellIndex) => (
    <td key={cellIndex}>
      <input
        type="number"
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