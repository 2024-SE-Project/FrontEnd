import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './css/Reference.css';
import FilterIcon from '../assets/filter_icon.svg'; // 필터 아이콘 SVG 경로 설정
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import DialogTag from './dialog/RefDialogTag.js';

const Reference = () => {
  const [postData, setPostData] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await axios.get('https://likelion.info:443/material/get/all/1', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = async () => {
    setOpenCreate(false);
    await fetchData();
  };

  const handleRowClick = (row) => {
    navigate('/dashboard/library/create', { state: row });
  };

  const toggleLike = async (index, postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      let response;
      if (postData[index].like) {
        response = await axios.delete(`https://likelion.info:443/like/delete/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post(`https://likelion.info:443/like/add/${postId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.data !== null) {
        const updatedData = [...postData];
        updatedData[index].like = !updatedData[index].like;
        updatedData[index].likeCount += updatedData[index].like ? 1 : -1;
        setPostData(updatedData);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleScrape = async (index, postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      let response;
      if (postData[index].scraped) {
        response = await axios.delete(`https://likelion.info:443/scrape/delete/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await axios.post(`https://likelion.info:443/scrape/add/${postId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (response.data !== null) {
        const updatedData = [...postData];
        updatedData[index].scraped = !updatedData[index].scraped;
        updatedData[index].scrapeCount += updatedData[index].scraped ? 1 : -1;
        setPostData(updatedData);
      }
    } catch (error) {
      console.error('Error toggling scrape:', error);
    }
  };

  return (
    <div className="reference-container">
      <main className="reference-main">
        <div className="search-bar">
          <button className="search-button">🔍</button>
          <input type="text" placeholder="찾고 싶은 자료를 입력해주세요." />
          <button className="filter-button">
            <img src={FilterIcon} alt="Filter" />
          </button>
        </div>
        <nav className="reference-nav">
          <button>전체 자료</button>
          <button>올해 자료</button>
          <button>내 팀 자료</button>
        </nav>
        <section className="reference-content">
          {postData.map((data, index) => (
            <Card
              key={data.postId}  // key에 유일한 값인 postId 사용
              index={index}
              postId={data.postId}
              title={data.title}
              content={data.content}
              like={data.like}
              scraped={data.scraped}
              likeCount={data.likeCount}
              scrapeCount={data.scrapeCount}
              toggleLike={toggleLike}
              toggleScrape={toggleScrape}
            />
          ))}
        </section>
      </main>
      <NavLink to="/dashboard/addpost" className={`floating-button ${isScrolled ? 'h_event2' : ''}`} activeClassName="active">
        <div>
          <span className="menu-icon">게시물작성하기</span>
        </div>
      </NavLink>
      
      {openCreate && (
        <DialogTag
          open={openCreate}
          title="추가하기"
          onClose={handleCloseCreate}
        />
      )}
    </div>
  );
};

const Card = ({ postId, title, content, like, scraped, likeCount, scrapeCount, index, toggleLike, toggleScrape }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src="https://storage.googleapis.com/raonz_post_image/cat8.jpg" alt="Road" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="card-icons">
            <button onClick={() => toggleLike(index, postId)} className="icon-button">
              <FontAwesomeIcon icon={like ? solidHeart : regularHeart} className="fa-heart" />
              <span className="like-count">{likeCount}</span> {/* 좋아요 수 표시 */}
            </button>
            <button onClick={() => toggleScrape(index, postId)} className="icon-button">
              <FontAwesomeIcon icon={scraped ? solidBookmark : regularBookmark} className="fa-bookmark" />
              <span className="scrape-count">{scrapeCount}</span> {/* 스크랩 수 표시 */}
            </button>
          </div>
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="card-footer">
          <button className="details-button">자세히보기</button>
        </div>
      </div>
    </div>
  );
};

export default Reference;
