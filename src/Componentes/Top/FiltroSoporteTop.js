import React, {useState} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoSoporte from '../../Assets/Img/Top/iconoSoporte.png'
import IconoSoporteSelect from '../../Assets/Img/Top/iconoSoporteSelect.png'

const FiltroSoporteTop = () => {

    const [mostrarContenido, setMostrarContenido] = useState(false)
    const [pasoMouse, setPasoMouse] = useState(false)

    return (
        <div
            style={{position:'relative'}}
        >
            <div 
                className='Wbold-S14-H19-C1E1E1E Contenedor-Items-Top'
                // onClick={() => setMostrarContenido(!mostrarContenido)}
                style={
                    mostrarContenido == true
                    ?{
                        background: "#000000",
                        color: "#FFFF00",
                    }
                    :{}
                }
                onMouseEnter={() => setPasoMouse(true)}
                onMouseLeave={() => setPasoMouse(false)}
            >
                {
                    mostrarContenido == true
                    ?<img className='Img-Icono-Top' src={IconoSoporteSelect} />
                    :pasoMouse == true
                    ?<img className='Img-Icono-Top' src={IconoSoporteSelect} />
                    :<img className='Img-Icono-Top' src={IconoSoporte} />
                }
                Soporte
            </div>
            {
                mostrarContenido == true
                ?<div className='Cuerpo-Item-Filtro-Top'>
                    <div className='Fila-Cuerpo-Item-Filtro-Top'>
                        <div>
                            <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoTradicional} />
                        </div>
                        <div className='Wnormal-S14-H19-C1E1E1E'>Tradicional</div>
                    </div>

                    <div className='Fila-Cuerpo-Item-Filtro-Top'>
                        <div>
                            <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoTradicional} />
                        </div>
                        <div className='Wnormal-S14-H19-C1E1E1E'>Moderno</div>
                    </div>
                </div>
                :null
            }
        </div>
    )
};

export default FiltroSoporteTop;
