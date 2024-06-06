import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateTeamModal.css';

export default function CreateTeamModal({ onClose }) {
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [emailList, setEmailList] = useState('');

  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  const handleEmailListChange = (e) => setEmailList(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    const formData = new FormData();
    formData.append('teamName', teamName);
    formData.append('message', message);
    formData.append('photo', photo);
    formData.append('emailList', emailList);

    try {
      const response = await axios.post('https://likelion.info:443/team/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        console.log('Team created successfully:', response.data);
        onClose();
        // Optionally, refresh the team list or navigate to another page
      } else {
        console.error('Failed to create team');
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>팀생성</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>팀명</label>
            <input
              type="text"
              value={teamName}
              onChange={handleTeamNameChange}
              placeholder="팀명을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label>대표인사말</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="내용을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label>대표사진</label>
            <input
              type="file"
              onChange={handlePhotoChange}
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
            <button type="submit">생성하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}