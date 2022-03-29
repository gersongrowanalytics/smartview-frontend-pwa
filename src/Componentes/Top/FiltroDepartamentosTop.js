import React, {useState} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoDepartamento from '../../Assets/Img/Top/iconoDepartamento.png'
import IconoDepartamentoSelect from '../../Assets/Img/Top/iconoDepartamentoSelect.png'

import IconoVentas from '../../Assets/Img/Top/iconoVentas.png'
import IconoPromociones from '../../Assets/Img/Top/iconoPromociones.png'
import IconoListaPrecios from '../../Assets/Img/Top/iconoListaPrecios.png'
import IconoBancoImagenes from '../../Assets/Img/Top/iconoBancoImagenes.png'
import IconoFileUpload from '../../Assets/Img/Top/iconoFileUpload.png'

import IconoMenuVentas from '../../Assets/Img/menu/ventas.png'
import IconoMenuPromociones from '../../Assets/Img/menu/promociones.png'
import IconoMenuRebate from '../../Assets/Img/menu/rebate.png'
import IconoMenuListaPrecios from '../../Assets/Img/menu/listaprecios.png'
import IconoMenuBancoImagenes from '../../Assets/Img/menu/bancoimagenes.png'
import IconoMenuFileUpload from '../../Assets/Img/menu/fileupload.png'


import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";

const FiltroDepartamentosTop = (props) => {
    
    // const [mostrarContenido, setMostrarContenido] = useState(false)
    const mostrarContenido = props.mostrarContenido
    const setMostrarContenido = props.setMostrarContenido

    const [pasoMouse, setPasoMouse] = useState(false)
    
    const {
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

    return (
        <>
            <div
                style={{position:'relative', zIndex:'2'}}
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
                            left: "20px",
                            zIndex:'4'
                        }}
                    >
                        <Link to="/ventas" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoMenuVentas} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Ventas</div>
                            </div>
                        </Link>

                        <Link to="/promociones" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoMenuPromociones} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Promociones</div>
                            </div>
                        </Link>

                        <Link to="/rebate" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoMenuRebate} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Rebate</div>
                            </div>
                        </Link>

                        <Link to="/lista-precios" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoMenuListaPrecios} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Lista de Precios</div>
                            </div>
                        </Link>

                        <Link to="/banco-imagen">
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoMenuBancoImagenes} />
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>Banco de Imágen</div>
                            </div>
                        </Link>

                        <Link to="/carga-archivo" onClick={() => setMostrarContenido(!mostrarContenido)}>
                            <div className='Fila-Cuerpo-Item-Filtro-Top'>
                                <div>
                                    <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoMenuFileUpload} />
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
                    style={{position:'absolute', width:'100%', height:'200vh', zIndex:'1', top:'0',}}
                    onClick={() => {
                        setMostrarContenido(!mostrarContenido)
                    }}
                    onMouseEnter={() => setMostrarContenido(false)}
                >
                    <div
                        style={{position:'absolute', width:'100%', height:'200vh', background:'black', zIndex:'5', opacity:'0.3', top:'60px'}}
                    >

                    </div>

                </div>
                :null
            }
        </>
    )
};

export default FiltroDepartamentosTop;
