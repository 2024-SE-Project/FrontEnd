import React, { useState, useEffect } from 'react';
import '../page/css/Ranking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [year, setYear] = useState(2023);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChangeYear = () => {
    const newYear = year === 2023 ? 2022 : 2023; // 예시 로직
    setYear(newYear);
  };

  useEffect(() => {
    const fetchRankingInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        navigate('/login', { replace: true });
        return;
      }

      try {
        const response = await axios.get('https://likelion.info:443/rank/like', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if (data && Array.isArray(data)) {
          setRankingData(data); // Assuming data is an array of ranking data
        } else {
          setRankingData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setRankingData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingInfo();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <h1>명예의 전당</h1>
        <div className="year-container">
          <button className="year-button" onClick={handleChangeYear}>
            연도 바꾸기
          </button>
          <span className="year-label">기준: {year}년</span>
        </div>
      </header>
      <main className="ranking-main">
        <div className="top-rankings">
          {rankingData.slice(0, 3).map((post, index) => (
            <div key={post.id} className={`ranking-card rank-${index + 1}`}>
              <div className="ranking-position">{index + 1}등</div>
              <img src={post.postFileDtoList[0].imageUrl} alt={post.postFileDtoList.imageUrl} className="ranking-image" />
              <div className="ranking-post">{post.content}</div>
              <div className="ranking-score">❤️ {post.likeCount}</div>
            </div>
          ))}
        </div>
      </main>
      <div className="other-rankings">
          <h2>나머지 등수</h2>
          <div className="ranking-list">
            {rankingData.slice(3).map((post, index) => (
              <div key={post.id} className="ranking-item">
                <div className="ranking-position">{index + 4}등</div>
                <div className="ranking-name">{post.title}</div>
                <div className="ranking-score">❤️ {post.likeCount}</div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
