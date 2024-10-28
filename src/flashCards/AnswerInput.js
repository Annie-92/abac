import React, { useState } from 'react';

const AnswerInput = ({ numCards, handleSubmit }) => {
  const [answers, setAnswers] = useState(Array(numCards).fill(''));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(answers);
  };

  return (
    <form className='FlashCardsForm' onSubmit={onSubmit}>
      {answers.map((answer, index) => (
        <input
          key={index}
          type="text"
          value={answer}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Answer ${index + 1}`}
        />
      ))}
      <button className='practice-btn red-bg' type="submit">Check</button>
    </form>
  );
};

export default AnswerInput;
