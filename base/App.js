import './App.css';
import './header.css';
import menu from './menu.svg';
import arrow from './left-arrow.svg';
import React, { Component } from 'react';
import Infeccioso from './componentes/infecto';
import Cardio from './componentes/cardio';
import Respiratorio from './componentes/respira';
import Endo from './componentes/endocrino';
import Obstetricia from './componentes/obste';
import Traumatologia from './componentes/trauma'
import Oftalmologia from './componentes/oftalmo';
import Cirugia from './componentes/cirugia';
import Gastroenterologia from './componentes/gastro';
import Ginecologia from './componentes/gineco';
import Hematologia from './componentes/hemato';
import Otorrino from './componentes/orl';
import Neurologia from './componentes/neuro';
import Psiquiatria from './componentes/psiquiatria';
import Urologia from './componentes/urolog';




export default function App() {
  return (
    <div className="cuerpo">
      <header>
        <img className="icon btn-closeLayer" id="btn-closeLayer" src={arrow} alt="back" />
        <img src={menu} id="open-sideMenu" class="icon trigger-layer" data-layername="side-nav" alt="menu" />
        <h1 class="appName" id="title">Medstudio</h1>
      </header>
      <div className="contenedor">
        <Infeccioso />
        <Cardio />
        <Respiratorio />
        <Endo />
        <Obstetricia />
        <Traumatologia />
        <Oftalmologia />
        <Cirugia />
        <Gastroenterologia /> 
        <Ginecologia />
        <Hematologia />
        <Neurologia />
        <Otorrino />
        <Psiquiatria />
        <Urologia />
       
      </div>
        
      
    </div>
  );
}

 
