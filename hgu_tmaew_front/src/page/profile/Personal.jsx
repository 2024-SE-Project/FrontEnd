import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Profile.css';

const Personal = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const goHome = () => {

  }
  return (
    <div className="personal">
      <img src="https://www.google.com/imgres?q=%EC%82%AC%EB%9E%8C%20%EC%9D%B4%EB%AA%A8%ED%8B%B0%EC%BD%98&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20220621%2Fourlarge%2Fpngtree-geek-expression-face-emoticons-person-png-image_5244427.png&imgrefurl=https%3A%2F%2Fkor.pngtree.com%2Ffreepng%2Fgeek-expression-face-emoticons-person_8199039.html&docid=NCuZ9iH5Ftyb-M&tbnid=8M1PrDr148lnXM&vet=12ahUKEwiEw9bY8b-GAxUaiK8BHRjaLwUQM3oFCIQBEAA..i&w=640&h=640&hcb=2&ved=2ahUKEwiEw9bY8b-GAxUaiK8BHRjaLwUQM3oFCIQBEAA" alt="profile" className="profile-picture" />
      <h2>{name}</h2>
      <p>{email}</p>
      <button>내 정보 수정하기</button>
      <NavLink to="/dashboard/myteam">
        <button>My Team</button>
      </NavLink>
      <NavLink to="/home">
        <button>로그아웃</button>
      </NavLink>
    </div>
  );
};

export default Personal;