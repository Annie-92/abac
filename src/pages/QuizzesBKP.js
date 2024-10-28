import React, { useState, useEffect } from 'react';
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import "./Quiz.css";
import axios from "axios";
import { API_URL } from '../constants/apiConstants';

const Quiz = () => {
  const [tables, setTables] = useState([]);
  const [quizRules, setQuizRules] = useState([]);
  const [timeLeft, setTimeLeft] = useState(6 * 60); // 6 minutes
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // new state to track submission
  const [grades, setGrades] = useState([]); // new state to store grades
  const [averageGrade, setAverageGrade] = useState(0); // new state to store average grade
  const [currentPage, setCurrentPage] = useState(0); // new state to track current page
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const fetchData = async (token) => {
    try {
      const config = {
        headers: {
          token: `${token}`,
        },
      };

      const response = await axios.get(API_URL + "GetQuizRules.php", config);
      setQuizRules(response.data);
      return response.data;
    } catch (error) {
  
      throw error;
    }
  };

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem("token");
      const quizTypeResponse = await axios.get(API_URL + "GetQuizType.php", {
        headers: {
          token: `${token}`,
        },
      });
  
      if (quizTypeResponse.data.quiz_generated === 1) {
        const data = await fetchData(token);
  
        const totalAnswers = data.reduce((total, pageData) => {
          return total + pageData.nbr_tables * pageData.row_nbr * pageData.col_nbr;
        }, 0);
  
        setAnswers(Array(totalAnswers).fill(''));
  
        const tablesData = data.flatMap((pageData) => {
          const tablesArray = [];
          for (let i = 0; i < pageData.nbr_tables; i++) {
            const table = [];
            for (let j = 0; j < pageData.row_nbr; j++) {
              const row = [];
              for (let k = 0; k < pageData.col_nbr; k++) {
                if (pageData.quiz_type === 'multiplication' || pageData.quiz_type === 'division') {
                  if (pageData.quiz_type === 'division') {
                    // Generate numbers for division such that dividend is evenly divisible by divisor
                    const digitNbr1Min = Math.pow(10, pageData.digit_nbr_1 - 1);
                    const digitNbr1Max = Math.pow(10, pageData.digit_nbr_1) - 1;
                    const digitNbr2Min = Math.pow(10, pageData.digit_nbr_2 - 1);
                    const digitNbr2Max = Math.pow(10, pageData.digit_nbr_2) - 1;
  
                    const divisor = Math.floor(
                      Math.random() * (digitNbr2Max - digitNbr2Min + 1) + digitNbr2Min
                    );
  
                    // Ensure divisor is not zero
                    const dividend = divisor * Math.floor(
                      Math.random() * (digitNbr1Max / divisor - digitNbr1Min / divisor + 1) + digitNbr1Min / divisor
                    );
  
                    row.push(dividend);
                    row.push(divisor);
                  } else {
                    // Generate numbers for multiplication
                    const digitNbr1Min = Math.pow(10, pageData.digit_nbr_1 - 1);
                    const digitNbr1Max = Math.pow(10, pageData.digit_nbr_1) - 1;
                    const digitNbr2Min = Math.pow(10, pageData.digit_nbr_2 - 1);
                    const digitNbr2Max = Math.pow(10, pageData.digit_nbr_2) - 1;
                    row.push(
                      Math.floor(
                        Math.random() * (digitNbr1Max - digitNbr1Min + 1) + digitNbr1Min
                      )
                    );
                    row.push(
                      Math.floor(
                        Math.random() * (digitNbr2Max - digitNbr2Min + 1) + digitNbr2Min
                      )
                    );
                  }
                } else {
                  // Original logic for addition or other quiz types
                  row.push(
                    Math.floor(
                      Math.random() * (parseInt(pageData.nbr_to) - parseInt(pageData.nbr_from) + 1) +
                        parseInt(pageData.nbr_from)
                    )
                  );
                }
              }
              table.push(row);
            }
            tablesArray.push({ table, quiz_type: pageData.quiz_type });
          }
          return tablesArray;
        });
  
        setTables(tablesData);
  
      } else {
        const existingTablesResponse = await axios.get(API_URL + "GetExistingTables.php", {
          headers: {
            token: `${token}`,
          },
        });
  
        const tablesData = existingTablesResponse.data.map((tableObj) => ({
          table: tableObj.table,
          quiz_type: tableObj.quiz_type,
        }));
  
        setTables(tablesData);
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };
  

  useEffect(() => {
    fetchTables();
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
    handleSubmit();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft <= 0) {
        handleTimeUp();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

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
              {table[0].map((_, cellIndex) => (
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
            {timeLeft > 0 &&!isSubmitted && (
              <div className="timer">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            )}
            {displayedTables}
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
            {isSubmitted? (
              <div>
                <h2>Grade: {(averageGrade * 100).toFixed(1)}/100</h2>
                <button className='submitBtn' type="primary" onClick={() => window.location.reload()}>Try Again</button>
              </div>
            ) : (
              <button className='submitBtn' type="primary" onClick={handleSubmit}>
                Submit
              </button>
            )}
            </div>
            {timeLeft > 0 &&!isSubmitted && (
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

export default Quiz; 