import React from 'react'
import { Row, Col, Switch } from 'antd';
import '../../../Estilos/Rutas/Ventas/RebateBonus.css'
import ImgLetraRebate from '../../../Assets/Img/Ventas/letrasrebate.png'
import ImgIconoRebate from '../../../Assets/Img/Ventas/rebatebonus.png'
import funFormatoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';

const RebateBonus = (props) => {
    
    const data = props.data

    return (
        <div
            className='Rebate-Bonus'
        >

            <div 
                className='W700-S26-H35-C1E1E1E-L0015'
                style={{marginBottom:'20px'}}
            >
                Rebate Bonus
            </div>
            <div>
                <Row>
                    <Col xl={16}>
                        <div className='Contenedor-Categorias-Rebate-Bonus'>
                            <Row
                                style={{
                                    height: "100%",
                                    alignContent: "center",
                                    textAlignLast: "center",
                                }}
                            >
                            {
                                data.categorias.map((dat) => {
                                    return (
                                        <Col
                                            xl={4}
                                        >
                                            <div className='Categoria-Rebate-Bonus'>
                                                <img 
                                                    src={
                                                        dat.estado == 1
                                                        ?dat.caticonoseleccionado
                                                        :dat.caticononegro
                                                    } 
                                                    className="Img-Categoria-Rebate-Bonus"
                                                />
                                                <div className='W700-S15-H20-C1E1E1E'>
                                                    {dat.catnombreopcional}
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                            </Row>

                        </div>
                        <div className='Bottom-Categorias-Rebate-Bonus'>
                            <Row
                                style={{
                                    height:'100%'
                                }}
                            >
                                <Col xl={8} className="Calculos-Bottom-Rebate-Bonus">
                                    <div className='Wbold-S14-H19-CFFFFFF'>
                                        OBJETIVO: S/<NumberFormat value={funFormatoDecimal(data.objetivo, 0)} displayType={'text'} thousandSeparator={true} />
                                        
                                    </div>
                                </Col>
                                <Col xl={8} className="Calculos-Bottom-Rebate-Bonus">
                                    <div className='Wbold-S14-H19-CFFFFFF'>
                                        REAL: S/<NumberFormat value={funFormatoDecimal(data.real, 0)} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                </Col>
                                <Col xl={8} className="Calculos-Bottom-Rebate-Bonus">
                                    <div className='Wbold-S14-H19-CFFFFFF'>
                                        CUMPLIMIENTO: <NumberFormat value={funFormatoDecimal(data.cumplimiento, 0)} displayType={'text'} thousandSeparator={true} />%
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    <Col xl={8}>
                        <div
                            className='Contenedor-Total-Rebate-Rebate-Bonus'
                        >
                            <div className='Primera-Parte-Total-Rebate-Rebate-Bonus'>
                                <div className='Icono-Circulo-Total-Rebate-Bonus'>

                                </div>
                                <img src={ImgIconoRebate} className="Img-Icono-Total-Rebate-Bonus" />

                            </div>

                            <div className='Segunda-Parte-Total-Rebate-Rebate-Bonus W700-S16-H21-C1E1E1E'>
                                <div
                                    className='Primera-Segunda-Parte-Total-Rebate-Rebate-Bonus'
                                >
                                    <div style={{marginRight: "auto"}}>
                                        0.5%
                                    </div>
                                    <div>
                                        = S/<NumberFormat value={funFormatoDecimal(data.rebate, 0)} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                </div>
                                <div
                                    className="Punto-Separacion-Total-Rebate-Bonus"
                                >
                                    ..............................................................................................
                                </div>
                                <div
                                    className='Segunda-Segunda-Parte-Total-Rebate-Rebate-Bonus'
                                >
                                    <div style={{marginRight: "auto"}}>
                                        Rebate Bonus
                                    </div>
                                    <div>
                                        = S/<NumberFormat value={funFormatoDecimal(data.rebate, 0)} displayType={'text'} thousandSeparator={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
            </div>

            <div className='Contenedor-Instrucciones-Rebate-Bonus'>

                <div className='Icono-Circulo-Instrucciones-Rebate-Bonus'> 
                </div>
                <img src={ImgLetraRebate} className="Img-Letra-Rebate-Bonus" />
                <img src={ImgIconoRebate} className="Img-Icono-Rebate-Bonus" />

                <div className='Texto-Instrucciones-Rebate-Bonus'>
                    <div>
                        <div className='W900-S17-H20-CFFFFFF'>
                            El cliente podrá acceder a un rebate denominado “Bonus” de 0.5 %, siempre que cumpla con lo siguiente:
                        </div>
                        <div className='W500-S17-H20-CFFFFFF'>
                            {data.descripcion}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RebateBonus