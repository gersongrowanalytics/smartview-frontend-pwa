import React, {useEffect, useState} from 'react';
import '../../Estilos/Rutas/Ventas/Ventas.css'
import BannerVentas from '../../Assets/Img/Ventas/bannerVentas.png'
import FiltrosVentas from '../../Componentes/Filtros/FiltrosVentas';
import { Row, Col, Switch } from 'antd';

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

import IconoCumplimientoVerde from '../../Assets/Img/Ventas/sellout/iconoCumplimientoVerde.png'
import IconoObjetivoVerde from '../../Assets/Img/Ventas/sellout/iconoObjetivoVerde.png'
import IconoPorFacturarVerde from '../../Assets/Img/Ventas/sellout/iconoPorFacturarVerde.png'
import IconoRealVerde from '../../Assets/Img/Ventas/sellout/iconoRealVerde.png'

import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerVentasReducer,
    ObtenerVentasAcumuladaReducer
} from '../../Redux/Acciones/Ventas/Ventas'

import funFormatoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import Contraprestaciones from '../../Componentes/Rutas/Ventas/Contraprestaciones';

const Ventas = () => {

    const dispatch = useDispatch();

    const {
        idSucursalUsuarioSelec,
        aplicandoFiltroAcumulado
    } = useSelector(({sucursales}) => sucursales);

    const {
        aplicandoFiltroFechas,
        anioSeleccionadoFiltro,
        mesSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        data_ventas,
    } = useSelector(({ventas}) => ventas);

    const {
        canal_seleccionado,
    } = useSelector(({auth}) => auth);

    useEffect(() => {

        if(idSucursalUsuarioSelec != 0){
            dispatch(ObtenerVentasReducer())
        }

    }, [idSucursalUsuarioSelec])

    useEffect(() => {

        if(aplicandoFiltroFechas == true){

            if(aplicandoFiltroAcumulado == true){
                dispatch(ObtenerVentasAcumuladaReducer())    
            }else{
                if(idSucursalUsuarioSelec != 0){
                    dispatch(ObtenerVentasReducer())
                }
            }
        }

    }, [mesSeleccionadoFiltro, anioSeleccionadoFiltro])

    useEffect(() => {

        if(aplicandoFiltroAcumulado == true){
            dispatch(ObtenerVentasAcumuladaReducer())
        }

    }, [aplicandoFiltroAcumulado])

    const [mostrarReal, setMostrarReal] = useState(false)

    return (
        <div style={{paddingBottom:'50px'}}>
            
            <FiltrosVentas />

            {/* <div className='Contenedor-Img-Banner-Ventas' style={{paddingTop:'100px'}}> */}
            <div className='Contenedor-Img-Banner-Ventas' >
                <img className='Contenedor-Img-Banner-Ventas' src={BannerVentas} />
            </div>

            {
                data_ventas.map((data_venta) => {

                    let togo = parseFloat(data_venta.tsuvalorizadotogo)
                    // if(mostrarReal == true){
                    //     togo = parseFloat(data_venta.tsuvalorizadoobjetivo) - parseFloat(data_venta.tsuvalorizadoreal)
                    // }else{
                    //     togo = parseFloat(data_venta.tsuvalorizadoobjetivo) - parseFloat(data_venta.tsuvalorizadorealniv)
                    // }
                    
                    const togotrimestral = parseFloat(data_venta.tsuobjetivotrimestral) - parseFloat(data_venta.tsurealtrimestral)



                    return(
                        data_venta.tprnombre == "Sell In"
                        // ?<div style={{marginLeft:'-20px', marginRight:'-20px', paddingTop:'100px'}}>
                        ?<div style={{marginLeft:'-20px', marginRight:'-20px', marginTop:'95px'}}>
                            <div className='Wbold-S26-H35-C1E1E1E Titulo-Ventas' onClick={() => console.log(data_ventas)}>
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
                                                        S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadoobjetivo, 0)} displayType={'text'} thousandSeparator={true} />
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
                                                        S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadoreal, 0)} displayType={'text'} thousandSeparator={true} />
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
                                                    {
                                                        togo <= 0 
                                                        ? "S/"+0 
                                                        : <>
                                                            S/<NumberFormat value={funFormatoDecimal(togo, 0)} displayType={'text'} thousandSeparator={true} />
                                                        </>
                                                    }
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
                                                        <NumberFormat 
                                                            value={funFormatoDecimal( (parseFloat(data_venta.tsuvalorizadoreal) * 100) / parseFloat(data_venta.tsuvalorizadoobjetivo)  , 0)} 
                                                            displayType={'text'} thousandSeparator={true} />%
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>

                                    {
                                        canal_seleccionado == "Tradicional"
                                        ?<div className='Contenedor-Tajeta-Avance-Rebate-Ventas' >
                                            <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                                                Rebate Sell In Mensual
                                            </div>

                                            <div className='Contenedor-Tarjeta-Avance-Ventas' >
                                                <Row style={{marginBottom:'0px'}}>
                                                    <Col xl={24}>
                                                    </Col>
                                                </Row>
                                                {
                                                    data_venta.trrs.map((trr, posTrr) => {

                                                        let rebateCalculado = 0

                                                        if(trr.rtpporcentajehasta == 10000){

                                                            let realCalculado = ((parseFloat(data_venta.tsuvalorizadoobjetivo) / 100) * parseFloat(trr.rtpporcentajedesde))
                                                            rebateCalculado = ((parseFloat(realCalculado) / 100) * parseFloat(trr.rtpporcentajerebate))

                                                        }else{
                                                            let realCalculado = ((parseFloat(data_venta.tsuvalorizadoobjetivo) / 100) * parseFloat(trr.rtpporcentajehasta))
                                                            rebateCalculado = ((parseFloat(realCalculado) / 100) * parseFloat(trr.rtpporcentajerebate))
                                                        }

                                                        return (
                                                            <Row style={{marginBottom:'5px'}}>
                                                                <Col xl={12}>
                                                                    <div style={{position:'relative', paddingLeft:'12px'}}>
                                                                        <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                                                            <img 
                                                                                src={
                                                                                    posTrr == 0
                                                                                    ?IconoRebateUno
                                                                                    :posTrr == 1
                                                                                        ?IconoRebateDos
                                                                                        :posTrr == 2
                                                                                            ?IconoRebateTres
                                                                                            :IconoRebateTres
                                                                                } 
                                                                                className='Iconos-Tarjeta-Avance-Ventas'
                                                                            />
                                                                        </div>
                                                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                                                            {
                                                                                trr.rtpporcentajehasta == 10000
                                                                                ?<>
                                                                                    Escala {posTrr+1} {trr.rtpporcentajedesde}% - +%
                                                                                </>
                                                                                :<>
                                                                                    Escala {posTrr+1} {trr.rtpporcentajedesde}% - {trr.rtpporcentajehasta}%
                                                                                </>
                                                                            }
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col xl={12} style={{textAlignLast: "right"}}>
                                                                    <div className='W600-S14-H19-L0015-C1E1E1E'>
                                                                        {
                                                                            trr.realTotal
                                                                            ?<>
                                                                                S/<NumberFormat value={funFormatoDecimal(trr.realTotal, 0)} displayType={'text'} thousandSeparator={true} />
                                                                            </>
                                                                            :<>
                                                                                S/<NumberFormat value={funFormatoDecimal(rebateCalculado, 0)} displayType={'text'} thousandSeparator={true} />
                                                                            </>
                                                                        }
                                                                        
                                                                    </div>
                                                                </Col>
                                                            </Row>            
                                                        )
                                                    })
                                                }
                                                {/* <Row style={{marginTop:'0px'}}>
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
                                                </Row> */}
                                                <Row style={{marginTop:'10px'}}>
                                                    <Col xl={12}>
                                                        <div className='Wbold-S16-H21-C1E1E1E'>
                                                            Rebate Real
                                                        </div>
                                                    </Col>
                                                    <Col xl={12} style={{textAlignLast: "right"}}>
                                                        <div className='Wbold-S16-H21-C1E1E1E'>
                                                            S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadorebate, 0)} displayType={'text'} thousandSeparator={true} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        :null
                                    }
                                    

                                    {
                                        canal_seleccionado == "Tradicional"
                                        ?<div 
                                            className='Contenedor-Tajeta-Avance-Rebate-Ventas' 
                                            style={{
                                                marginRight: "0"
                                            }}
                                        >
                                            <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'>
                                                Rabate Trimestral - {data_venta.nombreTrimestre}
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
                                                            S/<NumberFormat value={funFormatoDecimal(data_venta.tsuobjetivotrimestral, 0)} displayType={'text'} thousandSeparator={true} />
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
                                                            S/<NumberFormat value={funFormatoDecimal(data_venta.tsurealtrimestral, 0)} displayType={'text'} thousandSeparator={true} />
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
                                                            
                                                            {
                                                                togotrimestral <= 0 
                                                                ? "S/"+0 
                                                                : <>
                                                                    S/<NumberFormat value={funFormatoDecimal(togotrimestral, 0)} displayType={'text'} thousandSeparator={true} />
                                                                </>
                                                            }
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
                                                            <NumberFormat value={funFormatoDecimal(data_venta.tsucumplimientotrimestral, 0)} displayType={'text'} thousandSeparator={true} />%
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:'5px'}}>
                                                    <Col xl={12}>
                                                        <div style={{position:'relative'}}>
                                                            <div className='Wbold-S16-H21-C1E1E1E'>
                                                                Rebate {data_venta.nombreTrimestre}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xl={12} style={{textAlignLast: "right"}}>
                                                        <div className='Wbold-S16-H21-C1E1E1E'>
                                                            S/<NumberFormat value={funFormatoDecimal(data_venta.tsurebatetrimestral, 0)} displayType={'text'} thousandSeparator={true} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        :null
                                    }
                                </Row>

                            </div>
                            
                            <div className='Contenedor-Tarjetas-Categorias-Avance-Ventas'>
                                <Row>
                                    {
                                        data_venta.categorias.map((dat, pos) => {

                                            let cummplimientoCalculado = (parseFloat(dat.scavalorizadoreal) * 100) / parseFloat(dat.scavalorizadoobjetivo)

                                            let togoSca = parseFloat(dat.scavalorizadoobjetivo) - parseFloat(dat.scavalorizadoreal)

                                            return(
                                                // <Col xl={8} style={{paddingRight:'35px', marginRight:'14px'}}>
                                                    <div 
                                                        className='Tarjeta-Categorias-Avance-Ventas'
                                                        style={pos == 2?{marginRight:'0'}:{}}
                                                    >
                                                        <div 
                                                            className='Primera-Tarjeta-Categorias-Avance-Ventas'
                                                            style={{
                                                                backgroundImage: "url("+dat.catimagenfondocompleto+")"
                                                            }}
                                                        >
                                                            <div className='Tarjeta-Titulo-Categorias-Avance-Ventas'>
                                                                <div className='Wbold-S20-H27-CFFFFFF-L0015'>{dat.catnombre}</div>
                                                            </div>
                                                            {/* <img src={dat.catimagenfondo} className='Tarjeta-Categoria-Ventas-Img' /> */}
                                                        </div>
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
                                                                    <NumberFormat value={funFormatoDecimal(cummplimientoCalculado, 0)} displayType={'text'} thousandSeparator={true} /> %
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
                                                                    S/<NumberFormat value={funFormatoDecimal(dat.scavalorizadoobjetivo, 0)} displayType={'text'} thousandSeparator={true} />   
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
                                                                    S/<NumberFormat value={funFormatoDecimal(dat.scavalorizadoreal, 0)} displayType={'text'} thousandSeparator={true} />   
                                                                    
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
                                                                    {
                                                                        parseFloat(togoSca) < 0
                                                                        ?<>
                                                                            S/0
                                                                        </>
                                                                        :<>
                                                                            S/<NumberFormat value={funFormatoDecimal(togoSca, 0)} displayType={'text'} thousandSeparator={true} />   
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                // </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>

                        </div>
                        :data_venta.tprnombre == "Sell Out"
                            ?<div style={{marginLeft:'-20px', marginRight:'-20px', marginTop:'95px'}}>

                                <div className='Wbold-S26-H35-C1E1E1E Titulo-Ventas'>
                                    Sell Out
                                </div>

                                <div
                                    className='Contenedor-Cuadros-Avances-Ventas'
                                >
                                    <Row>
                                        <div className='Contenedor-Tajeta-Avance-Rebate-Ventas' >
                                            <div 
                                                className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'
                                                style={{
                                                    background:'#79E2C1'
                                                }}
                                            >
                                                Avance de venta Sell Out
                                            </div>

                                            <div 
                                                className='Contenedor-Tarjeta-Avance-Ventas' 
                                                style={{
                                                    border: "1px solid #79E2C1"
                                                }}
                                            >
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
                                                                    src={IconoObjetivoVerde} 
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
                                                            {
                                                                mostrarReal == true
                                                                ?<>
                                                                    S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadoobjetivo, 0)} displayType={'text'} thousandSeparator={true} />
                                                                </>
                                                                :<>
                                                                    S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadoobjetivo, 0)} displayType={'text'} thousandSeparator={true} />
                                                                </>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:'5px'}}>
                                                    <Col xl={12}>
                                                        <div style={{position:'relative', paddingLeft:'12px'}}>
                                                            <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                                                <img 
                                                                    src={IconoRealVerde} 
                                                                    className='Iconos-Tarjeta-Avance-Ventas'
                                                                />
                                                            </div>
                                                            <div className='W600-S14-H19-L0015-C1E1E1E Switch-Avance-Ventas'>
                                                                <div style={{marginRight:'5px'}}>
                                                                    {
                                                                        mostrarReal == true
                                                                        ?"Real"
                                                                        :"NIV"
                                                                    }
                                                                </div> 
                                                                <Switch 
                                                                    size="small" 
                                                                    checked={mostrarReal}
                                                                    onChange={() => setMostrarReal(!mostrarReal)}
                                                                    style={{
                                                                        marginTop: "3px"
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                    </Col>
                                                    <Col xl={12} style={{textAlignLast: "right"}}>
                                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                                            {
                                                                mostrarReal == true
                                                                ?<>
                                                                    S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadoreal, 0)} displayType={'text'} thousandSeparator={true} />
                                                                </>
                                                                :<>
                                                                    S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadorealniv, 0)} displayType={'text'} thousandSeparator={true} />
                                                                </>
                                                            }
                                                            
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:'5px'}}>
                                                    <Col xl={12}>
                                                        <div style={{position:'relative', paddingLeft:'12px'}}>
                                                            <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                                                <img 
                                                                    src={IconoPorFacturarVerde} 
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
                                                        {
                                                            togo <= 0 
                                                            ? "S/"+0 
                                                            : <>
                                                                S/<NumberFormat value={funFormatoDecimal(togo, 0)} displayType={'text'} thousandSeparator={true} />
                                                            </>
                                                        }
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row style={{marginTop:'5px'}}>
                                                    <Col xl={12}>
                                                        <div style={{position:'relative', paddingLeft:'12px'}}>
                                                            <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                                                <img 
                                                                    src={IconoCumplimientoVerde} 
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
                                                            {
                                                                mostrarReal == true
                                                                ?<>
                                                                    <NumberFormat 
                                                                        value={funFormatoDecimal( (parseFloat(data_venta.tsuvalorizadoreal) * 100) / parseFloat(data_venta.tsuvalorizadoobjetivo)  , 0)} 
                                                                        displayType={'text'} thousandSeparator={true} />%
                                                                </>
                                                                :<>
                                                                    {/* <NumberFormat value={funFormatoDecimal(data_venta.tsuporcentajecumplimientoniv, 0)} displayType={'text'} thousandSeparator={true} />% */}
                                                                    <NumberFormat 
                                                                        value={funFormatoDecimal( (parseFloat(data_venta.tsuvalorizadorealniv) * 100) / parseFloat(data_venta.tsuvalorizadoobjetivo)  , 0)} 
                                                                        displayType={'text'} thousandSeparator={true} />%
                                                                </>
                                                            }
                                                            
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        
                                        {
                                            canal_seleccionado == "Tradicional"
                                            ?<div className='Contenedor-Tajeta-Avance-Rebate-Ventas' >
                                                <div 
                                                    className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas'
                                                    style={{
                                                        background:'#79E2C1'
                                                    }}
                                                >
                                                    Rebate Sell Out Mensual
                                                </div>

                                                <div 
                                                    className='Contenedor-Tarjeta-Avance-Ventas' 
                                                    style={{
                                                        border: "1px solid #79E2C1"
                                                    }}
                                                >
                                                    <Row style={{marginBottom:'0px'}}>
                                                        <Col xl={24}>
                                                            {/* <div className='Wbold-S16-H21-C1E1E1E'>
                                                                Avance de venta Sell In
                                                            </div> */}
                                                        </Col>
                                                    </Row>
                                                    {
                                                        data_venta.trrs.map((trr, posTrr) => {

                                                            let objetivoSellIn

                                                            if(data_ventas[0]['tsuvalorizadoobjetivo']){
                                                                objetivoSellIn = data_ventas[0]['tsuvalorizadoobjetivo']
                                                            }else{
                                                                objetivoSellIn = 0
                                                            }
                                                            

                                                            let rebateCalculado = 0

                                                            if(trr.rtpporcentajehasta == 10000){

                                                                let realCalculado = ((parseFloat(objetivoSellIn) / 100) * parseFloat(trr.rtpporcentajedesde))
                                                                rebateCalculado = ((parseFloat(realCalculado) / 100) * parseFloat(trr.rtpporcentajerebate))

                                                            }else{
                                                                let realCalculado = ((parseFloat(objetivoSellIn) / 100) * parseFloat(trr.rtpporcentajehasta))
                                                                rebateCalculado = ((parseFloat(realCalculado) / 100) * parseFloat(trr.rtpporcentajerebate))
                                                            }

                                                            return (
                                                                <Row style={{marginBottom:'5px'}}>
                                                                    <Col xl={12}>
                                                                        <div style={{position:'relative', paddingLeft:'12px'}}>
                                                                            <div style={{position:'absolute', left:'-12px', top:'-3px'}}>
                                                                                <img 
                                                                                    src={
                                                                                        posTrr == 0
                                                                                        ?IconoRebateUno
                                                                                        :posTrr == 1
                                                                                            ?IconoRebateDos
                                                                                            :posTrr == 2
                                                                                                ?IconoRebateTres
                                                                                                :IconoRebateTres
                                                                                    } 
                                                                                    className='Iconos-Tarjeta-Avance-Ventas'
                                                                                />
                                                                            </div>
                                                                            <div className='W600-S14-H19-L0015-C1E1E1E'>
                                                                                {
                                                                                    trr.rtpporcentajehasta == 10000
                                                                                    ?<>
                                                                                        Escala {posTrr+1} {trr.rtpporcentajedesde}% - +%
                                                                                    </>
                                                                                    :<>
                                                                                        Escala {posTrr+1} {trr.rtpporcentajedesde}% - {trr.rtpporcentajehasta}%
                                                                                    </>
                                                                                }
                                                                                
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col xl={12} style={{textAlignLast: "right"}}>
                                                                        <div className='W600-S14-H19-L0015-C1E1E1E'>
                                                                            {
                                                                                trr.realTotal
                                                                                ?<>
                                                                                    S/<NumberFormat value={funFormatoDecimal(trr.realTotal, 0)} displayType={'text'} thousandSeparator={true} />
                                                                                </>
                                                                                :<>
                                                                                    S/<NumberFormat value={funFormatoDecimal(rebateCalculado, 0)} displayType={'text'} thousandSeparator={true} />
                                                                                </>
                                                                            }
                                                                        </div>
                                                                    </Col>
                                                                </Row>            
                                                            )
                                                        })
                                                    }
                                                    {/* <Row style={{marginTop:'0px'}}>
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
                                                    </Row> */}
                                                    <Row style={{marginTop:'10px'}}>
                                                        <Col xl={12}>
                                                            <div className='Wbold-S16-H21-C1E1E1E'>
                                                                Rebate Real
                                                            </div>
                                                        </Col>
                                                        <Col xl={12} style={{textAlignLast: "right"}}>
                                                            <div className='Wbold-S16-H21-C1E1E1E'>
                                                                {
                                                                    mostrarReal == true
                                                                    ?<>
                                                                        S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadorebate, 0)} displayType={'text'} thousandSeparator={true} />
                                                                    </>
                                                                    :<>
                                                                        S/<NumberFormat value={funFormatoDecimal(data_venta.tsuvalorizadorebateniv, 0)} displayType={'text'} thousandSeparator={true} />
                                                                    </>
                                                                }
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            :null
                                        }
                                        
                                        {
                                            canal_seleccionado == "Tradicional"
                                            ?<div 
                                                className='Contenedor-Tajeta-Avance-Rebate-Ventas' 
                                                style={{
                                                    marginRight: "0"
                                                }}
                                            >
                                                <div className='Wbold-S16-H21-C1E1E1E Titulo-Tarjeta-Avance-Ventas' style={{background:'white'}}>
                                                    {/* Rabate Trimestral - {data_venta.nombreTrimestre} */}
                                                </div>

                                                <div 
                                                    className='Contenedor-Tarjeta-Avance-Ventas' 
                                                    style={{
                                                        border: "1px solid #79E2C1",
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    
                                                    <div className='Wbold-S14-H19-L0015-C1E1E1E'>
                                                        NOTA DE REBATE SELL OUT: <br/>
                                                        El pago de este rebate se calculará en base al monto neto facturado (sell in)
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            :null
                                        }
                                        
                                    </Row>

                                </div>

                                <div className='Contenedor-Tarjetas-Categorias-Avance-Ventas'>
                                    <Row>
                                        {
                                            data_venta.categorias.map((dat, pos) => {

                                                let cummplimientoCalculado 

                                                if(mostrarReal == true){
                                                    cummplimientoCalculado = (parseFloat(dat.scavalorizadoreal) * 100) / parseFloat(dat.scavalorizadoobjetivo)
                                                }else{
                                                    cummplimientoCalculado = (parseFloat(dat.scavalorizadorealniv) * 100) / parseFloat(dat.scavalorizadoobjetivo)
                                                }

                                                return(
                                                    <div 
                                                        className='Tarjeta-Categorias-Avance-Ventas'
                                                        style={pos == 2?{marginRight:'0'}:{}}
                                                    >
                                                        <div 
                                                            className='Primera-Tarjeta-Categorias-Avance-Ventas'
                                                            style={{
                                                                backgroundImage: "url("+dat.catimagenfondocompleto+")"
                                                            }}
                                                        >
                                                            <div className='Tarjeta-Titulo-Categorias-Avance-Ventas'>
                                                                <div className='Wbold-S20-H27-CFFFFFF-L0015'>{dat.catnombre}</div>
                                                            </div>
                                                            {/* <img src={dat.catimagenfondo} className='Tarjeta-Categoria-Ventas-Img' /> */}
                                                        </div>
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
                                                                    <NumberFormat value={funFormatoDecimal(cummplimientoCalculado, 0)} displayType={'text'} thousandSeparator={true} /> %
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
                                                                    S/<NumberFormat value={funFormatoDecimal(dat.scavalorizadoobjetivo, 0)} displayType={'text'} thousandSeparator={true} />   
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
                                                                    {
                                                                        mostrarReal == true
                                                                        ?<>
                                                                            S/<NumberFormat value={funFormatoDecimal(dat.scavalorizadoreal, 0)} displayType={'text'} thousandSeparator={true} />   
                                                                        </>
                                                                        :<>
                                                                            S/<NumberFormat value={funFormatoDecimal(dat.scavalorizadorealniv, 0)} displayType={'text'} thousandSeparator={true} />   
                                                                        </>
                                                                    }
                                                                    
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
                                                                    {
                                                                        parseFloat(dat.scavalorizadotogo) < 0
                                                                        ?<>
                                                                            S/0
                                                                        </>
                                                                        :<>
                                                                            S/<NumberFormat value={funFormatoDecimal(dat.scavalorizadotogo, 0)} displayType={'text'} thousandSeparator={true} />   
                                                                        </>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>

                            </div>
                            :null
                    )
                })
            }


            {
                canal_seleccionado == "Tradicional"
                ?null
                :<Contraprestaciones />
            }


        </div>
    )
};

export default Ventas;
