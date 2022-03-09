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

    return (
        <div>
            <div className='Contenedor-Top'>
                <Link to="/ventas">
                    <img 
                        src={LogoKCCreciendoJuntos} 
                        className='Logo-KC-Creciendo-Juntos'
                    />
                </Link>

                <FiltroCanalTop />

                <FiltroDepartamentosTop />

                <FiltroSoporteTop />

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
                    zIndex:'1'
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
