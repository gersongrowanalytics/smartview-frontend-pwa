import React, {useState, useRef, useEffect} from 'react'
import { Checkbox, Row, Col, Button, Modal } from 'antd';
import { CaretDownOutlined, CaretRightOutlined, CaretLeftOutlined, CaretUpOutlined } from '@ant-design/icons';
import '../../Estilos/Rutas/Descargar/Descargar.css'
import {useDispatch, useSelector} from "react-redux";
import {
    SeleccionarModuloDescargaReducer,
    SeleccionarColumnaFiltroDescargaReducer,
    AbrirAgrupacionColumnaFiltrosDescargarReducer,
    SeleccionarTodoColumnasFiltroDescargarReducer,
    CambiarOrdenColumnasFiltroDescargaReducer,
    ObtenerDataDescargarExcelReducer,
    ArmarColumnasSeleccionadasDescargarPromocionesReducer
} from '../../Redux/Acciones/Descargas/Descargas'


// IMPORT DESCARGAS SELL IN
import {

    SeleccionarTodoColumnasFiltroDescargarSellInReducer,
    AbrirAgrupacionColumnaFiltrosDescargarSellInReducer,
    SeleccionarColumnaFiltroDescargaSellInReducer,
    CambiarOrdenColumnasFiltroDescargaSellInReducer,
    ObtenerDataDescargarExcelSellInReducer,
    ArmarColumnasSeleccionadasDescargarSellInReducer

} from '../../Redux/Acciones/Descargas/DescargasSellIn'

// IMPORT DESCARGAS SELL OUT
import {

    SeleccionarTodoColumnasFiltroDescargarSellOutReducer,
    AbrirAgrupacionColumnaFiltrosDescargarSellOutReducer,
    SeleccionarColumnaFiltroDescargaSellOutReducer,
    CambiarOrdenColumnasFiltroDescargaSellOutReducer,
    ObtenerDataDescargarExcelSellOutReducer,
    ArmarColumnasSeleccionadasDescargarSellOutReducer

} from '../../Redux/Acciones/Descargas/DescargarSellOut'

// IMPORT REPORTE DE PAGOS

import {
    SeleccionarTodoColumnasFiltroDescargarReportePagosReducer,
    AbrirAgrupacionColumnaFiltrosDescargarReportePagosReducer,
    SeleccionarColumnaFiltroDescargaReportePagosReducer,
    CambiarOrdenColumnasFiltroDescargaReportePagosReducer,
    ObtenerDataDescargarExcelReportePagosReducer,
    ArmarColumnasSeleccionadasDescargarReportePagosReducer
} from '../../Redux/Acciones/Descargas/DescargarRerportePagos'

// IMPORT PROMOCIONES LIQUIDADAS

import {

    SeleccionarTodoColumnasFiltroDescargarPromocionesLiquidadasReducer,
    AbrirAgrupacionColumnaFiltrosDescargarPromocionesLiquidadasReducer,
    SeleccionarColumnaFiltroDescargaPromocionesLiquidadasReducer,
    CambiarOrdenColumnasFiltroDescargaPromocionesLiquidadasReducer,
    ObtenerDataDescargarExcelPromocionesLiquidadasReducer

} from '../../Redux/Acciones/Descargas/DescargarPromocionesLiquidadas'

// IMPORT CATALOGO
import {
    DescargarPdfSucursalReducer
} from '../../Redux/Acciones/Descargas/DescargarPdf'

import {
    SeleccionarSucursalDescargaReducer,
    SeleccionarUnaSucursalDescargaReducer,
    SeleccionarZonaDescargarReducer,
    SeleccionarTodoSucursalesDescargarReducer,
    SeleccionarSucursalesGrupoReduecer,
    SeleccionarUnaSucursalesGrupoReduecer,
    SeleccionarTodosGruposReducer
} from '../../Redux/Acciones/Sucursales'

import ModalFiltroColumnas from '../../Componentes/Rutas/Descargas/ModalFiltroColumnas';

import config from '../../config'
import ModalEnviarCorreo from '../../Componentes/Rutas/Descargas/ModalEnviarCorreo';
import {
    CambiarNombreArchivoAdjuntoEnvioCorreoReducer
} from '../../Redux/Acciones/Descargas/DescargarEnviarCorreo'
import {Link} from "react-router-dom";
import {
    CheckCircleOutlined
} from '@ant-design/icons';

