import React, {useRef, useEffect, useState} from 'react'
import { Row, Col, Button, Spin, Checkbox  } from 'antd';
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
import IconoFlechaAbajoNegro from '../../Assets/Img/Tabla/flechaabajonegro.png'
import FiltroLp from '../../Componentes/Rutas/ListaPrecios/FiltroLp';
import {
    RealizarFiltroReducer,
    SeleccionarCheckFiltrosReducer,
    TerminarFiltrosReducer,
    SeleccionarTodoFiltrosLPReducer
} from '../../Redux/Acciones/ListaPrecios/ArmarFiltrosLp'

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
        cargando_btn_excel_listaprecios,

        fil_dat_categorias,
        fil_dat_subcategorias,
        fil_dat_formato,
        fil_dat_codsap,
        fil_dat_material,

        fil_selectodo_dat_categorias,
        fil_selectodo_dat_subcategorias,
        fil_selectodo_dat_formato,
        fil_selectodo_dat_codsap,
        fil_selectodo_dat_material
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
                style={{paddingLeft:'40px', marginBottom:'20px', marginTop: "95px", background:'#EDF0FA', paddingTop:'5px', paddingBottom:'5px'}}
            >
                Lista de Precios
            </div>

            <div>
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

            <div className='Fila-Btns-Lista-Precios'>

                <div
                    style={{marginLeft:'-20px'}}
                >
                    <FiltroAnioVentasPromociones />
                </div>
                <div style={{marginRight:'20px', marginLeft:'20px'}}>
                    <FiltroMesVentasPromociones />                    
                </div>
                
                <FiltroLp 
                    titulo = {"Customer Group"}
                    fil_data = {grupos_disponibles_lista_precios}
                    tamanio = "0"
                    seleccionartodo = {false}
                />

                <FiltroLp 
                    titulo = {"Categoría"}
                    fil_data = {fil_dat_categorias}
                    tamanio = "160"
                    aceptarFiltro = {() => {
                        dispatch(RealizarFiltroReducer("categoria"))
                    }}
                    seleccionarLista = {(posicion, valor) => {
                        dispatch(SeleccionarCheckFiltrosReducer("categoria", posicion, valor))
                    }}
                    seleccionartodo = {fil_selectodo_dat_categorias}
                    funSeleccionarTodo = {(valor) => {
                        dispatch(SeleccionarTodoFiltrosLPReducer("categoria", valor))
                    }}
                />

                <FiltroLp 
                    titulo = {"Subcategoría"}
                    fil_data = {fil_dat_subcategorias}
                    tamanio = "160"
                    aceptarFiltro = {() => {
                        dispatch(RealizarFiltroReducer("subcategoria"))
                    }}
                    seleccionarLista = {(posicion, valor) => {
                        dispatch(SeleccionarCheckFiltrosReducer("subcategoria", posicion, valor))
                    }}
                    seleccionartodo = {fil_selectodo_dat_subcategorias}
                    funSeleccionarTodo = {(valor) => {
                        dispatch(SeleccionarTodoFiltrosLPReducer("subcategoria", valor))
                    }}
                />

                <FiltroLp 
                    titulo = {"Formato"}
                    fil_data = {fil_dat_formato}
                    tamanio = "160"
                    aceptarFiltro = {() => {
                        dispatch(RealizarFiltroReducer("formato"))
                    }}
                    seleccionarLista = {(posicion, valor) => {
                        dispatch(SeleccionarCheckFiltrosReducer("formato", posicion, valor))
                    }}
                    seleccionartodo = {fil_selectodo_dat_formato}
                    funSeleccionarTodo = {(valor) => {
                        dispatch(SeleccionarTodoFiltrosLPReducer("formato", valor))
                    }}
                />

                <FiltroLp 
                    titulo = {"Cod SAP"}
                    fil_data = {fil_dat_codsap}
                    tamanio = "160"
                    aceptarFiltro = {() => {
                        dispatch(RealizarFiltroReducer("codsap"))
                    }}
                    seleccionarLista = {(posicion, valor) => {
                        dispatch(SeleccionarCheckFiltrosReducer("codsap", posicion, valor))
                    }}
                    seleccionartodo = {fil_selectodo_dat_codsap}
                    funSeleccionarTodo = {(valor) => {
                        dispatch(SeleccionarTodoFiltrosLPReducer("codsap", valor))
                    }}
                />

                <FiltroLp 
                    titulo = {"Nombre Material"}
                    fil_data = {fil_dat_material}
                    tamanio = "280"
                    aceptarFiltro = {() => {
                        dispatch(RealizarFiltroReducer("material"))
                    }}
                    seleccionarLista = {(posicion, valor) => {
                        dispatch(SeleccionarCheckFiltrosReducer("material", posicion, valor))
                    }}
                    seleccionartodo = {fil_selectodo_dat_material}
                    funSeleccionarTodo = {(valor) => {
                        dispatch(SeleccionarTodoFiltrosLPReducer("material", valor))
                    }}
                />

            </div>
            

            <div style={{zIndex:'-2'}}>
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