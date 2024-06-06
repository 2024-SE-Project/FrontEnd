import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import samplePosts from '../page/profile/samplePosts';
import '../page/css/Profile.css';
import axios from 'axios';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '이민서',
    email: '22100503@handong.ac.kr',
    phone: '010-XXXX-XXXX',
    rc: '열송학사',
    profileImage: 'https://via.placeholder.com/150' // 기본 프로필 이미지 URL 설정
  });
  const [temp, setTemp] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [teamPosts, setTeamPosts] = useState([]);
  const [scrapedPosts, setScrapedPosts] = useState([]);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    rc: false,
  });
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const data = axios.get('https://likelion.info:443/mypage', {
      headers: {
        Authorization: `Bearer ${storedToken}`
      },
      withCredentials: true
    })
      .then(response => {
        setTemp(response.data);
        setEditedInfo({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.studentId,
          rc: userInfo.rc,
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem("token");
        alert("로그아웃 되었습니다.");
        navigate('/', { replace: true });
      });

    const filteredMyPosts = samplePosts.filter(post => post.author === userInfo.name);
    setMyPosts(filteredMyPosts);
    setTeamPosts(samplePosts);
    setScrapedPosts(filteredMyPosts);
  }, [userInfo, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const handleEditClick = (field) => {
    setIsEditing(prevState => ({ ...prevState, [field]: true }));
  };

  const handleSaveClick = (field) => {
    setIsEditing(prevState => ({ ...prevState, [field]: false }));
    setUserInfo(prevState => ({ ...prevState, [field]: editedInfo[field] }));
    // 저장 로직 추가 (API 호출 등)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo((prevState) => ({
          ...prevState,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
            <img src={userInfo.profileImage} alt="Profile" />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image-upload">
              <IconButton color="primary" component="span">
                <EditIcon />
              </IconButton>
            </label>
          </div>
          <div className="profile-info">
            <h2>{temp.name}</h2>
            <p>닉네임: 익명</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="details-item">
            <h3 className="details-header">기본정보</h3>
            <div className="editable-field">
              <p><strong>이름:</strong></p>
              {isEditing.name ? (
                <input
                  type="text"
                  name="name"
                  value={editedInfo.name}
                  onChange={handleChange}
                />
              ) : (
                <p>{editedInfo.name}</p>
              )}
              <Button onClick={() => isEditing.name ? handleSaveClick('name') : handleEditClick('name')} color="primary" variant="outlined">
                {isEditing.name ? '저장' : '수정'}
              </Button>
            </div>
            <hr className="divider" />
            <div className="editable-field">
              <p><strong>이메일:</strong></p>
              {isEditing.email ? (
                <input
                  type="text"
                  name="email"
                  value={editedInfo.email}
                  onChange={handleChange}
                />
              ) : (
                <p>{editedInfo.email}</p>
              )}
              <Button onClick={() => isEditing.email ? handleSaveClick('email') : handleEditClick('email')} color="primary" variant="outlined">
                {isEditing.email ? '저장' : '수정'}
              </Button>
            </div>
            <hr className="divider" />
            <div className="editable-field">
              <p><strong>전화번호:</strong></p>
              {isEditing.phone ? (
                <input
                  type="text"
                  name="phone"
                  value={editedInfo.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{editedInfo.phone}</p>
              )}
              <Button onClick={() => isEditing.phone ? handleSaveClick('phone') : handleEditClick('phone')} color="primary" variant="outlined">
                {isEditing.phone ? '저장' : '수정'}
              </Button>
            </div>
            <hr className="divider" />
            <div className="editable-field">
              <p><strong>RC:</strong></p>
              {isEditing.rc ? (
                <input
                  type="text"
                  name="rc"
                  value={editedInfo.rc}
                  onChange={handleChange}
                />
              ) : (
                <p>{editedInfo.rc}</p>
              )}
              <Button onClick={() => isEditing.rc ? handleSaveClick('rc') : handleEditClick('rc')} color="primary" variant="outlined">
                {isEditing.rc ? '저장' : '수정'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="posts-section">
        <h3>내가 작성한 글</h3>
        <div className="posts-list">
          {Array.isArray(temp.postResponseList) && temp.postResponseList.map(post => (
            <div key={post.postId} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h3>우리팀이 쓴 글</h3>
        <div className="posts-list">
          {Array.isArray(temp.postReponseList) && temp.postReponseList.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="posts-section">
        <h3>내가 스크랩한 글</h3>
        <div className="posts-list">
          {Array.isArray(temp.scrapDtoList) && temp.scrapDtoList.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Profile;
