import React from 'react';
import Post from './Post';
import '../css/Profile.css';

const MainContent = () => {
  return (
    <div className="main-content">
      <section>
        <h2>내가 작성한 글</h2>
        <Post 
          category="자유게시판" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
      </section>
      <section>
        <h2>우리팀이 쓴 글</h2>
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
      </section>
      <section>
        <h2>내가 스크랩한 글</h2>
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
        <Post 
          category="최희열 교수님 팀" 
          title="우리팀 진짜 좋다" 
          description="우리팀원들 전부 잘 해줘" 
          date="6월1일 | 익명" 
          comments={5} 
          likes={1} 
        />
      </section>
    </div>
  );
};

export default MainContent;