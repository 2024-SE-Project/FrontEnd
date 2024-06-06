import React, { useState } from 'react';
import axios from 'axios';
import '../css/CreateTeamModal.css';

export default function CreateTeamModal({ onClose }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [emailList, setEmailList] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleEmailListChange = (e) => setEmailList(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      setError('로그인이 필요합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    formData.append('emailList', emailList);

    try {
      const response = await axios.post('https://likelion.info:443/team/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        validateStatus: (status) => {
          // 정상적인 응답 코드만 허용
          return status >= 200 && status < 300;
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess('팀이 성공적으로 생성되었습니다!');
        setError(null);
        onClose();
      } else {
        setError(`팀 생성 중 문제가 발생했습니다: ${response.status}`);
        setSuccess(null);
      }
      
    } catch (error) {
      console.error('Error creating team:', error);
      if (error.response) {
        // 서버에서 응답이 있지만, 응답 코드가 정상 범위에 있지 않은 경우
        setError(`서버 응답 에러: ${error.response.status}`);
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        setError('서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인하세요.');
      } else {
        // 요청 설정 중 문제가 발생한 경우
        setError(`요청 설정 중 에러 발생: ${error.message}`);
      }
      setSuccess(null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>팀 생성</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>팀명</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="팀명을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label>대표 인사말</label>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="내용을 입력해주세요."
              required
            />
          </div>
          <div className="form-group">
            <label>사용자 초대</label>
            <textarea
              value={emailList}
              onChange={handleEmailListChange}
              placeholder="초대할 사용자 이메일을 쉼표로 구분하여 입력해주세요."
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="form-actions">
            <button type="button" onClick={onClose}>취소하기</button>
            <button type="submit">생성하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
