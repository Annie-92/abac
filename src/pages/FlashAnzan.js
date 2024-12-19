import React, { useState, useEffect } from 'react';
import { Button, Modal, Select } from "antd";
import {Link, useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import {  MdFlashAuto } from "react-icons/md";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import { MdError } from "react-icons/md"; 
import withProtectedPage from '../withProtectedPage';


import SettingsPanel from '../flashAnzan/SettingsPanel';

const FlashAnzan = () => {

  const [gameMode, setGameMode] = useState('singlePlayer');
  const [difficulty, setDifficulty] = useState('easy');
  const [numCards, setNumCards] = useState(10);
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [cards, setCards] = useState([]); 
  const [numImpressions, setNumImpressions] = useState(1); // Add this line
  const [periodicity, setPeriodicity] = useState(500);
  const [disclaimer, setDisclaimer] = useState('');


  const navigate = useNavigate();

  // New settings state variables
  const [subject, setSubject] = useState();
  const [numRows, setNumRows] = useState(5);
  const [numExamplesPerRow, setNumExamplesPerRow] = useState(4);
  const [spacingBetweenExamples, setSpacingBetweenExamples] = useState(3);

  useEffect(() => {
    // Initialize the game state
    const newCards = [];
    for (let i = 0; i < numCards; i++) {
      newCards.push({
        front: `Card ${i + 1} front`,
        back: `Card ${i + 1} back`,
      });
    }
    setCards(newCards); 
  }, [numCards]);

  const handleAnswerSubmit = (event) => {
    event.preventDefault();
    const correctAnswer = cards[currentCard].back;
    if (answer === correctAnswer) {
      setScore(score + 1);
      setResult('correct');
    } else {
      setResult('incorrect');
    }
    setShowModal(false);
  };

  const handleNextCard = () => {
    setCurrentCard(currentCard + 1);
    setShowModal(true);
  };

  const handlePreviousCard = () => {
    setCurrentCard(currentCard - 1);
    setShowModal(true);
  };

  const handleStart = () => {
    if (!numRows || numRows === '') {
      setDisclaimer('Please select the Number of Rows before starting the game.');
      return; // Prevent navigation
  }
  setDisclaimer(''); // Clear disclaimer if validation passes
    navigate('/FlashAnzanStart', {
      state: {
        gameMode,
        difficulty,
        numCards,
        periodicity,
        numImpressions,
        subject,
        numRows,
        numExamplesPerRow,
        spacingBetweenExamples,
      },
    });
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
              <h1>Flash Anzan</h1>
              </div>

              <div className="hh">

                  <SettingsPanel
                  gameMode={gameMode}
                  difficulty={difficulty}
                  numCards={numCards}
                  numImpressions={numImpressions}
                  subject={subject} // Pass subject prop
                  numRows={numRows} // Pass numRows prop
                  numExamplesPerRow={numExamplesPerRow} // Pass numExamplesPerRow prop
                  spacingBetweenExamples={spacingBetweenExamples} // Pass spacingBetweenExamples prop
                  onChangeGameMode={(mode) => setGameMode(mode)}
                  onChangeDifficulty={(diff) => setDifficulty(diff)}
                  onChangeNumCards={(num) => setNumCards(num)}
                  onChangeNumImpressions={(num) => setNumImpressions(num)}
                  onChangePeriodicity={(periodicity) => setPeriodicity(periodicity)} 
                  onChangeSubject={(subject) => setSubject(subject)} // Add this prop
                  onChangeNumRows={(numRows) => setNumRows(numRows)} // Add this prop
                  onChangeNumExamplesPerRow={(numExamplesPerRow) => setNumExamplesPerRow(numExamplesPerRow)} // Add this prop
                  onChangeSpacingBetweenExamples={(spacingBetweenExamples) => setSpacingBetweenExamples(spacingBetweenExamples)} // Add this prop
                  />

                  </div>


                  {disclaimer && (
        <p className="disclaimer">
            <MdError style={{ marginRight: '5px' }} /> {/* Add the icon */}
            {disclaimer}
        </p>
    )}

              <div className='flex-center'>
          <button className='practice-btn orange-bg' onClick={handleStart}  type="button">
          <MdPlayCircleOutline />
              Start
          </button>

          <Link to="/my-practices" replace>
          <button className='practice-btn orange-bg'  type="button">
          <IoPlaySkipBackCircleOutline />
              Go Back
          </button>
          </Link>

         
          </div>


              
           
           
            </div>
          </div>
        </div>
      </div>
     


      </div>
  );
};

export default withProtectedPage(FlashAnzan);