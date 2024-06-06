import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateTeamModal.css';

export default function CreateTeamModal({ onClose }) {
  const [name, setname] = useState('');
  const [content, setcontent] = useState('');
  const [img, setimg] = useState(null);
  const [emailList, setEmailList] = useState('');

  const handlenameChange = (e) => setname(e.target.value);
  const handlecontentChange = (e) => setcontent(e.target.value);
  const handleimgChange = (e) => setimg(e.target.files[0]);
  const handleEmailListChange = (e) => setEmailList(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            <button type="submit">생성하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}