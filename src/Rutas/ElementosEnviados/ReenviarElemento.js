import React from 'react'
import { Row, Col } from 'antd'
import Persona from '../../Assets/Img/ElementosEnviados/Persona_correo.png'
import Eliminar from '../../Assets/Img/ElementosEnviados/Eliminar.png'
import Reenviar from '../../Assets/Img/ElementosEnviados/Reenviar.png'
import Flecha from '../../Assets/Img/ElementosEnviados/Siguiente_derecha.png'

const ReenviarElemento = () => {
  return (
    <div className='Contenedor-Elementos-Enviados'>
        <Row>
            <Col lg={18} xl={18}>
                <div className='Titulo-Elementos'>Elementos Enviados</div>
            </Col>
            <Col lg={6} xl={6}>
                    <div className='Paginacion-Elementos'>
                        <span style={{marginRight: '9px', paddingTop: '2px'}}>1 - 20 de 40</span>
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
                            <img src={Reenviar} className='Icono-Reenviar'></img>
                            <img src={Eliminar} className='Icono-Eliminar'></img>
                        </Col>
                    </Row>
                </div>
                <div className='Caja-Asunto'>
                    <div>
                        ARCHIVO
                    </div>
                </div>
                <div className='Caja2-Asunto'>
                    Hola estimado Xxxxxx, <br/>Mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmm mmmmmmmmmmmmm.<br/><br/> Por favor su revisión. <br/><br/>Gracias y saludos, <br/>Merly <br/><br/><br/>Este es un email automático, si tienes cualquier tipo de duda ponte en contacto con nosotros a través de nuestro servicio de atención al cliente al Xxxxxx@xxxx.com.pe, por favor no respondas a este mensaje.
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default ReenviarElemento