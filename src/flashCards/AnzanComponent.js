import React, { useState, useEffect, useRef } from 'react';
import './AnzanComponent.css';

// Utility function to generate a unique key


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
  let metkaIndex = value >= 5 ? value - 5 : Math.min(value, 4);
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

const AnzanComponent = ({ numCards, difficulty, values = [], periodicity, onBreakComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBreak, setIsBreak] = useState(false); // Track if we're in the break state
  const [counter, setCounter] = useState(0); // Define a counter state
   const timeoutRef = useRef(null);



  // Display one Anzan after each periodicity
  // useEffect(() => {
  //   if (counter < numCards - 1) {
  //     const timeoutId = setTimeout(() => {
  //       if (isBreak) {
  //         // End the break, move to the next value
  //         setIsBreak(false);
  //         setCounter((prev) => prev + 1); // Increment counter during the break

  //       } else {
  //         // Start the break
  //         setIsBreak(true);
  //       }
  //     }, isBreak ? 700 : periodicity); // Alternate between break and display time
  
  //     console.log(
  //       `Index: ${counter}, IsBreak: ${isBreak}, Value: ${
  //         currentIndex < values.length ? values[currentIndex] : "N/A"
  //       }, Total Cards: ${numCards}`
  //     );
  
  //     return () => clearTimeout(timeoutId); // Cleanup timeout
  //   } else {
  //     console.log("Completed all values.");
  //   }
  // }, [counter, isBreak, periodicity, numCards]);
  
  
  
  



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
    <div className="flex-center" style={{ overflow: 'hidden' }}>
      {!isBreak ? (
        <div id="anzan">
          <div
            style={{
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
            }}
          >
            {Array.from({ length: numLines }, (_, lineIndex) => (
              <div key={lineIndex}>
                <RyadTop value={splitValues[lineIndex + currentIndex * numLines] || 0} />
                <RyadBot value={splitValues[lineIndex + currentIndex * numLines] || 0} />
              </div>
            ))}
          </div>
          <div className="hline">
            <div className="tochka"></div>
          </div>
        </div>
      ) : (
        <div style={{ height: '600px', width: '100%' }}></div> // Empty space
      )}
    </div>
  );
};


export default AnzanComponent;
