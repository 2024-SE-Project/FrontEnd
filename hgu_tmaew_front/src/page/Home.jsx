import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css'; // 홈 페이지 스타일을 위한 CSS 파일

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <img src="/img/logo_white.svg" className="home-logo" alt="logo" />
        {/* <Link to="/login" className="loginButton">로그인</Link> */}
      </header>
      <main className="home-content">
        {/* 홈페이지의 여러 글이나 기능들을 여기서부터 추가하면 됨!!! */}
        <p>Handong Team Meeting Archiving<br />And Exchange Web Platform</p>
        <Link to="/login" className="loginButton">Start</Link>
      </main>
    </div>
  );
};

export default Home;
