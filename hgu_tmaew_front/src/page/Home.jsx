import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import './css/Home.css'; // 홈 페이지 스타일을 위한 CSS 파일
import Logo from '../assets/logo_white.svg'; // 이미지의 상대 경로
import Kuyper from '../assets/dorm/kuyper.jpg';
import Torrey from '../assets/dorm/torrey.jpg';
import Carmichael from '../assets/dorm/carmichael.jpg';
import Bethel from '../assets/dorm/bethel.jpg';
import Yeolsong from '../assets/dorm/yeolsong.jpg';
import Grace from '../assets/dorm/grace.jpg';

const Home = () => {

  function ParallaxComponent({ url, title }) {
    return (
      <Parallax bgImage={url} strength={600} blur={{min: -5, max: 15}} >
        <div className="parallax-container">
          <div className="parallax-title">{title}</div>
        </div>
      </Parallax>
    );
  }

  return (
    <div className="home">
      <header className="home-header">
        <img src={Logo} className="home-logo" alt="logo" />
      </header>
      <main className="home-content">
        <p className="home-content-title">Handong Team Meeting Archiving<br />And Exchange Web Platform</p>
        <p className="home-content-subTitle">This platform will support the student support team and team executives in<br /> fostering a stronger team culture and developing leadership skills university-wide.</p>
        <Link to="/login" className="loginButton">Start</Link>
      </main>

      {/* 이 부분 br/을 화면 비율에 맞게 적용될 수 있도록 수정할 것! */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="home-dormInfo">
        <ParallaxComponent url={Kuyper} title="Kuyper" />
        <ParallaxComponent url={Torrey} title="Torrey" />
        <ParallaxComponent url={Carmichael} title="Carmichael" />
        <ParallaxComponent url={Bethel} title="Bethel" />
        <ParallaxComponent url={Yeolsong} title="Yeolsong" />
        <ParallaxComponent url={Grace} title="Grace" />
      </div>
    </div>
  );
};

export default Home;
