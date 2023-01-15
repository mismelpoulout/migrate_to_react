


export default function Examen(){
    return(
       <div className="container">
        <section className="layer" id="layer-test-mode">
          <h4>Duracion del examen</h4>
          <div className="txt-center">
            <input id="exam-duration-input" style={{minWidth: '20em'}} type="range" min={20} max={90} step={10} />
            <div><span id="exam-duration">60</span>min</div>
          </div>
          <div className="actions">
            <div className="btn trigger-layer" id="start-exam" data-layername="exam" data-layertitle="Examen">Iniciar</div>
          </div>
        </section>
        <section className="layer" id="layer-exam">
          <div id="exam-questions" />
          <div className="actions">
            <div className="btn" id="next-exam">Siguiente</div>
          </div>
        </section>
       </div>
    );
}