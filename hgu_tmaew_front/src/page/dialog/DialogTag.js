import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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
  const [privacy, setPrivacy] = useState('');

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
    // Implementation remains the same
  };

  return (
    <Dialog open={props.open} onClose={() => props.onClose()} className="dialog">
      <DialogTitle className="time-info">
        {format(new Date(), 'yyyy년 MM월 dd일 iiii HH:mm')}
      </DialogTitle>
      <DialogContent>
        <Box className="content-box">
          <TextField
            margin="dense"
            label="제목"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <TextField
            margin="dense"
            label="소개"
            fullWidth
            variant="outlined"
            multiline
            rows={2}
            value={contents}
            onChange={(ev) => setContents(ev.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>공개 범위 설정</InputLabel>
            <Select
              value={privacy}
              label="공개 범위 설정"
              onChange={(event) => setPrivacy(event.target.value)}
            >
              <MenuItem value="public">공개</MenuItem>
              <MenuItem value="private">비공개</MenuItem>
            </Select>
          </FormControl>
          <Box className="button-box">
            <Button
              variant="contained"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
            >
              이미지 첨부
              <input type="file" hidden />
            </Button>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>취소</Button>
        <Button onClick={handleSave} color="primary">임시저장</Button>
        <Button onClick={handleSave} color="secondary">게시하기</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogTag;