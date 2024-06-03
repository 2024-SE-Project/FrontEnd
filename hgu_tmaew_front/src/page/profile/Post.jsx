import React from 'react';
import '../css/Profile.css';

const Post = ({ category, title, description, date, comments, likes }) => {
  return (
    <div className="post">
      <h3>{category}</h3>
      <h4>{title}</h4>
      <p>{description}</p>
      <div className="post-footer">
        <span>{date}</span>
        <span>🗨️ {comments}</span>
        <span>❤️ {likes}</span>
      </div>
    </div>
  );
};

export default Post;