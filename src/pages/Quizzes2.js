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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [grades, setGrades] = useState([]);
  const [averageGrade, setAverageGrade] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizStatus, setQuizStatus] = useState({ is_allowed: null, attempts_remaining: 0 });

  const fetchQuizStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL + "CheckQuizStatus.php", {
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

  // Fetch tables and other data only if the quiz is allowed
  useEffect(() => {
    if (quizStatus.is_allowed) {
      fetchTables();
    }
  }, [quizStatus]);

  const fetchData = async (token) => {
    // Existing fetchData logic...
  };

  const fetchTables = async () => {
    // Existing fetchTables logic...
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = () => {
    // Existing handleSubmit logic...
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

  // Conditional rendering based on quiz status
  if (quizStatus.is_allowed === false) {
    return (
      <div className="dashboard">
        <div className="SideMenu">
          <Sidebar />
        </div>
        <div className="dashboard__content">
          <div className="message">
            <h2>Your daily quiz attempts are over. Please try again tomorrow.</h2>
          </div>
        </div>
      </div>
    );
  }

  // Render the quiz if allowed
  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className='tableContent'>
          <div className="db_content">
            {/* Existing quiz rendering logic... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;