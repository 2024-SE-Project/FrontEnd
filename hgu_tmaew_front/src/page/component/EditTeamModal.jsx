import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

export default function EditTeamModal({ open, onClose, teamInfo }) {
  const [teamName, setTeamName] = useState(teamInfo.name);
  const [teamContent, setTeamContent] = useState(teamInfo.content);
  const [teamImage, setTeamImage] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    setTeamName(teamInfo.name);
    setTeamContent(teamInfo.content);
    setTeamImage(null);
    setInviteEmail('');
  }, [teamInfo]);

  const handleImageChange = (event) => {
    setTeamImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', teamName);
    formData.append('content', teamContent);
    if (teamImage) {
      formData.append('image', teamImage);
    }
    formData.append('inviteEmail', inviteEmail);

    try {
      await axios.put(`https://likelion.info:443/team/update/${teamInfo.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onClose();
    } catch (error) {
      console.error('Error updating team:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>팀 수정</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="팀명"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="대표 인사말"
          value={teamContent}
          onChange={(e) => setTeamContent(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="team-image"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="team-image">
          <Button variant="contained" component="span" style={{ marginTop: '10px' }}>
            대표 사진 업로드
          </Button>
        </label>
        <TextField
          fullWidth
          label="사용자 초대"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">취소</Button>
        <Button onClick={handleSubmit} color="primary">수정하기</Button>
      </DialogActions>
    </Dialog>
  );
}
