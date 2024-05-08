import React from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import './css/Home.css'; // 홈 페이지 스타일을 위한 CSS 파일
import logo from '../assets/logo_white.svg'; // 이미지의 상대 경로
import kuyper from '../assets/dorm/kuyper.jpg';
import torrey from '../assets/dorm/torrey.jpg';
import carmichael from '../assets/dorm/carmichael.jpg';
import bethel from '../assets/dorm/bethel.jpg';
import yeolsong from '../assets/dorm/yeolsong.jpg';
import grace from '../assets/dorm/grace.jpg';

const Home = () => {

  function ParallaxComponent({ url, title }) {
    return (
      <Parallax bgImage={url} strength={1000} bgImageStyle={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="parallax-container">
          <div className="parallax-title">{title}</div>
        </div>
      </Parallax>
    );
  }

  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
      </header>
      <main className="home-content">
        <p className="home-content-title">Handong Team Meeting Archiving<br />And Exchange Web Platform</p>
        <p className="home-content-subTitle">This platform will support the student support team and team executives in<br /> fostering a stronger team culture and developing leadership skills university-wide.</p>
        <Link to="/login" className="loginButton">Start</Link>
      </main>

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
        <ParallaxComponent url={kuyper} title="Kuyper" />
        <ParallaxComponent url={torrey} title="Torrey" />
        <ParallaxComponent url={carmichael} title="Carmichael" />
        <ParallaxComponent url={bethel} title="Bethel" />
        <ParallaxComponent url={yeolsong} title="Yeolsong" />
        <ParallaxComponent url={grace} title="Grace" />
      </div>
    </div>
  );
};

export default Home;
