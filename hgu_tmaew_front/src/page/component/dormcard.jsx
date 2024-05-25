import React from 'react';
import '../css/Dormcard.css';

const DormCard = ({ name, className, CharacterSvg, IconSvg }) => {
  return (
    <div className={`dorm-card ${className}`}>
      <div className="big-image">
        <CharacterSvg className="character-image" />
      </div>
      <div className="small-image">
        <IconSvg className="icon-image" />
      </div>
      <div className="dorm-name">{name}</div>
    </div>
  );
};

export default DormCard;
