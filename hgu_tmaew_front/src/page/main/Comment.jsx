import React from 'react';
import '../css/Comment.css';

export default function Comment() {
  return (
    <div className="comments">
      <div className="comment">
        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="User Avatar" className="avatar" />
        <div className="comment-body">
          <span className="comment-user">Elon Musk</span>
          <p>도와줘 😢</p>
          <div className="comment-footer">
            <span>32 Likes</span>
            <span>Like</span>
            <span>Reply</span>
          </div>
        </div>
      </div>
    </div>
    
  );
}