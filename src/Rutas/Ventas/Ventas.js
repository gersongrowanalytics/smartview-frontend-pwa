import React from 'react';
import '../../Estilos/Rutas/Ventas/Ventas.css'
import BannerVentas from '../../Assets/Img/Ventas/bannerVentas.png'
import FiltrosVentas from '../../Componentes/Filtros/FiltrosVentas';
import { Row, Col } from 'antd';
import IconoObjetivoNaranja from '../../Assets/Img/Ventas/iconoObjetivoNaranja.png'
import IconoRealNaranja from '../../Assets/Img/Ventas/iconoRealNaranja.png'
import IconoPorFacturarNaranja from '../../Assets/Img/Ventas/iconoPorFacturarNaranja.png'
import IconoCumpliminetoNaranja from '../../Assets/Img/Ventas/iconoCumplimientoNaranja.png'
import IconoRebateUno from '../../Assets/Img/Ventas/iconoEscalaUno.png'
import IconoRebateDos from '../../Assets/Img/Ventas/iconoEscalaDos.png'
import IconoRebateTres from '../../Assets/Img/Ventas/iconoEscalaTres.png'

import IconoCumplimientoAmarillo from '../../Assets/Img/Ventas/iconoCumplimientoAmarillo.png'
import IconoObjetivoAmarillo from '../../Assets/Img/Ventas/iconoObjetivoAmarillo.png'
import IconoPorFacturarAmarillo from '../../Assets/Img/Ventas/iconoPorFacturarAmarillo.png'
import IconoRealAmarillo from '../../Assets/Img/Ventas/iconoRealAmarillo.png'


