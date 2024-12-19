import React, { useState, useEffect } from 'react';
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import "./Quiz.css";
import axios from "axios";
import { API_URL } from '../constants/apiConstants';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import { useLoader } from "../context/LoaderContext";
import { fetchUserData } from '../api/FetchUser';
import withProtectedPage from '../withProtectedPage';


const getToken = () => localStorage.getItem('token');



const Quiz = () => {
  const [tables, setTables] = useState([]);
  const [quizRules, setQuizRules] = useState([]);
  const [timeLeft, setTimeLeft] = useState(6 * 60); // 6 minutes
  const [answers, setAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // new state to track submission
  const [grades, setGrades] = useState([]); // new state to store grades
  const [averageGrade, setAverageGrade] = useState(0); // new state to store average grade
  const [studentGrade, setStudentGrade] = useState(0); // new state to store average grade
  const [totalAnswers, seTotalAnswers] = useState(0); // new state to store average grade
  const [currentPage, setCurrentPage] = useState(0); // new state to track current page
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizStatus, setQuizStatus] = useState({ is_allowed: null, attempts_remaining: 0 });
  const { showLoader, hideLoader } = useLoader(); // Access loader methods
  const [isVerified, setIsVerified] = useState(false);


  // Fetch user data to check if verified
  useEffect(() => {
    fetchUserData().then((data) => {
      if (data) {
        setIsVerified(data.is_verified === 1);
      }
     
    });
  }, []);
  

  const fetchQuizStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL + "GetdailyQuizLimit.php", {
        headers: {
          token: `${token}`,
        },
      });
      setQuizStatus(response.data);
    } catch (error) {
      console.error('Error fetching quiz status:', error);
    }
  };

  useEffect(() => {
    fetchQuizStatus(); // Fetch quiz status when the component mounts
  }, []);

  const fetchData = async (token) => {
    try {
      const config = {
        headers: {
          token: `${token}`,
        },
      };

      const response = await axios.get(API_URL + "GetQuizRules.php", config);
      console.log("Fetch Data Response:", response.data); // Add this line

      setQuizRules(response.data);
      return response.data;
    } catch (error) {
  
      throw error;
    }
  };

  const initializeAnswers = (totalAnswers) => {
    setAnswers(Array.from({ length: totalAnswers }, () => []));
};

const generateRandomNumber = (nbrFrom, nbrTo) => {
  // Determine the number of digits based on nbrFrom and nbrTo
  const absNbrFrom = Math.abs(nbrFrom);
  const absNbrTo = Math.abs(nbrTo);

  let minAbsValue;

  if (absNbrFrom >= 10 && absNbrTo <= 99) {
    minAbsValue = 10; // Minimum absolute value for 2-digit numbers
  } else if (absNbrFrom >= 100 && absNbrTo <= 999) {
    minAbsValue = 100; // Minimum absolute value for 3-digit numbers
  } else if (absNbrFrom >= 1000 && absNbrTo <= 9999) {
    minAbsValue = 1000; // Minimum absolute value for 4-digit numbers
  } else {
    throw new Error("Range does not support 2, 3, or 4 digits consistently.");
  }

  // Generate a number within the range and ensure it has the required number of digits
  let number;
  do {
    number = Math.floor(Math.random() * (nbrTo - nbrFrom + 1)) + nbrFrom;
  } while (Math.abs(number) < minAbsValue);

  return number;
};

  const fetchTables = async () => {
    showLoader(); // Show the loader
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
        initializeAnswers(totalAnswers);
  
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
            
                  const absNbrTo = Math.abs(parseInt(pageData.nbr_to)); // Absolute value of nbr_to
                  const randomNumber = Math.floor(Math.random() * (absNbrTo + 1)); // Generate number between 0 and absNbrTo
                 


                  let number;

                  if (j === 0) {
                      // Ensure the first number in the column is positive
                      number = generateRandomNumber(parseInt(pageData.nbr_from), parseInt(pageData.nbr_to));
                      number = Math.abs(number);
                  } else {
                      // Ensure intermediate sums do not go negative
                      const previousSum = table[j - 1][k]; // Get the sum from the previous row in the column
                      const minValue = -previousSum; // Ensure the new number doesn't make the sum negative
                      const rangeFrom = Math.max(minValue, parseInt(pageData.nbr_from));
                      const rangeTo = parseInt(pageData.nbr_to);
                      
                      number = generateRandomNumber(rangeFrom, rangeTo);
                  }

                  row.push(number);
                  
                }
              }
              table.push(row);
            }

            for (let col = 0; col < pageData.col_nbr; col++) {
              let columnSum = table.reduce((sum, row) => sum + row[col], 0);
              if (columnSum < 0) {
                table[table.length - 1][col] += Math.abs(columnSum); // Adjust the last row in the column
              }
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
    } finally {
      hideLoader(); // Hide the loader after the process
    }
  };
  

  useEffect(() => {
    const token = getToken();
    if (token && quizStatus.is_allowed) {
      fetchTables();
    }
  }, [quizStatus.is_allowed]);
  


 

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };


