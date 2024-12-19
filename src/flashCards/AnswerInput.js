import React, { useState } from 'react';

const AnswerInput = ({
  numCards,
  handleSubmit,
  correctAnswers,
  disabled,
  gameMode,
}) => {
  const [answers, setAnswers] = useState(Array(numCards).fill(''));
  const [feedback, setFeedback] = useState(Array(numCards).fill(''));
  const [revealAnswers, setRevealAnswers] = useState(false);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    if (gameMode === 'inClass') {
  
      setRevealAnswers(true); // Reveal answers on Check button click in "In Class" mode
    } else {
      const newFeedback = answers.map((answer, index) =>
        parseInt(answer) === correctAnswers[index] ? 'correct' : 'incorrect'
      );
      setFeedback(newFeedback);
      handleSubmit(answers);
    }
  };

  return (
    <form className="FlashCardsForm" onSubmit={onSubmit}>
      <div className="input-container">
        {Array.from({ length: numCards }).map((_, index) => (
          <div key={index} className="input-box">
            {gameMode === 'inClass' && !revealAnswers ? (
              <div className="question-mark">?</div>
            ) : gameMode === 'inClass' && revealAnswers ? (
              <div className="answer-box correct">   <div className="answer-content">{correctAnswers[index]}</div></div>
            ) : (
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder={`Answer ${index + 1}`}
                disabled={disabled || gameMode === 'inClass' || feedback[index] === 'correct'}
                className={`input-field ${
                  feedback[index] === 'correct'
                    ? 'correct'
                    : feedback[index] === 'incorrect'
                    ? 'incorrect'
                    : ''
                }`}
              />
            )}
           
          </div>
        ))}
      </div>
      <button className="practice-btn red-bg" type="submit">
        {gameMode === 'inClass' ? 'Check' : 'Submit'}
      </button>
    </form>
  );
};

export default AnswerInput;
