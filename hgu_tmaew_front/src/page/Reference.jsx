import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './css/Reference.css';
import FilterIcon from '../assets/filter_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

import DialogTag from './dialog/RefDialogTag.js';
import FilterDialog from './dialog/FilterDialog.jsx'; // 필터링 모달창 컴포넌트 추가

const DEFAULT_IMAGE_URL = "https://storage.googleapis.com/raonz_post_image/cat8.jpg";

const Reference = () => {
  const [postData, setPostData] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFilter, setOpenFilter] = useState(false); // 필터링 모달창 열기 상태
  const [searchCriteria, setSearchCriteria] = useState('title'); // 검색 기준 상태
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      navigate('/login', { replace: true });
      return;
    }

    try {
      const response = await axios.get('https://likelion.info:443/material/get/all/1', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostData(response.data);
      setFilteredPostData(response.data);
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
    navigate(`/post/${row.postId}`, { state: row });
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
        setFilteredPostData(updatedData);
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
        setFilteredPostData(updatedData);
      }
    } catch (error) {
      console.error('Error toggling scrape:', error);
    }
  };

  const handleSearch = () => {
    const filteredData = postData.filter(post =>
      searchCriteria === 'title' 
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
        : post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPostData(filteredData);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="reference-container">
      <main className="reference-main">
        <div className="search-bar">
          <button className="filter-button" onClick={() => setOpenFilter(true)}>
            <img src={FilterIcon} alt="Filter" />
          </button>
          <input
            type="text"
            placeholder="찾고 싶은 자료를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress} // 엔터키 이벤트 추가
          />
          <button className="search-button" onClick={handleSearch}>🔍</button>
        </div>
        <nav className="reference-nav">
          <button>전체 자료</button>
          <button>올해 자료</button>
          <button>내 팀 자료</button>
        </nav>
        <section className="reference-content">
          {filteredPostData.map((data, index) => {
            const imageUrl = data.postFileDtoList && data.postFileDtoList.length > 0 && data.postFileDtoList[0].imageUrl
              ? data.postFileDtoList[0].imageUrl
              : DEFAULT_IMAGE_URL;
            return (
              <Card
                key={data.postId}
                index={index}
                postId={data.postId}
                title={data.title}
                content={data.content}
                imageUrl={imageUrl}
                like={data.like}
                scraped={data.scraped}
                likeCount={data.likeCount}
                scrapeCount={data.scrapeCount}
                toggleLike={toggleLike}
                toggleScrape={toggleScrape}
                onViewDetails={() => navigate(`/post/${data.postId}`, { state: data })}
              />
            );
          })}
        </section>
      </main>
      <NavLink
        to="/dashboard/addpost"
        className={({ isActive }) => `floating-button ${isScrolled ? 'h_event2' : ''} ${isActive ? 'active' : ''}`}
      >
        <div>
          <span className="menu-icon">게시물 작성하기</span>
        </div>
      </NavLink>
      
      {openCreate && (
        <DialogTag
          open={openCreate}
          title="추가하기"
          onClose={handleCloseCreate}
        />
      )}

      {openFilter && (
        <FilterDialog
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          searchCriteria={searchCriteria}
          setSearchCriteria={setSearchCriteria}
        />
      )}
    </div>
  );
};

const Card = ({ postId, title, content, imageUrl, like, scraped, likeCount, scrapeCount, index, toggleLike, toggleScrape, onViewDetails }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={imageUrl} alt="Post" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="card-icons">
            <button onClick={() => toggleLike(index, postId)} className="icon-button">
              <FontAwesomeIcon icon={like ? solidHeart : regularHeart} className="fa-heart" />
              <span className="like-count">{likeCount}</span>
            </button>
            <button onClick={() => toggleScrape(index, postId)} className="icon-button">
              <FontAwesomeIcon icon={scraped ? solidBookmark : regularBookmark} className="fa-bookmark" />
              <span className="scrape-count">{scrapeCount}</span>
            </button>
          </div>
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
        <div className="card-footer">
          <button className="details-button" onClick={onViewDetails}>자세히 보기</button>
        </div>
      </div>
    </div>
  );
};

export default Reference;