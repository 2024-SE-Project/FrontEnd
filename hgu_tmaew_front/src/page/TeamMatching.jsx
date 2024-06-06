import React, { useState } from 'react';
import { Container, Box, Typography, Card, CardContent, CardMedia, Button, IconButton, TextField, Avatar, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import '../page/css/TeamMatching.css';

export default function TeamMatching() {
    const sampleTeams = [
        {
            id: 1,
            name: '피구하실래요?',
            description: '24-1 학기 남재창 교수님 팀 입니다. 우리팀은 외부활동을 좋아하며 수많은 인재들이 있습니다.',
            image: 'https://storage.googleapis.com/raonz_post_image/cat.jpg',
            members: 28,
            date: '14주차 수요일 (6월5일)',
            status: '미정'
        },
        {
            id: 2,
            name: '피구하실래요?',
            description: '24-1 학기 남재창 교수님 팀 입니다. 우리팀은 외부활동을 좋아하며 수많은 인재들이 있습니다.',
            image: 'https://storage.googleapis.com/raonz_post_image/cat2.jpg',
            members: 28,
            date: '14주차 수요일 (6월5일)',
            status: '확정'
        }
    ];

    const sampleMatches = [
        { text: '000 교수님 팀이 팀모임을 신청하였습니다.', date: '28 members', status: '미확정' },
        { text: '000 교수님 팀이 팀모임을 거부하였습니다.', date: '28 members', status: '확정' },
        { text: '000 교수님 팀이 팀모임을 거부하였습니다.', date: '28 members', status: '확정' }
    ];

    const [teams, setTeams] = useState(sampleTeams);
    const [matches, setMatches] = useState(sampleMatches);
    const [selectedFilter, setSelectedFilter] = useState('정확도순');

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <Container className="team-matching-container">
            <Box className="search-bar">
                <IconButton className="search-icon">
                    <SearchIcon />
                </IconButton>
                <TextField
                    className="search-input"
                    placeholder="원하는 팀 혹은 활동을 입력해주세요."
                    variant="outlined"
                    fullWidth
                />
            </Box>

            <Box className="tm-filters">
                <Button
                    variant="contained"
                    className={`tm-filter-button ${selectedFilter === '정확도순' ? 'selected' : ''}`}
                    onClick={() => handleFilterChange('정확도순')}
                >
                    정확도순
                </Button>
                <Button
                    variant="contained"
                    className={`tm-filter-button ${selectedFilter === '최신순' ? 'selected' : ''}`}
                    onClick={() => handleFilterChange('최신순')}
                >
                    최신순
                </Button>
            </Box>

            <div className="TM-team-content">
                <Box className="left">
                    <Box className="my-team-section">
                        <Card className="my-team-card">
                            <CardContent>
                                <Typography variant="h6" component="div">My Team</Typography>
                                <CardMedia
                                    component="img"
                                    image="https://storage.googleapis.com/raonz_post_image/cat5.jpg"
                                    className="my-team-photo"
                                />
                                <Typography variant="h6" component="div">최희열 교수님 팀</Typography>
                                <Typography variant="body1" component="p">
                                    24-1 학기 최희열 교수님 팀 입니다. 우리팀은 외부활동을 좋아하며 수많은 인재들이 있습니다.
                                </Typography>
                                <Button variant="contained" color="primary" className="detail-button">자세히보기</Button>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box className="matching-section">
                        <Typography variant="h6" component="div">Matching</Typography>
                        {matches.map((match, index) => (
                            <Card key={index} className="match-card">
                                <CardContent>
                                    <Typography variant="body2" component="p">{match.text}</Typography>
                                    <Typography variant="body2" component="p">{match.date}</Typography>
                                    <Typography variant="body2" component="p">{match.status}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>

                <Box className="right">
                    <Box className="team-list">
                        {teams.map((team) => (
                            <Card key={team.id} className="team-card">
                                <CardContent>
                                    <CardMedia
                                        component="img"
                                        image={team.image}
                                        className="team-photo"
                                    />
                                    <Typography variant="h6" component="div">{team.name}</Typography>
                                    <Typography variant="body1" component="p">{team.description}</Typography>
                                    <Box className="team-info">
                                        <Typography variant="body2" component="p">{team.members} members</Typography>
                                        <Typography variant="body2" component="p">Date: {team.date}</Typography>
                                        <Typography variant="body2" component="p">Status: {team.status}</Typography>
                                    </Box>
                                    <Box className="team-actions">
                                        <Button variant="contained" color="primary" className="detail-button">자세히보기</Button>
                                        <Button variant="contained" color="secondary" className="apply-button">팀모임 신청하기</Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </div>

            <IconButton className="tm-floating-button">
                팀모임 매칭 작성하기
            </IconButton>
        </Container>
    );
}
