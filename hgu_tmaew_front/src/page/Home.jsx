import React from 'react';
import { Link } from 'react-router-dom';
import DormCard from '../page/component/dormcard'; // Importing the dorm card component
import './css/Home.css'; // Ensure you have this CSS for styling
import Logo from '../assets/logo_white.svg'; // 로고 이미지

// Import SVGs as React Components
import { ReactComponent as KuyperCharacter } from '../assets/dorm/kuyper.svg';
import { ReactComponent as KuyperIcon } from '../assets/dorm/kuy.svg';

import { ReactComponent as JangkiryeoCharacter } from '../assets/dorm/Jangkiryeo.svg';
import { ReactComponent as JangkiryeoIcon } from '../assets/dorm/jan.svg';

import { ReactComponent as RodemCharacter } from '../assets/dorm/Rodem.svg';
import { ReactComponent as RodemIcon } from '../assets/dorm/Ro.svg';

import { ReactComponent as CarmichaelCharacter } from '../assets/dorm/Carmichael.svg';
import { ReactComponent as CarmichaelIcon } from '../assets/dorm/Car.svg';

import { ReactComponent as TorreyCharacter } from '../assets/dorm/Torrey.svg';
import { ReactComponent as TorreyIcon } from '../assets/dorm/Tor.svg';

import { ReactComponent as BethelCharacter } from '../assets/dorm/Bethel.svg';
import { ReactComponent as BethelIcon } from '../assets/dorm/Bet.svg';


const Home = () => {
  return (
    <><div className="home">
      <header className="home-header">
        <img src={Logo} className="home-logo" alt="Platform logo" />
      </header>
      <main className="home-content">
        <h1 className="home-content-title">Handong Team Meeting Archiving<br />And Exchange Web Platform</h1>
        <p className="home-content-subTitle">
          This platform will support the student support team and team executives in<br />
          fostering a stronger team culture and developing leadership skills university-wide.
        </p>
        <Link to="/login" className="loginButton">Start</Link>
      </main>
      <div className="home-content">
        <DormCard
          name="Kuyper"
          className="kuyper-card"
          CharacterSvg={KuyperCharacter}
          IconSvg={KuyperIcon} />
        <DormCard
          name="Jangkiryeo"
          className="jangkiryeo-card"
          CharacterSvg={JangkiryeoCharacter}
          IconSvg={JangkiryeoIcon} />
        <DormCard
          name="Rodem"
          className="rodem-card"
          CharacterSvg={RodemCharacter}
          IconSvg={RodemIcon} />
        <DormCard
          name="Carmichael"
          className="carmichael-card"
          CharacterSvg={CarmichaelCharacter}
          IconSvg={CarmichaelIcon} />
        <DormCard
          name="Torrey"
          className="torrey-card"
          CharacterSvg={TorreyCharacter}
          IconSvg={TorreyIcon} />
        <DormCard
          name="Bethel"
          className="bethel-card"
          CharacterSvg={BethelCharacter}
          IconSvg={BethelIcon} />
      </div>
      </div>
      <div className="load-more-button-container">
          <button className="load-more-button">Load More</button>
      </div>
    </>
  );
};

export default Home;