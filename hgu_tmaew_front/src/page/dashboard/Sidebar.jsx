import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser, faCamera, faFolder, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { IoHeartCircle } from 'react-icons/io5';
import { FaRankingStar } from 'react-icons/fa6';

export default function Sidebar({ toggleDrawer }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>RAONz</h1>
                <button className="back-button" onClick={toggleDrawer}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
            </div>
            <div className="sidebar-menu">
                <NavLink to="/dashboard/main" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faHome} /></span>
                        Home
                    </div>
                </NavLink>
                <NavLink to="/dashboard/myteam" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faUsers} /></span>
                        <div className="menu-item-content">
                            My Team
                            <span className="menu-subtext">최희열 교수님팀</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/profile" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faUser} /></span>
                        Mypage
                    </div>
                </NavLink>
                <NavLink to="/dashboard/ranking" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><FaRankingStar /></span>
                        Ranking Page
                    </div>
                </NavLink>
                <NavLink to="/dashboard/teammatch" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><IoHeartCircle /></span>
                        Teem Meeting Match
                    </div>
                </NavLink>
                <NavLink to="/dashboard/photo" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faCamera} /></span>
                        Photo studio
                    </div>
                </NavLink>
                <NavLink to="/dashboard/library" className="menu-link" activeClassName="active">
                    <div className="menu-item">
                        <span className="menu-icon"><FontAwesomeIcon icon={faFolder} /></span>
                        Reference library
                    </div>
                </NavLink>
            </div>
            <div className="sidebar-communities">
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
            </div>
        </div>
    );
}
