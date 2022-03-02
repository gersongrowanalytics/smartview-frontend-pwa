import React from 'react'
import '../../Estilos/Componentes/Bottom/Bottom.css'
import { Row, Col, Switch } from 'antd';

const Bottom = () => {
    return (
        <div className='Contenedor-Bottom'>
            <Row
                style={{
                    height: "100%",
                    alignContent: "center",
                    textAlignLast: "center"
                }}
            >
                <Col xl={6}>

                </Col>
                <Col xl={6}>
                    <div
                        style={{
                            background: "rgb(241, 241, 241)",
                            height: "215px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }} 
                        className='Wbold-S15-H24-L0015-C000000'>
                        Políticas y condiciones
                    </div>
                </Col>
                <Col xl={6}>
                    <div
                        style={{
                            background: "rgb(241, 241, 241)",
                            height: "215px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }} 
                        className='Wbold-S15-H24-L0015-C000000'>
                        Company
                    </div>
                </Col>
                <Col xl={6}>
                    <div 
                        className='Wnormal-S15-H24-L0015-C00008'
                        style={{
                            background: "rgb(241, 241, 241)",
                            height: "215px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        © Grow, Inc. 2019. We love our users!
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Bottom