const padAnswersArray = () => {
  const maxAnswersPerTable = tables.map(({ table }) => table[0]?.length || 0);

  return answers.map((tableAnswers, index) => {
    if (!Array.isArray(tableAnswers)) tableAnswers = [];
    const expectedLength = maxAnswersPerTable[index] || 0;

    // Ensure the expected length does not create a negative array length
    if (expectedLength < tableAnswers.length) {
      console.warn(`Unexpected answer length for table at index ${index}`);
      return tableAnswers.slice(0, expectedLength);
    }

    return [...tableAnswers, ...Array(expectedLength - tableAnswers.length).fill("")];
  });
};





  const handleSubmit = async () => {
    if (isSubmitted) return; // Prevent multiple submissions

    setIsSubmitted(true);

    const paddedAnswers = padAnswersArray();
    
    const newGrades = [];
    let totalGrade = 0;
    let totalAnswers = 0;
    const correctAnswersList = [];

    tables.forEach(({ table, quiz_type }, tableIndex) => {
        let operation;
        if (quiz_type === 'multiplication') {
            operation = (a, b) => a * b;
        } else if (quiz_type === 'division') {
            operation = (a, b) => a / b;
        } else {
            operation = (a, b) => a + b;  // For addition
        }

        const userAnswers = paddedAnswers[tableIndex] || [];

        // Calculate correct answers for addition or other types
        if (quiz_type === 'addition') {
            const columnSums = table[0].map((_, colIndex) => 
                table.reduce((sum, row) => sum + parseInt(row[colIndex], 10), 0)
            );
            correctAnswersList.push(columnSums);
            const grade = columnSums.reduce((total, correctSum, colIndex) => {
                const userAnswer = userAnswers[colIndex] || ""; // Handle empty strings
                return total + (String(correctSum) === String(userAnswer) ? 1 : 0);
            }, 0);
            newGrades.push(grade / columnSums.length);
            totalGrade += grade;
            totalAnswers += columnSums.length;
        } else {
            const correctAnswers = table.map((row) => operation(parseInt(row[0], 10), parseInt(row[1], 10)));
            correctAnswersList.push(correctAnswers);
            const grade = correctAnswers.reduce((total, correctAnswer, rowIndex) => {
                const userAnswer = userAnswers[rowIndex] || ""; // Handle empty strings
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

    setStudentGrade(totalGrade);
    seTotalAnswers(totalAnswers);

    const payload = {
      answers: JSON.stringify(paddedAnswers.map(pageAnswers => pageAnswers.map(answer => answer || ""))),
      percentage: (totalGrade / totalAnswers) * 100,
        score: totalGrade,
        over: totalAnswers
    };

    try {
        const token = getToken();
        const response = await axios.post(API_URL + 'PostQuiz.php', new URLSearchParams(payload), {
            headers: { token: `${token}` }
        });
        console.log("Submission Response:", response.data);
    } catch (error) {
        console.error("Error submitting quiz:", error);
    }
};

  

  const handleTimeUp = () => {
 if (!isSubmitted) handleSubmit();
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

  if (!isVerified) {
    return (
      <div className="dashboard">
        <div className="SideMenu">
          <Sidebar />
        </div>
        <div className="dashboard__content">
        <div className="db_content">
            <h2>Access Restricted</h2>
            <p>Your account is not verified. Please wait for the admin to verify your account.</p>
          </div>
        </div>
      </div>
    );
  }


  if (quizStatus.is_allowed === 0) {
    console.log('quizStatus');
    console.log(quizStatus);
    return (
      <div className="dashboard">
        <div className="SideMenu">
          <Sidebar />
        </div>
        <div className="dashboard__content">
          <div className="message">
          <Alert
              sx={{ bgcolor: '#E15C83', color: 'white' }}
              severity="error"
              icon={<ErrorIcon sx={{ color: 'white' }} />}
            >
              Your daily quiz attempts are over. Please try again tomorrow.
            </Alert>
    
          </div>

          <div className="results-container">
  {quizStatus.results.map((result, index) => (
    <div key={index} className="result-box">
      <h4>Quiz {index + 1}</h4>
      <p>Score: <strong>{result.score} / {result.over}</strong></p>
    </div>
  ))}
</div>

        </div>
      </div>
    );
  } else{


  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className='tableContent'>
          <div className="db_content">
             {/* Display the number of attempts remaining */}
             <div className='message'>
             <Alert
                sx={{ bgcolor: '#E15C83', color: 'white' }}
                severity="info"
                icon={<InfoIcon sx={{ color: 'white' }} />}
              >
                Attempts Remaining: {quizStatus.attempts_remaining}
              </Alert>
             </div>
           

             {quizStatus.is_allowed && timeLeft > 0 && !isSubmitted && (

             <div className="timer">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            )}
            <div className='flex-center flex-wrap'>
            {displayedTables}
            </div>
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
            {quizStatus.is_allowed && isSubmitted ? (
              <div>
          
                <h2>Grade: {studentGrade} / {totalAnswers}</h2>

                <button className='submitBtn' type="primary" onClick={() => window.location.reload()}>Try Again</button>
              </div>
            ) : (
              <button className='submitBtn' type="primary" onClick={handleSubmit}>
                Submit
              </button>
            )}
            </div>
            {quizStatus.is_allowed && timeLeft > 0 && !isSubmitted && (
              <div className="timer">
                Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
     }
};

export default withProtectedPage(Quiz); 