import React from 'react';
import './css/TeamMatching.css';
import FilterIcon from '../assets/filter_icon.svg'; // 필터 아이콘 SVG 경로 설정

const TeamMatching = () => {
  const postData = [
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat10.jpg",
      title: "피구하실래요?",
      leader: "남재창 교수님 팀 (28명)",
      date: "날짜: 14차주 수요일 (6회 모임)",
      description: "24-1 학기 남재창 교수님 팀 입니다. 우리팀은 외부활동을 좋아하여 수많은 피구활동을 해왔습니다. 피구 할까? ㅎㅎ 역시 누군가의 팀원감이 최곱니다! 가입합시다 구호...",
      status: "매칭중: 미정",
      isLiked: true,
    },
    {
        image: "https://storage.googleapis.com/raonz_post_image/cat1.jpg",
        title: "피구하실래요?",
        leader: "남재창 교수님 팀 (28명)",
        date: "날짜: 14차주 수요일 (6회 모임)",
        description: "24-1 학기 남재창 교수님 팀 입니다. 우리팀은 외부활동을 좋아하여 수많은 피구활동을 해왔습니다. 피구 할까? ㅎㅎ 역시 누군가의 팀원감이 최곱니다! 가입합시다 구호...",
        status: "매칭중: 미정",
        isLiked: true,
      },
      {
        image: "https://storage.googleapis.com/raonz_post_image/cat2.jpg",
        title: "피구하실래요?",
        leader: "남재창 교수님 팀 (28명)",
        date: "날짜: 14차주 수요일 (6회 모임)",
        description: "24-1 학기 남재창 교수님 팀 입니다. 우리팀은 외부활동을 좋아하여 수많은 피구활동을 해왔습니다. 피구 할까? ㅎㅎ 역시 누군가의 팀원감이 최곱니다! 가입합시다 구호...",
        status: "매칭중: 미정",
        isLiked: true,
      },
      {
        image: "https://storage.googleapis.com/raonz_post_image/cat.jpg",
        title: "피구하실래요?",
        leader: "남재창 교수님 팀 (28명)",
        date: "날짜: 14차주 수요일 (6회 모임)",
        description: "24-1 학기 남재창 교수님 팀 입니다. 우리팀은 외부활동을 좋아하여 수많은 피구활동을 해왔습니다. 피구 할까? ㅎㅎ 역시 누군가의 팀원감이 최곱니다! 가입합시다 구호...",
        status: "매칭중: 미정",
        isLiked: true,
      },
    // 추가 데이터
  ];

  const teamData = [
    {
        image: "https://storage.googleapis.com/raonz_post_image/cat10.jpg",
        description: "24-1 학기 최회열 교수님 팀 입니다. 우리팀은 외부활동을 좋아하여 수많은 경험들이 있습니다.",
    }
  ];

  return (
    <div className="team-matching-container">
      <main className="team-matching-main">
        <div className="search-bar">
          <button className="search-button">🔍</button>
          <input type="text" placeholder="원하는 팀 혹은 활동들을 입력해주세요." />
          <button className="filter-button">
            <img src={FilterIcon} alt="Filter" />
          </button>
        </div>
        <nav className="reference-nav">
          <button>정확도순</button>
          <button>최신순</button>
        </nav>
        <section className="team-matching-content">
          <aside className="team-matching-sidebar">
            <div className="my-team">
              <h2>My Team</h2>
              {teamData.map((team, index) => (
                <div key={index} className="team-card my-team-card">
                  <img src={team.image} alt="Team" />
                  <div className="team-info">
                    <div className="team-info-main">
                      <p>{team.description}</p>
                    </div>
                    <div className="team-info-side">
                      <button className="details-button">자세히보기</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="matching-status">
              <h2>Matching</h2>
              <ul>
                <li>
                  <p>000 교수님 팀이 팀모임을 신청하였습니다.</p>
                  <p>28 members</p>
                  <button className="details-button">자세히보기</button>
                </li>
                {/* 추가 데이터 */}
              </ul>
            </div>
          </aside>
          <div className="team-matching-list">
            {postData.map((team, index) => (
              <div key={index} className="team-card">
                <img src={team.image} alt="Team" />
                <div className="team-info">
                  <div className="team-info-main">
                    <h3>{team.title}</h3>
                    <p>{team.leader}</p>
                    <p>{team.description}</p>
                  </div>
                  <div className="team-info-side">
                    <p>{team.date}</p>
                    <p>{team.status}</p>
                    <div className="team-actions">
                      <button className="join-button">팀모임 신청하기</button>
                      <button className="details-button">자세히보기</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeamMatching;
