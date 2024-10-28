import React from 'react';

function ResultDisplay(props) {
  const { result, score } = props;

  return (
    <div className="result-display">
      <h2>{result === 'correct'? 'Correct!' : 'Incorrect.'}</h2>
      <p>Score: {score}</p>
    </div>
  );
}

export default ResultDisplay;