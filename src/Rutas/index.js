import React, {useEffect, useState} from 'react'
import {Route, Routes, Navigate, Link } from "react-router-dom";
import Top from '../Componentes/Top/Top';
import '../Estilos/Rutas/Rutas.css'
import Ventas from './Ventas/Ventas'
import Promociones from './Promociones/Promociones'
import Descargas from './Descargas/Descargas'
import {obtenerSucursalesReducer} from '../Redux/Acciones/Sucursales'
import {loginReducer} from '../Redux/Acciones/Auth'
import {ObtenerNotificacionesUsuarioReducer} from '../Redux/Acciones/Notificaciones/Notificaciones'
import {useDispatch, useSelector} from "react-redux";
import BancoImagen from './BancoImagen/BancoImagen';
import NuevoBancoImagen from './BancoImagen/NuevoBancoImagenes';
import ListaPrecios from '../Rutas/ListaPrecios/ListaPrecios'
import CargarArchivo from '../Rutas/CargarArchivo/CargarArchivo'
import Contraprestaciones from '../Rutas/Contraprestaciones/Contraprestaciones'
import Bottom from '../Componentes/Bottom/Bottom';
import MiPerfil from './MiPerfil/MiPerfil';
import ElementosEnviados from './ElementosEnviados/ElementosEnviados';
import Terminos from './Terminos/Terminos';
import ReenviarElemento from './ElementosEnviados/ReenviarElemento';
import Administrativo from './Administrativo/Administrativo';
import Usuarios from './Administrativo/Usuarios/Usuarios';
import Permisos from './Administrativo/Permisos/Permisos';
import TiposUsuarios from './Administrativo/TiposUsuarios/TiposUsuarios';
import ControlArchivo from './Administrativo/ControlArchivo/ControlArchivo';
import ElementosEnviadosNuevo from './ElementosEnviados/ElementosEnviadosNuevo';
import Rebate from './Rebate/Rebate';
import RebateBonus from './Rebate/Bonus/Bonus';
import RebateTrimestral from './Rebate/Trimestral/Trimestral';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LogicaLP from './LogicaLP/LogicaLP';

const Rutas = () => {

    const disptach = useDispatch()

    useEffect(() => {

        disptach(obtenerSucursalesReducer())
        disptach(ObtenerNotificacionesUsuarioReducer())
        disptach(loginReducer(
            {
                contrasena : localStorage.getItem('contrasena'),
                usuario    : localStorage.getItem('usuario')
            }
        ))
        

        if(window.location.href.includes('/terminos-condiciones')){
            setMostrarTerminos(false)
        }

    }, [])

    const {
        datosUsuarioLogeado,
        mostrar_terminos_condiciones_login
    } = useSelector(({auth}) => auth);

    const {
        cargando_plataforma
    } = useSelector(({setting}) => setting)

    const [mostrarTerminos, setMostrarTerminos] = useState(true)

    return (
        <Spin
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            spinning={cargando_plataforma}
        >

        <div>

            {
                // window.location.href.includes('/terminos-condiciones')
                mostrarTerminos == false
                ?null
                :datosUsuarioLogeado.usuaceptoterminos
                    ?mostrar_terminos_condiciones_login == true
                        ?<div
                            className='Contenedor-Fondo-Bloqueado-Terminos'
                        >
                            <div className="Mensaje-Cookies">
                                <div 
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "black",
                                        marginBottom:'5px',
                                        fontFamily:'Segoe UI'
                                    }}
                                >
                                    TERMINOS Y CONDICIONES DE USO
                                </div>
        
                                El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                                <Link 
                                    to="/terminos-condiciones"
                                    onClick={() => {
                                        setMostrarTerminos(false)
                                    }}
                                >
                                    <span
                                        style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                                </Link>
                            </div>
                            
                        </div>
                        :null
                    :<div
                        className='Contenedor-Fondo-Bloqueado-Terminos'
                    >
                        <div className="Mensaje-Cookies">
                            <div 
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "black",
                                    marginBottom:'5px',
                                    fontFamily:'Segoe UI'
                                }}
                            >
                                TERMINOS Y CONDICIONES DE USO
                            </div>

                            El usuario del sitio Web y/o App se compromete a leer detenidamente los términos y condiciones, antes de utilizar los portales y servicios Web ofrecidos. Ello implica que usted acepta expresamente los términos y condiciones. En caso de no aceptarlos, se le solicita que no haga uso, ni acceda, ni manipule la información de los servicios ofrecidos por el sitio Web; ya que usted (usuario) está haciendo un uso inadecuado de éste.<br/>Para continuar con el uso de la platforma ir y aceptar al siguiente link:   
                            <Link 
                                to="/terminos-condiciones"
                                onClick={() => {
                                    setMostrarTerminos(false)
                                }}
                            >
                                <span
                                    style={{color:'blue', cursor:'pointer', textDecoration:'underline'}}>{" Terminos y Condiciones"}</span>
                            </Link>
                        </div>
                        
                    </div>
            }


            <Top />
            <div style={{marginTop:'30px'}}>
                {/* <Menu /> */}
                <Routes>
                    <Route exact path='/rebate' element={<Rebate/>}/>
                    <Route exact path='/rebate/bonus' element={<RebateBonus/>}/>
                    <Route exact path='/rebate/trimestral' element={<RebateTrimestral/>}/>
                    <Route exact path='/ventas' element={<Ventas/>}/>
                    <Route exact path='/promociones' element={<Promociones/>}/>
                    <Route exact path='/descargas' element={<Descargas/>}/>
                    <Route exact path='/lista-precios' element={<ListaPrecios/>}/>
                    {/* <Route exact path='/banco-imagen' element={<BancoImagen/>}/> */}
                    <Route exact path='/banco-imagen' element={<NuevoBancoImagen/>}/>
                    <Route exact path='/carga-archivo' element={<CargarArchivo/>}/>
                    <Route exact path='/contraprestaciones' element={<Contraprestaciones/>}/>
                    <Route exact path='/mi-perfil' element={<MiPerfil/>}/>
                    <Route exact path='/elementos-enviados' element={<ElementosEnviados/>}/>
                    <Route exact path='/elementos-enviados/actual' element={<ElementosEnviadosNuevo/>}/>
                    <Route exact path='/terminos-condiciones' element={<Terminos/>}/>
                    <Route exact path='/reenviar-elemento' element={<ReenviarElemento/>}/>
                    <Route exact path='/administrativo' element={<Administrativo/>}/>
                    <Route exact path='/administrativo/perfil' element={<TiposUsuarios/>}/>
                    <Route exact path='/administrativo/usuarios' element={<Usuarios/>}/>
                    <Route exact path='/administrativo/permisos' element={<Permisos/>}/>
                    <Route exact path='/administrativo/control-archivo' element={<ControlArchivo />} />
                    <Route exact path='/logica-lp' element={<LogicaLP/> }/>
                    {
                        datosUsuarioLogeado.usuaceptoterminos
                        ?mostrar_terminos_condiciones_login == true
                            ?<Route path="*" element={<Navigate replace to="/terminos-condiciones" />} />
                            :<Route path="*" element={<Navigate replace to="/ventas" />} />
                        :<Route path="*" element={<Navigate replace to="/ventas" />} />
                    }
                    
                    
                </Routes>
            </div>
            <Bottom />
        </div>
        </Spin>
    )
}

export default Rutas
