import React, {useState} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoModerno from '../../Assets/Img/Top/iconoModerno.png'
import IconoCanales from '../../Assets/Img/Top/iconoCanales.png'
import IconoCanalesSelect from '../../Assets/Img/Top/iconoCanalesSelect.png'

const FiltroCanalTop = () => {

    const [mostrarContenido, setMostrarContenido] = useState(false)
    const [pasoMouse, setPasoMouse] = useState(false)

    return (
        <>
            <div
                style={{position:'relative'}}
            >
                <div 
                    className='Wbold-S14-H19-CFFFFFF Contenedor-Items-Top'
                    onClick={() => setMostrarContenido(!mostrarContenido)}
                    style={
                        mostrarContenido == true
                        ?{
                            background: "#3646C3",
                            color: "white",
                        }
                        :{}
                    }
                    onMouseEnter={() => setPasoMouse(true)}
                    onMouseLeave={() => setPasoMouse(false)}
                >
                    {
                        mostrarContenido == true
                        ?<img className='Img-Icono-Top' src={IconoCanales} />
                        :pasoMouse == true
                        ?<img className='Img-Icono-Top' src={IconoCanales} />
                        :<img className='Img-Icono-Top' src={IconoCanales} />
                    }
                    Canal
                </div>
                {
                    mostrarContenido == true
                    ?<div className='Cuerpo-Item-Filtro-Top' style={{zIndex:'2'}}>
                        <div className='Fila-Cuerpo-Item-Filtro-Top'>
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoTradicional} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Tradicional</div>
                        </div>

                        <div className='Fila-Cuerpo-Item-Filtro-Top'>
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoModerno} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Moderno</div>
                        </div>
                    </div>
                    :null
                }
            </div>

            {
                mostrarContenido == true
                ?<div 
                    style={{position:'absolute', width:'100%', height:'200vh', background:'black', zIndex:'1', opacity:'0.3'}}
                    onClick={() => {
                        setMostrarContenido(!mostrarContenido)
                    }}
                >

                </div>
                :null
            }
        </>
    );
};

export default FiltroCanalTop;
