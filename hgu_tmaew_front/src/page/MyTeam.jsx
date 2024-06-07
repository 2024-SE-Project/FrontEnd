import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../page/css/MyTeam.css';
import CreateTeamModal from './component/CreateTeamModal';
import EditTeamModal from './component/EditTeamModal';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function MyTeam() {
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // 추가된 부분
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        navigate('/login', { replace: true });
        return;
      }

      try {
        const response = await axios.get('https://likelion.info:443/my/team/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data) {
          setTeamInfo(data[0]); // Assuming the user is part of at least one team and we're taking the first one
        } else {
          setTeamInfo(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTeamInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamInfo();
  }, [navigate]);

  const handleCreateTeamClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleExit = () => {
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://likelion.info:443/team/delete/${teamInfo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOpenDeleteDialog(false);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error exiting team:', error);
    }
  };  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamInfo) {
    return (
      <div className="my-team">
        <div className="team-header">
          <h2>나의 팀</h2>
        </div>
        <div className="team-content no-team">
          <p>현재 팀에 소속되어있지 않습니다! 초대를 기다리거나, 생성하세요.</p>
          <button className="create-team-button" onClick={handleCreateTeamClick}>팀 생성하기</button>
        </div>
        {showModal && <CreateTeamModal onClose={handleModalClose} />}
      </div>
    );
  }

  const imageUrl = teamInfo.imgURL || "https://storage.googleapis.com/raonz_post_image/cat9.jpg";

  return (
    <div className="my-team">
      <div className="team-header">
        <h2>나의 팀</h2>
      </div>
      <div className="team-content">
        <div className="team-info">
          <div className="team-photo">
            <h4>대표 사진</h4>
            <img src={imageUrl} alt="대표사진" />
          </div>
          <div className="team-message">
            <h4>대표 인사말</h4>
            <p>{teamInfo.content || "팀 소개말이 없습니다."}</p>
            <span className="no-edits">수정권한 없음</span>
          </div>
        </div>
        <div className="team-details">
          <h3>{teamInfo.name}</h3>
          <div className="team-out">
            <span className="leave-team" onClick={handleExit}>탈퇴하기</span>
            <Dialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
            >
              <DialogTitle>팀 탈퇴</DialogTitle>
              <DialogContent>
                <DialogContentText>정말로 팀을 나가시겠습니까?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDeleteDialog(false)} color="primary">취소</Button>
                <Button onClick={handleDelete} color="secondary">나가기</Button>
              </DialogActions>
            </Dialog>
            <span className="edit-team" onClick={handleEditClick}>수정</span>
            <EditTeamModal
              open={showEditModal}
              onClose={handleEditModalClose}
              teamInfo={teamInfo}
            />
          </div>
        </div>
      </div>
      {showModal && <CreateTeamModal onClose={handleModalClose} />}
    </div>
  );
}
