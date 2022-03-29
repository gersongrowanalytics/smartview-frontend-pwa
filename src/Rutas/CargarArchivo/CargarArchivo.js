import React, {useState} from 'react'
import { Row, Col, Modal } from 'antd';
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
import IconoPlusAzul from '../../Assets/Img/CargaArchivos/masazul.png'
import IconoEquisRojo from '../../Assets/Img/CargaArchivos/equisrojo.png'

const CargarArchivo = () => {

    const dispatch = useDispatch();
    const { 
        notificaciones_data_carga_archivos
      } = useSelector(({cargaArchivos}) => cargaArchivos);

    const CargarArchivo = async (url, data) => {
        return await dispatch(CargarArchivoReducer(url, data))
    }

    const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false)
    const [regresarNotificacionAbierta, setRegresarNotificacionAbierta] = useState(false)

    const [mostrarModalEliminarNoti, setMostrarModalEliminarNoti] = useState(false)

    return (
        <div style={{marginLeft:'40px', marginRight:'40px', position:'relative', marginTop:'105px'}}>
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
                    <div style={{position:'absolute', left:'60px', top:'10px'}}>
                        <img src={IconoCampana} style={{width:'30px'}} />
                    </div>
                    Notificaciones
                </div>
                    


                <div>
                    {
                        notificaciones_data_carga_archivos.map((noti, pos) => {
                            return(
                                <div className='Fila-Notificacion-CargaArchivos'>
                                    <div
                                        className='Primera-Parte-Fila-Notificacion-CargaArchivos'
                                    >
                                        <div
                                            className={
                                                noti.RESPUESTA == true
                                                ?'Wbold-S14-H19-C1E1E1E'
                                                :'Wbold-S14-H19-CFF3742'
                                            }
                                            
                                        >
                                            {noti.titulo}
                                        </div>
                                        <div 
                                            className={
                                                noti.RESPUESTA == true
                                                ?'Wnormal-S14-H19-C1E1E1E'
                                                :'Wnormal-S14-H19-CFF3742'
                                            }
                                            style={{marginTop:'5px'}}
                                        >
                                            {
                                                notificacionesAbiertas == true
                                                ?<>
                                                    {noti.MENSAJE+", a continucación podra ver el detalle"}
                                                </>
                                                :noti.MENSAJE
                                            }
                                        </div>

                                        {
                                            notificacionesAbiertas == true
                                            ?<div
                                                className='Contenedor-Cuerpo-Notificacion-Carga-Archivos'
                                            >
                                                <Row>
                                                    {
                                                        noti.NO_EXISTE_PRODUCTOS
                                                        ?noti.NO_EXISTE_PRODUCTOS.length > 0
                                                            ?<Col xl={8}>
                                                                <div 
                                                                    className='Titulo-Cuerpo-Notificacion-Carga-Archivos Wbold-S14-H16-C1E1E1E'
                                                                >
                                                                    Productos no identificados:
                                                                </div>
                                                                <div className='Wnormal-S14-H16-C1E1E1E'>
                                                                    {
                                                                        noti.NO_EXISTE_PRODUCTOS.map((dato) => {
                                                                            return(
                                                                                <>
                                                                                    <li> {dato.codigo} en la línea {dato.linea} </li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Col>
                                                            :null

                                                        
                                                        :null
                                                    }

                                                    {
                                                        noti.NO_EXISTE_DISTRIBUIDORA
                                                        ?noti.NO_EXISTE_DISTRIBUIDORA.length > 0
                                                            ?<Col xl={8}>
                                                                <div 
                                                                    className='Titulo-Cuerpo-Notificacion-Carga-Archivos Wbold-S14-H16-C1E1E1E'
                                                                >
                                                                    Distribuidoras no identificadas:
                                                                </div>
                                                                <div className='Wnormal-S14-H16-C1E1E1E'>
                                                                    {
                                                                        noti.NO_EXISTE_DISTRIBUIDORA.map((dato) => {
                                                                            return(
                                                                                <>
                                                                                    <li> {dato.codigo} en la línea {dato.linea} </li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Col>
                                                            :null

                                                        
                                                        :null
                                                    }

                                                    {
                                                        noti.NO_HAY_ANIO
                                                        ?noti.NO_HAY_ANIO.length > 0
                                                            ?<Col xl={8}>
                                                                <div 
                                                                    className='Titulo-Cuerpo-Notificacion-Carga-Archivos Wbold-S14-H16-C1E1E1E'
                                                                >
                                                                    Años no identificados:
                                                                </div>
                                                                <div className='Wnormal-S14-H16-C1E1E1E'>
                                                                    {
                                                                        noti.NO_HAY_ANIO.map((dato) => {
                                                                            return(
                                                                                <>
                                                                                    <li> {dato.codigo} en la línea {dato.linea} </li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Col>
                                                            :null

                                                        
                                                        :null
                                                    }

                                                    {
                                                        noti.NO_HAY_CLIENTES
                                                        ?noti.NO_HAY_CLIENTES.length > 0
                                                            ?<Col xl={8}>
                                                                <div 
                                                                    className='Titulo-Cuerpo-Notificacion-Carga-Archivos Wbold-S14-H16-C1E1E1E'
                                                                >
                                                                    Clientes no identificados:
                                                                </div>
                                                                <div className='Wnormal-S14-H16-C1E1E1E'>
                                                                    {
                                                                        noti.NO_HAY_CLIENTES.map((dato) => {
                                                                            return(
                                                                                <>
                                                                                    <li> {dato.codigo} en la línea {dato.linea} </li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Col>
                                                            :null

                                                        
                                                        :null
                                                    }

                                                    {
                                                        noti.NO_HAY_MES
                                                        ?noti.NO_HAY_MES.length > 0
                                                            ?<Col xl={8}>
                                                                <div 
                                                                    className='Titulo-Cuerpo-Notificacion-Carga-Archivos Wbold-S14-H16-C1E1E1E'
                                                                >
                                                                    Meses no identificados:
                                                                </div>
                                                                <div className='Wnormal-S14-H16-C1E1E1E'>
                                                                    {
                                                                        noti.NO_HAY_MES.map((dato) => {
                                                                            return(
                                                                                <>
                                                                                    <li> {dato.codigo} en la línea {dato.linea} </li>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Col>
                                                            :null

                                                        
                                                        :null
                                                    }
                                                    
                                                    
                                                </Row>
                                            </div>
                                            :null
                                        }

                                    </div>
                                    <div
                                        className='Segunda-Parte-Fila-Notificacion-CargaArchivos'
                                    >
                                        <div className='Contenedor-Iconos-Notificacion-CargaArchivos'>
                                            <div 
                                                style={{cursor:'pointer'}}
                                                onClick={() => setMostrarModalEliminarNoti(true)}
                                            >
                                                <img 
                                                    src={IconoEquisRojo}
                                                    style={
                                                        notificacionesAbiertas == true
                                                        ?{
                                                            width:'20px'
                                                        }
                                                        :{
                                                            width:'15px'
                                                        }
                                                    }
                                                />
                                            </div>

                                            <div 
                                                style={
                                                    notificacionesAbiertas == true
                                                    ?{marginTop:'0px', cursor:'pointer'}
                                                    :{marginTop:'-10px', cursor:'pointer'}
                                                }
                                                onClick={() => {
                                                    setNotificacionesAbiertas(true)
                                                    setRegresarNotificacionAbierta(false)
                                                }}
                                            >
                                                {/* <PlusCircleTwoTone 
                                                    
                                                /> */}
                                                <img 
                                                    src={IconoPlusAzul}
                                                    style={
                                                        notificacionesAbiertas == true
                                                        ?{
                                                            width:'20px'
                                                        }
                                                        :{
                                                            width:'15px'
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    
                                    

                                </div>            
                            )
                        })
                    }

                    {/* <div className='Fila-Notificacion-CargaArchivos'>
                        <div
                            className='Primera-Parte-Fila-Notificacion-CargaArchivos'
                        >
                            <div
                                className='Wbold-S14-H19-CFF3742'
                            >
                                Notificación 1
                            </div>
                            <div className='Wnormal-S14-H19-CFF3742' style={{marginTop:'5px'}}>
                                El archivo Sell In pesa más del límite permitido 25MB
                            </div>

                            {
                                notificacionesAbiertas == true
                                ?<div
                                    className='Contenedor-Cuerpo-Notificacion-Carga-Archivos'
                                >
                                    <Row>
                                        <Col xl={8}>
                                            <div className='Titulo-Cuerpo-Notificacion-Carga-Archivos'>
                                                Distribuidoras no identificadas:
                                            </div>
                                            <div>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                            </div>
                                        </Col>
                                        <Col xl={8}>
                                            <div>
                                                Distribuidoras no identificadas:
                                            </div>
                                            <div>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                            </div>
                                        </Col>
                                        <Col xl={8}>
                                            <div>
                                                Distribuidoras no identificadas:
                                            </div>
                                            <div>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                                <li>123213 en la línea 8</li>
                                            </div>
                                        </Col>
                                        
                                    </Row>
                                </div>
                                :null
                            }
                            
                        </div>
                        <div
                            className='Segunda-Parte-Fila-Notificacion-CargaArchivos'
                        >
                            <div className='Contenedor-Iconos-Notificacion-CargaArchivos'>
                                <div 
                                    style={{cursor:'pointer'}}
                                    onClick={() => setMostrarModalEliminarNoti(true)}
                                >
                                    <img 
                                        src={IconoEquisRojo}
                                        style={
                                            notificacionesAbiertas == true
                                            ?{
                                                width:'20px'
                                            }
                                            :{
                                                width:'15px'
                                            }
                                        }
                                    />
                                </div>

                                <div 
                                    style={
                                        notificacionesAbiertas == true
                                        ?{marginTop:'0px', cursor:'pointer'}
                                        :{marginTop:'-10px', cursor:'pointer'}
                                    }
                                    onClick={() => {
                                        setNotificacionesAbiertas(true)
                                        setRegresarNotificacionAbierta(false)
                                    }}
                                >
                                    <img 
                                        src={IconoPlusAzul}
                                        style={
                                            notificacionesAbiertas == true
                                            ?{
                                                width:'20px'
                                            }
                                            :{
                                                width:'15px'
                                            }
                                        }
                                    />
                                </div>
                            </div>

                        </div>

                    </div> */}
                </div>


                {
                    notificaciones_data_carga_archivos.length == 0
                    ?<div className='Cuerpo-Notificacion-CargaArchivos'>
                    
                        <div style={{marginTop:'-260px'}}>
                            <div>
                                <img src={IconoCampanaPloma} style={{width:'80px'}} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>
                                No hay notificaciones recientes
                            </div>
                        </div>

                    </div>
                    :null
                }
            </div>

            <Modal
                centered
                title={null}
                visible={mostrarModalEliminarNoti}
                footer={null}
                closeIcon={<div></div>}
                width="280px"
                height="193px"
                className='Modal-Eliminar-Noti-CargaArchivos'
                onCancel={() => setMostrarModalEliminarNoti(false)}
            >

                <div>
                    <div 
                        className='W600-S14-H19-C1E1E1E' 
                        style={{
                            textAlignLast: "center",
                            marginBottom:'30px'
                        }}
                    >
                        ¿Está seguro que desea eliminar la notificación?
                    </div>
                    <div className='Contenedor-Btns-Modal-Eliminar-Notificacion-CargaArchivos Wbold-S14-H19-C1E1E1E'>
                        <div className='Btn-Aceptar-Modal-Eliminar-Notificacion-CargaArchivos'>
                            Aceptar
                        </div>
                        <div 
                            className='Btn-Cancelar-Modal-Eliminar-Notificacion-CargaArchivos'
                            onClick={() => {
                                setMostrarModalEliminarNoti(false)
                            }}
                        >
                            Cancelar
                        </div>
                    </div>

                </div>

            </Modal>

        </div>
    )
}

export default CargarArchivo