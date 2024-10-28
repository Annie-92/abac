import React from 'react';
import { Button, Modal } from "antd";
import AnswerInput from './AnswerInput';


const CardDeck = ({ cards, currentCard, showModal, setShowModal }) => {
  return (
    <div className="card-deck">
      {cards.map((card, index) => (
        <div key={index} className={`card ${index === currentCard ? 'active' : ''}`}>
          <div className="card-front">{card.front}</div>
          <div className="card-back">{card.back}</div>
        </div>
      ))}
      {showModal && (
        <Modal
          title="Answer"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
        >
          <AnswerInput />
        </Modal>
      )}
    </div>
  );
};

export default CardDeck;