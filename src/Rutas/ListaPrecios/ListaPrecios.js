import React, {useRef, useEffect, useState} from 'react'
import { Row, Col, Button, Spin } from 'antd';
import '../../Estilos/Rutas/ListaPrecios/ListaPrecios.css'
import ReactExport from 'react-data-export';
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerGrupoDisponiblesReducer,
    ObtenerDataExcelListaPreciosReducer,

    SeleccionarTodoColumnasFiltroDescargarListaPreciosReducer,
    AbrirAgrupacionColumnaFiltrosListaPreciosReducer,
    SeleccionarColumnaFiltroListaPreciosReducer,
    CambiarOrdenColumnasFiltroListaPreciosReducer,

    ObtenerDataDescargarExcelReducer
} from '../../Redux/Acciones/ListaPrecios/ListaPrecios'
import FiltroAnioVentasPromociones from '../../Componentes/Filtros/Botones/FiltroAnioVentasPromociones';
import FiltroMesVentasPromociones from '../../Componentes/Filtros/Botones/FiltroMesVentasPromociones';
import ModalFiltroColumnas from '../../Componentes/Rutas/Descargas/ModalFiltroColumnas';
import ModalEnviarCorreo from '../../Componentes/Rutas/Descargas/ModalEnviarCorreo';
import TablaLP from '../../Componentes/Rutas/ListaPrecios/TablaLP/TablaLP';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ListaPrecios = () => {

    const dispatch = useDispatch()

    const {
        aplicandoFiltroFechas,
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        grupos_disponibles_lista_precios,
        data_excel_lista_precios,
        data_tabla_lista_precios,
        cargando_datos_tabla_lista_precios,

        agrupacion_columnas_filtros_descargar_listaprecios,
        columnas_filtro_descargar_listaprecios,
        columnas_seleccionadas_filtro_descarga_listaprecios,
        data_descargar_excel_listaprecios,
        cargando_btn_excel_listaprecios
    } = useSelector(({listaPrecios}) => listaPrecios);

    let refBtnDescargaListaPrecios = useRef(null)

    const [mostrarModalFiltroColumnas, setMostrarModalFiltroColumnas] = useState(false)
    const [seleccionoEnvioCorreo, setSeleccionoEnvioCorreo] = useState(false)
    const [seleccionoDescargar, setSeleccionoDescargar] = useState(false)
    const [mostrarModalEnviarCorreo, setMostrarModalEnviarCorreo] = useState(false)
    const [infoDataCorreo, setInfoDataCorreo] = useState("")
    const [nombreArchivoCorreoExcel, setNombreArchivoCorreoExcel] = useState("")
    const [tituloArchivoCorreoExcel, setTituloArchivoCorreoExcel] = useState("")

    useEffect(() => {

        if(grupos_disponibles_lista_precios.length == 0){
            dispatch(ObtenerGrupoDisponiblesReducer())
        }

    }, [])

    useEffect(() => {

        if(aplicandoFiltroFechas == true){
            if(grupos_disponibles_lista_precios.length > 0){
                dispatch(ObtenerDataExcelListaPreciosReducer(grupos_disponibles_lista_precios[0]['treid'], 0))
            }
        }

    }, [mesSeleccionadoFiltro, anioSeleccionadoFiltro])

    return (
        <div>

            <div 
                className='Wbold-S20-H35-C3646C4' 
                style={{paddingLeft:'40px', marginBottom:'20px', marginTop: "100px", background:'#EDF0FA', paddingTop:'5px', paddingBottom:'5px'}}
            >
                Lista de Precios
            </div>

            <div className='Fila-Btns-Lista-Precios'>
                {
                    grupos_disponibles_lista_precios.map((grupo, pos) => {
                        return (
                            <Button 
                                className={
                                    grupo.seleccionado == true
                                    ?'Btn-Lista-Precios-Seleccionado W600-S14-H19-CFFFFFF'
                                    :'Btn-Lista-Precios W600-S14-H19-C1E1E1E'
                                }
                                onClick={ async () => {
                                    await dispatch(ObtenerDataExcelListaPreciosReducer(grupo.treid, pos))
                                    // refBtnDescargaListaPrecios.current.click()
                                }}
                                loading={grupo.cargando}
                            >
                                {
                                    grupo.trenombre == "ZA"
                                    ?grupo.trenombre+" - Estratégico"
                                    :grupo.trenombre == "ZB"
                                        ?grupo.trenombre+" - Táctico"
                                        :grupo.trenombre == "ZC"
                                            ?grupo.trenombre+" - Broker"
                                            :null
                                }
                                
                            </Button>              
                        )
                    })
                }

                <FiltroMesVentasPromociones />
                <div style={{marginRight:'20px'}}>
                    <FiltroAnioVentasPromociones />
                </div>

                {/* <div className='Btn-Todos-Filtros-Lista-Precios W600-S14-H19-C1E1E1E'>
                    Todos los filtros
                </div> */}
                <div style={{width:'100%'}}>
                    <Button 
                        className={
                            data_excel_lista_precios.length > 0
                            ?data_excel_lista_precios[0]['data'].length > 0
                                ?'Btn-Descargar-Lista-Precios Wbold-S14-H19-CFFFFFF'
                                :'Btn-Descargar-Lista-Precios-Desactivado Wbold-S14-H19-C1E1E1E'
                            :'Btn-Descargar-Lista-Precios-Desactivado Wbold-S14-H19-C1E1E1E'
                        }
                        // onClick={() => {
                        //     if(data_excel_lista_precios[0]['data'].length > 0){
                        //         refBtnDescargaListaPrecios.current.click()
                        //     }
                        // }}
                        onClick={() => {
                            setSeleccionoDescargar(true)
                            setMostrarModalFiltroColumnas(true)
                        }}
                    >
                        Descargar
                    </Button>
                </div>
            </div>

            <div>
                <div id="Contenedor-Tabla-Lista-Precios">
                    <Spin spinning={cargando_datos_tabla_lista_precios}>
                        <TablaLP 
                            data_tabla_lista_precios = {data_tabla_lista_precios}
                        />
                    </Spin>
                </div>
            </div>

            <ModalEnviarCorreo 
                mostrarModal = {mostrarModalEnviarCorreo}
                setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                setSelecciono = {setSeleccionoEnvioCorreo}
                infoDataCorreo = {infoDataCorreo}
                nombreArchivoCorreoExcel = {nombreArchivoCorreoExcel}
                tituloArchivoCorreoExcel = {tituloArchivoCorreoExcel}
                modulo_descarga_seleccionado = {"Lista de Precios"}
            />

            <ModalFiltroColumnas 
                SeleccionarTodoColumnasFiltroDescargarReducer   = {SeleccionarTodoColumnasFiltroDescargarListaPreciosReducer}
                agrupacion_columnas_filtros_descargar           = {agrupacion_columnas_filtros_descargar_listaprecios}
                AbrirAgrupacionColumnaFiltrosDescargarReducer   = {AbrirAgrupacionColumnaFiltrosListaPreciosReducer}
                columnas_filtro_descargar                       = {columnas_filtro_descargar_listaprecios}
                SeleccionarColumnaFiltroDescargaReducer         = {SeleccionarColumnaFiltroListaPreciosReducer}
                columnas_seleccionadas_filtro_descarga          = {columnas_seleccionadas_filtro_descarga_listaprecios}
                CambiarOrdenColumnasFiltroDescargaReducer       = {CambiarOrdenColumnasFiltroListaPreciosReducer}
                ObtenerDataDescargarExcelReducer                = {ObtenerDataDescargarExcelReducer}
                mesSeleccionadoFiltro                           = {mesSeleccionadoFiltro}
                anioSeleccionadoFiltro                          = {anioSeleccionadoFiltro}
                refBtnDescarga                                  = {refBtnDescargaListaPrecios}
                // data_descargar_excel_promociones                = {data_descargar_excel_listaprecios}
                data_descargar_excel_promociones                = {data_excel_lista_precios}
                mostrarModalFiltroColumnas                      = {mostrarModalFiltroColumnas}
                setMostrarModalFiltroColumnas                   = {setMostrarModalFiltroColumnas}
                setSeleccionoEnvioCorreo                        = {setSeleccionoEnvioCorreo}
                setSeleccionoDescargar                          = {setSeleccionoDescargar}
                cargando_btn_excel_descargar                    = {cargando_btn_excel_listaprecios}
                nombreExcelHojaDescargar                        = {"Lista de Precios "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                nombreExcelDescargar                            = {"Lista de Precios ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}

                enviarCorreo = {seleccionoEnvioCorreo}
                setMostrarModalEnviarCorreo = {setMostrarModalEnviarCorreo}
                setInfoDataCorreo = {setInfoDataCorreo}
                setNombreArchivoCorreoExcel = {setNombreArchivoCorreoExcel}
                setTituloArchivoCorreoExcel = {setTituloArchivoCorreoExcel}

            />



            <ExcelFile 
                filename={"Lista de Precios ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}
                element={
                    <button ref={refBtnDescargaListaPrecios} style={{display:'none'}} >
                        descargar
                    </button>
                }>
                <ExcelSheet 
                    dataSet={data_excel_lista_precios} 
                    name={"Lista de Precios "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                />
            </ExcelFile>

        </div>
    )
}

export default ListaPrecios