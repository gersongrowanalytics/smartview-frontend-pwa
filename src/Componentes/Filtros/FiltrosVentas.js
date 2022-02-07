import React from 'react';
import FiltroAnioVentasPromociones from './Botones/FiltroAnioVentasPromociones';
import FiltroCanalVentasPromociones from './Botones/FiltroCanalVentasPromociones';
import FiltroZonaVentasPromociones from './Botones//FiltroZonaVentasPromociones';
import FiltroMesVentasPromociones from './Botones/FiltroMesVentasPromociones';

const FiltrosVentas = () => {
    return (
        <div className='Contenedor-Filtro-Ventas'>

            {/* <FiltroCanalVentasPromociones 
                titulo = "Channel"
            /> */}

            <FiltroZonaVentasPromociones 
                titulo = "Zona"
            />  

            <FiltroMesVentasPromociones />

            <FiltroAnioVentasPromociones />

            <div className='Contenedor-Btn-Descargar-Ventas'>
                <div className='Wbold-S14-H19-CFFFF00'>Descargar</div>
            </div>
        </div>
    )
};

export default FiltrosVentas;
