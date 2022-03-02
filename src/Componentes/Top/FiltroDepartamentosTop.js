import React, {useState} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoDepartamento from '../../Assets/Img/Top/iconoDepartamento.png'
import IconoDepartamentoSelect from '../../Assets/Img/Top/iconoDepartamentoSelect.png'

import IconoVentas from '../../Assets/Img/Top/iconoVentas.png'
import IconoPromociones from '../../Assets/Img/Top/iconoPromociones.png'
import IconoListaPrecios from '../../Assets/Img/Top/iconoListaPrecios.png'
import IconoBancoImagenes from '../../Assets/Img/Top/iconoBancoImagenes.png'
import IconoFileUpload from '../../Assets/Img/Top/iconoFileUpload.png'

import {Link} from "react-router-dom";

const FiltroDepartamentosTop = () => {
    
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
                        ?<img className='Img-Icono-Top' src={IconoDepartamento} />
                        :pasoMouse == true
                        ?<img className='Img-Icono-Top' src={IconoDepartamento} />
                        :<img className='Img-Icono-Top' src={IconoDepartamento} />
                    }
                    Opciones
                </div>
                {
                    mostrarContenido == true
                    ?<div 
                        className='Cuerpo-Item-Filtro-Top'
                        style={{
                            left: "20px",
                            zIndex:'4'
                        }}
                    >
                        <Link to="/ventas" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoVentas} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Ventas</div>
                            </div>
                        </Link>

                        <Link to="/promociones" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoPromociones} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Promociones</div>
                            </div>
                        </Link>

                        <Link to="/lista-precios" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoListaPrecios} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Lista de Precios</div>
                            </div>
                        </Link>

                        <div className='Fila-Cuerpo-Item-Filtro-Top'>
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoBancoImagenes} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Banco de Imágen</div>
                        </div>

                        <Link to="/carga-archivo" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoFileUpload} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>File upload</div>
                            </div>
                        </Link>
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
    )
};

export default FiltroDepartamentosTop;
