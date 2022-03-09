import React, {useState} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoModerno from '../../Assets/Img/Top/iconoModerno.png'
import IconoCanales from '../../Assets/Img/Top/iconoCanales.png'
import IconoCanalesSelect from '../../Assets/Img/Top/iconoCanalesSelect.png'
import {
    CambiarCanalSeleccionadoReducer
} from '../../Redux/Acciones/Auth'
import { useDispatch, useSelector } from "react-redux";

const FiltroCanalTop = () => {

    const dispatch = useDispatch()

    const [mostrarContenido, setMostrarContenido] = useState(false)
    const [pasoMouse, setPasoMouse] = useState(false)

    const {
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

    return (
        <>
            <div
                style={{position:'relative'}}
            >
                
                
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
                        ?<img className='Img-Icono-Top' src={IconoCanales} />
                        :pasoMouse == true
                        ?<img className='Img-Icono-Top' src={IconoCanales} />
                        :<img className='Img-Icono-Top' src={IconoCanales} />
                    }
                    Canal
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
                    ?<div className='Cuerpo-Item-Filtro-Top' style={{zIndex:'5'}}>
                        <div 
                            className='Fila-Cuerpo-Item-Filtro-Top'
                            onClick={() => {
                                dispatch(CambiarCanalSeleccionadoReducer("Tradicional"))
                                setMostrarContenido(false)
                            }}
                        >
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoTradicional} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Tradicional</div>
                        </div>

                        <div 
                            className='Fila-Cuerpo-Item-Filtro-Top'
                            onClick={() => {
                                dispatch(CambiarCanalSeleccionadoReducer("Moderno"))
                                setMostrarContenido(false)
                            }}
                        >
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
                    style={{position:'absolute', width:'100%', height:'200vh', zIndex:'4',}}
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
    );
};

export default FiltroCanalTop;
