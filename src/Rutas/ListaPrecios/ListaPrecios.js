import React, {useRef, useEffect} from 'react'
import { Row, Col, Button, Spin } from 'antd';
import '../../Estilos/Rutas/ListaPrecios/ListaPrecios.css'
import IconoFlechaAbajo from '../../Assets/Img/Tabla/flechaabajo.png'
import ReactExport from 'react-data-export';
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerGrupoDisponiblesReducer,
    ObtenerDataExcelListaPreciosReducer
} from '../../Redux/Acciones/ListaPrecios/ListaPrecios'
import FiltroAnioVentasPromociones from '../../Componentes/Filtros/Botones/FiltroAnioVentasPromociones';
import FiltroMesVentasPromociones from '../../Componentes/Filtros/Botones/FiltroMesVentasPromociones';
import funFormatoDecimal from '../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';

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
        cargando_datos_tabla_lista_precios
    } = useSelector(({listaPrecios}) => listaPrecios);

    let refBtnDescargaListaPrecios = useRef(null)

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

                {/* <div className='Btn-Lista-Precios W600-S14-H19-C1E1E1E'>
                    Mes
                </div>
                <div className='Btn-Lista-Precios W600-S14-H19-C1E1E1E'>
                    Año
                </div> */}
                <div className='Btn-Todos-Filtros-Lista-Precios W600-S14-H19-C1E1E1E'>
                    Todos los filtros
                </div>
                <div style={{width:'100%'}}>
                    <Button 
                        className={
                            data_excel_lista_precios.length > 0
                            ?data_excel_lista_precios[0]['data'].length > 0
                                ?'Btn-Descargar-Lista-Precios Wbold-S14-H19-CFFFFFF'
                                :'Btn-Descargar-Lista-Precios-Desactivado Wbold-S14-H19-C1E1E1E'
                            :'Btn-Descargar-Lista-Precios-Desactivado Wbold-S14-H19-C1E1E1E'
                        }
                        onClick={() => {
                            if(data_excel_lista_precios[0]['data'].length > 0){
                                refBtnDescargaListaPrecios.current.click()
                            }
                        }}
                    >
                        Descargar
                    </Button>
                </div>
            </div>

            <div className='Wbold-S26-H35-C1E1E1E' style={{marginLeft:'40px', marginBottom:'20px'}}>
                Lista de Precios
            </div>

            <div>
                <div id="Contenedor-Tabla-Lista-Precios">
                    <Spin spinning={cargando_datos_tabla_lista_precios}>
                        <table
                            className='Tabla-Principal'
                            style={{position:'relative', width:'100%'}}
                        >


                            <thead className="Wbold-S14-H19-CFFFFFF">
                                <tr>
                                    <th 
                                        rowSpan={2} 
                                        style={{
                                            position: "sticky",
                                            left: "0",
                                            zIndex: "2",
                                            backgroundColor: "#1EC0ED"
                                        }}
                                    >
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Categoría
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Subcategoría
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Código SAP
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                EAN
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Descripción de producto
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Unidad de
                                                Venta
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Precio Lista
                                                sin IGV
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                % Alza
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                SD/TPR
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th rowSpan={2}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Precio Lista
                                                con IGV
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th 
                                        colspan="4" 
                                        style={{
                                            background:'black', paddingTop:'10px', paddingBottom:'10px',
                                            borderRight:'2px solid white',
                                            borderLeft:'2px solid white',
                                            height: "0px"
                                        }}

                                    >
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            MAYORISTA
                                        </div>
                                    </th>
                                    <th 
                                        colspan="4"
                                        style={{
                                            background:'black', paddingTop:'10px', paddingBottom:'10px',
                                            borderRight:'2px solid white',
                                            borderLeft:'2px solid white',
                                            height: "0px"
                                        }}
                                    >
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            MINORISTA
                                        </div>
                                    </th>
                                    <th colspan="4" style={{background:'black', height: "0px"}}>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            BODEGA
                                        </div>
                                    </th>
                                </tr>
                                <tr>                                
                                    <th>

                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                MF Ruta 
                                                Mayorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>

                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Reventa
                                                Mayorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>

                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Margen
                                                Mayorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>

                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Marcaje
                                                Mayorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>

                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                MF Ruta
                                                Minorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Reventa
                                                Minorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Margen
                                                Minorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Marcaje
                                                Minorista
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>

                                    {/* BODEGA */}

                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                MF Ruta Horizontal
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Reventa Bodega
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                Margen Bodega
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>

                                    <th>
                                        <div
                                            className='Contenedor-Cabecera-Tabla'
                                        >
                                            <div>
                                                PVP
                                            </div>
                                            <div className='Contenedor-Icono-Flecha-Tabla'>
                                                <img src={IconoFlechaAbajo} className="Icono-Flecha-Tabla" />
                                            </div>
                                        </div>
                                    </th>
                                </tr>


                            </thead>
                            
                            

                            
                            <tbody>
                                {
                                    data_tabla_lista_precios.map((dat, pos) => {
                                        return(
                                            <tr className='W600-S12-H16-C1E1E1E'>
                                                <td className='W600-S12-H16-C1E1E1E'>{dat.catnombre}</td>
                                                <td className='W600-S12-H16-C1E1E1E'>{dat.ltpsubcategoria}</td>
                                                <td className='W600-S12-H16-C1E1E1E'>{dat.ltpcodigosap}</td>
                                                <td className='W600-S12-H16-C1E1E1E'>{dat.ltpean}</td>
                                                <td className='W600-S12-H16-C1E1E1E'>{dat.pronombre}</td>
                                                <td className='W600-S12-H16-C1E1E1E'>{dat.ltpunidadventa}</td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltppreciolistasinigv, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpalza * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpsdtpr * 100, 2)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltppreciolistaconigv, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpmfrutamayorista * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltpreventamayorista, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpmargenmayorista * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltpmarcajemayorista, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                
                                                {/* MINORISTA */}
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpmfrutaminorista * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltpreventaminorista, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpmargenminorista * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltpmarcajeminorista, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>

                                                {/* BODEGA */}
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpmfrutahorizontal * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltpreventabodega, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    {
                                                        funFormatoDecimal(dat.ltpmargenbodega * 100, 1)
                                                    }%
                                                </td>
                                                <td className='W600-S12-H16-C1E1E1E'>
                                                    S/<NumberFormat value={funFormatoDecimal(dat.ltppvp, 2)} displayType={'text'} thousandSeparator={true} />
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            
                        </table>
                    </Spin>
                </div>
            </div>



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