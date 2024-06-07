import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser, faCamera, faFolder, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { IoHeartCircle } from 'react-icons/io5';
import { FaRankingStar } from 'react-icons/fa6';
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

export default function Sidebar({ toggleDrawer }) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                const response = await axios.get('https://likelion.info:443/my/team/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTeams(response.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>RAONz</h1>
                <button className="back-button" onClick={toggleDrawer}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
            </div>
            <div className="sidebar-menu">
                <NavLink 
                    to="/dashboard/main" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faHome} /></span>
                        Home
                    </div>
                </NavLink>
                <NavLink 
                    to="/dashboard/myteam" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faUsers} /></span>
                        <div className="menu-item-content">
                            My Team
                            {teams.length > 0 && (
                                <span className="menu-subtext">{teams[0].name}</span>
                            )}
                        </div>
                    </div>
                </NavLink>
                <NavLink 
                    to="/dashboard/profile" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faUser} /></span>
                        Mypage
                    </div>
                </NavLink>
                <NavLink 
                    to="/dashboard/ranking" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><FaRankingStar /></span>
                        Ranking Page
                    </div>
                </NavLink>
                <NavLink 
                    to="/dashboard/teammatch" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><IoHeartCircle /></span>
                        Team Meeting Match
                    </div>
                </NavLink>
                <NavLink 
                    to="/dashboard/photo" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faCamera} /></span>
                        Photo Studio
                    </div>
                </NavLink>
                <NavLink 
                    to="/dashboard/library" 
                    className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                >
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faFolder} /></span>
                        Reference Library
                    </div>
                </NavLink>
                <div className="menu-group">
                    <MdOutlineSubdirectoryArrowRight />
                    <NavLink 
                        to="/dashboard/addpost" 
                        className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
                    >
                        <div className="menu-item">
                            <span className="menu-icon"><FontAwesomeIcon icon={faFolder} /></span>
                            Upload Post
                        </div>
                    </NavLink>
                </div>
            </div>
            {teams.length > 0 && (
                <div className="sidebar-teams">
                    <h2>My Teams</h2>
                    {teams.map((team) => (
                        <div key={team.id} className="team-message">
                            <span className="team-icon">
                                <img src={team.imgURL} alt={team.name} />
                            </span>
                            <div className="team-text">
                                {team.name} <span className="team-time">{team.content}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* <div className="sidebar-communities">
                <h2>My Communities <span className="community-count">19</span></h2>
                <div className="community-message">
                    <span className="community-icon"><FontAwesomeIcon icon={faUser} /></span>
                    익명 1 <span className="message-time">16:08</span>
                    <span className="message-badge">5</span>
                </div>
                <div className="community-message">
                    <span className="community-icon"><FontAwesomeIcon icon={faUser} /></span>
                    익명 2 <span className="message-time">16:08</span>
                    <span className="message-badge">15</span>
                </div>
                <button className="see-all">See All</button>
            </div> */}
        </div>
    );
}
