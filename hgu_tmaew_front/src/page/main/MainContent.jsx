import React from 'react';
import MainPost from './MainPost';
import '../css/MainContent.css';

export default function MainContent({ posts }) {
  return (
    <div className="main-content">
      {posts && posts.length > 0 ? (
        posts.map((post) => <MainPost key={post.id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
