import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Appbar from './dashboard/AppBar.jsx';
import MainContent from './main/MainContent.jsx';
import { Stack, Button, Container, Typography } from '@mui/material';
import './css/Main.css'; // Main.css 파일 import
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Main() {
  const [openCreate, setOpenCreate] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [posts, setPosts] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard/main', { replace: true });
    }
    const storedToken = localStorage.getItem('token');

    if (storedToken == null) {
      return () => {
        console.log('Error fetching user data');
        navigate('/', { replace: true });
      };
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    const name = localStorage.getItem('name');

    if (name == null) {
      axios
        .get('https://likelion.info:443/mypage', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          },
          withCredentials: true
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          navigate('/', { replace: true });
        });
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to fetch posts from the database
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://your-api-endpoint.com/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Load sample data and fetch posts from the database
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        author: '이민서',
        team: '최희열 교수님 팀',
        content: '오늘 나비 행 미쳤다 ㅜㅜ\n오늘 팀모임하는데 오더라\n개귀여움',
        images: [
          'https://storage.googleapis.com/raonz_post_image/cat.jpg',
          'https://storage.googleapis.com/raonz_post_image/cat.jpg'
        ],
        likes: 32,
        comments: [
          { id: 1, author: 'Elon Musk', text: '도랏네 ;' },
          { id: 2, author: 'Shaan Alam', text: 'ㅋㅋㅋ' },
          { id: 3, author: 'Elon Musk', text: '도랏네 ;' }
        ]
      },
      {
        id: 2,
        author: '마석재',
        team: '고윤민 교수님 팀',
        content: '오늘 새로운 AI 모델을 테스트했어요!\n결과가 정말 놀라웠어요.',
        images: [
          'https://previews.123rf.com/images/aratehortua/aratehortua1904/aratehortua190400476/123613752-%EB%B2%A1%ED%84%B0-%EB%A7%8C%ED%99%94-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%BA%90%EB%A6%AD%ED%84%B0-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD.jpg',
          'https://previews.123rf.com/images/aratehortua/aratehortua1904/aratehortua190400476/123613752-%EB%B2%A1%ED%84%B0-%EB%A7%8C%ED%99%94-%EA%B7%80%EC%97%AC%EC%9A%B4-%EC%BA%90%EB%A6%AD%ED%84%B0-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD.jpg'
        ],
        likes: 45,
        comments: [
          { id: 1, author: 'John Smith', text: '대단하네요!' },
          { id: 2, author: 'Alice', text: '어떻게 그런 결과가 나왔어요?' }
        ]
      },
      {
        id: 3,
        author: '장세창',
        team: '남재창 교수님 팀',
        content: '오늘 데이터 시각화 작업을 했습니다.\n이런 결과가 나올 줄이야!',
        images: [
          'https://thumb.photo-ac.com/a1/a13a4adc8bb0db6aab2cc40bfbf376b5_t.jpeg',
          'https://thumb.photo-ac.com/a1/a13a4adc8bb0db6aab2cc40bfbf376b5_t.jpeg'
        ],
        likes: 28,
        comments: [
          { id: 1, author: 'Jane Doe', text: '굉장해요!' },
          { id: 2, author: 'Bob', text: '더 자세히 알고 싶어요.' }
        ]
      },
      {
        id: 4,
        author: '김동규',
        team: '김인중 교수님 팀',
        content: '오늘 로봇 팔의 새로운 기능을 시연했습니다.\n정말 놀라운 기술!',
        images: [
          'https://thumb.photo-ac.com/a1/a13a4adc8bb0db6aab2cc40bfbf376b5_t.jpeg',
          'https://thumb.photo-ac.com/a1/a13a4adc8bb0db6aab2cc40bfbf376b5_t.jpeg'
        ],
        likes: 54,
        comments: [
          { id: 1, author: 'Elon Musk', text: '멋진데요!' },
          { id: 2, author: 'Jane Doe', text: '정말 인상적이에요.' }
        ]
      },
      {
        id: 5,
        author: '최준혁',
        team: '용환기 교수님 팀',
        content: '오늘 새로운 웹 애플리케이션을 출시했어요.\n모두 한번 사용해보세요!',
        images: [
          'https://thumb.photo-ac.com/a1/a13a4adc8bb0db6aab2cc40bfbf376b5_t.jpeg',
          'https://thumb.photo-ac.com/a1/a13a4adc8bb0db6aab2cc40bfbf376b5_t.jpeg'
        ],
        likes: 67,
        comments: [
          { id: 1, author: 'John Smith', text: '정말 유용해요!' },
          { id: 2, author: 'Alice', text: '잘 만들었어요.' }
        ]
      }
    ];

    // Set sample posts initially
    setPosts(samplePosts);

    // Fetch posts from the database
    fetchPosts();
  }, []);

  const name = localStorage.getItem('name');
  return (
    <>
      <header className="home-header"></header>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Container className="container">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            안녕하세요, {name ? name : 'Guest'}님
          </Typography>
        </Stack>
      </Container>
      <div className="profile-page">
        <MainContent posts={posts} />
      </div>
    </>
  );
}