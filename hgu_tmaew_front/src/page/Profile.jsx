import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import samplePosts from '../page/profile/samplePosts';
import '../page/css/Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '이민서',
    email: '22100503@handong.ac.kr',
    phone: '010-XXXX-XXXX',
    rc: '열송학사',
  });
  const [myPosts, setMyPosts] = useState([]);
  const [teamPosts, setTeamPosts] = useState([]);
  const [scrapedPosts, setScrapedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 샘플 데이터를 임시로 설정
    const filteredMyPosts = samplePosts.filter(post => post.author === userInfo.name);
    setMyPosts(filteredMyPosts);
    setTeamPosts(samplePosts); // 모든 포스트를 팀 포스트로 임시 설정
    setScrapedPosts(filteredMyPosts); // 사용자가 작성한 글을 스크랩한 글로 임시 설정
  }, [userInfo]);

  const handleLogout = () => {
    // 로그아웃 로직
    navigate('/');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>프로필</h1>
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </header>
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-photo">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
          <div className="profile-info">
            <h2>{userInfo.name}</h2>
            <p>닉네임: 익명</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="details-item">
            <h3>기본정보</h3>
            <p><strong>{userInfo.name}</strong></p>
            <p>{userInfo.email}</p>
            <p>휴대전화: {userInfo.phone}</p>
            <p>RC: {userInfo.rc}</p>
          </div>
        </div>
      </div>

      <div className="posts-section">
        <h3>내가 작성한 글</h3>
        <div className="posts-list">
          {myPosts.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.content}</h4>
              <p>{post.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h3>우리팀이 쓴 글</h3>
        <div className="posts-list">
          {teamPosts.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.content}</h4>
              <p>{post.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h3>내가 스크랩한 글</h3>
        <div className="posts-list">
          {scrapedPosts.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.content}</h4>
              <p>{post.author}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
