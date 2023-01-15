


export default function Juega() {
    return (
        <div className="container">

            <section className="layer" id="layer-play">
                <div className=" txt-center" id="pre-start-game">
                    <p>Se te presentarán preguntas para ver cuantas respondes bien en 90 min, </p><br />
                    <br />La idea es que aprendas si te equivocas, por lo tanto se te dira la solución.<br />
                    <br />
                    <br />
                    <button className="btn" id="start-game">Empezar</button>
                </div>
                <div className="QA">
                    <div id="question" />
                    <br />
                    <div id="options" />
                    <br />
                    <br />
                    <div className="txt-center">
                        <button className="btn" id="game-rate">Siguiente</button>
                    </div>
                </div>
                <div className="QA-feedback">
                </div>
            </section>
        </div>
    );
}