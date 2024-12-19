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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);


  const [inputsDisabled, setInputsDisabled] = useState(false);

  
  
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
  if (gameStarted && currentImpression < numImpressions) {
    const generatedValues = generateAnzanValues(numCards, difficulty); // Generate all values for this impression
    setCurrentAnzanValues([generatedValues]); // Store the generated values
    setValues(generatedValues); // Set the generated values for reference

    let intervalId = setInterval(() => {
      setCurrentCardIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= numCards) {
          clearInterval(intervalId); // Stop the interval when all cards are displayed
          setAnswersReady(true); // Enable input after all cards are displayed
          return prevIndex; // Keep the last index
        }
        return nextIndex; // Advance to the next card
      });
    }, periodicity);

    return () => clearInterval(intervalId); // Cleanup the interval
  }
}, [gameStarted, currentImpression, numImpressions, periodicity, difficulty, numCards]);






useEffect(() => {
  const generatedValues = generateAnzanValues(numCards, difficulty); // Generate multiple values
  setCurrentAnzanValues([generatedValues]); // Initialize the state with the generated values
  setValues(generatedValues); // Set the current values
  setAnswersReady(true); // Allow input
}, [numCards, difficulty]);



const handleAnswerSubmit = (answers) => {
  console.log('Generated values:', currentAnzanValues[currentAnzanIndex]);
  console.log('User answers:', answers);

  const correctAnswers = currentAnzanValues[currentAnzanIndex];
  if (!correctAnswers) {
    console.error('Correct answers are undefined.');
    return;
  }

  const correctness = answers.map((answer, index) => parseInt(answer) === correctAnswers[index]);
  const isCorrect = correctness.every((val) => val);

  setUserAnswers((prevAnswers) => [
    ...prevAnswers,
    { answers, correctness },
  ]);

  if (isCorrect) {
    setCorrectCount((prevCount) => prevCount + 1);
    setFeedbackMessage('Correct!');
  } else {
    setFeedbackMessage('Incorrect!');
  }

  // Disable inputs after submission
  setInputsDisabled(true);

  if (currentImpression + 1 < numImpressions) {
    const newGeneratedValues = generateAnzanValues(numCards, difficulty);
    setCurrentAnzanValues([newGeneratedValues]);
    setValues(newGeneratedValues);
    setCurrentCardIndex(0);
    setCurrentImpression((prevImpression) => prevImpression + 1);
    setAnswersReady(false);
  } else {
    setGameStarted(false);
    setAnswersReady(false);
    setShowResults(true);
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
    setGameStarted(true); // Ensure the game state is active
    setCurrentImpression(0); // Reset the impression count
    setCorrectCount(0); // Reset the correct count
    setUserAnswers([]); // Clear previous user answers
    setAnswersReady(false); // Disable input until new Anzan is displayed
    setShowResults(false); // Hide results panel
    setFeedbackMessage(''); // Clear any feedback messages
    setInputsDisabled(false); // Enable inputs
  
    const generatedValues = generateAnzanValues(numCards, difficulty); // Generate new values
    setCurrentAnzanValues([generatedValues]); // Update current Anzan values
    setValues(generatedValues); // Update displayed values
  
    // Ensure the input is enabled after displaying the Anzan
    setTimeout(() => {
      setAnswersReady(true); // Enable input after Anzan display
    }, periodicity * numCards); // Wait until all cards are displayed
  };
  
  

  const percentageCorrect = numImpressions > 0 ? (correctCount / numImpressions) * 100 : 0;

  const handleBreakComplete = () => {
    if (currentImpression < numCards - 1) {
      setCurrentImpression((prev) => prev + 1);
    } else {
      setAnswersReady(true);
    }
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
                  {feedbackMessage && (
              <p className={`feedback-message ${feedbackMessage === 'Correct!' ? 'green' : 'red'}`}>
                {feedbackMessage}
              </p>
            )}


                  {answersReady  ? (
                     <AnswerInput
                     numCards={numCards}
                     handleSubmit={handleAnswerSubmit}
                     correctAnswers={currentAnzanValues[0]} // All generated values
                     disabled={inputsDisabled}
                     gameMode={gameMode} // Pass the gameMode prop



                   />
                    ) : (
                      <AnzanComponent
                      numCards={numCards} // Always display one Anzan at a time
                      difficulty={difficulty}
                      values={[currentAnzanValues[0][currentCardIndex]]} // Current card value
                      periodicity={periodicity}
                      onBreakComplete={handleBreakComplete}

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

            <div className="answers-list flex-center">
          {userAnswers.map((entry, index) => (
            <div key={index} className="answer-row">
              {entry.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`answer-box ${
                    entry.correctness[idx] ? 'correct' : 'incorrect'
                  }`}
                >
                  <div className="answer-content">
                    <span className="user-answer">{ans}</span>
                    {!entry.correctness[idx] && (
                      <span className="correct-answer">
                        {currentAnzanValues[index][idx]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>


    <div className='flex-center'>
   
      <div className='results-panel'>
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
