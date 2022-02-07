import React from 'react';
import '../../Estilos/Componentes/Top/Top.css'
import LogoKCCreciendoJuntos from '../../Assets/Logo/logoCompletoKim.png'
import FiltroCanalTop from './FiltroCanalTop';
import FiltroDepartamentosTop from './FiltroDepartamentosTop';
import FiltroSoporteTop from './FiltroSoporteTop';

const Top = () => {

    const newDate = new Date()
    const dia = newDate.getDate();
    let mes = newDate.getMonth() + 1;
    const anio = newDate.getFullYear();

    if(mes == 1){
        mes = "Enero"
    }else if(mes == 2){
        mes = "Febrero"
    }else if(mes == 3){
        mes = "Marzo"
    }else if(mes == 4){
        mes = "Abril"
    }else if(mes == 5){
        mes = "Mayo"
    }else if(mes == 6){
        mes = "Junio"
    }else if(mes == 7){
        mes = "Julio"
    }else if(mes == 8){
        mes = "Agosto"
    }else if(mes == 9){
        mes = "Setiembre"
    }else if(mes == 10){
        mes = "Octubre"
    }else if(mes == 11){
        mes = "Noviembre"
    }else if(mes == 12){
        mes = "Diciembre"
    }

    return (
        <div>
            <div className='Contenedor-Top'>
                <img 
                    src={LogoKCCreciendoJuntos} 
                    className='Logo-KC-Creciendo-Juntos'
                />

                <FiltroCanalTop />

                <FiltroDepartamentosTop />

                <FiltroSoporteTop />

                <div className='Wbold-S14-H19-C1E1E1E Contenedor-Items-Mi-Cuenta-Top'>
                    Mi cuenta
                </div>
            </div>
            <div className='Contenedor-Fecha-Actualizacion-Top'>
                <div className='W600-S14-H19-C1E1E1E'>
                    Actualización {dia} de {mes} del {anio}
                </div>
            </div>
        </div>
    )
};

export default Top;
