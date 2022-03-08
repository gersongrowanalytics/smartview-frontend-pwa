import React from 'react'
import '../../Estilos/Rutas/ElementosEnviados/ElementosEnviados.css'
import { Row, Col } from 'antd'

const ElementosEnviados = () => {
    return (
        <>
            <Row>
                <Col lg={18} xl={18}>
                    <div className='Titulo-Elementos'>Elementos Enviados</div>
                </Col>
                <Col lg={6} xl={6}>
                    <div className='Paginacion-Elementos'>
                        <span>1- 20 de 40</span> 
                        <span>«  »</span>   
                    </div>
                </Col>
            </Row>
            <Row>   
                <Col xl={24} className=''>
                    <div className='Responsive-Tabla'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Para</th>
                                    <th>Mensaje</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Para: Xxxxxx.nnnnn</td>
                                    <td>Nombre de Asunto - Hola Xxxxxxx, Por favor..........................</td>
                                </tr>
                            </tbody>
                        </table>  
                    </div>  
                </Col>
            </Row>
            
        </>
    )
}

export default ElementosEnviados