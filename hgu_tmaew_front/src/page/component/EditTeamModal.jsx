import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditTeamModal = ({ open, onClose, team = {} }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (team) {
      setName(team.name || '');
      setContent(team.content || '');
    }
  }, [team]);

  const handleSave = () => {
    // 저장 로직 추가
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>팀 수정</DialogTitle>
      <DialogContent>
        <TextField
          label="팀 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="팀 소개말"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">취소</Button>
        <Button onClick={handleSave} color="secondary">저장</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTeamModal;
