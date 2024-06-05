import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  bottomNavigationClasses,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RefDialogTag(props) {
  const [title, setTitle] = useState(props.row?.title ?? '');
  const [content, setContent] = useState(props.row?.content ?? '');
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(props.row?.title ?? '');
    setContent(props.row?.content ?? '');
    setFileList([]);
  }, [props.row]);

  const handleFileChange = (event) => {
    setFileList(Array.from(event.target.files));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    fileList.forEach((file, index) => {
      formData.append(`fileList[${index}]`, file);
    });
  

    // Must change to File server address
    
    axios.post('https://likelion.info:443/material/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    withCredentials: true
    }).then((response) => {
      // 서버로부터 응답을 받으면, 응답 데이터를 사용하여 부모 컴포넌트의 상태를 업데이트합니다.
      props.onClose(response.data);
      navigate('/dashboard/library', { replace: true });
    }).catch((error) => {
      console.error(error);
      navigate('/', { replace: true });
    });
  };

  return (
    <Dialog open={props.open} onClose={() => props.onClose()}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          컨텐츠를 추가하기 위해 아래 폼을 작성해주세요
        </DialogContentText>
        
        <TextField
          margin="dense"
          label="제목"
          fullWidth
          variant="standard"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <TextField
          margin="dense"
          label="본문"
          fullWidth
          variant="standard"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: '1em' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>취소</Button>
        <Button onClick={handleSave} color="primary">저장</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RefDialogTag;