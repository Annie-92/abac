import React, { useState } from 'react';

function SettingsPanel(props) {
  const [gameMode, setGameMode] = useState('singlePlayer');
  const [difficulty, setDifficulty] = useState('easy');
  const [periodicity, setPeriodicity] = useState(0.1);

  const [numCards, setNumCards] = useState(1);
  const [numImpressions, setNumImpressions] = useState(1); // Initial number of impressions

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
    props.onChangeGameMode(mode);
  };

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    props.onChangeDifficulty(diff);
  };



  const handlePeriodicityChange = (periodicity) => {
    setPeriodicity(periodicity);
    props.onChangePeriodicity(periodicity);
  };

  const handleNumImpressionsChange = (change) => {
    const newNumImpressions = props.numImpressions + change;
    if (newNumImpressions >= 1) {
      setNumImpressions(newNumImpressions);
      props.onChangeNumImpressions(newNumImpressions);
    }
  };
  
  const handleNumCardsChange = (change) => {
    const newNumCards = numCards + change;
    setNumCards(newNumCards);
    props.onChangeNumCards(newNumCards);
  };

  return (
    <div className="settings-panel">
      <div className="setting-item">
        <label>Game Mode:</label>
        <div className="option-group">
          <button 
            className={`option ${gameMode === 'singlePlayer' ? 'active' : ''}`}
            onClick={() => handleGameModeChange('singlePlayer')}
          >
            Single 
          </button>
          <button 
            className={`option ${gameMode === 'inClass' ? 'active' : ''}`}
            onClick={() => handleGameModeChange('inClass')}
          >
            In Class
          </button>
        </div>
      </div>

      <div className="setting-item">
        <label>Number Digit:</label>
        <div className="option-group">
          <button 
            className={`option ${difficulty === '1D' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('1D')}
          >
            1D
          </button>
          <button 
            className={`option ${difficulty === '2D' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('2D')}
          >
            2D
          </button>
          <button 
            className={`option ${difficulty === '3D' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('3D')}
          >
            3D
          </button>
          <button 
            className={`option ${difficulty === '4D' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('4D')}
          >
            4D
          </button>
          <button 
            className={`option ${difficulty === '5D' ? 'active' : ''}`}
            onClick={() => handleDifficultyChange('5D')}
          >
            5D
          </button>
        </div>
      </div>

      <div className="setting-item">
        <label>Periodicity:</label>
        <div className="option-group">
          <button 
            className={`option ${periodicity === 500 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(500)}
          >
           0.5
          </button>
          <button 
            className={`option ${periodicity === 1000 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(1000)}
          >
           1.0
          </button>
          <button 
            className={`option ${periodicity === 1500 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(1500)}
          >
          1.5
          </button>
          <button 
            className={`option ${periodicity === 2000 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(2000)}
          >
            2.0
          </button>
          <button 
            className={`option ${periodicity === 2500 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(2500)}
          >
          2.5
          </button>
          <button 
            className={`option ${periodicity === 3000 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(3000)}
          >
          3.0
          </button>
          <button 
            className={`option ${periodicity === 3500 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(3500)}
          >
           3.5
          </button>
          <button 
            className={`option ${periodicity === 4000 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(4000)}
          >
          4.0 
          </button>
          <button 
            className={`option ${periodicity === 4500 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(4500)}
          >
           4.5
          </button>
          <button 
            className={`option ${periodicity === 5000 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(5000)}
          >
            5.0
          </button>
          <button 
            className={`option ${periodicity === 20000 ? 'active' : ''}`}
            onClick={() => handlePeriodicityChange(20000)}
          >
            20.0
          </button>
        
        </div>
      </div>

      <div className="setting-item">
        <label>Number of Impressions:</label>
        <div className="option-group">
          <button className='changeNbr' onClick={() => handleNumImpressionsChange(-1)}>-</button>
          <input
  type="number"
  value={numImpressions}
  onChange={(e) => setNumImpressions(parseInt(e.target.value))}
/>          <button className='changeNbr' onClick={() => handleNumImpressionsChange(1)}>+</button>
        </div>
      </div>

      <div className="setting-item">
        <label>Number of Cards in a Row:</label>
        <div className="option-group">
          <button className='changeNbr' onClick={() => handleNumCardsChange(-1)}>-</button>
          <input
  type="number"
  value={numCards}
  onChange={(e) => setNumCards(parseInt(e.target.value))}
/>          <button className='changeNbr' onClick={() => handleNumCardsChange(1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;