const Ventas = () => {
    return (
        <div style={{paddingBottom:'50px'}}>
            
            <FiltrosVentas />

            <div className='Contenedor-Img-Banner-Ventas'>
                <img className='Contenedor-Img-Banner-Ventas' src={BannerVentas} />
            </div>

            <div className='Wbold-S26-H35-C1E1E1E Titulo-Ventas'>
                Sell In
            </div>

            <div
                className='Contenedor-Cuadros-Avances-Ventas'
            >
                <Row>
                    <div className='Contenedor-Tajeta-Avance-Rebate-Ventas' >
                        <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                            Avance de venta Sell In
                        </div>

                        <div className='Contenedor-Tarjeta-Avance-Ventas' >
                            <Row style={{marginBottom:'0px'}}>
                                <Col xl={24}>
                                    {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                        Avance de venta Sell In
                                    </div> */}
                                </Col>
                            </Row>
                            <Row style={{marginTop:'0px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoObjetivoNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='Wbold-S16-H21-C1E1E1E'>
                                            Objetivo
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/350,000
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoRealNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Real
                                        </div>
                                    </div>

                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoPorFacturarNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Por Facturar
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoCumpliminetoNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Cumplimiento
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S14-L0015-CFFBB37'>
                                        310%
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    
                    <div className='Contenedor-Tajeta-Avance-Rebate-Ventas' >
                        <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                            Rebate Sell In Mensual
                        </div>

                        <div className='Contenedor-Tarjeta-Avance-Ventas' >
                            <Row style={{marginBottom:'0px'}}>
                                <Col xl={24}>
                                    {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                        Avance de venta Sell In
                                    </div> */}
                                </Col>
                            </Row>
                            <Row style={{marginTop:'0px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoRebateUno} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Escala 1 95% -99%
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/2,599
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoRebateDos} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Escala 2 100% -104%
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoRebateTres} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Escala 3 105% - +%
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'10px'}}>
                                <Col xl={12}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        Rebate Real
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/14,100
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    
                    <div 
                        className='Contenedor-Tajeta-Avance-Rebate-Ventas' 
                        style={{
                            marginRight: "0"
                        }}
                    >
                        <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                            Rabate Trimestral - Q4
                        </div>

                        <div className='Contenedor-Tarjeta-Avance-Ventas' >
                            <Row style={{marginBottom:'0px'}}>
                                <Col xl={24}>
                                    {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                        Avance de venta Sell In
                                    </div> */}
                                </Col>
                            </Row>
                            <Row style={{marginTop:'0px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoObjetivoNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='Wbold-S16-H21-C1E1E1E'>
                                            Objetivo
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/350,000
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoRealNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Real
                                        </div>
                                    </div>

                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoPorFacturarNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Por Facturar
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                            <img 
                                                src={IconoCumpliminetoNaranja} 
                                                className='Iconos-Tarjeta-Avance-Ventas'
                                            />
                                        </div>
                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                            Cumplimiento
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S14-L0015-CFFBB37'>
                                        310%
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{marginTop:'5px'}}>
                                <Col xl={12}>
                                    <div style={{position:'relative'}}>
                                        <div className='Wbold-S16-H21-C1E1E1E'>
                                            Rebate Q4
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/24,360
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Row>

            </div>
            
            <div className='Contenedor-Tarjetas-Categorias-Avance-Ventas'>
                <Row>
                    {
                        [{},{},{},{},{}].map((dat, pos) => {
                            return(
                                <div 
                                    className='Tarjeta-Categorias-Avance-Ventas'
                                    style={pos == 4?{marginRight:'0'}:{}}
                                >
                                    <div className='Primera-Tarjeta-Categorias-Avance-Ventas'></div>
                                    <div className='Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                        <div 
                                            className='Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'
                                            style={{
                                                marginTop:'-4px'
                                            }}
                                        >
                                            <div className='Icono-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                                <img  className='Iconos-Tarjeta-Avance-Ventas' src={IconoCumplimientoAmarillo} />
                                            </div>
                                            <div 
                                                className='Texto-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas W600-S14-H19-L0015-C1E1E1E'
                                            >
                                                Cumplimiento
                                            </div>
                                            <div 
                                                className='Total-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas W600-S14-H19-L0015-CFFBB37'
                                            >
                                                100%
                                            </div>
                                        </div>
                                        <div className='Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                            <div className='Icono-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                                <img  className='Iconos-Tarjeta-Avance-Ventas' src={IconoObjetivoAmarillo} />
                                            </div>
                                            <div 
                                                className='Texto-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas Wbold-S14-L0015-C1E1E1E'
                                            >
                                                Objetivo
                                            </div>
                                            <div 
                                                className='Total-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas Wbold-S14-L0015-C1E1E1E'
                                            >
                                                S/158,954
                                            </div>
                                        </div>
                                        <div className='Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                            <div className='Icono-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                                <img  className='Iconos-Tarjeta-Avance-Ventas' src={IconoRealAmarillo} />
                                            </div>
                                            <div 
                                                className='Texto-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas W600-S14-H19-L0015-C1E1E1E'
                                            >
                                                Real
                                            </div>
                                            <div 
                                                className='Total-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas W600-S14-H19-L0015-C1E1E1E'
                                            >
                                                S/838,402
                                            </div>
                                        </div>
                                        <div className='Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                            <div className='Icono-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas'>
                                                <img  className='Iconos-Tarjeta-Avance-Ventas' src={IconoPorFacturarAmarillo} />
                                            </div>
                                            <div 
                                                className='Texto-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas W600-S14-H19-L0015-C1E1E1E'
                                            >
                                                Por Facturar
                                            </div>
                                            <div 
                                                className='Total-Filta-Segunda-Tarjeta-Categorias-Avance-Ventas W600-S14-H19-L0015-C1E1E1E'
                                            >
                                                S/ 0
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </Row>
            </div>


            <div className='Wbold-S26-H35-C1E1E1E Titulo-Ventas'>
                Sell Out
            </div>

            <div
                className='Contenedor-Cuadros-Avances-Ventas'
            >
                <Row>
                    <Col xl={7} >
                        <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                            Avance de venta Sell In
                        </div>

                        <div className='Contenedor-Tarjeta-Avance-Ventas' >
                            <Row style={{marginBottom:'5px'}}>
                                <Col xl={24}>
                                    {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                        Avance de venta Sell In
                                    </div> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        Objetivo
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/350,000
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Real
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Por Facturar
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Cumplimiento
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        310%
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={8} >
                        <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                            Rebate Sell In Mensual
                        </div>

                        <div className='Contenedor-Tarjeta-Avance-Ventas' >
                            <Row style={{marginBottom:'5px'}}>
                                <Col xl={24}>
                                    {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                        Avance de venta Sell In
                                    </div> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        Objetivo
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/350,000
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Real
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Por Facturar
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Cumplimiento
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        310%
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={7} >
                        <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                            Rabate Trimestral - Q4
                        </div>

                        <div className='Contenedor-Tarjeta-Avance-Ventas' >
                            <Row style={{marginBottom:'5px'}}>
                                <Col xl={24}>
                                    {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                        Avance de venta Sell In
                                    </div> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        Objetivo
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='Wbold-S16-H21-C1E1E1E'>
                                        S/350,000
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Real
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Por Facturar
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        S/1,084,614
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        Cumplimiento
                                    </div>
                                </Col>
                                <Col xl={12} style={{textAlignLast: "right"}}>
                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                        310%
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

            </div>


        </div>
    )
};

export default Ventas;
