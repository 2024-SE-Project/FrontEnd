import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../page/css/EditPost.css';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newFileList, setNewFileList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('인증 토큰이 없습니다.');
        return;
      }

      try {
        const response = await axios.get(`https://likelion.info:443/post/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { title, content, postFileDtoList } = response.data;
        setTitle(title);
        setContent(content);
        setExistingFiles(postFileDtoList || []);
        setImagePreviews(postFileDtoList.map(file => file.imageUrl));
      } catch (error) {
        console.error('Error fetching post:', error);
        setErrorMessage('게시물을 불러오는 데 실패했습니다.');
      }
    };
    fetchPost();
  }, [id]);

  const handleImageFileChange = (event) => {
    const files = Array.from(event.target.files);
    setNewFileList((prevFiles) => [...prevFiles, ...files]);

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

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('인증 토큰이 없습니다.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      newFileList.forEach((file, index) => {
        formData.append(`fileList`, file);
      });

      console.log('Sending data:', {
        title,
        content,
        newFileList: newFileList.map(file => file.name),
      });

      const response = await axios.patch(`https://likelion.info:443/post/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
          // 'Content-Type': 'multipart/form-data' // 이 줄을 제거하세요.
        }
      });
      
      console.log('Server response:', response);
      navigate('/dashboard/main');
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        setErrorMessage(`게시물 수정에 실패했습니다: ${error.response.data.message}`);
      } else {
        setErrorMessage('게시물 수정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };
  const handleRemoveImage = (index) => {
    setExistingFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <Container className="container">
      <Typography variant="h4" className="title" gutterBottom>게시물 수정</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        className="textfield"
      />
      <TextField
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        className="textfield"
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        multiple
        onChange={handleImageFileChange}
      />
      <label htmlFor="file-upload" className="file-upload-label">
        <Button variant="contained" component="span">
          파일 첨부
        </Button>
      </label>
      <Box className="image-preview-container">
        {imagePreviews.map((preview, index) => (
          <div className="image-preview-container" key={index}>
            <img src={preview} alt="미리보기" className="image-preview" />
            <IconButton className="remove-image-button" onClick={() => handleRemoveImage(index)}>
              <Close />
            </IconButton>
          </div>
        ))}
      </Box>
      <Box className="button-group">
        <Button variant="contained" className="save-button" onClick={handleSave}>저장</Button>
        <Button variant="outlined" className="cancel-button" onClick={() => navigate('/dashboard/main')}>취소</Button>
      </Box>
    </Container>
  );
};

export default EditPost;
