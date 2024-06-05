import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Reference.css';
import FilterIcon from '../assets/filter_icon.svg'; // 필터 아이콘 SVG 경로 설정
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';

import DialogTag from './dialog/RefDialogTag.js';
import {
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableHead
} from '@mui/material';
import Iconify from '../assets/iconify';
import Scrollbar from '../assets/scrollbar';
import { useLocation } from 'react-router-dom';

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
      setPostData(response.data); // 응답 데이터에 맞게 설정하세요
    } catch (error) {
      console.error('Error fetching data:', error);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = async (row) => {
    setOpenCreate(false);
    await fetchData(); // 게시물 추가 후 데이터 다시 가져오기
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
        await fetchData(); // 좋아요 토글 후 데이터 다시 가져오기
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
        console.log('Response:', response.data);
        await fetchData();
      } else {
        console.error('Unexpected response format:', response);
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
              key={index}
              index={index}
              {...data}
              toggleLike={toggleLike}
              toggleScrape={toggleScrape}
            />
          ))}
        </section>
      </main>
      <NavLink to="/dashboard/addpost" className={`floating-button ${isScrolled ? 'h_event2' : ''}`} activeClassName="active">
          <div className="">
              <span className="menu-icon">게시물작성하기</span>
          </div>
      </NavLink>
      
      {openCreate && (
        <DialogTag
          open={openCreate}
          title={'추가하기'}
          onClose={handleCloseCreate}
        />
      )}
    </div>
  );
};

const Card = ({ postId, title, content, like, scraped, index, toggleLike, toggleScrape }) => {
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
            </button>
            <button onClick={() => toggleScrape(index, postId)} className="icon-button">
              <FontAwesomeIcon icon={scraped ? solidBookmark : regularBookmark} className="fa-bookmark" />
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
