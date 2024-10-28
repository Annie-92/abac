import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const NavigationButtons = ({ currentCard, numCards, handlePreviousCard, handleNextCard }) => {
  return (
    <div className="navigation-buttons">
      <button
        className="navigation-button"
        disabled={currentCard === 0}
        onClick={handlePreviousCard}
      >
        <MdNavigateBefore />
      </button>
      <button
        className="navigation-button"
        disabled={currentCard === numCards - 1}
        onClick={handleNextCard}
      >
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default NavigationButtons;