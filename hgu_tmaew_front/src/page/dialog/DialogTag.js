import React, { useState, useEffect } from 'react';
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
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

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
    setFile(null);
  }, [props.row]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 백엔드에 실질적으로 데이터를 전송하는 파트!
  const handleSave = async () => {
    // 폼 데이터 객체 생성
    const formData = new FormData();
    const storedToken = localStorage.getItem("token");
    
    formData.append('title', title);
    formData.append('content', contents);
    
    if (file) {
      formData.append('fileList', file);
    }

    try {
      // POST 요청을 통해 백엔드로 데이터 전송
      const response = await axios.post('https://likelion.info:443/post/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${storedToken}`
        },
      });

      // 성공적으로 데이터가 전송된 경우
      console.log('Data saved successfully:', response.data);
      props.onClose(response.data); // 저장된 데이터를 부모 컴포넌트에 전달
    } catch (error) {
      // 데이터 전송 중 에러 발생 시
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
              <input type="file" hidden onChange={handleFileChange} />
            </IconButton>
            <IconButton aria-label="file-upload" component="label">
              <i className="fas fa-folder-open"></i> 파일 첨부
              <input type="file" hidden />
            </IconButton>
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