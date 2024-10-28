import React, { useState } from 'react';
import AnswerInput from './AnswerInput';

const CardModal = ({ showModal, currentCard, front, back, answer, setAnswer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    showModal && (
      <div className="card-modal">
        <div className="card-modal-content">
          <div className="card-modal-front">{front}</div>
          <div className="card-modal-back">{showAnswer? back : ''}</div>
          <AnswerInput answer={answer} onChange={handleAnswerChange} />
          <button className="show-answer-btn" onClick={handleShowAnswer}>
            Show Answer
          </button>
        </div>
      </div>
    )
  );
};

export default CardModal;