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
        <div style={{marginLeft:'40px', marginRight:'40px', position:'relative', marginTop:'110px'}}>
            <div 
                className='Wbold-S20-H35-C3646C4 Titulo-Modulo-Carga-Archivos'
            >
                File Upload
            </div>
            <div>
                <Row
                    style={{
                        display: "flex",
                        textAlign: "-webkit-center",
                        marginLeft:'-20px'
                    }}
                >
                    <Col xl={19} style={{marginTop:'20px'}}>
                        <Row>
                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Sell In'}
                                    // titulo        = {'(Efectivo)'}
                                    subtitulo     = {"(Efectivo)"}
                                    url           = {'cargarArchivo/ventas/sellin'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    // envcambios = {true}
                                />
                                {/* <TarjetaCargaArchivo
                                    titulo        = {'Sell Out'}
                                    subtitulo     = {"(Efectivo)"}
                                    url           = {'cargarArchivo/ventas/sellin'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                /> */}
                            </Col>
                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Sell Out'}
                                    subtitulo     = {"(Efectivo)"}
                                    url           = {'cargarArchivo/ventas/sellout'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    envcambios = {true}
                                />
                            </Col>
                            <Col xl={6} >
                                <TarjetaCargaArchivo
                                    titulo        = {'Sell In'}
                                    subtitulo     = {"(Objetivo)"}
                                    // url           = {'modulo/cargaArchivos/prueba-tarjeta'}
                                    url           = {'cargarArchivo/ventas/obejtivos'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    envcambios = {true}
                                    archivoExito = {true}
                                />
                            </Col>
                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Sell Out'}
                                    subtitulo     = {"(Objetivos)"}
                                    url           = {'cargarArchivo/ventas/obejtivossellout'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                    cargando = {true}
                                />
                            </Col>

                            {/*  */}

                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Mecánica Promocional'}
                                    subtitulo     = {"(Plantilla)"}
                                    url           = {'cargarArchivo/promociones/nuevaspromociones'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            <Col xl={6} >
                                <TarjetaCargaArchivo
                                    titulo        = {'Rebate DT'}
                                    subtitulo     = {"(Plantilla)"}
                                    url           = {'cargarArchivo/ventas/rebate'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            
                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Promociones Liquidadas DT'} // UNA SOLA LINEA
                                    subtitulo     = {"(Efectivo)"}
                                    url           = {'cargarArchivo/promociones-liquidadas'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>

                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Reconocimiento Pagos DT'}
                                    subtitulo     = {"(Efectivo)"}
                                    url           = {'cargarArchivo/reconocimiento-pagos'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>

                            <Col xl={6} >
                                <TarjetaCargaArchivo
                                    titulo        = {'Lista de Precios'}
                                    subtitulo     = {"(Plantilla)"}
                                    url           = {'cargarArchivo/lista-precios'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>

                            <Col xl={6}>
                                <TarjetaCargaArchivo
                                    titulo        = {'Master de Productos'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/productos'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>

                            {/*  */}


                            <Col xl={6} >
                                <TarjetaCargaArchivo
                                    titulo        = {'Master de Clientes'}
                                    subtitulo     = {""}
                                    url           = {'cargarArchivo/clientes'}
                                    CargarArchivo = {(url, data) => CargarArchivo(url, data)}
                                />
                            </Col>
                            
                        </Row>
                    </Col>
                    <Col xl={5}>
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