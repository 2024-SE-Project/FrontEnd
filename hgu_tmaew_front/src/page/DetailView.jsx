import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './css/DetailView.css'; // Ensure to create and import this CSS file

export default function DetailView() {
    const location = useLocation();
    const { state: row } = location;

    const [likeCount, setLikeCount] = useState(32); // Initial like count
    const [liked, setLiked] = useState(false); // Initial liked state

    const handleLikeClick = () => {
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setLiked(!liked);
    };

    return (
        <Container className="detail-view">
            <Card className="content-card">
                <CardHeader
                    avatar={<Avatar src="/path/to/avatar.jpg" />} // Replace with actual avatar path
                    title="You"
                    subheader="최희열 교수님 팀"
                />
                <CardContent>
                    {row ? (
                        <>
                            <Typography variant="body1" gutterBottom>
                                {row.contents}
                            </Typography>
                            <Box className="image-container">
                                {/* <img src="/path/to/image1.jpg" alt="content" className="content-image" /> Replace with actual image paths */}
                                {/* <img src="/path/to/image2.jpg" alt="content" className="content-image" /> */}
                            </Box>
                            <Box className="action-icons">
                                <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="bookmark">
                                    <BookmarkIcon />
                                </IconButton>
                                <IconButton aria-label="send">
                                    <SendIcon />
                                </IconButton>
                                <Box className="like-section">
                                    <IconButton aria-label="like" onClick={handleLikeClick}>
                                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                    <Typography variant="body2" className="like-count">
                                        {likeCount}
                                    </Typography>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="h6">No data available</Typography>
                    )}
                </CardContent>
            </Card>
            <Card className="comments-card">
                <CardHeader title="Comments" />
                <CardContent>
                    <Box className="comment">
                        <Avatar src="/path/to/avatar1.jpg" /> {/* Replace with actual avatar path */}
                        <Box className="comment-text">
                            <Typography variant="body2">
                                <strong>Elon Musk</strong> 도망쳐!
                            </Typography>
                            <Box className="comment-actions">
                                <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="reply">
                                    <CommentIcon />
                                </IconButton>
                                <Typography variant="body2" className="time-stamp">30 secs ago</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="comment reply">
                        <Avatar src="/path/to/avatar2.jpg" /> {/* Replace with actual avatar path */}
                        <Box className="comment-text">
                            <Typography variant="body2">
                                <strong>Shawon Alam</strong> ㅋㅋ ㅇㅈ
                            </Typography>
                            <Box className="comment-actions">
                                <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <Typography variant="body2" className="time-stamp">20 secs ago</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="comment">
                        <Avatar src="/path/to/avatar1.jpg" /> {/* Replace with actual avatar path */}
                        <Box className="comment-text">
                            <Typography variant="body2">
                                <strong>Elon Musk</strong> 도망쳐!
                            </Typography>
                            <Box className="comment-actions">
                                <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <Typography variant="body2" className="time-stamp">20 secs ago</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}