import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/ReferDetail.css';

const DEFAULT_IMAGE_URL = "https://storage.googleapis.com/raonz_post_image/cat8.jpg"; // 기본 이미지 경로 설정

const ReferDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  if (!post) {
    return <div>잘못된 접근입니다.</div>;
  }

  const imageUrl = post.postFileDtoList && post.postFileDtoList.length > 0 && post.postFileDtoList[0].imageUrl
    ? post.postFileDtoList[0].imageUrl
    : DEFAULT_IMAGE_URL;

  return (
    <div className="post-detail-container">
      <div className="post-detail-image-container">
        <img src={imageUrl} alt="Post" />
      </div>
      <div className="post-detail-content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div className="post-detail-footer">
          <span>좋아요: {post.likeCount}</span>
          <span>스크랩: {post.scrapeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ReferDetail;