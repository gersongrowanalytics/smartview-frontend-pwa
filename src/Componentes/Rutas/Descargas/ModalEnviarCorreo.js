import React, {useEffect, useState, useRef} from 'react'
import { Checkbox, Row, Col, Modal, Button } from 'antd';
import '../../../Estilos/Componentes/Descargas/ModalEnviarCorreo.css'
import {
    CloseOutlined
} from '@ant-design/icons';
import {
    EnviarCorreoDescargarReducer,
    EnviarCorreoDescargarFormadoReducer
} from '../../../Redux/Acciones/Descargas/DescargarEnviarCorreo'
import {useDispatch, useSelector} from "react-redux";
import config from '../../../config'

const ModalEnviarCorreo = (props) => {

    const dispatch = useDispatch()

    const {
        cargando_btn_enviar_correo_descarga,
        nombre_archivo_enviar_correo_descargar
    } = useSelector(({descargarEnviarCorreo}) => descargarEnviarCorreo);

    const mostrarModal = props.mostrarModal
    const setMostrarModalEnviarCorreo = props.setMostrarModalEnviarCorreo
    const setSelecciono = props.setSelecciono

    const infoDataCorreo = props.infoDataCorreo
    const nombreArchivoCorreoExcel = props.nombreArchivoCorreoExcel
    const tituloArchivoCorreoExcel = props.tituloArchivoCorreoExcel

    const setMostrarModalCorreoEnviadoCorrecto = props.setMostrarModalCorreoEnviadoCorrecto

    const [txtPara, setTxtPara] = useState("")
    const [txtAsunto, setTxtAsunto] = useState("")
    const [txtMensaje, setTxtMensaje] = useState("")


    const EnviarDatos = async () => {
        // dispatch(EnviarCorreoDescargarReducer(txtPara, txtAsunto, txtMensaje, infoDataCorreo, nombreArchivoCorreoExcel, tituloArchivoCorreoExcel ))
        let rpta = true

        if(props.modulo_descarga_seleccionado != "Catalogo"){
            rpta = await dispatch(EnviarCorreoDescargarFormadoReducer(txtPara, txtAsunto, txtMensaje, nombre_archivo_enviar_correo_descargar ))
        }else{
            rpta = await dispatch(EnviarCorreoDescargarFormadoReducer(txtPara, txtAsunto, txtMensaje, localStorage.getItem('usutoken'), true ))
        }

        return true
    }

    useEffect(() => {

        if(props.modulo_descarga_seleccionado != "Catalogo"){
            if(mostrarModal == true){
                dispatch(EnviarCorreoDescargarReducer(txtPara, txtAsunto, txtMensaje, infoDataCorreo, nombreArchivoCorreoExcel, tituloArchivoCorreoExcel ))
            }
        }

    }, [mostrarModal])

    const refArchivoCorreo = useRef(null)

    return (
        <div>
            <Modal
                visible={mostrarModal}
                centered
                title={null}
                footer={null}
                closeIcon={<div></div>}
                className="Modal-Enviar-Correo-Descarga"
                onCancel={() => {
                    setMostrarModalEnviarCorreo(!mostrarModal)
                    setSelecciono(false)
                }} 
            >
                <div>
                    <div className='Cabecera-Modal-Enviar-Correo-Descargar'>
                        <div
                            className='W600-S14-H19-CFFFFFF'
                        >
                                Nuevo Correo
                        </div>
                        <div 
                            className='Icon-Cerar-Modal-Enviar-Correo-Descargar'
                            onClick={() => setMostrarModalEnviarCorreo(!mostrarModal)}
                        >
                            <CloseOutlined />
                        </div>
                    </div>
                    <div className='Cuerpo-Enviar-Correo-Descargar'>
                        <div className='Fila-Datos-Enviar-Correo-Descargar'>
                            <div className='W600-S14-H19-CA4A3A3-L0015 Titulo-Datos-Enviar-Correo-Descargar'>
                                Para: 
                            </div>
                            <div style={{width: "100%"}}>
                                <input 
                                    onChange={(e) => {
                                        setTxtPara(e.target.value)
                                    }}
                                    id="email"
                                    className='Input-Datos-Enviar-Correo-Descargar' />
                            </div>
                        </div>
                        <div className='Fila-Datos-Enviar-Correo-Descargar'>
                            <div className='W600-S14-H19-CA4A3A3-L0015 Titulo-Datos-Enviar-Correo-Descargar'>
                                Asunto:
                            </div>
                            <div style={{width: "100%"}}>
                                <input 
                                    onChange={(e) => {
                                        setTxtAsunto(e.target.value)
                                    }}
                                    className='Input-Datos-Enviar-Correo-Descargar' />
                            </div>
                        </div>

                        <div>
                        
                            <textarea 
                                className='Wnormal-S12-H16-C000000-L0015 TextArea-Enviar-Correo-Descargar'
                                name="textarea" rows="10" cols="50"
                                onChange={(e) => {
                                    setTxtMensaje(e.target.value)
                                }}
                            >
                                
                                {"\n\n\nEste es un email automático, si tienes cualquier tipo de duda ponte en contacto con nosotros a través de nuestro servicio de atención al cliente al Xxxxxx@xxxx.com.pe, por favor no respondas a este mensaje."}
                            </textarea>

                        </div>

                        <div
                            className='Contenedor-Archivo-Subido-Descarga'
                            onClick={() => {
                                refArchivoCorreo.current.click()
                            }}
                        >
                            <div className='W600-S14-H19-C1876F2-L0015'>
                                {nombre_archivo_enviar_correo_descargar}
                            </div>
                            <div className='Icon-Cerar-Modal-Enviar-Correo-Descargar' style={{color:'black', right:'30px'}}>
                                {/* <CloseOutlined /> */}
                            </div>
                        </div>
                        <div style={{borderTop:'1px solid #E5E5E5', marginTop:'10px', paddingTop:'20px'}}>
                            <Button 
                                className='Btn-Enviar-Correo-Descargar Wbold-S14-H19-CFFFFFF'
                                onClick={async () => {
                                    await EnviarDatos()
                                    setMostrarModalEnviarCorreo(!mostrarModal)
                                    setSelecciono(false)
                                    setMostrarModalCorreoEnviadoCorrecto(true)
                                }}
                                loading={cargando_btn_enviar_correo_descarga}
                            >
                                Enviar correo
                            </Button>
                        </div>
                    </div>
                </div>

                <a
                    href={
                        props.modulo_descarga_seleccionado != "Catalogo"
                        ?config.api+"/Sistema/ExcelCorreo/"+nombre_archivo_enviar_correo_descargar
                        :config.api+"/Sistema/Pdf/"+localStorage.getItem('usutoken')+".pdf"
                        
                    }
                    target="_blank"
                    ref={refArchivoCorreo}
                    style={{display:'none'}}
                >

                </a>
            </Modal>
        </div>
    )
}

export default ModalEnviarCorreo