import React from 'react'
import '../../Estilos/Rutas/ElementosEnviados/ElementosEnviados.css'
import Eliminar from '../../Assets/Img/ElementosEnviados/Eliminar.png'
import Reenviar from '../../Assets/Img/ElementosEnviados/Reenviar.png'
import Flecha from '../../Assets/Img/ElementosEnviados/Siguiente_derecha.png'
import {Link} from "react-router-dom"
import { Row, Col } from 'antd'

const ElementosEnviados = () => {

    let n = [
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022",
            "noenviado" : true
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022",
            "noenviado" : true
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022",
            "noenviado" : true
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022",
            "noenviado" : true
        },
        {
            "para" : "gerson.vilca@grow-analytics.com.pe",
            "asunto" : "Promociones 2022 FEBRERO",
            "correo" : "Hola aquí adjunto las promocioens de Febrero del 2022"
        },
    ]

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
            <Row
                style={{
                    textAlign: "-webkit-center"
                }}
            >   
                <Col xl={24} style={{paddingTop: '25px'}}>
                    <div className='Responsive-Tabla'>
                        <table>
                            <thead style={{ display: 'none'}}>
                                <tr>
                                    <th>Para</th>
                                    <th>Mensaje</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    n.map((e)=> {
                                        return (
                                            <tr>
                                                <td>
                                                    <span 
                                                        className='Primera-Columna'
                                                        style={{

                                                        }}
                                                    >
                                                        Para: {e.para}
                                                    </span>
                                                </td>
                                                <td>
                                                    {
                                                        e.noenviado == true
                                                        ?<div className='Caja-Segunda-Columna'>
                                                            No enviado
                                                        </div>
                                                        :null
                                                    }
                                                    <span 
                                                        className='Texto-Segunda-Columna'
                                                        style={
                                                            e.noenviado == true
                                                            ?{}
                                                            :{marginLeft:'0'}
                                                        }
                                                    >
                                                         
                                                        <div>
                                                            <b>{e.asunto}</b>
                                                        </div>
                                                        <div style={{marginLeft:'10px', marginRight:'10px'}}>
                                                            - 
                                                        </div>
                                                        <div>
                                                            {e.correo}
                                                        </div>
                                                    </span>    
                                                </td>
                                                <td>
                                                    <Link to="/reenviar-elemento">
                                                        <img src={Reenviar} className='Icono-Reenviar' style={{marginRight:'19px'}}></img>
                                                    </Link>
                                                    <img src={Eliminar} className='Icono-Eliminar'></img>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>  
                    </div>  
                </Col>
            </Row>
            
        </div>
    )
}

export default ElementosEnviados