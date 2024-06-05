import React from 'react';
import styles from '../css/Comment.module.css';

export default function Comment({ comment }) {
    return (
        <div className={styles["comment"]}>
            <div className={styles["comment-header"]}>
                <img src={comment.userAvatar || "default-avatar.jpg"} alt="User Avatar" className={styles["comment-avatar"]} />
                <div className={styles["comment-info"]}>
                    <span>{comment.username}</span>
                    <span>{comment.date}</span>
                </div>
            </div>
            <div className={styles["comment-body"]}>
                <p>{comment.text}</p>
            </div>
        </div>
    );
}