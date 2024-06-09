import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import '../css/DialogTag.css'; // CSS 파일 임포트

function DialogTag(props) {
  const [part, setPart] = useState(props.row?.part ?? '');
  const [title, setTitle] = useState(props.row?.title ?? '');
  const [contents, setContents] = useState(props.row?.contents ?? '');
  const [fun, setFun] = useState(props.row?.fun ?? '');
  const [writer, setWriter] = useState(props.row?.writer ?? '');
  const [giveDate, setGiveDate] = useState(
    props.row?.giveDate ? format(new Date(props.row.giveDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  );
  const [fileList, setfileList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const togglePrivacy = () => {
    setIsPublic(!isPublic);
  };

  useEffect(() => {
    setPart(props.row?.part ?? '');
    setTitle(props.row?.title ?? '');
    setContents(props.row?.contents ?? '');
    setFun(props.row?.fun ?? '');
    setWriter(props.row?.writer ?? '');
    setGiveDate(
      props.row?.giveDate ? format(new Date(props.row.giveDate), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    );
    setfileList([]);
    setImagePreviews([]);
  }, [props.row]);

  const handleImageFileChange = (event) => {
    const files = Array.from(event.target.files);
    setfileList((prevFiles) => [...prevFiles, ...files]);

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
    setfileList((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const formData = new FormData();
    const storedToken = localStorage.getItem("token");
    
    formData.append('title', title);
    formData.append('content', contents);
    formData.append('isPublic', isPublic);

    fileList.forEach((file, index) => {
      formData.append(`fileList[${index}]`, file);
    });
    

    try {
      const response = await axios.post('https://likelion.info:443/post/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${storedToken}`
        },
      });

      console.log('Data saved successfully:', response.data);
      props.onClose(response.data);
      navigate(0);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Dialog open={props.open} onClose={() => props.onClose()} className="dialog">
      <DialogTitle className="time-info">
        {format(new Date(), 'yyyy년 MM월 dd일 EEEE HH:mm')}
        <IconButton className="close-button" onClick={() => props.onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className="content-box">
          <TextField
            margin="dense"
            placeholder="제목을 입력해주세요."
            fullWidth
            variant="outlined"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <TextField
            margin="dense"
            placeholder="내용을 입력해주세요."
            fullWidth
            variant="outlined"
            multiline
            rows={6}
            value={contents}
            onChange={(ev) => setContents(ev.target.value)}
          />
          <Box className="privacy-options">
            <IconButton aria-label="privacy" onClick={togglePrivacy}>
              <i className="fas fa-globe"></i> {isPublic ? '전체 공개' : '비공개'}
            </IconButton>
            <IconButton aria-label="image-upload" component="label">
              <AddPhotoAlternateIcon /> 이미지 첨부
              <input type="file" hidden multiple onChange={handleImageFileChange} />
            </IconButton>
          </Box>
          <Box className="previews">
            {imagePreviews.map((preview, index) => (
              <div className="image-preview-container" key={index}>
                <img src={preview} alt="미리보기" className="image-preview" />
                <IconButton className="remove-image-button" onClick={() => handleRemoveImage(index)}>
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()} className="temp-save-button">임시저장하기</Button>
        <Button onClick={handleSave} color="primary" startIcon={<PublishIcon />} className="post-button">게시하기</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogTag;
