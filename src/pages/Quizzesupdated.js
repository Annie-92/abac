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
  const [showResults, setShowResults] = useState(false); // new state to track show results


  const fetchData = async (token) => {
    try {
      const config = {
        headers: {
          token: `${token}`,
        },
      };
  
      const response = await axios.get(API_URL + "GetQuizRules.php", config);
      const quizRules = response.data;
  
      // Handle different quiz types
      quizRules.forEach((rule) => {
        if (rule.quiz_type === 'addition') {
          // No changes needed for addition
        } else if (rule.quiz_type === 'multiplication') {
          // Update the table generation logic for multiplication
          const tablesData = rule.pages.map((page) => {
            const tablesArray = [];
            for (let i = 0; i < page.nbr_tables; i++) {
              const table = [];
              for (let j = 0; j < page.row_nbr; j++) {
                const row = [];
                for (let k = 0; k < page.col_nbr; k++) {
                  row.push(
                    Math.floor(
                      Math.random() * (parseInt(page.nbr_to) - parseInt(page.nbr_from) + 1) +
                        parseInt(page.nbr_from)
                    ) * Math.floor(
                      Math.random() * (parseInt(page.nbr_to) - parseInt(page.nbr_from) + 1) +
                        parseInt(page.nbr_from)
                    )
                  );
                }
                table.push(row);
              }
              tablesArray.push(table);
            }
            return tablesArray;
          });
          setTables(tablesData.flat());
        } else if (rule.quiz_type === 'division') {
          // Update the table generation logic for division
          const tablesData = rule.pages.map((page) => {
            const tablesArray = [];
            for (let i = 0; i < page.nbr_tables; i++) {
              const table = [];
              for (let j = 0; j < page.row_nbr; j++) {
                const row = [];
                for (let k = 0; k < page.col_nbr; k++) {
                  const dividend = Math.floor(
                    Math.random() * (parseInt(page.nbr_to) - parseInt(page.nbr_from) + 1) +
                      parseInt(page.nbr_from)
                  );
                  const divisor = Math.floor(
                    Math.random() * (parseInt(page.nbr_to) - parseInt(page.nbr_from) + 1) +
                      parseInt(page.nbr_from)
                  );
                  row.push(dividend / divisor);
                }
                table.push(row);
              }
              tablesArray.push(table);
            }
            return tablesArray;
          });
          setTables(tablesData.flat());
        }
      });
  
      return quizRules;
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
        // Generate tables based on quiz rules
        const data = await fetchData(token);

        const totalAnswers = data.reduce((total, pageData) => {
          return total + pageData.nbr_tables * pageData.row_nbr * pageData.col_nbr;
        }, 0);

        setAnswers(Array(totalAnswers).fill(''));

        const tablesData = data.map((pageData) => {
          const tablesArray = [];
          for (let i = 0; i < pageData.nbr_tables; i++) {
            const table = [];
            for (let j = 0; j < pageData.row_nbr; j++) {
              const row = [];
              for (let k = 0; k < pageData.col_nbr; k++) {
                row.push(
                  Math.floor(
                    Math.random() * (parseInt(pageData.nbr_to) - parseInt(pageData.nbr_from) + 1) +
                      parseInt(pageData.nbr_from)
                  )
                );
              }
              table.push(row);
            }
            tablesArray.push(table);
          }
          return tablesArray;
        });

        setTables(tablesData.flat());

        console.log('tablesData');
        console.log(tablesData);
      } else {
        // Fetch existing tables from CMS
        const existingTablesResponse = await axios.get(API_URL + "GetExistingTables.php", {
          headers: {
            token: `${token}`,
          },
        });

        const tablesData = existingTablesResponse.data.map((tableObj) => tableObj.table);


        setTables(tablesData);
        console.log('tablesData');
        console.log(tablesData);

      
      }
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tables.length / 4) - 1) {
      setCurrentPage(currentPage + 1);
      setIsSubmitted(false);
      setAnswers([]);
    } else {
      // handle last page submission
      handleSubmit();
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setIsSubmitted(false);
      setAnswers([]);
    }
  };

