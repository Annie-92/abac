import React, { useState, useEffect } from 'react';
import './AnzanComponent.css';

const RyadTop = ({ value }) => {
  const validValue = value >= 5 ? 5 : 0;
  return (
    <div className="ryad top" style={{ display: 'block' }}>
      <div className="ryad-top">
        {validValue === 5 ? <div className="ukost metka"></div> : <div className="ukost"></div>}
      </div>
    </div>
  );
};

const RyadBot = ({ value }) => {
  let metkaIndex = value >= 5 ? value - 5 : Math.min(value, 3);
  return (
    <div className="ryad">
      <div className="ryad-bot">
        {Array.from({ length: 4 }, (_, i) => {
          const shouldAddMetka = i === metkaIndex;
          const isActive = metkaIndex === -1 || i > metkaIndex;
          return (
            <div
              key={i}
              className={`ukost ${isActive ? 'active' : ''} ${shouldAddMetka ? 'metka' : ''}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const AnzanComponent = ({ numCards, difficulty, values = [], periodicity }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Display one Anzan after each periodicity
  useEffect(() => {
    if (currentIndex < values.length) {
      const timeoutId = setTimeout(() => {
        setCurrentIndex(currentIndex + 1); // Show next set of values
      }, periodicity);

      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, periodicity, values.length]);

  // The number of lines to show is based on difficulty
  const numLines = 
    difficulty === '1D' ? 1 : 
    difficulty === '2D' ? 2 : 
    difficulty === '3D' ? 3 : 
    difficulty === '4D' ? 4 : 
    difficulty === '5D' ? 5 : 1;

  // Each impression shows one set of values, which is split into digits if needed
  const splitValues = values.flatMap(value => {
    if (difficulty === '1D') return [value]; // Single digit display for 1D
    return String(value).padStart(numLines, '0').split('').map(Number); // Split the value into digits based on numLines
  });

  // Render the Anzan
  return (
    <div className='flex-center'>
      <div id="anzan">
        <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
          {Array.from({ length: numLines }, (_, lineIndex) => (
            <div key={lineIndex} className="AnzanLine">
              <RyadTop visible={true} value={splitValues[lineIndex + currentIndex * numLines] || 0} />
              <RyadBot value={splitValues[lineIndex + currentIndex * numLines] || 0} />
            </div>
          ))}
        </div>
        <div className="hline">
          <div className="tochka"></div>
        </div>
      </div>
    </div>
  );
};


export default AnzanComponent;
