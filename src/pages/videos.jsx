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



export default function Videos() {
    return (
        <>

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

        </>
    );
}