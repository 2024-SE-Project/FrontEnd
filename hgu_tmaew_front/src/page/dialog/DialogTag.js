import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';

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

  const handleSave = () => {
    const formData = new FormData();
    formData.append('part', part);
    formData.append('title', title);
    formData.append('contents', contents);
    formData.append('fun', fun);
    formData.append('writer', writer);
    formData.append('giveDate', giveDate);
    if (file) {
      formData.append('file', file);
    }

    // Must change to File server address
    
    // axios.post('/your-api-endpoint', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }).then((response) => {
    //   // 서버로부터 응답을 받으면, 응답 데이터를 사용하여 부모 컴포넌트의 상태를 업데이트합니다.
    //   props.onClose(response.data);
    // }).catch((error) => {
    //   console.error(error);
    // });
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
          label="분류"
          fullWidth
          variant="standard"
          value={part}
          onChange={(ev) => setPart(ev.target.value)}
        />
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
          label="소개"
          fullWidth
          variant="standard"
          value={contents}
          onChange={(ev) => setContents(ev.target.value)}
        />
        <TextField
          margin="dense"
          label="재미"
          fullWidth
          variant="standard"
          value={fun}
          onChange={(ev) => setFun(ev.target.value)}
        />
        <TextField
          margin="dense"
          label="작성자"
          fullWidth
          variant="standard"
          value={writer}
          onChange={(ev) => setWriter(ev.target.value)}
        />
        <TextField
          margin="dense"
          label="제공 일자"
          fullWidth
          variant="standard"
          type="date"
          value={giveDate}
          onChange={(ev) => setGiveDate(ev.target.value)}
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

export default DialogTag;