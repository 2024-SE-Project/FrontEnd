import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../page/css/EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    content: '',
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://likelion.info:443/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      post.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      await axios.put(`https://likelion.info:443/post/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard/main');
    } catch (error) {
      console.error('Error updating post:', error);
      setErrorMessage('게시물 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPost({ ...post, images: files });
  };

  return (
    <Container className="container">
      <Typography variant="h4" className="title" gutterBottom>게시물 수정</Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <TextField
        label="제목"
        name="title"
        value={post.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        className="textfield"
      />
      <TextField
        label="내용"
        name="content"
        value={post.content}
        onChange={handleChange}
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
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="file-upload-label">
        <Button variant="contained" component="span">
          파일 첨부
        </Button>
      </label>
      <Box className="button-group">
        <Button variant="contained" className="save-button" onClick={handleSave}>저장</Button>
        <Button variant="outlined" className="cancel-button" onClick={() => navigate('/dashboard/main')}>취소</Button>
      </Box>
    </Container>
  );
};

export default EditPost;
