import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Appbar from './dashboard/AppBar.jsx';
import { Box, Container, Typography, Card, CardContent, CardMedia, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import './css/Main.css'; // Main.css 파일 import
import { useLocation } from 'react-router-dom';

const sampleTeams = [
    { id: 1, name: '000 교수님 팀', members: 28 },
    { id: 2, name: '000 교수님 팀', members: 28 },
    { id: 3, name: '000 교수님 팀', members: 28 }
];

const sampleHotPosts = [
    { id: 1, title: '오늘 폼 미친 팀모임 ㅊㅋㅊㅋ', likes: 120 },
    { id: 2, title: '오늘 폼 미친 팀모임 ㅊㅋㅊㅋ', likes: 120 },
    { id: 3, title: '오늘 폼 미친 팀모임 ㅊㅋㅊㅋ', likes: 120 }
];

const samplePosts = [
    {
        id: 1,
        author: '이민서',
        team: '최희열 교수님 팀',
        content: '오늘 나비 폼 미쳤다 ㅜㅜ\n오늘 팀모임하는데 오더라\n개귀여움',
        images: [
            'https://storage.googleapis.com/raonz_post_image/cat.jpg',
            'https://storage.googleapis.com/raonz_post_image/cat.jpg'
        ],
        likes: 32,
        comments: [
            { id: 1, author: 'Elon Musk', text: '도랏네 ;' },
            { id: 2, author: 'Shaan Alam', text: 'ㅋㅋㅋ' }
        ]
    },
    // 다른 게시물 데이터 추가
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Main() {
  const [openCreate, setOpenCreate] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
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
      navigate('/', { replace: true });
      return;
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
  }, [navigate, query]);

  // Function to fetch posts from the database
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://your-api-endpoint.com/posts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPosts(response.data);
      setLoading(false); // 데이터 로드가 완료되면 로딩 상태를 false로 설정
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    setPosts(samplePosts);
    setLoading(false); // 샘플 데이터를 설정한 후 로딩 상태를 false로 설정
  }, []);

  const name = localStorage.getItem('name');

  return (
    <Container className="main-container">
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <Box className="content-container">
        {loading ? ( // 로딩 중일 때 로딩 메시지 표시
          <Typography variant="h6">Loading...</Typography>
        ) : posts.length > 0 ? ( // 데이터가 로드된 후에만 posts.map을 호출
          <Box className="posts-container">
            {posts.map((post) => (
              <Card key={post.id} className="post-card">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar src="/path/to/avatar.jpg" />
                    <Typography variant="h6" component="div" ml={2}>{post.author}</Typography>
                    <Typography variant="body2" color="textSecondary" ml={2}>{post.team}</Typography>
                  </Box>
                  <Typography variant="body1" component="p">{post.content}</Typography>
                  <Box className="post-images">
                    {post.images.map((image, index) => (
                      <CardMedia key={index} component="img" image={image} className="post-image" />
                    ))}
                  </Box>
                  <Box display="flex" alignItems="center" mt={2}>
                    <IconButton>
                      <FavoriteIcon color="error" />
                    </IconButton>
                    <Typography variant="body2">{post.likes}</Typography>
                    <IconButton>
                      <CommentIcon color="primary" />
                    </IconButton>
                  </Box>
                  <List>
                    {post.comments.map((comment) => (
                      <ListItem key={comment.id}>
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={comment.author} secondary={comment.text} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="h6">No posts available</Typography>
        )}
        <Box className="sidebar">
          <Paper className="sidebar-section">
            <Typography variant="h6">Best Team</Typography>
            <List>
              {sampleTeams.map((team) => (
                <ListItem key={team.id}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={team.name} secondary={`${team.members} members`} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper className="sidebar-section">
            <Typography variant="h6">Hot Posting</Typography>
            <List>
              {sampleHotPosts.map((post) => (
                <ListItem key={post.id}>
                  <ListItemText primary={post.title} secondary={`${post.likes} likes`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}