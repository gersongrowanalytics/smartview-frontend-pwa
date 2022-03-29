import React, {useState} from 'react';
import '../../Estilos/Componentes/Top/Top.css'
import LogoKCCreciendoJuntos from '../../Assets/Logo/logoCompletoKim.png'
import IconoUsuario from '../../Assets/Img/Top/usuario.png'
import FiltroCanalTop from './FiltroCanalTop';
import FiltroDepartamentosTop from './FiltroDepartamentosTop';
import FiltroSoporteTop from './FiltroSoporteTop';
import {cerrarSesionReducer} from '../../Redux/Acciones/Auth'
import {useDispatch, useSelector} from "react-redux"
import IconoCerrar from '../../Assets/Img/Top/cerrarsession.png'
import IconoPersonaBlanco from '../../Assets/Img/Top/personablanco.png'
import IconoActualizar from '../../Assets/Img/Filtros/actualizar.png'
import { Tooltip } from 'antd';
import {Link} from "react-router-dom";
import CampanaSinRelleno from '../../Assets/Img/Top/Notificación-blue.png'
import CampanaConRelleno from '../../Assets/Img/Top/Notificación-blue-relleno.png'
import IconoPorcentaje from '../../Assets/Img/Top/Notificacion-Prom-Activas.png'
import PromoNueva from '../../Assets/Img/Top/Notificacion-Prom-Nuevas.png'
import Actualizacion from '../../Assets/Img/Top/Notificacion-Actualización.png'

