import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Reference.css';
import FilterIcon from '../assets/filter_icon.svg'; // 필터 아이콘 SVG 경로 설정
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

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

const initialData = [
  {}
];

const Reference = () => {
  const [postData, setPostData] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const history = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
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

    fetchData();
  }, []);
  
  const handleClickOpenCreate = () => {
    setOpenCreate(true);
};

const handleCloseCreate = (row) => {
    // if (row) {
    //     setContentsList((prevList) => [...prevList, row]);
    // }
    setOpenCreate(false);
};

// const handleOpenEditDialog = (row) => {
//     setEditRow(row);
// };

// const handleCloseEdit = (row) => {
//     if (row) {
//         setContentsList((prevList) =>
//             prevList.map((item) => (item.title === row.title ? row : item))
//         );
//     }
//     setEditRow(null);
// };

const handleRowClick = (row) => {
    navigate('/dashboard/library/create', { state: row });
};

const toggleLike = (index) => {
  const newPostData = [...postData];
  newPostData[index].isLike = !newPostData[index].isLike;
  setPostData(newPostData);
};

const toggleScrape = (index) => {
  const newPostData = [...postData];
  newPostData[index].isScraped = !newPostData[index].isScraped;
  setPostData(newPostData);
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
      <button className={`floating-button ${isScrolled ? 'h_event2' : ''}`} onClick={handleClickOpenCreate}>
        게시물 작성하기
      </button>
      
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

const Card = ({  postFileDtoList, title, content, isLike, isScraped, index, toggleLike, toggleScrape }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src="https://storage.googleapis.com/raonz_post_image/cat8.jpg" alt="Road" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="card-icons">
            {/* {date} */}
            <button onClick={() => toggleLike(index)} className="icon-button">
              <FontAwesomeIcon icon={isLike ? solidHeart : regularHeart} className="fa-heart" />
            </button>
            <button onClick={() => toggleScrape(index)} className="icon-button">
              <FontAwesomeIcon icon={isScraped ? solidBookmark : regularBookmark} className="fa-bookmark" />
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
