import React, { useState } from 'react';
import './css/Reference.css';
import FilterIcon from '../assets/filter_icon.svg'; // 필터 아이콘 SVG 경로 설정
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart, faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';


const Reference = () => {
  const initialCardData = [
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat.jpg",
      date: "1 month ago",
      title: "가족주차에 하면 좋은 활동 리스트들",
      content: "가족 주차에... [내용 요약]",
      hashtags: ["#가족주차", "#힐링", "#키워드"],
      isLike: true,
      isScraped: false,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat1.jpg",
      date: "2 weeks ago",
      title: "산악 등반 시 유의할 점",
      content: "산악 등반을 할 때 알아두면 좋은 정보와 주의사항을 제공합니다.",
      hashtags: ["#등산", "#안전", "#자연"],
      isLike: true,
      isScraped: false,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat2.jpg",
      date: "3 days ago",
      title: "해변에서 즐길 수 있는 액티비티",
      content: "해변에서 즐길 수 있는 다양한 액티비티와 준비물을 소개합니다.",
      hashtags: ["#해변", "#여름", "#액티비티"],
      isLike: true,
      isScraped: false,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat3.jpg",
      date: "1 week ago",
      title: "도시 탐방 가이드",
      content: "도시에서 방문할 만한 명소와 맛집을 추천합니다.",
      hashtags: ["#도시", "#탐방", "#가이드"],
      isLike: false,
      isScraped: true,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat4.jpg",
      date: "2 weeks ago",
      title: "산악 등반 시 유의할 점",
      content: "산악 등반을 할 때 알아두면 좋은 정보와 주의사항을 제공합니다.",
      hashtags: ["#등산", "#안전", "#자연"],
      isLike: false,
      isScraped: true,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat5.jpg",
      date: "3 days ago",
      title: "해변에서 즐길 수 있는 액티비티",
      content: "해변에서 즐길 수 있는 다양한 액티비티와 준비물을 소개합니다.",
      hashtags: ["#해변", "#여름", "#액티비티"],
      isLike: false,
      isScraped: true,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat6.jpg",
      date: "1 week ago",
      title: "도시 탐방 가이드",
      content: "도시에서 방문할 만한 명소와 맛집을 추천합니다.",
      hashtags: ["#도시", "#탐방", "#가이드"],
      isLike: false,
      isScraped: true,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat10.jpg",
      date: "2 weeks ago",
      title: "산악 등반 시 유의할 점",
      content: "산악 등반을 할 때 알아두면 좋은 정보와 주의사항을 제공합니다.",
      hashtags: ["#등산", "#안전", "#자연"],
      isLike: false,
      isScraped: true,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat8.jpg",
      date: "3 days ago",
      title: "해변에서 즐길 수 있는 액티비티",
      content: "해변에서 즐길 수 있는 다양한 액티비티와 준비물을 소개합니다.",
      hashtags: ["#해변", "#여름", "#액티비티"],
      isLike: false,
      isScraped: true,
    },
    {
      image: "https://storage.googleapis.com/raonz_post_image/cat9.jpg",
      date: "1 week ago",
      title: "도시 탐방 가이드",
      content: "도시에서 방문할 만한 명소와 맛집을 추천합니다.",
      hashtags: ["#도시", "#탐방", "#가이드"],
      isLike: false,
      isScraped: true,
    },
    // 필요한 만큼의 카드 데이터를 추가합니다.
  ];

const [cardData, setCardData] = useState(initialCardData);

const toggleLike = (index) => {
  const newCardData = [...cardData];
  newCardData[index].isLike = !newCardData[index].isLike;
  setCardData(newCardData);
};

const toggleScrape = (index) => {
  const newCardData = [...cardData];
  newCardData[index].isScraped = !newCardData[index].isScraped;
  setCardData(newCardData);
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
        {cardData.map((data, index) => (
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
      
    </div>
  );
};

const Card = ({ image, date, title, content, hashtags, isLike, isScraped, index, toggleLike, toggleScrape }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={image} alt="Road" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <p>{date}</p>
          <div className="card-icons">
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
          <div className="hashtags">
            {hashtags.map((tag, index) => (
              <span key={index}>{tag} </span>
            ))}
          </div>
          <button className="details-button">자세히보기</button>
        </div>
      </div>
    </div>
  );
};


export default Reference;
