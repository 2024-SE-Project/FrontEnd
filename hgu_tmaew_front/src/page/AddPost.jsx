import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PublishIcon from '@mui/icons-material/Publish';
import '../page/css/AddPost.css';
import { IconButton } from '@mui/material';
import Logo from '../assets/logo_white.svg'; // 로고 이미지
import { Close } from '@mui/icons-material';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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
    const files = Array.from(event.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(newPreviews).then((results) => {
      setImagePreviews((prevPreviews) => [...prevPreviews, ...results]);
    });
  };

  const handleRemoveImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

const handleDummyImage = () => {
  fetch(Logo)
    .then((response) => response.blob())
    .then((blob) => {
      const dummyImageFile = new File([blob], 'dummyImage.png', { type: 'image/png' });
      setOtherFile(dummyImageFile);
    })
    .catch((error) => console.error('Error fetching dummy image:', error));
};

  const handleOtherFileChange = (event) => {
    const file = event.target.files[0];
    setOtherFile(file);
    setFileList((prevList) => [...prevList, file]);
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

    imageFiles.forEach((file, index) => {
      formData.append(`fileList[${index}]`, file);
    });

    if (!otherFile) {
      console.log("첨부 파일이 입력되지 않았습니다. 더미 이미지를 사용합니다.");
      handleDummyImage();
    } else {
      console.log("첨부 파일이 입력되었습니다.");
      formData.append('file', otherFile);
    }

    if (fileList.length > 0) {
      fileList.forEach((file, index) => {
        formData.append(`fileList[${imageFiles.length + index}]`, file);
      });
    } else {
      formData.append('fileList', new Blob([])); // 빈 파일 리스트 추가
    }

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
        alert("게시물 업로드 성공");
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
          <button className="attachment-button" onClick={togglePrivacy}>
            <i className="fas fa-globe"></i> {isPublic ? '전체 공개' : '비공개'}
          </button>
          <button className="attachment-button" onClick={() => document.getElementById('image-file').click()}>
            <AddPhotoAlternateIcon /> 이미지 첨부
          </button>
          <input id="image-file" type="file" hidden multiple onChange={handleImageFileChange} />
          <button className="attachment-button" onClick={() => document.getElementById('other-file').click()}>
            <i className="fas fa-folder-open"></i> 파일 첨부
          </button>
          <input id="other-file" type="file" hidden onChange={handleOtherFileChange} />
        </div>
        <div className="previews">
          {imagePreviews.map((preview, index) => (
            <div className="image-preview-container" key={index}>
              <img src={preview} alt="미리보기" className="image-preview" />
              <IconButton className="remove-image-button" onClick={() => handleRemoveImage(index)}>
                <Close />
              </IconButton>
            </div>
          ))}
          {fileList.length > 0 && (
            <div className="file-list-container">
              <h4>첨부된 파일</h4>
              <ul>
                {fileList.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <button className="cancel-button" onClick={handleBack}>취소</button>
        <button className="save-draft-button" onClick={handleSaveDraft}>임시 저장하기</button>
        <button className="post-button" onClick={handlePost} startIcon={<PublishIcon />}>게시하기</button>
      </div>
    </div>
  );
}
