import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Card, CardContent, CardMedia, Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import '../page/css/Main.css';

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

export default function Main() {
    const [posts, setPosts] = useState(samplePosts);

    return (
        <Container className="main-container">
            <Helmet>
                <title>Main Page</title>
            </Helmet>
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
        </Container>
    );
}
