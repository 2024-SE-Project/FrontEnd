import React from 'react';
import styles from '../css/MainPost.module.css';
import Comment from './Comment';

export default function MainPost() {
    return (
        <div className={styles["main-content"]}>
            <div className={styles["main-post"]}>
                <div className={styles["main-post-header"]}>
                    <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="User Avatar" className={styles["main-post-avatar"]} />
                    <div className={styles["main-post-info"]}>
                        <span>You</span>
                        <span>&gt;</span>
                        <a href="#team">최희열 교수님 팀</a>
                    </div>
                </div>
                <div className={styles["main-post-body"]}>
                    <p>오늘 나비 행 미쳤다 ㅜㅜ<br />오늘 팀모임하는데 오더라<br />개귀여움</p>
                    <div className={styles["main-post-images"]}>
                        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Cat 1" />
                        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Cat 2" />
                    </div>
                </div>
                <div className={styles["main-post-footer"]}>
                    <div className={styles["main-post-likes"]}>
                        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Like" /> 32
                    </div>
                    <div className={styles["main-post-comments-title"]}>Comments:</div>
                    <Comment />
                </div>
            </div>
            <div className={styles["main-post"]}>
                <div className={styles["main-post-header"]}>
                    <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="User Avatar" className={styles["main-post-avatar"]} />
                    <div className={styles["main-post-info"]}>
                        <span>You</span>
                        <span>&gt;</span>
                        <a href="#team">최희열 교수님 팀</a>
                    </div>
                </div>
                <div className={styles["main-post-body"]}>
                    <p>오늘 나비 행 미쳤다 ㅜㅜ<br />오늘 팀모임하는데 오더라<br />개귀여움</p>
                    <div className={styles["main-post-images"]}>
                        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Cat 1" />
                        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Cat 2" />
                    </div>
                </div>
                <div className={styles["main-post-footer"]}>
                    <div className={styles["main-post-likes"]}>
                        <img src="https://storage.googleapis.com/raonz_post_image/cat.jpg" alt="Like" /> 32
                    </div>
                    <div className={styles["main-post-comments-title"]}>Comments:</div>
                    <Comment />
                </div>
            </div>
        </div>
    );
}