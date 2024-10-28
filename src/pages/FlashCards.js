import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdFlashOn, MdPlayCircleOutline } from "react-icons/md";
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import SettingsPanel from '../flashCards/SettingsPanel';
import AnzanComponent from '../flashCards/AnzanComponent';
import AnswerInput from '../flashCards/AnswerInput';

const FlashCards = () => {
  const [gameMode, setGameMode] = useState('singlePlayer');
  const [difficulty, setDifficulty] = useState('easy');
  const [numCards, setNumCards] = useState(1);
  const [periodicity, setPeriodicity] = useState(1000);
  const [numImpressions, setNumImpressions] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const [currentImpression, setCurrentImpression] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [answersReady, setAnswersReady] = useState(false);
  const [values, setValues] = useState([]);
  const [allValues, setAllValues] = useState([]); // Array to hold all impressions

  
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [currentAnzanIndex, setCurrentAnzanIndex] = useState(0); // new state to keep track of current Anzan index
  const [currentAnzanValues, setCurrentAnzanValues] = useState([[0]]); // initialize with an empty array of arrays
  
  
 const navigate = useNavigate();
 
 const generateAnzanValues = (numCards, difficulty) => {
  const minValue = 
    difficulty === '1D' ? 0 : 
    difficulty === '2D' ? 10 : 
    difficulty === '3D' ? 100 : 
    difficulty === '4D' ? 1000 : 
    difficulty === '5D' ? 10000 : 0;

  const maxValue = 
    difficulty === '1D' ? 9 : 
    difficulty === '2D' ? 99 : 
    difficulty === '3D' ? 999 : 
    difficulty === '4D' ? 9999 : 
    difficulty === '5D' ? 99999 : 9;

  let values = [];
  for (let i = 0; i < numCards; i++) {
    let value;
    do {
      value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    } while (i === 0 && value === 0); // Ensure the first value is not 0
    values.push(value);
  }
  return values;
};

useEffect(() => {
  // This useEffect will just handle the display of Anzans at intervals
  if (gameStarted && currentImpression < numImpressions) {
    const timer = setTimeout(() => {
      const generatedValues = generateAnzanValues(numCards, difficulty);

      setCurrentAnzanValues(prev => [...prev, generatedValues]); // Add new Anzan to the array
      setValues(generatedValues); // Update values for the next Anzan
      setAnswersReady(true); // Allow the user to input answers
    }, periodicity);

    return () => clearTimeout(timer);
  }
}, [gameStarted, currentImpression, numImpressions, periodicity, difficulty, numCards]);



  useEffect(() => {
    const generatedValues = generateAnzanValues(numCards, difficulty);
    setCurrentAnzanValues([generatedValues]);
    setValues(generatedValues);
    setAnswersReady(true);
  }, []);


  const handleAnswerSubmit = (answers) => {
    console.log('Generated values:', currentAnzanValues[currentAnzanIndex]);
    console.log('User answers:', answers);
    const correctAnswers = [...currentAnzanValues[currentAnzanIndex]];
    const isCorrect = answers.every((answer, index) => parseInt(answer) === correctAnswers[index]);
  
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
      setFeedbackMessage('Correct!');
    } else {
      setFeedbackMessage('Incorrect!');
    }
  
    // Move to the next impression only after the user submits the answer
    if (currentImpression + 1 < numImpressions) {
      setCurrentImpression(currentImpression + 1); // Increment impression count
      setAnswersReady(false); // Disable answers until the next Anzan is shown
      setCurrentAnzanIndex(currentAnzanIndex + 1); // Increment the Anzan index
    } else {
      // End the game after all impressions are done
      setGameStarted(false);
      setAnswersReady(false);
      setShowResults(true); // Show the results at the end
    }
  };

  const handleStartGame = () => {
    if (numCards > 0 && numImpressions > 0) {
      setGameStarted(true);
      setCurrentImpression(0);
      setCorrectCount(0);
      setUserAnswers([]);
      setAnswersReady(false);
      setShowResults(false);
      setFeedbackMessage(''); // Clear feedback message
      setAllValues([]); // Clear previous values

    } else {
      alert("Please set the number of cards and impressions before starting the game.");
    }
  };

  const handleRefreshPage = () => {
    navigate(0);
  };

  const handleGenerateNewAnzan = () => {
    setCurrentImpression(0);
    setAnswersReady(false);
    setFeedbackMessage(''); // Clear feedback message
  };

  const percentageCorrect = numImpressions > 0 ? (correctCount / numImpressions) * 100 : 0;

  return (
    <div className="dashboard">
      <div className="SideMenu">
        <Sidebar />
      </div>
      <div className="dashboard__content">
        <div className="db_content">
          <div>
            <div className='practice-box'>
              <div className='head red-bg'>
                <MdFlashOn className="white-color" />
                <h1>Flash Cards</h1>
              </div>
              {!gameStarted && !showResults && (
                <div className="settings-panel">
                  <SettingsPanel
                    gameMode={gameMode}
                    difficulty={difficulty}
                    numCards={numCards}
                    numImpressions={numImpressions}
                    periodicity={periodicity}
                    onChangeGameMode={(mode) => setGameMode(mode)}
                    onChangeDifficulty={(diff) => setDifficulty(diff)}
                    onChangeNumCards={(num) => setNumCards(num)}
                    onChangeNumImpressions={(num) => setNumImpressions(num)}
                    onChangePeriodicity={(periodicity) => setPeriodicity(periodicity)}
                  />
                  <div className='flex-center'>
                    <button className='practice-btn red-bg' onClick={handleStartGame} type="button">
                      <MdPlayCircleOutline />
                      Start
                    </button>
                    <Link to="/my-practices" replace>
                      <button className='practice-btn red-bg' type="button">
                        <IoPlaySkipBackCircleOutline />
                        Go Back
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              {gameStarted && !showResults && (
                <div className='practice-panel'>
                  <div className='flex-center' style={{ marginTop: '20px' }}>
                    <button className='practice-btn red-bg' onClick={handleRefreshPage} type="button">
                      Refresh Page
                    </button>
                    <button className='practice-btn red-bg' onClick={handleGenerateNewAnzan} type="button">
                      Generate New Anzan
                    </button>
                  </div>
                  {feedbackMessage && <p className='feedback-message'>{feedbackMessage}</p>}

                  {answersReady ? (
                    <AnswerInput
                      numCards={numCards}
                      handleSubmit={handleAnswerSubmit}
                    />
                  ) : (
                    <AnzanComponent
                      numCards={numCards}
                      difficulty={difficulty}
                      values={values} // Generate values based on your logic
                      periodicity={periodicity}
                    />
                  )}
                </div>
              )}
              {showResults && (
                     <div className='practice-panel'>
                        <div className='flex-center' style={{ marginTop: '20px' }}>
                    <button className='practice-btn red-bg' onClick={handleRefreshPage} type="button">
                           Go Back 
                    </button>
               
                  </div>
                  <div className='flex-center'>
                  <div className='results-panel '>
                  <h2>Results</h2>
                  <p>{correctCount} out of {numImpressions} correct ({percentageCorrect.toFixed(2)}%)</p>
                </div>
                  </div>
               
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCards;
