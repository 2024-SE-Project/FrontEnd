import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Card, CardContent, CardMedia, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import '../page/css/Main.css';

const sampleTeams = [
    { id: 1, name: '000 교수님 팀', members: 28, image: 'https://storage.googleapis.com/raonz_post_image/cat.jpg' },
    { id: 2, name: '000 교수님 팀', members: 28, image: 'https://storage.googleapis.com/raonz_post_image/cat.jpg' },
    { id: 3, name: '000 교수님 팀', members: 28, image: 'https://storage.googleapis.com/raonz_post_image/cat.jpg' }
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
    const [posts, setPosts] = useState(samplePosts);
    const query = useQuery();
    const [isScrolled, setIsScrolled] = useState(false);
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

    return (
      <Container className="main-container">
        <Helmet>
          <title>Main Page</title>
        </Helmet>
          
        <Box className="content-container">
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

                <Box className="main-sidebar">
                    <Paper className="sidebar-section">
                        <Typography variant="h6">Best Team</Typography>
                        <List>
                            {sampleTeams.map((team) => (
                                <ListItem key={team.id}>
                                    <ListItemAvatar>
                                        <Avatar src={team.image} />
                                    </ListItemAvatar>
                                    <ListItemText primary={team.name} secondary={`${team.members} members`} />
                                    <Button variant="outlined" size="small">Follow</Button>
                                </ListItem>
                            ))}
                        </List>
                        <Button variant="text">See more...</Button>
                    </Paper>
                    <Paper className="sidebar-section">
                        <Typography variant="h6">Hot Posting</Typography>
                        <List>
                            {sampleHotPosts.map((post) => (
                                <ListItem key={post.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FavoriteIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={post.title} secondary={`${post.likes} likes`} />
                                </ListItem>
                            ))}
                        </List>
                        <Button variant="text">See more...</Button>
                    </Paper>
                </Box>
        </Box>

      </Container>
    );
}