const Descargas = () => {

    const {
        modulo_descarga_seleccionado,
        agrupacion_columnas_filtros_descargar,
        columnas_filtro_descargar,
        columnas_seleccionadas_filtro_descarga,
        data_descargar_excel_promociones,
        cargando_btn_excel_descargar
    } = useSelector(({descargas}) => descargas);

    const {
        canal_seleccionado
    } = useSelector(({auth}) => auth);

    const {
        agrupacion_columnas_filtros_descargar_sellin,
        columnas_filtro_descargar_sellin,
        columnas_seleccionadas_filtro_descarga_sellin,
        data_descargar_excel_sellin
    } = useSelector(({descargasSellIn}) => descargasSellIn);

    const {
        agrupacion_columnas_filtros_descargar_sellout,
        columnas_filtro_descargar_sellout,
        columnas_seleccionadas_filtro_descarga_sellout,
        data_descargar_excel_sellout
    } = useSelector(({descargarSellOut}) => descargarSellOut);
    
    const {
        agrupacion_columnas_filtros_descargar_reportepagos,
        columnas_filtro_descargar_reportepagos,
        columnas_seleccionadas_filtro_descarga_reportepagos,
        data_descargar_excel_reportepagos

    } = useSelector(({descargarRerportePagos}) => descargarRerportePagos);

    const {
        agrupacion_columnas_filtros_descargar_promocionesliquidadas,
        columnas_filtro_descargar_promocionesliquidadas,
        columnas_seleccionadas_filtro_descarga_promocionesliquidadas,
        data_descargar_excel_promocionesliquidadas
    } = useSelector(({descargarPromocionesLiquidadas}) => descargarPromocionesLiquidadas);

    const {
        cargando_btn_excel_descargar_pdf
    } = useSelector(({descargarPdf}) => descargarPdf);

    const dispatch = useDispatch()
    
    const {
        zonas,
        sucursalesUsuario,
        gsus
    } = useSelector(({sucursales}) => sucursales);

    const {
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const [mostrarModalFiltroColumnas, setMostrarModalFiltroColumnas] = useState(false)
    const [seleccionoEnvioCorreo, setSeleccionoEnvioCorreo] = useState(false)
    const [seleccionoDescargar, setSeleccionoDescargar] = useState(false)

    let refBtnDescarga = useRef(null);
    let refBtnPdf = useRef(null);

    useEffect(() => {

        if(modulo_descarga_seleccionado == "Sell In"){
            if(localStorage.getItem('columnasfiltrodescargasellin') != null){
                dispatch(ArmarColumnasSeleccionadasDescargarSellInReducer())
            }
        }else if(modulo_descarga_seleccionado == "Promociones"){
            if(localStorage.getItem('columnasfiltrodescargapromociones') != null){
                dispatch(ArmarColumnasSeleccionadasDescargarPromocionesReducer())
            }
        }else if(modulo_descarga_seleccionado == "Sell Out"){
            
            if(localStorage.getItem('columnasfiltrodescargasellout') != null){
                dispatch(ArmarColumnasSeleccionadasDescargarSellOutReducer())
            }
        }else if(modulo_descarga_seleccionado == "Reporte de pagos"){
            if(localStorage.getItem('columnasfiltrodescargareportepagos') != null){
                dispatch(ArmarColumnasSeleccionadasDescargarReportePagosReducer())
            }
        }else if(modulo_descarga_seleccionado == "Catalogo"){
            dispatch(SeleccionarUnaSucursalDescargaReducer(0, true))
        }

    },[modulo_descarga_seleccionado])


    // DATOS PARA ENVIAR CORREO

    const [mostrarModalEnviarCorreo, setMostrarModalEnviarCorreo] = useState(false)
    const [infoDataCorreo, setInfoDataCorreo] = useState("")
    const [nombreArchivoCorreoExcel, setNombreArchivoCorreoExcel] = useState("")
    const [tituloArchivoCorreoExcel, setTituloArchivoCorreoExcel] = useState("")
    

    const [mostrarModalCorreoEnviadoCorrecto, setMostrarModalCorreoEnviadoCorrecto] = useState(false)

    return (
        <div
            style={{
                paddingLeft:'40px',
                paddingTop:'10px',
                marginTop:'105px'
            }}
        >
            <div style={{display:'flex', paddingBottom:'10px'}} className='W600-S14-H19-CC4C4C4-L0015'>
                <div style={{marginRight:'8px'}}>{"Filtro  aplicado: "}</div>
                {
                    modulo_descarga_seleccionado == "Sell In"
                    ?<div>
                        {" Tradicional > "}
                            <Link className='Etiqueta-Modulo-Link-Descargas' to="/ventas"> Ventas </Link> 
                        {" > Descargar"} 
                    </div>
                    :modulo_descarga_seleccionado == "Sell Out"
                        ?<div>
                            {" Tradicional > "}
                                <Link className='Etiqueta-Modulo-Link-Descargas' to="/ventas"> Ventas </Link> 
                            {" > Descargar"} 
                        </div>
                        :modulo_descarga_seleccionado == "Rebate"
                            ?<div>
                                {" Tradicional > "}
                                    <Link className='Etiqueta-Modulo-Link-Descargas' to="/ventas"> Ventas </Link> 
                                {" > Descargar"} 
                            </div>
                            :modulo_descarga_seleccionado == "Promociones"
                                ?<div>
                                    {" Tradicional > "}
                                        <Link className='Etiqueta-Modulo-Link-Descargas' to="/promociones"> Promociones </Link> 
                                    {" > Descargar"} 
                                </div>
                                :modulo_descarga_seleccionado == "Reporte de pagos"
                                    ?<div>
                                        {" Tradicional > "}
                                            <Link className='Etiqueta-Modulo-Link-Descargas' to="/promociones"> Promociones </Link> 
                                        {" > Descargar"} 
                                    </div>
                                    :modulo_descarga_seleccionado == "Promociones Liquidadas"
                                        ?<div>
                                            {" Tradicional > "}
                                                <Link className='Etiqueta-Modulo-Link-Descargas' to="/promociones"> Promociones </Link> 
                                            {" > Descargar"} 
                                        </div>
                                        :modulo_descarga_seleccionado == "Catalogo"
                                            ?<div>
                                                {" Tradicional > "}
                                                    <Link className='Etiqueta-Modulo-Link-Descargas' to="/promociones"> Promociones </Link> 
                                                {" > Descargar"} 
                                            </div>
                                            :null
                }
            </div>
            <div className='Wbold-S26-H35-C1E1E1E' style={{paddingBottom:'25px'}}>Descargar</div>
            {/* <div style={{position:'relative', marginBottom:'30px'}}>
                <div>
                    <span className='Wbold-S14-H19-C1E1E1E'>Canal</span> <span className='W600-S14-H19-C1E1E1E'>| Tradicional</span>
                </div>
                <div 
                    style={{
                        position:'absolute',
                        top: "1px",
                        left: "135px"
                    }}
                >
                    <CaretDownOutlined />
                </div>
            </div> */}
            <div style={{display:'flex', position:'relative', marginBottom:'25px'}}>
                <div 
                    className={
                        modulo_descarga_seleccionado == "Sell In"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Sell In"))}
                >
                    Sell In
                </div>

                <div 
                    className={
                        modulo_descarga_seleccionado == "Sell Out"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Sell Out"))}
                >
                    Sell Out
                </div>

                <div 
                    className={
                        modulo_descarga_seleccionado == "Rebate"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Rebate"))}
                >
                    Rebate
                </div>

                <div 
                    className={
                        modulo_descarga_seleccionado == "Promociones"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Promociones"))}
                >
                    Promociones
                </div>

                <div 
                    className={
                        modulo_descarga_seleccionado == "Reporte de pagos"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Reporte de pagos"))}
                >
                    Reporte de Pagos
                </div>

                <div 
                    className={
                        modulo_descarga_seleccionado == "Promociones Liquidadas"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Promociones Liquidadas"))}
                >
                    Promociones Liquidadas
                </div>

                <div 
                    className={
                        modulo_descarga_seleccionado == "Catalogo"
                        ?'Btn-Modulo-Seleccionado-Descargar Wbold-S14-H19-CFFFFFF'
                        :'Btn-Modulo-Descargar W600-S14-H19-L0015-C1E1E1E'
                    }
                    onClick={() => dispatch(SeleccionarModuloDescargaReducer("Catalogo"))}
                >
                    Catálogo
                </div>

                <div 
                    style={{
                        display:'flex',
                        justifyContent: "right",
                        position: "absolute",
                        right: "35px"
                    }}
                >
                    {
                        modulo_descarga_seleccionado == "Catalogo"
                        ?<div 
                            className='W600-S14-H19-L0015-CFFFFFF Btn-Opciones-Seleccionada-Descargar'
                            onClick={async() => {
                                await dispatch(DescargarPdfSucursalReducer(refBtnPdf, true))
                                dispatch(CambiarNombreArchivoAdjuntoEnvioCorreoReducer("Catálogo de Promociones.pdf"))
                                setNombreArchivoCorreoExcel("Catálogo de Promociones")
                                setMostrarModalEnviarCorreo(true)
                                
                            }}
                        >
                            Enviar Correo
                        </div>
                        :seleccionoEnvioCorreo == true
                        ?<div 
                            className='W600-S14-H19-L0015-CFFFFFF Btn-Opciones-Seleccionada-Descargar'
                        >
                            Enviar Correo
                        </div>
                        :<div 
                            className='W600-S14-H19-C1E1E1E Btn-Opciones-Descargar'
                            onClick={() => {
                                setSeleccionoEnvioCorreo(true)
                                setMostrarModalFiltroColumnas(true)
                                // setMostrarModalEnviarCorreo(true)
                            }}

                        >Enviar Correo</div>
                    }
                    
                    {
                        modulo_descarga_seleccionado == "Catalogo"
                        ?<Button 
                            className='W600-S14-H19-L0015-CFFFFFF Btn-Opciones-Seleccionada-Descargar'
                            loading={cargando_btn_excel_descargar_pdf}
                            onClick={async () => {
                                await dispatch(DescargarPdfSucursalReducer(refBtnPdf))
                                // setTimeout(async function () {
                                //     refBtnPdf.current.click()
                                // }, 3000)
                            }}
                        >
                            Descargar
                        </Button>
                        :seleccionoDescargar == true
                            ?<Button 
                                className='W600-S14-H19-L0015-CFFFFFF Btn-Opciones-Seleccionada-Descargar'
                                loading={cargando_btn_excel_descargar_pdf}
                            >
                                Descargar
                            </Button>
                            :<Button 
                                loading={cargando_btn_excel_descargar_pdf}
                                className='W600-S14-H19-C1E1E1E Btn-Opciones-Descargar'
                                onClick={() => {
                                    if(modulo_descarga_seleccionado == "Catalogo"){
                                        dispatch(DescargarPdfSucursalReducer())
                                    }else{
                                        setSeleccionoDescargar(true)
                                        setMostrarModalFiltroColumnas(true)
                                    }
                                }}
                            >Descargar</Button>
                    }
                </div>
            </div>

            <a 
                href={config.api+"/Sistema/Pdf/"+localStorage.getItem('usutoken')+".pdf"}
                target="_blank"
                style={{display:'none'}}
                ref={refBtnPdf}
            ></a>

            <div style={{marginLeft:'40px'}}>
                {
                    modulo_descarga_seleccionado == "Catalogo"
                    ?null
                    :<Row>
                        <Col xl={24} style={{marginBottom:'10px'}}>
                            <Checkbox 
                                className='Wbold-S14-H19-C1E1E1E'
                                
                                // checked={zona.zonpromociondescarga}
                                onChange={(e) => {
                                    dispatch(SeleccionarTodoSucursalesDescargarReducer(e.target.checked))
                                }}
                            >Descargar todo</Checkbox>
                        </Col>
                    </Row>
                }

                {
                    <Row>
                        {
                            zonas.map((zona, posicionZona) => {
                                return(
                                    <Col xl={8} style={{marginBottom:'40px'}}>
                                        <div style={{marginBottom:'10px'}}>
                                            {
                                                modulo_descarga_seleccionado == "Catalogo"
                                                ?<div className='Wbold-S14-H19-C1E1E1E'>
                                                    {zona.zonnombre}
                                                </div>
                                                :<Checkbox 
                                                    className='Wbold-S14-H19-C1E1E1E'
                                                    checked={zona.zonpromociondescarga}
                                                    onChange={(e) => {
                                                        dispatch(SeleccionarZonaDescargarReducer(posicionZona, e.target.checked))
                                                    }}
                                                >{zona.zonnombre}</Checkbox>
                                            }
                                        </div>
                                        {
                                            sucursalesUsuario.map((sucursal, posicionSucursal) => {
                                                return(
                                                    sucursal.zonid == zona.zonid
                                                    ?modulo_descarga_seleccionado == "Catalogo"
                                                        ?<div 
                                                            style={
                                                                posicionSucursal == 0
                                                                ?{display:'flex', position:'relative', height:'25px'}
                                                                :{display:'flex', position:'relative', height:'25px'}
                                                            }
                                                            onClick={() => {
                                                                dispatch(SeleccionarUnaSucursalDescargaReducer(posicionSucursal, !sucursal.sucpromociondescarga))
                                                            }}
                                                        >
                                                            <div className='Btn-Radio-Descargar'>
                                                                {
                                                                    sucursal.sucpromociondescarga == true
                                                                    ?<div className='Btn-Circulo-Radio-Descargar'>

                                                                    </div>
                                                                    :null
                                                                }
                                                            </div>
                                                            <div style={{position: "absolute", left: "25px"}}>
                                                                {sucursal.sucnombre}
                                                            </div>
                                                        </div>
                                                        :<div>
                                                            <Checkbox 
                                                                className='Wnormal-S14-H19-C1E1E1E'
                                                                checked={sucursal.sucpromociondescarga}
                                                                onChange={(e) => {
                                                                    dispatch(SeleccionarSucursalDescargaReducer(posicionSucursal, e.target.checked))
                                                                }}
                                                            >{sucursal.sucnombre}</Checkbox>
                                                        </div>
                                                    :null
                                                )
                                            })
                                        }
                                        
                                    </Col>
                                )
                            })
                        }
                    </Row>
                }

                
                {
                    canal_seleccionado == "Tradicional"
                    ?<Row>
                        <Col xl={8} style={{marginBottom:'40px'}}>
                            <div style={{marginBottom:'10px'}}>
                                {
                                    modulo_descarga_seleccionado == "Catalogo"
                                    ?<div className='Wbold-S14-H19-C1E1E1E'>
                                    Grupos 
                                    </div>
                                    :<Checkbox 
                                        className='Wbold-S14-H19-C1E1E1E'
                                        onChange={(e) => {
                                            dispatch(SeleccionarTodosGruposReducer(e.target.checked))
                                        }}
                                    >{"Grupos"}</Checkbox>
                                }
                            </div>
                            {
                                gsus.map((gsu, pos) => {
                                    return(
                                        <div>
                                            {
                                                modulo_descarga_seleccionado == "Catalogo"
                                                ?<div 
                                                    style={{display:'flex', position:'relative', height:'25px'}}
                                                    onClick={() => {
                                                        dispatch(SeleccionarUnaSucursalesGrupoReduecer(pos, !gsu.gsupromociondescarga))
                                                    }}
                                                >
                                                    <div className='Btn-Radio-Descargar'>
                                                        {
                                                            gsu.gsupromociondescarga == true
                                                            ?<div className='Btn-Circulo-Radio-Descargar'>

                                                            </div>
                                                            :null
                                                        }
                                                    </div>
                                                    <div style={{position: "absolute", left: "25px"}}>
                                                        {gsu.gsunombre}
                                                    </div>
                                                </div>
                                                :<Checkbox 
                                                    className='Wnormal-S14-H19-C1E1E1E'
                                                    onChange={(e) => {
                                                        dispatch(SeleccionarSucursalesGrupoReduecer(pos, e.target.checked))
                                                    }}
                                                    checked={gsu.gsupromociondescarga}
                                                >{gsu.gsunombre}</Checkbox>
                                            }
                                        </div>
                                    )
                                })
                            }
                            
                            
                        </Col>
                    </Row>
                    :null
                }
                
            </div>




            {
                mostrarModalEnviarCorreo == true
                ?<ModalEnviarCorreo 
                    mostrarModal = {mostrarModalEnviarCorreo}
                    setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                    setSelecciono = {setSeleccionoEnvioCorreo}
                    infoDataCorreo = {infoDataCorreo}
                    nombreArchivoCorreoExcel = {nombreArchivoCorreoExcel}
                    tituloArchivoCorreoExcel = {tituloArchivoCorreoExcel}
                    modulo_descarga_seleccionado = {modulo_descarga_seleccionado}
                    setMostrarModalCorreoEnviadoCorrecto = {setMostrarModalCorreoEnviadoCorrecto}
                />
                :null
            }

            <Modal
                visible={mostrarModalCorreoEnviadoCorrecto}
                centered
                footer={null}
                title={null}
                closeIcon={<div></div>}
                width="307px"
                height="193px"
                className='Modal-Envio-Correo-Correcto-Descargas'
            >
                <div style={{textAlignLast: "center", marginTop:'-10px'}}>
                    <div className='Icon-Modal-Envio-Correo-Correcto-Descargas'>
                        <CheckCircleOutlined />
                    </div>
                    <div className='Titulo-Modal-Envio-Correo-Correcto-Descargas W600-S14-H19-C1E1E1E'>
                        Su correo fue enviado con éxito
                    </div>
                    <div style={{textAlign: "-webkit-center"}} >
                        <div 
                            className='Btn-Listo-Modal-Envio-Correo-Correcto-Descargas Wbold-S14-H19-CFFFFFF'
                            onClick={() => {
                                setMostrarModalCorreoEnviadoCorrecto(false)
                            }}
                        >
                            Listo
                        </div>
                    </div>
                </div>
            </Modal>


            {
                modulo_descarga_seleccionado == "Promociones"
                ?<ModalFiltroColumnas 
                    SeleccionarTodoColumnasFiltroDescargarReducer   = {SeleccionarTodoColumnasFiltroDescargarReducer}
                    agrupacion_columnas_filtros_descargar           = {agrupacion_columnas_filtros_descargar}
                    AbrirAgrupacionColumnaFiltrosDescargarReducer   = {AbrirAgrupacionColumnaFiltrosDescargarReducer}
                    columnas_filtro_descargar                       = {columnas_filtro_descargar}
                    SeleccionarColumnaFiltroDescargaReducer         = {SeleccionarColumnaFiltroDescargaReducer}
                    columnas_seleccionadas_filtro_descarga          = {columnas_seleccionadas_filtro_descarga}
                    CambiarOrdenColumnasFiltroDescargaReducer       = {CambiarOrdenColumnasFiltroDescargaReducer}
                    ObtenerDataDescargarExcelReducer                = {ObtenerDataDescargarExcelReducer}
                    mesSeleccionadoFiltro                           = {mesSeleccionadoFiltro}
                    anioSeleccionadoFiltro                          = {anioSeleccionadoFiltro}
                    refBtnDescarga                                  = {refBtnDescarga}
                    data_descargar_excel_promociones                = {data_descargar_excel_promociones}
                    mostrarModalFiltroColumnas                      = {mostrarModalFiltroColumnas}
                    setMostrarModalFiltroColumnas                   = {setMostrarModalFiltroColumnas}
                    setSeleccionoEnvioCorreo                        = {setSeleccionoEnvioCorreo}
                    setSeleccionoDescargar                          = {setSeleccionoDescargar}
                    cargando_btn_excel_descargar                    = {cargando_btn_excel_descargar}
                    nombreExcelHojaDescargar                        = {"Promociones "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                    nombreExcelDescargar                            = {"Promociones Kimberly ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}

                    enviarCorreo = {seleccionoEnvioCorreo}
                    setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                    setInfoDataCorreo = {setInfoDataCorreo}
                    setNombreArchivoCorreoExcel = {setNombreArchivoCorreoExcel}
                    setTituloArchivoCorreoExcel = {setTituloArchivoCorreoExcel}

                />
                :modulo_descarga_seleccionado == "Sell In"
                    ?<ModalFiltroColumnas 
                        SeleccionarTodoColumnasFiltroDescargarReducer   = {SeleccionarTodoColumnasFiltroDescargarSellInReducer}
                        agrupacion_columnas_filtros_descargar           = {agrupacion_columnas_filtros_descargar_sellin}
                        AbrirAgrupacionColumnaFiltrosDescargarReducer   = {AbrirAgrupacionColumnaFiltrosDescargarSellInReducer}
                        columnas_filtro_descargar                       = {columnas_filtro_descargar_sellin}
                        SeleccionarColumnaFiltroDescargaReducer         = {SeleccionarColumnaFiltroDescargaSellInReducer}
                        columnas_seleccionadas_filtro_descarga          = {columnas_seleccionadas_filtro_descarga_sellin}
                        CambiarOrdenColumnasFiltroDescargaReducer       = {CambiarOrdenColumnasFiltroDescargaSellInReducer}
                        ObtenerDataDescargarExcelReducer                = {ObtenerDataDescargarExcelSellInReducer}
                        mesSeleccionadoFiltro                           = {mesSeleccionadoFiltro}
                        anioSeleccionadoFiltro                          = {anioSeleccionadoFiltro}
                        refBtnDescarga                                  = {refBtnDescarga}
                        data_descargar_excel_promociones                = {data_descargar_excel_sellin}
                        mostrarModalFiltroColumnas                      = {mostrarModalFiltroColumnas}
                        setMostrarModalFiltroColumnas                   = {setMostrarModalFiltroColumnas}
                        setSeleccionoEnvioCorreo                        = {setSeleccionoEnvioCorreo}
                        setSeleccionoDescargar                          = {setSeleccionoDescargar}
                        cargando_btn_excel_descargar                    = {cargando_btn_excel_descargar}
                        nombreExcelHojaDescargar                        = {"Ventas SI "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                        nombreExcelDescargar                            = {"Ventas SI Kimberly ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}

                        enviarCorreo = {seleccionoEnvioCorreo}
                        setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                        setInfoDataCorreo = {setInfoDataCorreo}
                        setNombreArchivoCorreoExcel = {setNombreArchivoCorreoExcel}
                        setTituloArchivoCorreoExcel = {setTituloArchivoCorreoExcel}
        
                    />
                    :modulo_descarga_seleccionado == "Sell Out"
                        ?<ModalFiltroColumnas 
                            SeleccionarTodoColumnasFiltroDescargarReducer   = {SeleccionarTodoColumnasFiltroDescargarSellOutReducer}
                            agrupacion_columnas_filtros_descargar           = {agrupacion_columnas_filtros_descargar_sellout}
                            AbrirAgrupacionColumnaFiltrosDescargarReducer   = {AbrirAgrupacionColumnaFiltrosDescargarSellOutReducer}
                            columnas_filtro_descargar                       = {columnas_filtro_descargar_sellout}
                            SeleccionarColumnaFiltroDescargaReducer         = {SeleccionarColumnaFiltroDescargaSellOutReducer}
                            columnas_seleccionadas_filtro_descarga          = {columnas_seleccionadas_filtro_descarga_sellout}
                            CambiarOrdenColumnasFiltroDescargaReducer       = {CambiarOrdenColumnasFiltroDescargaSellOutReducer}
                            ObtenerDataDescargarExcelReducer                = {ObtenerDataDescargarExcelSellOutReducer}
                            mesSeleccionadoFiltro                           = {mesSeleccionadoFiltro}
                            anioSeleccionadoFiltro                          = {anioSeleccionadoFiltro}
                            refBtnDescarga                                  = {refBtnDescarga}
                            data_descargar_excel_promociones                = {data_descargar_excel_sellout}
                            mostrarModalFiltroColumnas                      = {mostrarModalFiltroColumnas}
                            setMostrarModalFiltroColumnas                   = {setMostrarModalFiltroColumnas}
                            setSeleccionoEnvioCorreo                        = {setSeleccionoEnvioCorreo}
                            setSeleccionoDescargar                          = {setSeleccionoDescargar}
                            cargando_btn_excel_descargar                    = {cargando_btn_excel_descargar}
                            nombreExcelHojaDescargar                        = {"Ventas SO "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                            nombreExcelDescargar                            = {"Ventas SO Kimberly ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}

                            enviarCorreo = {seleccionoEnvioCorreo}
                            setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                            setInfoDataCorreo = {setInfoDataCorreo}
                            setNombreArchivoCorreoExcel = {setNombreArchivoCorreoExcel}
                            setTituloArchivoCorreoExcel = {setTituloArchivoCorreoExcel}
            
                        />
                        :modulo_descarga_seleccionado == "Reporte de pagos"
                            ?<ModalFiltroColumnas 
                                SeleccionarTodoColumnasFiltroDescargarReducer   = {SeleccionarTodoColumnasFiltroDescargarReportePagosReducer}
                                agrupacion_columnas_filtros_descargar           = {agrupacion_columnas_filtros_descargar_reportepagos}
                                AbrirAgrupacionColumnaFiltrosDescargarReducer   = {AbrirAgrupacionColumnaFiltrosDescargarReportePagosReducer}
                                columnas_filtro_descargar                       = {columnas_filtro_descargar_reportepagos}
                                SeleccionarColumnaFiltroDescargaReducer         = {SeleccionarColumnaFiltroDescargaReportePagosReducer}
                                columnas_seleccionadas_filtro_descarga          = {columnas_seleccionadas_filtro_descarga_reportepagos}
                                CambiarOrdenColumnasFiltroDescargaReducer       = {CambiarOrdenColumnasFiltroDescargaReportePagosReducer}
                                ObtenerDataDescargarExcelReducer                = {ObtenerDataDescargarExcelReportePagosReducer}
                                mesSeleccionadoFiltro                           = {mesSeleccionadoFiltro}
                                anioSeleccionadoFiltro                          = {anioSeleccionadoFiltro}
                                refBtnDescarga                                  = {refBtnDescarga}
                                data_descargar_excel_promociones                = {data_descargar_excel_reportepagos}
                                mostrarModalFiltroColumnas                      = {mostrarModalFiltroColumnas}
                                setMostrarModalFiltroColumnas                   = {setMostrarModalFiltroColumnas}
                                setSeleccionoEnvioCorreo                        = {setSeleccionoEnvioCorreo}
                                setSeleccionoDescargar                          = {setSeleccionoDescargar}
                                cargando_btn_excel_descargar                    = {cargando_btn_excel_descargar}
                                nombreExcelHojaDescargar                        = {"Reporte de Pagos "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                                nombreExcelDescargar                            = {"Reporte de Pagos Kimberly ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}

                                enviarCorreo = {seleccionoEnvioCorreo}
                                setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                                setInfoDataCorreo = {setInfoDataCorreo}
                                setNombreArchivoCorreoExcel = {setNombreArchivoCorreoExcel}
                                setTituloArchivoCorreoExcel = {setTituloArchivoCorreoExcel}
                
                            />
                            :modulo_descarga_seleccionado == "Promociones Liquidadas"
                                ?<ModalFiltroColumnas 
                                    SeleccionarTodoColumnasFiltroDescargarReducer   = {SeleccionarTodoColumnasFiltroDescargarPromocionesLiquidadasReducer}
                                    agrupacion_columnas_filtros_descargar           = {agrupacion_columnas_filtros_descargar_promocionesliquidadas}
                                    AbrirAgrupacionColumnaFiltrosDescargarReducer   = {AbrirAgrupacionColumnaFiltrosDescargarPromocionesLiquidadasReducer}
                                    columnas_filtro_descargar                       = {columnas_filtro_descargar_promocionesliquidadas}
                                    SeleccionarColumnaFiltroDescargaReducer         = {SeleccionarColumnaFiltroDescargaPromocionesLiquidadasReducer}
                                    columnas_seleccionadas_filtro_descarga          = {columnas_seleccionadas_filtro_descarga_promocionesliquidadas}
                                    CambiarOrdenColumnasFiltroDescargaReducer       = {CambiarOrdenColumnasFiltroDescargaPromocionesLiquidadasReducer}
                                    ObtenerDataDescargarExcelReducer                = {ObtenerDataDescargarExcelPromocionesLiquidadasReducer}
                                    mesSeleccionadoFiltro                           = {mesSeleccionadoFiltro}
                                    anioSeleccionadoFiltro                          = {anioSeleccionadoFiltro}
                                    refBtnDescarga                                  = {refBtnDescarga}
                                    data_descargar_excel_promociones                = {data_descargar_excel_promocionesliquidadas}
                                    mostrarModalFiltroColumnas                      = {mostrarModalFiltroColumnas}
                                    setMostrarModalFiltroColumnas                   = {setMostrarModalFiltroColumnas}
                                    setSeleccionoEnvioCorreo                        = {setSeleccionoEnvioCorreo}
                                    setSeleccionoDescargar                          = {setSeleccionoDescargar}
                                    cargando_btn_excel_descargar                    = {cargando_btn_excel_descargar}
                                    nombreExcelHojaDescargar                        = {"Promociones Liquidadas "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                                    nombreExcelDescargar                            = {"Promociones Liquidadas Kimberly ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}

                                    enviarCorreo = {seleccionoEnvioCorreo}
                                    setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                                    setInfoDataCorreo = {setInfoDataCorreo}
                                    setNombreArchivoCorreoExcel = {setNombreArchivoCorreoExcel}
                                    setTituloArchivoCorreoExcel = {setTituloArchivoCorreoExcel}
                    
                                />
                                :null
            }

        </div>
    )
}

export default Descargas