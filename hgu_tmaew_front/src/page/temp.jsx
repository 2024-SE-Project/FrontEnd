import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Appbar from './dashboard/AppBar.jsx';

export default function Temp() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        const token = query.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/temp', { replace: true });
            return; // 무한 루프 방지
        }

        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/login', { replace: true });
            return;
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://likelion.info:443/mypage', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    },
                    withCredentials: true
                });
                setUserInfo(response.data);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('email', response.data.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login', { replace: true });
            }
        };

        const name = localStorage.getItem('name');
        if (!name) {
            fetchUserInfo();
        } else {
            setUserInfo({ name });
        }

        window.addEventListener('scroll', handleScroll);
        navigate("/dashboard/main");

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [navigate, query]);

    return (
        <>
            <Appbar userInfo={userInfo} />
            <div>
                {/* Your component content */}
            </div>
        </>
    );
}