const handleSubmit = () => {
  setIsSubmitted(true);
  // calculate grades and average grade
  const newGrades = [];
  let totalGrade = 0;
  let totalAnswers = 0;
  const correctAnswersList = [];
  tables.forEach((table, index) => {
    const sums = table[0].map((_, i) => table.reduce((a, row) => a + row[i], 0));
    const userAnswers = answers[index] || [];
    const grade = sums.reduce((total, sum, i) => {
      if (quizRules[index].quiz_type === 'addition') {
        return total + (sum === parseInt(userAnswers[i], 10) ? 1 : 0);
      } else if (quizRules[index].quiz_type === 'multiplication') {
        return total + (sum === parseInt(userAnswers[i], 10) ? 1 : 0);
      } else if (quizRules[index].quiz_type === 'division') {
        return total + (sum === parseFloat(userAnswers[i]) ? 1 : 0);
      }
    }, 0);
    newGrades.push(grade / sums.length);
    totalGrade += grade;
    totalAnswers += sums.length;
    correctAnswersList.push(sums);
  });
  setGrades(newGrades);
  setAverageGrade(totalGrade / totalAnswers);
  setCorrectAnswers(correctAnswersList);
  // update local storage with new grades and average grade
  localStorage.setItem('grades', JSON.stringify(newGrades));
  localStorage.setItem('averageGrade', JSON.stringify(totalGrade / totalAnswers));
  // update state to show results
  setShowResults(true);
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

  const displayedTables = tables.filter((_, i) => i >= currentPage * 4 && i < (currentPage + 1) * 4)
  .filter(table => Array.isArray(table))
  .map((table, index) => (
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
              <td key={cellIndex}>
                {quizRules[index].quiz_type === 'addition' ? (
                  <input
                    type="number"
                    style={{ width: '60px' }}
                    value={answers[currentPage * 4 + index]?.[cellIndex] || ''}
                    onChange={(e) => {
                      if (!isSubmitted) { // only update answers if not submitted
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
                    disabled={isSubmitted} // disable input if submitted
                    className={`answer-input ${isSubmitted? (correctAnswers[currentPage * 4 + index]?.[cellIndex] === parseInt(answers[currentPage * 4 + index]?.[cellIndex] || '', 10)? 'right-answer' :!answers[currentPage * 4 + index]?.[cellIndex]? 'empty-answer' : 'wrong-answer') : ''}`} // add class based on correct answers and input value only if isSubmitted is true
                    />
                  ) : quizRules[index].quiz_type === 'multiplication' ? (
                    <input
                      type="number"
                      style={{ width: '60px' }}
                      value={answers[currentPage * 4 + index]?.[cellIndex] || ''}
                      onChange={(e) => {
                        if (!isSubmitted) { // only update answers if not submitted
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
                      disabled={isSubmitted} // disable input if submitted
                      className={`answer-input ${isSubmitted? (correctAnswers[currentPage * 4 + index]?.[cellIndex] === parseInt(answers[currentPage * 4 + index]?.[cellIndex] || '', 10)? 'right-answer' :!answers[currentPage * 4 + index]?.[cellIndex]? 'empty-answer' : 'wrong-answer') : ''}`} // add class based on correct answers and input value only if isSubmitted is true
                    />
                  ) : quizRules[index].quiz_type === 'division' ? (
                    <input
                      type="number"
                      style={{ width: '60px' }}
                      value={answers[currentPage * 4 + index]?.[cellIndex] || ''}
                      onChange={(e) => {
                        if (!isSubmitted) { // only update answers if not submitted
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
                      disabled={isSubmitted} // disable input if submitted
                      className={`answer-input ${isSubmitted? (correctAnswers[currentPage * 4 + index]?.[cellIndex] === parseInt(answers[currentPage * 4 + index]?.[cellIndex] || '', 10)? 'right-answer' :!answers[currentPage * 4 + index]?.[cellIndex]? 'empty-answer' : 'wrong-answer') : ''}`} // add class based on correct answers and input value only if isSubmitted is true
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ));
  

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