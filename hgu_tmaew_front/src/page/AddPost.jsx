import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../page/css/AddPost.css';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [fileList, setFileList] = useState([]);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleOtherFileChange = (event) => {
    setOtherFile(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setFileList(Array.from(event.target.files));
  };

  const handleSaveDraft = () => {
    // Save draft logic here
  };

  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('isPublic', isPublic);

    if (imageFile) {
      formData.append('image', imageFile);
    }
    if (otherFile) {
      formData.append('file', otherFile);
    }

    fileList.forEach((file, index) => {
      formData.append(`fileList[${index}]`, file);
    });

    try {
      const response = await axios.post(
        'https://likelion.info:443/material/add', // Replace with your API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        console.log('Post uploaded successfully');
        navigate('/dashboard/library'); // Navigate back to the library page after successful post
      } else {
        console.error('Error uploading post');
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      navigate('/', { replace: true });
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
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          style={{ marginTop: '1em' }}
        />
        <div className="attachments">
          <button className="attachment-button" onClick={togglePrivacy}>
            <i className="fas fa-globe"></i> {isPublic ? '전체 공개' : '비공개'}
          </button>
          <button className="attachment-button" onClick={() => document.getElementById('image-file').click()}>
            <AddPhotoAlternateIcon /> 이미지 첨부
          </button>
          <input id="image-file" type="file" hidden onChange={handleImageFileChange} />
          <button className="attachment-button" onClick={() => document.getElementById('other-file').click()}>
            <i className="fas fa-folder-open"></i> 파일 첨부
          </button>
          <input id="other-file" type="file" hidden onChange={handleOtherFileChange} />
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
