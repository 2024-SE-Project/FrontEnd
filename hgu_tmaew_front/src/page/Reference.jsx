import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './css/Reference.css';
import FilterIcon from '../assets/filter_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import DialogTag from './dialog/RefDialogTag.js';
import FilterDialog from './dialog/FilterDialog.jsx';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Logo from '../assets/logo_white.svg'; // 로고 이미지

const DEFAULT_IMAGE_URL = Logo;

const Reference = () => {
  const [postData, setPostData] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openCreate, setOpenCreate] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // 한 페이지에 보여줄 카드의 수

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredPostData.slice(indexOfFirstCard, indexOfLastCard);

  // 페이지를 변경하는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 페이지네이션을 위한 버튼을 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPostData.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

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
    setCurrentPage(1); // 검색 시 페이지를 첫 페이지로 리셋
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOpenDetails = (post) => {
    setSelectedPost(post);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedPost(null);
  };

  return (
    <div className="ref-reference-container">
      <main className="ref-reference-main">
        <div className="ref-search-bar">
          <button className="ref-filter-button" onClick={() => setOpenFilter(true)}>
            <img src={FilterIcon} alt="Filter" />
          </button>
          <input
            type="text"
            placeholder="찾고 싶은 자료를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="ref-search-button" onClick={handleSearch}>🔍</button>
        </div>
        <nav className="ref-reference-nav">
          <button className="ref-nav-button">전체 자료</button>
          <button className="ref-nav-button">올해 자료</button>
          <button className="ref-nav-button">내 팀 자료</button>
        </nav>
        <section className="ref-reference-content">
          {currentCards.map((data, index) => {
            const imageUrl = data.postFileDtoList && data.postFileDtoList.length > 0 && data.postFileDtoList[0].imageUrl
              ? data.postFileDtoList[0].imageUrl
              : DEFAULT_IMAGE_URL;
              console.log("Image URL for post", data.postId, ":", imageUrl); // 이미지 URL 로그 출력
            return (
              <Card
                key={data.postId}
                index={index + indexOfFirstCard} // 전체 인덱스를 넘겨줍니다.
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
                onViewDetails={() => handleOpenDetails(data)}
              />
            );
          })}
        </section>
        <div className="pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className="page-number">
              {number}
            </button>
          ))}
        </div>
      </main>
      <NavLink
        to="/dashboard/addpost"
        className={`ref-floating-button ${isScrolled ? 'h_event2' : ''}`}
      >
        <div>
          <span className="ref-menu-icon">게시물 작성하기</span>
        </div>
      </NavLink>
      {selectedPost && (
        <Dialog open={openDetails} onClose={handleCloseDetails} maxWidth="md" fullWidth>
          <DialogTitle className="ref-dialog-title">
            <IconButton
              aria-label="close"
              onClick={handleCloseDetails}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers className="ref-dialog-content">
            <h3 className="ref-dialog-title-text">{selectedPost.title}</h3>
            <div className="ref-dialog-image-container">
              {selectedPost.postFileDtoList && selectedPost.postFileDtoList.length > 0 ? (
                selectedPost.postFileDtoList.map((file, index) => (
                  <img
                    key={index}
                    src={file.imageUrl}
                    alt={`Post file ${index}`}
                    className="dialog-image"
                  />
                ))
              ) : (
                <img src={DEFAULT_IMAGE_URL} alt="Post" className="dialog-image" />
              )}
            </div>
            <p className="ref-dialog-content-text">{selectedPost.content}</p>
            <div className="ref-dialog-like-scrape">
              <FavoriteIcon className="ref-dialog-icon" color={selectedPost.like ? 'error' : 'inherit'} />
              <span>{selectedPost.likeCount}</span>
              <BookmarkIcon className="ref-dialog-icon" color={selectedPost.scraped ? 'primary' : 'inherit'} />
              <span>{selectedPost.scrapeCount}</span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetails} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <FilterDialog open={openFilter} onClose={() => setOpenFilter(false)} />
    </div>
  );
};

const Card = ({
  index,
  postId,
  title,
  content,
  imageUrl,
  like,
  scraped,
  likeCount,
  scrapeCount,
  toggleLike,
  toggleScrape,
  onViewDetails,
}) => {
  return (
    <div className="ref-reference-card">
      <div className="ref-image-wrapper" onClick={onViewDetails}>
        <img src={imageUrl} alt={title} className="ref-reference-card-image" />
      </div>
      <div className="ref-reference-card-content">
        <h3 className="ref-reference-card-title" onClick={onViewDetails}>{title}</h3>
        <p className="ref-reference-card-description" onClick={onViewDetails}>{content}</p>
        <div className="ref-reference-card-actions">
          <div className="ref-like-scrape-buttons">
            <button
              className="ref-like-button"
              onClick={() => toggleLike(index, postId)}
            >
              <FontAwesomeIcon
                icon={like ? solidHeart : regularHeart}
                className={`ref-icon ${like ? 'liked' : ''}`}
              />
              <span>{likeCount}</span>
            </button>
            <button
              className="ref-scrape-button"
              onClick={() => toggleScrape(index, postId)}
            >
              <FontAwesomeIcon
                icon={scraped ? solidBookmark : regularBookmark}
                className={`ref-icon ${scraped ? 'scraped' : ''}`}
              />
              <span>{scrapeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reference;
