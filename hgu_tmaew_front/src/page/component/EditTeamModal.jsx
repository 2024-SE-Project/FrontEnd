import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

export default function EditTeamModal({ open, onClose, team = {} }) {
  const [name, setname] = useState(team.name || '');
  const [content, setContent] = useState(team.content || '');
  const [img, setimg] = useState(null);
  const [emailList, setemailList] = useState('');


  const handlenameChange = (e) => setname(e.target.value);
  const handlecontentChange = (e) => setContent(e.target.value);
  const handleimgChange = (e) => setimg(e.target.files[0]);
  const handleEmailListChange = (e) => setemailList(e.target.value);

  useEffect(() => {
    if (team) {
      setname(team.name || '');
      setContent(team.content || '');
      setimg(null);
      setemailList('');
    }
  }, [team]);

  const handleImageChange = (event) => {
    setimg(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    formData.append('img', img);
    formData.append('emailList', emailList);

    try {
      const response = await axios.patch(`https://likelion.info:443/team/update/${team.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data !== null) {
        console.log('Team updated successfully');
        onClose();
      } else {
        console.error('Failed to update team');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error('Error updating team: 권한이 없는 사용자입니다.');
        alert('권한이 없는 사용자입니다.');
      } else {
        console.error('Error updating team:', error);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>팀 정보 수정</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>팀명</label>
            <input
              type="text"
              value={name}
              onChange={handlenameChange}
              placeholder="팀명을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label>대표인사말</label>
            <textarea
              value={content}
              onChange={handlecontentChange}
              placeholder="내용을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label>대표사진</label>
            <input
              type="file"
              onChange={handleimgChange}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <label>사용자 초대</label>
            <textarea
              value={emailList}
              onChange={handleEmailListChange}
              placeholder="초대할 사용자 이메일을 입력해주세요."
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose}>취소하기</button>
            <button type="submit">수정하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
