import React, { useState } from 'react';
import './Envelope.css';

const Envelope = ({toPerson, content}) => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);

  const handleEnvelopeClick = () => {
    setIsFlapOpen(!isFlapOpen);
  };

  return (
    <div className={`envelope-wrapper ${isFlapOpen ? 'flap' : ''}`} onClick={handleEnvelopeClick}>
      <div className="envelope">
        <div className="letter">
          <div className="text">
            <strong>Gửi {toPerson}.</strong>
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
      <div className="heart"></div>
    </div>
  );
};

export default Envelope;
