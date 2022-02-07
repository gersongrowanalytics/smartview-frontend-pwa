import React from 'react';
import FiltroAnioVentasPromociones from './Botones/FiltroAnioVentasPromociones';
import FiltroCanalVentasPromociones from './Botones/FiltroCanalVentasPromociones';
import FiltroMesVentasPromociones from './Botones/FiltroMesVentasPromociones';
import IconoOjoPromociones from '../../Assets/Img/Promociones/Ojo.png'
import {
    CambiarDisenioPromocionesReducer
} from '../../Redux/Acciones/Promociones/Promociones'
import {useDispatch} from "react-redux";

const FiltrosPromociones = () => {
    
    const dispatch = useDispatch();

    return (
        <div className='Contenedor-Filtro-Ventas'>

            <FiltroCanalVentasPromociones 
                titulo = "Channel"
            />

            <FiltroCanalVentasPromociones 
                titulo = "Zona"
            />  

            <FiltroMesVentasPromociones />

            <FiltroAnioVentasPromociones />

            <div
                className='Filtro-Cambio-Disenio-Promociones'
                onClick={() => dispatch(CambiarDisenioPromocionesReducer())}
            >
                <img
                    src={IconoOjoPromociones}
                    className='Img-Ojo-Cambio-Disenio-Promociones'
                />                
            </div>

            <div className='Contenedor-Btn-Descargar-Ventas'>
                <div className='Wbold-S14-H19-CFFFF00'>Descargar</div>
            </div>
        </div>
    )
};

export default FiltrosPromociones;
