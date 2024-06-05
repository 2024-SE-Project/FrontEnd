import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import DialogTag from './dialog/DialogTag.js';
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
    const query = useQuery();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = query.get('token');

        if (token) {
            localStorage.setItem("token", token);
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
            axios.get('https://likelion.info:443/mypage', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                },
                withCredentials: true
            })
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                navigate('/', { replace: true });
            });
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const name = localStorage.getItem('name');
    return (
        <>
            <header className="home-header"></header>
            <Helmet>
                <title> Home </title>
            </Helmet>
            <Container className="container">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        안녕하세요, {name ? name : 'Guest'}님
                    </Typography>
                </Stack>
            </Container>
            <div className="profile-page">
                <MainContent />
            </div>
        </>
    );
}
