import React, {useState} from 'react'
import { Row, Col, Modal } from 'antd'
import Persona from '../../Assets/Img/ElementosEnviados/Persona_correo.png'
import Eliminar from '../../Assets/Img/ElementosEnviados/Eliminar.png'
import Reenviar from '../../Assets/Img/ElementosEnviados/Reenviar.png'
import Flecha from '../../Assets/Img/ElementosEnviados/Siguiente_derecha.png'
import IconoExcelTransparente from '../../Assets/Img/ElementosEnviados/excelicono.png'

const ReenviarElemento = () => {

    const [mostrarModalEliminar, setmostrarModalEliminar] = useState(false)
    const [mostrarModalReenviar, setmostrarModalReenviar] = useState(false)

    return (
        <div className='Contenedor-Elementos-Enviados'>
            <Row>
                <Col lg={18} xl={18}>
                    <div className='Titulo-Elementos'>Elementos Enviados</div>
                </Col>
                <Col lg={6} xl={6}>
                        <div className='Paginacion-Elementos'>
                            {/* <span style={{marginRight: '9px', paddingTop: '2px'}}>1 - 20 de 40</span> */}
                            {/* <img src={Flecha} className='Flecha-Izquierda'></img> 
                            <img src={Flecha} className='Flecha-Derecha'></img> */}
                        </div>
                    </Col>
            </Row>
            <Row>
                <Col xl={24}>
                    <div className='Caja-Asunto'>
                        <Row>
                            <Col xl={24}>
                                <div className='Texto-Asunto'>Nombre de Asunto</div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '12px', marginBottom: '13px'}}>
                            <Col xl={1} className='Zona-Icono'>
                                <img src={Persona} className='Icono-Persona'></img>
                            </Col>
                            <Col xl={21}>
                                <div className='De-Para-Texto'>
                                    <div><span style={{fontWeight:'bold'}}>De: </span>Nombre del que manda</div>
                                    <div><span style={{fontWeight:'bold'}}>Para: </span>Xxxxx@nnnnnn.com</div>
                                </div>
                            </Col>
                            <Col xl={2}>
                                <div className='Campo-Opciones'>
                                    <div className='Fondo-Hover-Icono1' onClick={() => setmostrarModalReenviar(true)}>
                                        <img src={Reenviar} className='Icono-Reenviar'></img>
                                    </div>
                                    <div className='Fondo-Hover-Icono2' onClick={() => setmostrarModalEliminar(true)}>
                                        <img src={Eliminar} className='Icono-Eliminar'></img>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='Caja-Asunto' style={{display:'flex'}}>
                        <div className='Contenedor-Archivo-Excel-Elementos-Enviados'>
                            <img src={IconoExcelTransparente} className="Icono-Excel-Transparente" />
                            <div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>
                                    Lista de Precios (ENE 2022) (29).xlsx
                                </div>
                                <div className='Wnormal-S14-H19-C1E1E1E'>
                                    68KB
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='Caja2-Asunto'>
                        <textarea 
                            rows="15" style={{width:'100%'}}
                            className="TxtArea-Reenviar-Elemento W400-S12-H16-C000000-L0015"
                        >
                            {"Hola estimado Xxxxxx, \nMmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmm mmmmmmmmmmmmm.\n\nPor favor su revisi??n. \n\nGracias y saludos, \nMerly \n\n\nEste es un email autom??tico, si tienes cualquier tipo de duda ponte en contacto con nosotros a trav??s de nuestro servicio de atenci??n al cliente al Xxxxxx@xxxx.com.pe, por favor no respondas a este mensaje. "}
                        </textarea>
                    </div>
                </Col>
            </Row>
            <Modal
                centered
                title={null}
                visible={mostrarModalReenviar}
                footer={null}
                closeIcon={<div></div>}
                width="310px"
                height="139px"
                className='Caja-Modal-ReenviarElemento'
                onCancel={() => setmostrarModalEliminar(false)}
            >
                <div>
                    <div className='Titulo-Modal-Reenviar-Elemento'>
                        Reenviar Correo
                    </div>
                    <div className='Texto-Modal-Reenviar-Elemento'>
                        ??Est?? seguro que desea reenviar el correo?
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <button className='Boton-Aceptar-Eliminar-Modal'>
                            Aceptar
                        </button>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmostrarModalReenviar(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                centered
                title={null}
                visible={mostrarModalEliminar}
                footer={null}
                closeIcon={<div></div>}
                width="310px"
                height="139px"
                className='Caja-Modal-ReenviarElemento'
                onCancel={() => setmostrarModalEliminar(false)}
            >
                <div>
                    <div className='Titulo-Modal-Reenviar-Elemento'>
                        Eliminar Correo
                    </div>
                    <div className='Texto-Modal-Reenviar-Elemento'>
                        ??Est?? seguro que desea eliminar el correo?
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <button className='Boton-Aceptar-Eliminar-Modal'>
                            Aceptar
                        </button>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmostrarModalEliminar(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ReenviarElemento