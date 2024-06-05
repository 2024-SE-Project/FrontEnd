import React, { useState } from 'react';
import '../page/css/PhotoStudio.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const images = [
  "https://storage.googleapis.com/raonz_post_image/cat.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat1.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat2.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat3.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat4.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat5.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat6.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat10.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat8.jpg",
  "https://storage.googleapis.com/raonz_post_image/cat9.jpg",
];

export default function PhotoStudio() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.setAttribute('download', `photo-${currentIndex + 1}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  


  return (
    <div className="photo-studio">
      <div className="photo-header">
        <h2>사진첩</h2>
      </div>
      <div className="photo-content">
        <div className="photo-team">
            <h3>24-1 최희열 교수님 팀</h3>
        </div>
        <div className="photo-gallery-container">
          <button className="nav-button left" onClick={handlePrev}>‹</button>
          <div className="photo-item">
            <img src={images[currentIndex]} alt={`Photo ${currentIndex + 1}`} />
          </div>
          <button className="nav-button right" onClick={handleNext}>›</button>
        </div>
        <div className="photo-navigation">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
            ></div>
          </div>
          <span>{currentIndex + 1}/{images.length}</span>
          <div className="download-button" onClick={handleDownload}>
            <FontAwesomeIcon icon={faDownload} />
          </div>
        </div>
      </div>
    </div>
  );
}
