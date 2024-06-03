import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import DialogTag from './dialog/DialogTag.js';
import Logo from '../assets/logo.svg';
import axios from 'axios';
import Appbar from './dashboard/AppBar.jsx';
// import Cookies from 'js-cookie';
import {
    Card,
    Table,
    Stack,
    Paper,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableHead
} from '@mui/material';
import Iconify from '../assets/iconify';
import Scrollbar from '../assets/scrollbar';
import './css/Main.css'; // Main.css 파일 import
import { useLocation } from 'react-router-dom';

const TABLE_HEAD = [
    { id: 'part', label: '분류', alignRight: false },
    { id: 'title', label: '제목', alignRight: false },
    { id: 'contents', label: '소개', alignRight: false },
    { id: 'fun', label: '재미', alignRight: false },
    { id: 'writer', label: '작성자', alignRight: false },
];

const initialData = [
    { part: '분류1', title: '제목1', contents: '소개1', fun: '재미1', writer: '작성자1' },
    { part: '분류2', title: '제목2', contents: '소개2', fun: '재미2', writer: '작성자2' },
    { part: '분류3', title: '제목3', contents: '소개3', fun: '재미3', writer: '작성자3' },
    { part: '분류4', title: '제목4', contents: '소개4', fun: '재미4', writer: '작성자4' },
    { part: '분류5', title: '제목5', contents: '소개5', fun: '재미5', writer: '작성자5' },
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Main() {
    const [list, setContentsList] = useState(initialData);
    const [openCreate, setOpenCreate] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const query = useQuery();
    const history = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    
    // const toggleDrawer = () => {
    //     setIsDrawerOpen(!isDrawerOpen);
    // };

    useEffect(() => {

        const token = query.get('token');
        

        if(token) {
            localStorage.setItem("token", token);
            navigate('/dashboard/main', { replace: true });
            
        }
        const storedToken = localStorage.getItem('token');

        if(storedToken == null) {
            return () => {
                console.log('Error fetching user data');
                // 오류가 발생하면 메인 화면으로 리디렉션
                navigate('/', { replace: true });
            };
        }
        
        
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 0);
        };


        const name = localStorage.getItem('name');

        if(name == null) {
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
                // 오류가 발생하면 메인 화면으로 리디렉션
                navigate('/', { replace: true });
            });
        }

        
        



        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = (row) => {
        if (row) {
            setContentsList((prevList) => [...prevList, row]);
        }
        setOpenCreate(false);
    };

    const handleOpenEditDialog = (row) => {
        setEditRow(row);
    };

    const handleCloseEdit = (row) => {
        if (row) {
            setContentsList((prevList) =>
                prevList.map((item) => (item.title === row.title ? row : item))
            );
        }
        setEditRow(null);
    };

    const handleRowClick = (row) => {
        navigate('/dashboard/detail', { state: row });
    };

    const name = localStorage.getItem('name');
    return (
        <>
            <header className="home-header">
            </header>
            <Helmet>
                <title> Home </title>
            </Helmet>
            {/* <Appbar toggleDrawer={toggleDrawer} name={userInfo ? userInfo.name : 'Guest'} /> */}
            <Container className="container">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        안녕하세요, {name ? name : 'Guest'}님
                    </Typography>
                    <Button className={`addContentstButton ${isScrolled ? 'h_event2' : ''}`} onClick={handleClickOpenCreate}>
                        컨텐츠 공유하기
                    </Button>

                    {openCreate && (
                        <DialogTag
                            open={openCreate}
                            title={'추가하기'}
                            onClose={handleCloseCreate}
                        />
                    )}
                </Stack>

                <Card className="tableContainer">
                    <Scrollbar>
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    {TABLE_HEAD.map((headCell) => (
                                        <TableCell key={headCell.id} align='center'>
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row) => (
                                    <TableRow key={row.title} onClick={() => handleRowClick(row)}>
                                        <TableCell align='center'>{row.part}</TableCell>
                                        <TableCell align='center'>{row.title}</TableCell>
                                        <TableCell align='center'>{row.contents}</TableCell>
                                        <TableCell align='center'>{row.fun}</TableCell>
                                        <TableCell align='center'>{row.writer}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </Card>
            </Container>
            {editRow && (
                <DialogTag
                    open={!!editRow}
                    title={'수정하기'}
                    row={editRow}
                    onClose={handleCloseEdit}
                />
            )}
        </>
    );
}