import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { fetchTopics } from '../api/FetchTopics';
import { FetchNbrRows } from '../api/FetchNbrRows';
const { Option } = Select;


function SettingsPanel(props) {
  const [gameMode, setGameMode] = useState(props.gameMode);
  const [difficulty, setDifficulty] = useState('1D'); // Set initial state to '1D'

  const [numCards, setNumCards] = useState(props.numCards);
  const [numImpressions, setNumImpressions] = useState(props.numImpressions);
  const [periodicity, setPeriodicity] = useState(props.periodicity);
  const [subject, setSubject] = useState(props.subject);
  const [numRows, setNumRows] = useState(props.numRows);
  const [numExamplesPerRow, setNumExamplesPerRow] = useState(props.numExamplesPerRow);
  const [spacingBetweenExamples, setSpacingBetweenExamples] = useState(props.spacingBetweenExamples);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numRowsOptions, setNumRowsOptions] = useState([]);

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
    props.onChangeGameMode(mode);
  };


  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    props.onChangeDifficulty(diff);
    if (diff) {
      fetchTopics(diff).then((response) => {
        setTopics(response);
        setLoading(false);
      });
    } else {
      fetchTopics().then((response) => {
        setTopics(response);
        setLoading(false);
      });
    }
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


  // const handleSubjectChange = (value) => {
  //   setSubject(value);
  //   props.onChangeSubject(value);
  //   fetchTopics(difficulty, value).then((response) => {
  //     setTopics(response);
  //   });
  //   FetchNbrRows(value).then((response) => {
  //     const numRowsOptions = response;
  //     setNumRowsOptions(numRowsOptions);
  //     setNumRows(numRowsOptions[0]); // Set the first option as the default value
  //     props.onChangeNumRows(numRowsOptions[0]);
  //   });
  // };

  const handleSubjectChange = (value) => {
    setSubject(value);
    props.onChangeSubject(value);
    FetchNbrRows(value).then((response) => {
      if (Array.isArray(response)) {
        setNumRowsOptions(response);
        setNumRows(response[0]); // Set the first option as the default value
        props.onChangeNumRows(response[0]);
      } else {
        console.error('FetchNbrRows did not return an array:', response);
      }
    });
  };
  

  const handleNumRowsChange = (value) => {
    setNumRows(value);
    props.onChangeNumRows(value);
  };

  const handleNumExamplesPerRowChange = (value) => {
    setNumExamplesPerRow(value);
    props.onChangeNumExamplesPerRow(value);
  };

  const handleSpacingBetweenExamplesChange = (value) => {
    setSpacingBetweenExamples(value);
    console.log(`Spacing between examples set to ${value} seconds`);
    props.onChangeSpacingBetweenExamples(value);
  };
 


  // useEffect(() => {
  //   fetchTopics(difficulty).then((response) => {
  //     const topics = response;
  //     setTopics(topics);
  //     if (topics && topics.length > 0) {
  //       const firstTopic = topics[0].label_hy;
  //       setSubject(firstTopic);
  //       props.onChangeSubject(firstTopic);
  //     }
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    fetchTopics(difficulty).then((response) => {
      const topics = response;
      setTopics(topics);
      if (topics && topics.length > 0) {
        const firstTopic = topics[0].label_hy;
        setSubject(firstTopic);
        props.onChangeSubject(firstTopic);
        FetchNbrRows(firstTopic).then((response) => {
          const numRowsOptions = response;
          setNumRows(numRowsOptions[0]);
          props.onChangeNumRows(numRowsOptions[0]);
        });
      }
      setLoading(false);
    });
  }, []);


  

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
            className={`option ${gameMode === 'multiPlayer' ? 'active' : ''}`}
            onClick={() => handleGameModeChange('multiPlayer')}
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
        </div>
      </div>

      <div className="setting-item">
          <label>Subject:</label>
          <Select value={subject} onChange={handleSubjectChange}>
            <Option selected disabled> choose a topic </Option>
              {loading ? (
                <Option value="">Loading...</Option>
              ) : (
                topics && topics.length > 0 ? (
                  topics.map((topic) => (
                    <Option key={topic.id} value={topic.id}>
                      {topic.label_hy}
                    </Option>
                  ))
                ) : (
                  <Option value="">No topics found</Option>
                )
              )}
            </Select>
        </div>
      <div className="setting-item">
        <label>Number of Rows:</label>
        <Select value={numRows} onChange={handleNumRowsChange}>
            {Array.isArray(numRowsOptions) ? (
              numRowsOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))
            ) : (
              <Option value="">No options available</Option>
            )}
</Select>
      </div>

      <div className="setting-item">
        <label>Number of Examples in a Row:</label>
        <Select
          value={numExamplesPerRow}
          onChange={handleNumExamplesPerRowChange}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <Option key={num} value={num}>{num}</Option>
          ))}
        </Select>
      </div>

      <div className="setting-item">
        <label>Interval Between Examples:</label>
        <Select
          value={spacingBetweenExamples}
          onChange={handleSpacingBetweenExamplesChange}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <Option key={num} value={num}>{num}</Option>
          ))}
        </Select>
      </div>

  
    </div>
  );
}

export default SettingsPanel;