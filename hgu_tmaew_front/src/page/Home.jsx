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
          IconSvg={KuyperIcon} 
          description={
            <>
              Abraham Kuyper의 뜻을 이어받고자<br />
              ‘성경의 진리를 우리 삶의 전 영역에서 배우고 실천하는 공동체’를 추구하며<br />
              2013년도 1학기에 처음으로 세워졌습니다.
            </>
          } />
        <DormCard
          name="Jangkiryeo"
          className="jangkiryeo-card"
          CharacterSvg={JangkiryeoCharacter}
          IconSvg={JangkiryeoIcon} 
          description={
            <>
              생전 ‘살아있는 성자’, ‘한국의 슈바이처’로 불린 성산 장기려 선생을 본받아<br />
              섬김과 나눔의 삶을 배우는 공동체로 함께 세워가고 있습니다.
            </>
          } />
        <DormCard
          name="Rodem"
          className="rodem-card"
          CharacterSvg={RodemCharacter}
          IconSvg={RodemIcon} 
          description={
            <>
              열송학사는 그 이름의 의미처럼 하나님의 형상을 회복하며<br />
              그리스도의 장성한 분량으로 자라가는 서로의 모습을 보면서 함께 기뻐하는<br />
              아름다운 공동체를 지향합니다.
            </>
          } />
        <DormCard
          name="Carmichael"
          className="carmichael-card"
          CharacterSvg={CarmichaelCharacter}
          IconSvg={CarmichaelIcon} 
          description={
            <>
              카마이클 칼리지는 2014년에 한동대학교에 최초로 설립된 국제RC입니다.<br />
              카마이클 가족의 모토는 “ToujourPrest(트쥬 프레, 항상 준비하라)”입니다.<br />
              하나님의 은혜를 따라 경청하고, 배우고, 성장하고<br />
              섬기는 것에 항상 준비된 사람들이 되기를 소망합니다.
            </>
          } />
        <DormCard
          name="Torrey"
          className="torrey-card"
          CharacterSvg={TorreyCharacter}
          IconSvg={TorreyIcon}
          description={
            <>
              Get Torrey!<br />
              한동대학교의 첫 번째 Residential College로서 2011년에 시작하였으며<br />
              한국 개신교에 지대한 영향을 끼치신 대천덕(Ruben Archer Torrey III) 신부님을 본받아<br />
              믿음과 삶과 배움의 일치를 지향하는 공동체입니다.
            </>
          } />
        <DormCard
          name="Bethel"
          className="bethel-card"
          CharacterSvg={BethelCharacter}
          IconSvg={BethelIcon} 
          description={
            <>
              손양원 RC 한 사람 한 사람은 말과 행동을 잠시 멈추어 차이와 다름을 되집어 생각하여<br />
              자신, 이웃, 그리고 하나님의 관계를 회복함으로,<br />
              누구나 와서 서로 돌보고 사랑하는 역동적인 하나님의 쉼 공간이 됩니다.
            </>
          } />
      </div>
    </div>
    <div className="load-more-button-container">
      <button className="load-more-button">Load More</button>
    </div>
    </>
  );
};

export default Home;
