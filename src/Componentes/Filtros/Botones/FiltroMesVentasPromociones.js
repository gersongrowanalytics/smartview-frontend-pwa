import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import {SeleccionarMesReducer} from '../../../Redux/Acciones/Fechas'
import {useDispatch, useSelector} from "react-redux";

const FiltroMesVentasPromociones = () => {

    const dispatch = useDispatch();
    const {
        mesSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const [mostrarMeses, setMostrarMeses] = useState(false)

    useEffect(() => {

        

    },[])

    return (
        <>
            <div
                style={{
                    position:'relative'
                }}
            >
                <div 
                    className='Contenedor-Filtro-Fecha-Ventas W600-S14-H19-C1E1E1E'
                    onClick={() => setMostrarMeses(!mostrarMeses)}
                    onMouseEnter={() => setMostrarMeses(!mostrarMeses)}
                >
                    <div>
                        {mesSeleccionadoFiltro}
                    </div>
                </div>
                {
                    mostrarMeses == true
                    ?<div className='Linea-Filtro-Zona-Venta-Promociones'></div>
                    :null
                }

                {
                    mostrarMeses == true
                    ?<div
                        className='Contenedor-Cuerpo-Filtro-Fecha-Ventas'
                    >
                        <Row>
                            <Col xl={24} style={{textAlign: "-webkit-center"}}>
                                <div className='Wbold-S12-H16-C1E1E1E'>Mes</div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "ENE"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("ENE"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Ene</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "FEB"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("FEB"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Feb</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "MAR"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("MAR"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Mar</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "ABR"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("ABR"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Abr</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "MAY"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("MAY"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>May</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "JUN"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("JUN"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Jun</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "JUL"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("JUL"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Jul</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "AGO"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("AGO"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Ago</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "SET"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("SET"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Set</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "OCT"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("OCT"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Oct</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "NOV"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("NOV"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Nov</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        mesSeleccionadoFiltro == "DIC"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarMesReducer("DIC"))
                                        setMostrarMeses(!mostrarMeses)
                                    }}
                                >
                                    <div>Dic</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    :null
                }
            </div>
            {
                mostrarMeses == true
                ?<div
                    style={{
                        position:'absolute',
                        width:'100%',
                        height:'100vh',
                        background:'black',
                        top:'0px',
                        left:'0',
                        zIndex:'1',
                        opacity:'0'
                    }}
                    onClick={() => setMostrarMeses(!mostrarMeses)}
                    onMouseEnter={() => setMostrarMeses(!mostrarMeses)}
                >

                </div>
                :null
            }
        </>
    )
};

export default FiltroMesVentasPromociones;