const Top = () => {

    const dispatch = useDispatch();
    const {
        authUser,
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

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

    const [mostrarCuerpoMiCuenta, setMostrarCuerpoMiCuenta] = useState(false)

    const [mostrarContenidoCanal, setMostrarContenidoCanal] = useState(false)
    const [mostrarContenidoOpcio, setMostrarContenidoOpcio] = useState(false)
    const [mostrarContenidoSopor, setMostrarContenidoSopor] = useState(false)
    const [mostrarNotificaciones, setmostrarNotificaciones] = useState(false)

    const n = ["1","2","3","4","5","6","7","8"]
    return (
        <div>
            <div className='Contenedor-Top'>

                {
                    datosUsuarioLogeado.usuaceptoterminos   
                    ?mostrar_terminos_condiciones_login == true
                        ?<img 
                            src={LogoKCCreciendoJuntos} 
                            className='Logo-KC-Creciendo-Juntos'
                            style={{cursor:'not-allowed'}}
                        />
                        :<Link to="/ventas">
                            <img 
                                src={LogoKCCreciendoJuntos} 
                                className='Logo-KC-Creciendo-Juntos'
                            />
                        </Link>
                    :<img 
                        src={LogoKCCreciendoJuntos} 
                        className='Logo-KC-Creciendo-Juntos'
                        style={{cursor:'not-allowed'}}
                    />
                }

                <FiltroCanalTop 
                    mostrarContenido = {mostrarContenidoCanal}
                    setMostrarContenido = {(mostrar) => {
                        setMostrarContenidoCanal(mostrar)
                        setMostrarContenidoOpcio(false)
                        setMostrarContenidoSopor(false)
                    }}
                />

                <FiltroDepartamentosTop 
                    mostrarContenido = {mostrarContenidoOpcio}
                    setMostrarContenido = {(mostrar) => {
                        setMostrarContenidoOpcio(mostrar)
                        setMostrarContenidoCanal(false)
                        setMostrarContenidoSopor(false)
                    }}
                />

                <FiltroSoporteTop 
                    mostrarContenido = {mostrarContenidoSopor}
                    setMostrarContenido = {(mostrar) => {
                        setMostrarContenidoOpcio(false)
                        setMostrarContenidoCanal(false)
                        setMostrarContenidoSopor(mostrar)
                    }}
                />
                <div className='Fondo-Notificaciones'>
                    <div className='Notificacion-Punto'></div>
                    {
                        mostrarNotificaciones == false 
                        ? (
                            <img 
                                src={CampanaSinRelleno} 
                                style={{width:'38px'}}
                                onClick={() => {setmostrarNotificaciones(!mostrarNotificaciones)}}
                            />
                        ) : (
                            <img 
                                src={CampanaConRelleno} 
                                style={{width:'38px'}}
                                onClick={() => {setmostrarNotificaciones(!mostrarNotificaciones)}}
                            />
                        )
                    }
                </div>
                {
                    mostrarNotificaciones == true
                    ? (
                        <div className='Contenedor-Notificaciones-Top'>
                            <div className='Contenedor-SubTitulo-Notificaciones'>
                                Nuevas
                            </div>
                            <div className='Contenedor-Imagen-Txt'>
                                <img src={IconoPorcentaje} style={{width: '40px'}}/>
                                <div className='Contenedor-Txt-Notificaciones'>
                                    <div>
                                        Tienes las <span style={{fontWeight:'700'}}>Promociones</span> del mes de <span style={{fontWeight:'700'}}>Abril activas</span>
                                    </div>
                                    <div className='Txt-Tiempo-Notificaciones'>
                                        hace 2 horas
                                    </div>
                                </div>
                                <div>
                                    <div className='Punto-Azul-Notificacion'></div>
                                </div>
                            </div>
                            <div className='Contenedor-Imagen-Txt'>
                                <img src={PromoNueva} style={{width: '40px'}}/>
                                <div className='Contenedor-Txt-Notificaciones'>
                                    <div>
                                        Tienes <span style={{fontWeight:'700'}}>Promociones Nuevas</span> en el mes de Abril
                                    </div>
                                    <div className='Txt-Tiempo-Notificaciones'>
                                        hace 2 horas
                                    </div>
                                </div>
                                <div>
                                    <div className='Punto-Azul-Notificacion'></div>
                                </div>
                            </div>
                            <div className='Contenedor-SubTitulo-Notificaciones'>
                                Anteriores
                            </div>
                            {
                                n.map((e) => {
                                    return(
                                        <div className='Contenedor-Imagen-Txt'>
                                            <img src={Actualizacion} style={{width: '40px'}}/>
                                            <div className='Contenedor-Txt-Notificaciones'>
                                                <div>
                                                    La plataforma se encuentra actualizando
                                                </div>
                                                <div className='Txt-Tiempo-Notificaciones'>
                                                    hace 18 horas
                                                </div>
                                            </div>
                                            <div>
                                                <div className='Punto-Azul-Notificacion'></div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : null 
                }
                <div className='Wbold-S14-H19-CFFFFFF Contenedor-Items-Mi-Cuenta-Top' onClick={() => setMostrarCuerpoMiCuenta(!mostrarCuerpoMiCuenta)}>
                    <img src={IconoUsuario} className='Img-Icon-Usuario' />
                    Mi cuenta
                </div>
                {
                    mostrarCuerpoMiCuenta == true
                    ?<div className='Contenedor-Expandible-Mi-Cuenta'>
                        <div className='Contenedor-Expandible-Primera-Parte-Mi-Cuenta' >

                            <div style={{width:'25%'}} className="Contenedor-Persona-Blanco" >
                                <img src={IconoPersonaBlanco} className="Icono-Persona-Blanco-Top" />
                            </div>
                            <div style={{width:'75%', alignSelf: "center", paddingLeft:'10px'}}>
                                <div className='Wbold-S14-H19-C1E1E1E'>
                                    {
                                        localStorage.getItem('pernombrecompleto')
                                    }
                                </div>

                                {
                                    datosUsuarioLogeado.usuaceptoterminos
                                    ?mostrar_terminos_condiciones_login == true
                                        ?null
                                        :<Link 
                                            to="/mi-perfil"
                                            onClick={() => {
                                                setMostrarCuerpoMiCuenta(false)
                                            }}
                                        >
                                            <div 
                                                className='Wnormal-S12-H16-C1EC0ED'
                                                style={{cursor:'pointer'}}
                                            >Ver Perfil</div>
                                        </Link>
                                    :null
                                }
                                
                            </div>

                        </div>

                        <div style={{marginTop:'6px', border: "1px solid #D7E8FF"}}></div>

                        <div className='Contenedor-Expandible-Segunda-Parte-Mi-Cuenta Wbold-S13-H17-C1E1E1E' >
                            <div className='Contenedor-Cerrar-Sesion-Top'>
                                <img src={IconoCerrar} className="Cerrar-Sesion-Top" />
                            </div>
                            <div 
                                style={{cursor:'pointer'}}
                                onClick={() => dispatch(cerrarSesionReducer())}
                            >Cerrar Sesión</div>
                        </div>
                    </div>
                    :null
                }
            </div>

            <div 
                style={{
                    position:'fixed',
                    width: "100%",
                    height: "34px",
                    top:'0',
                    zIndex:'2'
                }}
            >
                <div 
                    className='Contenedor-Fecha-Actualizacion-Top'
                >
                    <div className='W600-S14-H19-C1E1E1E'>
                        Actualización {dia} de {mes} del {anio}
                    </div>
                    
                    <div
                        onClick={() => {
                            window.location.reload();
                        }}
                    >
                        <Tooltip
                            placement="bottom" 
                            title={"Actualizar"}
                        >
                            <img src={IconoActualizar} className="Icono-Actualizar" />
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Top;
