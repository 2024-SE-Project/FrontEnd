import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Stack } from '@mui/material';

export default function DetailView() {
    const location = useLocation();
    const { part, title, contents, fun, writer, giveDate } = location.state;

    return (
        <Container>
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Stack spacing={2}>
                    <Typography variant="h4">{title}</Typography>
                    <Typography variant="h6">분류: {part}</Typography>
                    <Typography variant="body1">소개: {contents}</Typography>
                    <Typography variant="body1">재미: {fun}</Typography>
                    <Typography variant="body1">작성자: {writer}</Typography>
                    <Typography variant="body1">제공 일자: {giveDate}</Typography>
                </Stack>
            </Paper>
        </Container>
    );
}