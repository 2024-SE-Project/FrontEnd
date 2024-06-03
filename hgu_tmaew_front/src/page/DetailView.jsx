import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardHeader, Avatar, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios'; // Axios 라이브러리 추가
import './css/DetailView.css'; // Ensure to create and import this CSS file

export default function DetailView() {
    const location = useLocation();
    const { state: row } = location;

    const [contentData, setContentData] = useState(null); // 콘텐츠 데이터 상태 추가
    const [likeCount, setLikeCount] = useState(32); // Initial like count
    const [liked, setLiked] = useState(false); // Initial liked state

    // useEffect(() => {
    //     if (row && row.id) {
    //         // row 정보가 있을 때만 API 호출
    //         axios.get(`https://likelion.info:443/api/contents/${row.id}`)
    //             .then(response => {
    //                 setContentData(response.data); // 응답 데이터를 상태로 설정
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching content data:', error);
    //             });
    //     }
    // }, [row]);

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
                    {contentData ? (
                        <>
                            <Typography variant="body1" gutterBottom>
                                {contentData.contents}
                            </Typography>
                            <Box className="image-container">
                                {contentData.images && contentData.images.map((image, index) => (
                                    <img key={index} src={image} alt={`content-${index}`} className="content-image" />
                                ))}
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