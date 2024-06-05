import React from 'react';
import styles from '../css/MainPost.module.css';
import Comment from './Comment';

export default function MainPost({ post }) {
  return (
    <div className={styles["main-content"]}>
      <div className={styles["main-post"]}>
        <div className={styles["main-post-header"]}>
          <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="User Avatar" className={styles["main-post-avatar"]} />
          <div className={styles["main-post-info"]}>
            <span>{post.author}</span>
            <span>&gt;</span>
            <a href="#team">{post.team}</a>
          </div>
        </div>
        <div className={styles["main-post-body"]}>
          <p>{post.content.split('\n').map((line, index) => (
            <span key={index}>{line}<br /></span>
          ))}</p>
          <div className={styles["main-post-images"]}>
            {post.images.map((image, index) => (
              <img key={index} src={image} alt={`Post image ${index + 1}`} />
            ))}
          </div>
        </div>
        <div className={styles["main-post-footer"]}>
          <div className={styles["main-post-likes"]}>
            <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Like" /> {post.likes}
          </div>
          <div className={styles["main-post-comments-title"]}>Comments:</div>
          <div>
            {post.comments.map(comment => (
              <div key={comment.id}>
                <strong>{comment.author}</strong>: {comment.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
