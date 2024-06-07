import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const query = useQuery();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const handleClick = (event, post) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://likelion.info:443/post/delete/${selectedPost.postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.postId !== selectedPost.postId));
      setOpenDeleteDialog(false);
      handleClose();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleAddComment = (postId) => {
    if (comment.trim()) {
      console.log(`Adding comment: ${comment} for postId: ${postId}`);
      setComment('');
      // Add logic to send comment to server
    }
  };

  const toggleLike = async (index, postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      let response;
      if (posts[index].like) {
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
        const updatedPosts = [...posts];
        updatedPosts[index].like = !updatedPosts[index].like;
        updatedPosts[index].likeCount += updatedPosts[index].like ? 1 : -1;
        setPosts(updatedPosts);
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
      if (posts[index].scraped) {
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
        const updatedPosts = [...posts];
        updatedPosts[index].scraped = !updatedPosts[index].scraped;
        updatedPosts[index].scrapeCount += updatedPosts[index].scraped ? 1 : -1;
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error toggling scrape:', error);
    }
  };

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

    const fetchUserData = () => {
      axios.get('https://likelion.info:443/mypage', {
        headers: { Authorization: `Bearer ${storedToken}` },
        withCredentials: true
      })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/', { replace: true });
      });
    };

    const fetchPosts = () => {
      axios.get('https://likelion.info:443/post/get/all/1', {
        headers: { Authorization: `Bearer ${storedToken}` },
        withCredentials: true
      })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        navigate('/', { replace: true });
      });
    };

    fetchUserData();
    fetchPosts();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container className="main-container">
      <Helmet>
        <title>Main Page</title>
      </Helmet>

      <Box className="content-container">
        <Box className="posts-container">
          {Array.isArray(posts) && posts.map((post, index) => (
            <Card key={post.postId} className="post-card">
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src="/path/to/avatar.jpg" />
                  {post.userDto && (
                    <>
                      <Typography variant="h6" component="div" ml={2}>{post.userDto.name}</Typography>
                      <Typography variant="body2" color="textSecondary" ml={2}>{post.team}</Typography>
                    </>
                  )}
                  <IconButton style={{ marginLeft: 'auto' }} onClick={(e) => handleClick(e, post)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" component="p" style={{ fontWeight: 'bold' }}>{post.title}</Typography>

                <Typography variant="body1" component="p">{post.content}</Typography>

                <Box className="post-images" style={{ display: 'flex', overflowX: 'auto' }}>
                  {Array.isArray(post.postFileDtoList) && post.postFileDtoList.map((image, index) => (
                    <CardMedia key={index} component="img" image={image.imageUrl} className="post-image" style={{ marginRight: '8px', width: '200px' }} />
                  ))}
                </Box>

                <Box display="flex" alignItems="center" mt={2}>
                  <IconButton onClick={() => toggleLike(index, post.postId)}>
                    <FavoriteIcon color={post.like ? "error" : "default"} />
                  </IconButton>
                  <Typography variant="body2">{post.likeCount}</Typography>
                  <IconButton onClick={() => toggleScrape(index, post.postId)}>
                    <BookmarkIcon color={post.scraped ? "primary" : "default"} />
                  </IconButton>
                  <Typography variant="body2">{post.scrapeCount}</Typography>
                  <IconButton>
                    <ShareIcon color="primary" />
                  </IconButton>
                </Box>

                <List>
                  {Array.isArray(post.commentList) && post.commentList.map((comment) => (
                    <ListItem key={comment.id}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary={comment.name} secondary={comment.contents} />
                    </ListItem>
                  ))}
                </List>

                <Box display="flex" alignItems="center" mt={2}>
                  <TextField
                    label="댓글 작성"
                    variant="outlined"
                    size="small"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                  />
                  <Button variant="contained" color="primary" onClick={() => handleAddComment(post.postId)}>등록</Button>
                </Box>
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

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate(`/dashboard/edit-post/${selectedPost?.postId}`)}>수정하기</MenuItem>
          <MenuItem onClick={() => setOpenDeleteDialog(true)}>삭제하기</MenuItem>
        </Menu>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>게시물 삭제</DialogTitle>
          <DialogContent>
            <DialogContentText>정말로 이 게시물을 삭제하시겠습니까?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">취소</Button>
            <Button onClick={handleDelete} color="secondary">삭제</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
