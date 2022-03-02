import React, {useState} from 'react'
import { Row, Col } from 'antd';
import '../../Estilos/Rutas/CargarArchivo/CargarArchivo.css'
import TarjetaCargaArchivo from '../../Componentes/Rutas/CargarArchivo/TarjetaCargaArchivo'
import {useDispatch, useSelector} from "react-redux";
import {
    CargarArchivoReducer
} from '../../Redux/Acciones/CargaArchivos/CargaArchivos'
import IconoCampanaPloma from '../../Assets/Img/CargaArchivos/campanaploma.png'
import IconoCampana from '../../Assets/Img/CargaArchivos/campana.png'
import IconoFlecha from '../../Assets/Img/CargaArchivos/flecha.png'
import { 
    CloseCircleTwoTone,
    PlusCircleTwoTone
} from '@ant-design/icons';

const CargarArchivo = () => {

    const dispatch = useDispatch();

    const CargarArchivo = async (url, data) => {
        return await dispatch(CargarArchivoReducer(url, data))
    }

    const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false)
    const [regresarNotificacionAbierta, setRegresarNotificacionAbierta] = useState(false)

    return (
        <div style={{marginLeft:'40px', marginRight:'40px', position:'relative'}}>
            <div className='Wbold-S26-H35-C1E1E1E'>File Upload</div>
            <div>
                <Row>
                    <Col xl={20} style={{marginTop:'20px'}}>
                        <Row>
                            <Col xl={8} style={{textAlign: "-webkit-right"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Añadir Sell In'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/ventas/sellin'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    envcambios = {true}
                                />
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Añadir Objetivos'}
                                    subtitulo     = {"Sell In"}
                                    // url           = {'modulo/cargaArchivos/prueba-tarjeta'}
                                    url           = {'cargarArchivo/ventas/obejtivos'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    envcambios = {true}
                                    archivoExito = {true}
                                />
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-left"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Añadir Objetivos'}
                                    subtitulo     = {"Sell Out"}
                                    url           = {'cargarArchivo/ventas/obejtivossellout'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    cargando = {true}
                                />
                            </Col>

                            {/*  */}

                            <Col xl={8} style={{textAlign: "-webkit-right"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Añadir Mecánica Promocional (excel)'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/promociones/nuevaspromociones'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Añadir Rebate'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/ventas/rebate'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-left"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Actualizar Productos'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/productos'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>

                            {/*  */}


                            <Col xl={8} style={{textAlign: "-webkit-right"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Actualizar Distribuidoras'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/clientes'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Reconocimiento Pagos'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/reconocimiento-pagos'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-left"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Promociones Liquidadas'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/promociones-liquidadas'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>



                            {/*  */}

                            <Col xl={8} style={{textAlign: "-webkit-right"}}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Lista de Precios'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/lista-precios'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            

                            {/*  */}

                        </Row>
                    </Col>
                    <Col xl={4}>
                        {/* <div className='Contenedor-Notificaciones'>
                            <div className='Titulo-Notificacion-CargaArchivos Wbold-S14-H19-C1E1E1E'>
                                <div 
                                    className='Icono-Flecha-Noti-CargaArchivos' style={{position:'absolute', left:'30px', top:'10px', cursor:'pointer'}}
                                    onClick={() => alert('click')}
                                >
                                    <img src={IconoFlecha} style={{width:'30px', transform: "rotate(90deg)"}} />
                                </div>
                                <div style={{position:'absolute', left:'55px', top:'10px'}}>
                                    <img src={IconoCampana} style={{width:'30px'}} />
                                </div>
                                Notificaciones
                            </div>
                            <div className='Cuerpo-Notificacion-CargaArchivos'>

                                <div style={{marginTop:'-260px'}}>
                                    <div>
                                        <img src={IconoCampanaPloma} style={{width:'80px'}} />
                                    </div>
                                    <div className='Wnormal-S14-H19-C1E1E1E'>
                                        No hay notificaciones recientes
                                    </div>
                                </div>

                            </div>
                        </div> */}
                    </Col>
                </Row>
            </div>
            
            <div 
                className={
                    regresarNotificacionAbierta == true
                    ?'Contenedor-Notificaciones-Cerrar-Animacion'
                    :notificacionesAbiertas == true
                        ?'Contenedor-Notificaciones-Encima-Animacion'
                        :'Contenedor-Notificaciones-Encima'
                }
            >
                <div className='Titulo-Notificacion-CargaArchivos Wbold-S14-H19-C1E1E1E'>
                    <div 
                        className='Icono-Flecha-Noti-CargaArchivos' style={{position:'absolute', left:'30px', top:'10px', cursor:'pointer'}}
                        onClick={() => {
                            if(notificacionesAbiertas == true){
                                setRegresarNotificacionAbierta(true)
                                setNotificacionesAbiertas(false)
                            }else{
                                setNotificacionesAbiertas(true)
                                setRegresarNotificacionAbierta(false)
                            }
                        }}
                    >
                        {
                            notificacionesAbiertas == true
                            ?<img src={IconoFlecha} style={{width:'30px', transform: "rotate(-90deg)"}} />
                            :<img src={IconoFlecha} style={{width:'30px', transform: "rotate(90deg)"}} />
                        }
                    </div>
                    <div style={{position:'absolute', left:'55px', top:'10px'}}>
                        <img src={IconoCampana} style={{width:'30px'}} />
                    </div>
                    Notificaciones
                </div>
                    


                <div>
                    <div className='Fila-Notificacion-CargaArchivos'>
                        <div
                            className='Primera-Parte-Fila-Notificacion-CargaArchivos'
                        >
                            <div
                                className='Wbold-S14-H19-CFF3742'
                            >
                                Notificación 1
                            </div>
                            <div className='Wnormal-S14-H19-CFF3742' style={{marginTop:'5px'}}>
                                El archivo Subsidios pesa más del límite permitido 25MB
                            </div>
                        </div>
                        <div
                            className='Segunda-Parte-Fila-Notificacion-CargaArchivos'
                        >
                            <div style={{cursor:'pointer'}}>
                                <CloseCircleTwoTone 
                                    twoToneColor="#FF3742" 
                                    style={{color:'white'}}
                                />
                            </div>

                            <div style={{marginTop:'-5px', cursor:'pointer'}}>
                                <PlusCircleTwoTone 
                                    
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div className='Cuerpo-Notificacion-CargaArchivos'>
                    
                    <div style={{marginTop:'-260px'}}>
                        <div>
                            <img src={IconoCampanaPloma} style={{width:'80px'}} />
                        </div>
                        <div className='Wnormal-S14-H19-C1E1E1E'>
                            No hay notificaciones recientes
                        </div>
                    </div>

                </div> */}
            </div>

        </div>
    )
}

export default CargarArchivo