import React, {useState, useRef} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoSoporte from '../../Assets/Img/Top/iconoSoporte.png'
import IconoSoporteSelect from '../../Assets/Img/Top/iconoSoporteSelect.png'
import IconoAvion from '../../Assets/Img/Top/avion.png'
import IconoWsp from '../../Assets/Img/Top/wsp.png'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const FiltroSoporteTop = () => {

    const [mostrarContenido, setMostrarContenido] = useState(false)
    const [pasoMouse, setPasoMouse] = useState(false)

    const refWsp = useRef(null)

    const {
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

    return (
        <>
            <div
                style={{position:'relative'}}
            >

                    <a 
                        href="https://api.whatsapp.com/send?phone=+51949717789"
                        ref={refWsp}
                        style={{display:'none'}}
                        target="_blank"
                    >
                            Send Message
                    </a>
                <div 
                    className='Wbold-S14-H19-CFFFFFF Contenedor-Items-Top'
                    onClick={() => {
                        
                        if(datosUsuarioLogeado.usuaceptoterminos){

                            if(mostrar_terminos_condiciones_login == true){

                            }else{
                                setMostrarContenido(!mostrarContenido)
                            }

                        }else{

                        }
                    }}
                    style={
                        datosUsuarioLogeado.usuaceptoterminos
                        ?mostrar_terminos_condiciones_login == true
                            ?{
                                cursor: 'not-allowed'
                            }
                            :mostrarContenido == true
                                ?{
                                    background: "#3646C3",
                                    color: "white"
                                }
                                :{}
                        :{
                            cursor: 'not-allowed'
                        }
                    }
                    onMouseEnter={() => {
                        
                        if(datosUsuarioLogeado.usuaceptoterminos){

                            if(mostrar_terminos_condiciones_login == true){

                            }else{
                                setPasoMouse(true)
                                setMostrarContenido(true)
                            }

                        }else{

                        }
                    }}
                    onMouseLeave={() => {
                        
                        if(datosUsuarioLogeado.usuaceptoterminos){

                            if(mostrar_terminos_condiciones_login == true){

                            }else{
                                setPasoMouse(false)
                            }

                        }else{

                        }
                    }}
                >
                    {
                        mostrarContenido == true
                        ?<img className='Img-Icono-Top' src={IconoSoporte} />
                        :pasoMouse == true
                        ?<img className='Img-Icono-Top' src={IconoSoporte} />
                        :<img className='Img-Icono-Top' src={IconoSoporte} />
                    }
                    Soporte
                </div>

                {
                    mostrarContenido == true
                    ?<div 
                        className='Linea-Filtro-Zona-Venta-Promociones'
                        style={{
                            height: "50px"
                        }}
                    ></div>
                    :null
                }

                {
                    mostrarContenido == true
                    ?<div 
                        className='Cuerpo-Item-Filtro-Top'
                        style={{
                            left: "0px",
                            zIndex:'4',
                            width:'170px'
                        }}
                    >
                        <div 
                            className='Fila-Cuerpo-Item-Filtro-Top'
                            onClick={() => {
                                refWsp.current.click()
                            }}
                        >
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoWsp} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Enviar SMS Wsp</div>
                        </div>
                        
                        <Link to="/elementos-enviados">
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoAvion} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Elementos Enviados</div>
                            </div>
                        </Link>
                    </div>
                    :null
                }
            </div>
            {
                mostrarContenido == true
                ?<div 
                    style={{position:'absolute', width:'100%', height:'200vh', zIndex:'1'}}
                    onClick={() => {
                        setMostrarContenido(!mostrarContenido)
                    }}
                    onMouseEnter={() => setMostrarContenido(false)}
                >

                    <div
                        style={{position:'absolute', width:'100%', height:'200vh', background:'black', zIndex:'5', opacity:'0.3', top:'750px'}}
                    >

                    </div>

                </div>
                :null
            }
        </>
    )
};

export default FiltroSoporteTop;
