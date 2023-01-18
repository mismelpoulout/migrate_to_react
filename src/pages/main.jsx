import { Form } from 'react-router-dom';
import './css/cards.css';
import{Routes , Route} from 'react-router-dom'; 
import {Estudia} from './estudia.jsx';
import {Juega} from './juega.jsx';
import {Examen} from './examen.jsx';
import {Historial} from './historial.jsx';




export default function Main(){
    
    return (
        
        <section className="cards-mode-container">
            <Routes>
            <Route path='Estudia' element={<Estudia/>} />
                <p>Bibliografias: Guias Clinicas Minsal...</p>
            <Route path='Estudia' element={<Juega/>} />
                <p>Juega, aprende y mide</p>
            <Route path='Estudia' element={<Examen/>} />
                <p>
                    Creado para medir conocimiento y destreza
                </p>
            <Route path='Estudia' element={<Historial/>} />
                <p>
                    Aqui encontraras los resultados de lo que has hecho en esta app
                </p>
            </Routes>
        </section>
    );
}