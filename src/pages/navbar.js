


export default function Navbar(){
    return(
        <div className="container">
             <section className="overlay" id="layer-confirm">
          <div className="confirm-box">
            <p>Se abrira el enlace en una nueva pestaña</p>
            <div className="confirm-actions">
              <div role="button" onclick="Layer.closeCurrent()">Cancelar</div>
              <a id="openInNewTab" target="_blank" href="#" onclick="Layer.closeCurrent()">Ok</a>
            </div>
          </div>
        </section>
        <section className="layer" id="layer-privacy-policy">
          <h4>la pondremos en un dominio aparte</h4>
        </section>
        <section className="layer" id="layer-about">
          <div className="max-width-500 pretty-txt">
            <article>
              <p>
                Somos un equipo de profesionales encargados de ayudar, compartir e
                informar de una manera más interactiva.</p>
              <p>Si quiere dejar sus
                recomendaciones u otras opiniones, por favor escribanos a <a href="mailto:medstudioparato2@gmail.com">Medstudio &amp; Co </a>
              </p>
            </article>
            <article>
              <div className="social" id="network">
                <p>Nuestras redes sociales:<img className="google-play" src="icons/flecha.png" /></p>
              </div>
            </article>
            <article>
              <br />
              <p>Escanea el Qr y descarga nuestra apk para android</p><br /><br /> 
              <center>
                <img src="img/QR.png" className="zoom" />              
              </center>
              <br />
              <b>
              </b>
            </article>
          </div>
        </section>
        <section className="layer" id="layer-support">
          <h4>Recomendaciones</h4>
          <article>
            <p>Para tener una mejor experiencia, recomendamos actualizar su navegador a la última versión. </p>
            <br />
            <p>Algún problema con la app no dude en ponerse en contacto con nuestro sopote técnico.</p>
          </article>
          <br />
          <h4>Examen</h4>
          <article>
            <p>Tiene un selector de tiempo donde usted decide cúanto tiempo durará la evaluación</p>
            <p>Las preguntas son aleatorias, cada vez que reinicie el examen cambia el orden</p>
            <p>Le saldrá una pregunta a la vez con opciones de respuesta múltiple, debe se leccionar una o dejar en blanco
              si lo desea</p>
            <p>Cuando el tiempo acabe o si presiona el boton de salir se calificara el examen, este le dirá su eficiencia.
            </p>
            <br />
          </article>
          <h4>Juego</h4>
          <article>
            <p>Las preguntas son aleatorias, cada vez que reinicie el examen cambia el orden</p>
            <p>Al presionar siguiente se le dira si su respuesta es correcta o no, además se le mostrará la respuesta
              correcta, si ha fallado
              y se le dirá por qué.
            </p>
          </article>
          <br />
          <h4>Estudia</h4>
          <article>
            <p>En esta seccion es donde esta la bibliografia complementaria compartida por ustedes y para ustedes
              !disfrutenla¡</p>
          </article>
        </section>
        <section className="layer donations" id="layer-donations">
          <div className="max-width-500 pretty-txt">
            <p>
              <b>Medstudio - EUNACOM</b> es 100% gratuita gracias a las donaciones
              de gente como tu.
            </p>
            <nav className="layer-nav">
              <ul>
                <li className="flex-center">
                  <div id="donate-button-container">
                    <div id="donate-button" />
                  </div>
                </li>
                <li className="flex-center">
                  <img className="icon" src="icons/bitcoin.svg" alt="bitcoin" />
                </li>
              </ul>
            </nav>
          </div>
        </section>
        <section className="layer" id="layer-preferences">
          <h4>Preferencias</h4>
          <div className="max-width-500">
            <div className="preference">
              <label htmlFor="night-mode">Modo nocturno</label>
              <div className="switch-btn">
                <input type="checkbox" role="switch" id="night-mode" />
                <span />
              </div>
            </div>
            <div className="preference">
              <label htmlFor="theme">Color</label>
              <div className="switch-btn">
                <input type="color" id="theme" />
              </div>
            </div>
            <div className="preference">
              <label htmlFor="anim">Animaciones</label>
              <div className="switch-btn">
                <input type="checkbox" role="switch" id="anim" />
                <span />
              </div>
            </div>
          </div>
        </section>
        <section className="layer" id="layer-app">
          <h4>medstudio app</h4><br />
          <p style={{textAlign: 'center'}}>
            Descargala hoy, usala siempre
          </p>
          <p style={{textAlign: 'center'}}>Solo tenemos app para <img src="icons/android-os.svg" />
            pronto tendremos para
            <img src="icons/mac-os.svg" /><br /> disculpenos las molestias causadas
          </p>
          <div className="max-width-500 flex-center">
            <div className="preference">
              <button className="btn-primary btn openInNewTab" data-href="https://www.mediafire.com/file/euqk5b6kjihgrzm/medstudio-eunacom.apk/file">
                Descarga
              </button>
            </div>
          </div>
        </section>
        </div>
    );
}