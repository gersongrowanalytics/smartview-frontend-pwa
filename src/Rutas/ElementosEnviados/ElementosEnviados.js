import React from 'react'
import '../../Estilos/Rutas/ElementosEnviados/ElementosEnviados.css'
import Eliminar from '../../Assets/Img/ElementosEnviados/Eliminar.png'
import Reenviar from '../../Assets/Img/ElementosEnviados/Reenviar.png'
import Flecha from '../../Assets/Img/ElementosEnviados/Siguiente_derecha.png'
import {Link} from "react-router-dom"
import { Row, Col } from 'antd'

const ElementosEnviados = () => {

    let n = ['1','2','3']

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
                                                    <span className='Primera-Columna'>Para: Xxxxxx.nnnnn</span>
                                                </td>
                                                <td>
                                                    <div className='Caja-Segunda-Columna'>
                                                        No enviado
                                                    </div>
                                                    <span className='Texto-Segunda-Columna'>
                                                        Nombre de Asunto - Hola Xxxxxxx, Por favor..........................
                                                    </span>    
                                                </td>
                                                <td>
                                                    <Link to="/reenviar-elemento">
                                                        <img src={Reenviar} className='Icono-Reenviar'></img>
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