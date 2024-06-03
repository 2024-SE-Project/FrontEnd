import React from 'react';
import MainContent from './profile/MainContent';
import Personal from './profile/Personal';
import './css/Profile.css';

export default function Profile() {
  return (
    <div className='app'>
      <main>
        <aside>
          <Personal />
        </aside>
        <section>
          <MainContent />
        </section>
      </main>
    </div>
    
  );
}

