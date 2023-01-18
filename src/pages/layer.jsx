import logo from './icons/logo.png';
import question from './icons/question.svg';
import engranaje from './icons/engranaje.svg';
import privacidad from './icons/privacidad.svg';
import acercade from './icons/acercade.svg';





export default function Layer() {
    return (
        <div className="container">
            <div className="overlay" id="layer-side-nav">
                <div className="side-nav">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <nav>
                        <ul>
                            <li role="button" className="nav-btn trigger-layer" data-layername="preferences">
                                <img src={engranaje} alt="config" />
                                <b>Preferencias</b>
                            </li>
                            <li role="button" className="nav-btn openInNewTab" data-href="./policy.html">
                                <img src={privacidad} alt="privacidad" />
                                <b>Politica de Privacidad</b>
                            </li>
                            <li role="button" className="nav-btn trigger-layer" data-layername="about">
                                <img src={acercade} alt="acercade" />
                                <b>Acerca de</b>
                            </li>
                            <li role="button" className="nav-btn trigger-layer" data-layername="support">
                                <img src={question} alt="question" />
                                <b>Ayuda y soporte</b>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}