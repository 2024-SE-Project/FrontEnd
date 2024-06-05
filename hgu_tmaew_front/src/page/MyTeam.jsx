import React, { useEffect, useState } from 'react';
import '../page/css/MyTeam.css';

export default function MyTeam() {
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    // Simulating an API call with hardcoded data
    const fetchTeamInfo = () => {
      const data = {
        photoUrl: "https://storage.googleapis.com/raonz_post_image/cat9.jpg",
        message: "24-1 학기 최희열 교수님 팀 입니다. 우리팀은 외부활동을 좋아하며 수많은 인재들이 있습니다.",
        professorTeamName: "김세진 교수님 팀",
        rc: "열송학사",
        semester: "24-1",
        memberCount: 24
      };
      setTeamInfo(data);
    };

    fetchTeamInfo();
  }, []);

  if (!teamInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-team">
      <div className="team-header">
        <h2>나의 팀</h2>
      </div>
      <div className="team-content">
        <div className="team-info">
          <div className="team-photo">
            <h4>대표 사진</h4>
            <img src={teamInfo.photoUrl} alt="대표사진" />
          </div>
          <div className="team-message">
            <h4>대표 인사말</h4>
            <p>{teamInfo.message}</p>
            <span className="no-edits">수정권한 없음</span>
          </div>
        </div>
        <div className="team-details">
          <h3>{teamInfo.professorTeamName}</h3>
          <p>😊 RC: {teamInfo.rc}</p>
          <p>📅 학기: {teamInfo.semester}</p>
          <p>👥 멤버 수: {teamInfo.memberCount}명</p>
          <div className="team-out">
            <span className="leave-team">탈퇴하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
