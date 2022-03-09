import React, {useState} from 'react';
import { Row, Col } from 'antd';
import {SeleccionarAnioReducer} from '../../../Redux/Acciones/Fechas'
import {useDispatch, useSelector} from "react-redux";

const FiltroAnioVentasPromociones = () => {

    const dispatch = useDispatch();
    const {
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const [mostrarAnio, setMostrarAnio] = useState(false)
    
    return (
        <>
            <div
                style={{
                    position:'relative',
                    marginLeft:'20px'
                }}
            >
                <div 
                    className='Contenedor-Filtro-Fecha-Ventas W600-S14-H19-C1E1E1E'
                    onClick={() => setMostrarAnio(!mostrarAnio)}
                    onMouseEnter={() => setMostrarAnio(!mostrarAnio)}
                >
                    <div>
                        {anioSeleccionadoFiltro}
                    </div>
                </div>

                {
                    mostrarAnio == true
                    ?<div className='Linea-Filtro-Zona-Venta-Promociones'></div>
                    :null
                }

                {
                    mostrarAnio == true
                    ?<div
                        className='Contenedor-Cuerpo-Filtro-Fecha-Ventas'
                    >
                        <Row>
                            <Col xl={24} style={{textAlign: "-webkit-center"}}>
                                <div className='Wbold-S12-H16-C1E1E1E'>Año</div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2019"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                >
                                    <div>2019</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2020"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2020"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2020</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2021"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2021"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2021</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2022"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2022"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2022</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2023"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2023"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2023</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2024"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2024"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2024</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2025"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2025"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2025</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2026"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2026"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2026</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2027"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2027"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2027</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:'5px'}}>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2028"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2028"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2028</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2029"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2029"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2029</div>
                                </div>
                            </Col>
                            <Col xl={8} style={{textAlign: "-webkit-center"}}>
                                <div 
                                    className='Item-Filtro-Mes-Ventas W600-S11-H15-C1E1E1E'
                                    style={
                                        anioSeleccionadoFiltro == "2030"
                                        ?{
                                            background: "#E6F1FC",
                                            fontWeight: "bold"
                                        }
                                        :{}
                                    }
                                    onClick={() => {
                                        dispatch(SeleccionarAnioReducer("2030"))
                                        setMostrarAnio(!mostrarAnio)
                                    }}
                                >
                                    <div>2030</div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    :null
                }
                
            </div>

            {
                mostrarAnio == true
                ?<div
                    style={{
                        position:'absolute',
                        width:'100%',
                        height:'100vh',
                        background:'black',
                        top:'0px',
                        left:'0',
                        zIndex:'1',
                        opacity:'0.0'
                    }}
                    onClick={() => setMostrarAnio(!mostrarAnio)}
                    onMouseEnter={() => setMostrarAnio(!mostrarAnio)}
                >

                </div>
                :null
            }
        </>
    )
};

export default FiltroAnioVentasPromociones;
