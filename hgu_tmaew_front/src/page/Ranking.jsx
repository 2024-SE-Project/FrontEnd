import React, { useState, useEffect } from 'react';
import '../page/css/Ranking.css';

const samplePosts = [
  {
    id: 1,
    name: '최희열 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat.jpg',
    score: 500,
  },
  {
    id: 2,
    name: '남재창 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat1.jpg',
    score: 300,
  },
  {
    id: 3,
    name: '이희진 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat2.jpg',
    score: 100,
  },
  {
    id: 4,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat3.jpg',
    score: 50,
  },
  {
    id: 5,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat4.jpg',
    score: 30,
  },
  {
    id: 6,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat5.jpg',
    score: 30,
  },
  {
    id: 7,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat6.jpg',
    score: 30,
  },
  {
    id: 8,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat7.jpg',
    score: 30,
  },
  {
    id: 9,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat8.jpg',
    score: 30,
  },
  {
    id: 10,
    name: '000 교수님 팀',
    image: 'https://storage.googleapis.com/raonz_post_image/cat9.jpg',
    score: 30,
  },
];

export default function Ranking() {
  const [rankingData, setRankingData] = useState(samplePosts);
  const [year, setYear] = useState(2023);

  const handleChangeYear = () => {
    const newYear = year === 2023 ? 2022 : 2023; // 예시 로직
    setYear(newYear);
  };

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <h1>명예의 전당</h1>
        <button className="year-button" onClick={handleChangeYear}>
          년도 바꾸기
        </button>
        <span className="year-label">기준: {year}년</span>
      </header>
      <main className="ranking-main">
        <div className="top-rankings">
          {rankingData.slice(0, 3).map((team, index) => (
            <div key={team.id} className={`ranking-card rank-${index + 1}`}>
              <div className="ranking-position">{index + 1}등</div>
              <img src={team.image} alt={team.name} className="ranking-image" />
              <div className="ranking-team">{team.name}</div>
              <div className="ranking-score">❤️ {team.score}</div>
            </div>
          ))}
        </div>
        <div className="other-rankings">
          <h2>나머지 등수</h2>
          <div className="ranking-list">
            {rankingData.slice(3).map((team, index) => (
              <div key={team.id} className="ranking-item">
                <div className="ranking-name">{team.name}</div>
                <div className="ranking-position">{index + 4}등</div>
                <div className="ranking-score">❤️ {team.score}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
