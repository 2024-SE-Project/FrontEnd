import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../page/css/AddPost.css';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSaveDraft = () => {
    // Save draft logic here
  };

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await axios.post(
        'https://likelion.info:443/material/post', // Replace with your API endpoint
        {
          title,
          content,
          // Add other necessary fields here
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Post uploaded successfully');
        navigate('/dashboard/main'); // Navigate back to the main page after successful post
      } else {
        console.error('Error uploading post');
      }
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="add-post">
      <div className="header">
        <h2>아카이빙 자료 업로드</h2>
        <button className="back-button" onClick={handleBack}>뒤로가기</button>
      </div>
      <div className="post-content">
        <input
          type="text"
          className="post-title"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          className="post-body"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <div className="attachments">
          <button className="attachment-button">전체공개</button>
          <button className="attachment-button">이미지 첨부</button>
          <button className="attachment-button">파일 첨부</button>
        </div>
      </div>
      <div className="footer">
        <button className="cancel-button" onClick={handleBack}>취소</button>
        <button className="save-draft-button" onClick={handleSaveDraft}>임시저장하기</button>
        <button className="post-button" onClick={handlePost}>게시하기</button>
      </div>
    </div>
  );
}
