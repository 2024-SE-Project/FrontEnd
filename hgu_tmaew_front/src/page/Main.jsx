import React from 'react';
import { Link } from 'react-router-dom';
import './css/Main.css';

const Main = () => {
    return (
        <div className="container">
            <aside className="sidebar">
                <button className="button">Home</button>
                <button className="button">My Team</button>
                <button className="button">Mypage</button>
                <button className="button">Ranking Page</button>
                <button className="button">Team Meeting Match</button>
                <button className="button">Photo studio</button>
                <button className="button">Reference library</button>
                <div className="community-section">
                    <h4>My Communities</h4>
                    <Link to="/community1">Community 1</Link>
                    <Link to="/community2">Community 2</Link>
                </div>
            </aside>
            <main className="content">
                <div className="profile">
                    <img src="/path/to/profile.png" alt="profile" />
                    <span>22100503번</span>
                </div>
                <div className="post">
                    <div className="post-top">
                        <h3>오늘 남비 넘 기엽다 또또 오늘 힐링하느데 도와줬 개기억해</h3>
                    </div>
                    <div className="post-images">
                        <img src="/path/to/cat1.jpg" alt="Cat image 1" />
                        <img src="/path/to/cat2.jpg" alt="Cat image 2" />
                    </div>
                    <div className="post-likes">
                        <span>❤ 32 Likes</span>
                    </div>
                    <div className="comments">
                        <p><strong>Elon Musk:</strong> 도와줘!</p>
                        <p><strong>Shaan Alam:</strong> soo cute</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;
