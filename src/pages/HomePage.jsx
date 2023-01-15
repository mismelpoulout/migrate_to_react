import React from 'react'


import googleplay from './icons/googleplay.svg';

import './css/loader.css';
import './css/main.css';
import "./css/fonts.css";
import './css/header.css';
import './css/sidenav.css';
import './css/footer.css';
import './css/layers.css';
import './css/exam.css';
import './css/videoPlaylist.css';

import Main from './main';

export const HomePage = () => {
  return (
    <div className="container">
      

      <header className="App-header">
        
        
      </header>
      <br />

      <div className="text-center">

        <br />
        <br />
            <marquee>este registro es solo con fines estadisticos sus datos estan protegidos por google firebase console</marquee>
        <main>
          <Main />
          <br />
          <center>
            <br />
            <section class="container">
              <p>Encuentra nuestra app en Google play</p>
              <a href="https://play.google.com/store/apps/details?id=com.medstudio4all.medstudio">
                <img class="google-play" src={googleplay} />
              </a>
            </section>
          </center>
        </main>
      </div>
    </div>
  );
};
export default HomePage
