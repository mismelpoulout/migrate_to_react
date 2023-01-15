import './css/cards.css';




export default function Main() {
    return (
        <section className="cards-mode-container">
            <div className="card-mode mode-study trigger-layer" role="button" data-layername="study" data-layertitle="Estudia">
                <Link to='/estudia'><h3>Estudia</h3></Link>
                <p>Bibliografias: Guias Clinicas Minsal...</p>
            </div>
            <div className="card-mode mode-play trigger-layer" role="button" data-layername="play" data-layertitle="Juega">
                <h3>Juega</h3>
                <p>Juega, aprende y mide</p>
            </div>
            <div className="card-mode mode-test trigger-layer" role="button" data-layername="test-mode" data-layertitle="Examen">
                <h3>Examen</h3>
                <p>
                    Creado para medir conocimiento y destreza
                </p>
            </div>
            <div className="card-mode mode-history trigger-layer" role="button" data-layername="history" data-layertitle="Historial">
                <h3>Historial</h3>
                <p>
                    Aqui encontraras los resultados de lo que has hecho en esta app
                </p>
            </div>
        </section>
    );
}