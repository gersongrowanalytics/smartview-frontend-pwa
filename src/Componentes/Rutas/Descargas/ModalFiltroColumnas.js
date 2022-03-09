import React from 'react'
import { Checkbox, Row, Col, Modal, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { CaretDownOutlined, CaretRightOutlined, CaretLeftOutlined, CaretUpOutlined } from '@ant-design/icons';
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ModalFiltroColumnas = (props) => {

    let mostrarModalFiltroColumnas    = props.mostrarModalFiltroColumnas
    let setMostrarModalFiltroColumnas = props.setMostrarModalFiltroColumnas
    let setSeleccionoEnvioCorreo      = props.setSeleccionoEnvioCorreo
    let setSeleccionoDescargar        = props.setSeleccionoDescargar

    let SeleccionarTodoColumnasFiltroDescargarReducer   = props.SeleccionarTodoColumnasFiltroDescargarReducer
    let agrupacion_columnas_filtros_descargar           = props.agrupacion_columnas_filtros_descargar
    let AbrirAgrupacionColumnaFiltrosDescargarReducer   = props.AbrirAgrupacionColumnaFiltrosDescargarReducer
    let columnas_filtro_descargar                       = props.columnas_filtro_descargar
    let SeleccionarColumnaFiltroDescargaReducer         = props.SeleccionarColumnaFiltroDescargaReducer
    let columnas_seleccionadas_filtro_descarga          = props.columnas_seleccionadas_filtro_descarga
    let CambiarOrdenColumnasFiltroDescargaReducer       = props.CambiarOrdenColumnasFiltroDescargaReducer
    let ObtenerDataDescargarExcelReducer                = props.ObtenerDataDescargarExcelReducer
    let mesSeleccionadoFiltro                           = props.mesSeleccionadoFiltro
    let anioSeleccionadoFiltro                          = props.anioSeleccionadoFiltro
    let refBtnDescarga                                  = props.refBtnDescarga
    let data_descargar_excel_promociones                = props.data_descargar_excel_promociones
    let cargando_btn_excel_descargar                    = props.cargando_btn_excel_descargar

    let nombreExcelHojaDescargar = props.nombreExcelHojaDescargar
    let nombreExcelDescargar     = props.nombreExcelDescargar

    let enviarCorreo     = props.enviarCorreo
    let setMostrarModalEnviarCorreo     = props.setMostrarModalEnviarCorreo
    let setInfoDataCorreo = props.setInfoDataCorreo
    let setNombreArchivoCorreoExcel = props.setNombreArchivoCorreoExcel
    let setTituloArchivoCorreoExcel = props.setTituloArchivoCorreoExcel
    
    const dispatch = useDispatch()

    return (
        <>
            <Modal
                visible={mostrarModalFiltroColumnas}
                centered
                title={null}
                footer={null}
                closeIcon={<div></div>}
                style={{borderRadius:'50px'}}
                bodyStyle={{borderRadius:'50px'}}
                className='Modal-Mostrar-Filtros-Columnas-Descargar'
                width={"567px"}
                onCancel={() => {
                    setSeleccionoEnvioCorreo(false)
                    setSeleccionoDescargar(false)
                    setMostrarModalFiltroColumnas(false)
                }} 
            >
                <div>
                    <Row>
                        <Col 
                            xl={24}
                            style={{
                                textAlign: "-webkit-center",
                                marginBottom:'20px'
                            }}
                        >
                            <div className='Wbold-S16-H21-C1E1E1E'>
                                Filtros de Columnas
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={11}>
                            <div className='Columna-Filtro-Columnas-Descargar'>
                                <div className='Contenedor-Cabecera-Columna-Filtro-Columnas-Descargar'>
                                    <div className='Wbold-S14-H19-C1E1E1E'>
                                        Columnas 
                                    </div>
                                    <div className='Wnormal-S11-H15-C706C64-L0015'>
                                        Lista de columnas disponibles
                                    </div>
                                </div>
                                <div
                                    style={{
                                        marginLeft:'18px',
                                        marginTop:'8px',
                                        marginBottom:'8px'
                                    }}
                                >
                                    <Checkbox 
                                        className='W600-S12-H19-C1E1E1E'
                                        onChange={(e) => dispatch(SeleccionarTodoColumnasFiltroDescargarReducer(e.target.checked))}
                                    >
                                        Seleccionar todo
                                    </Checkbox>
                                </div>
                                <div
                                    style={{
                                        marginTop:'8px',
                                        marginBottom:'8px',
                                        overflowY: "auto",
                                        height: "192px"
                                    }}
                                >
                                    {
                                        agrupacion_columnas_filtros_descargar.map((agrupacion, posagrupacion) => {
                                            return(
                                                <>
                                                    <div 
                                                        style={{display:'flex', background:'#3646C4', paddingLeft:'18px', position:'relative', width:'100%', height:'20px', marginBottom:'3px', cursor:'pointer'}}
                                                        onClick={() => dispatch(AbrirAgrupacionColumnaFiltrosDescargarReducer(posagrupacion, !agrupacion.abierto))}
                                                    >
                                                        <div style={{color:'white', position:'absolute', top:'-2px'}}>
                                                            {
                                                                agrupacion.abierto == true
                                                                ?<CaretDownOutlined />
                                                                :<CaretRightOutlined />
                                                            }
                                                        </div>
                                                        <div 
                                                            className='W600-S11-H15-CFFFFFF'
                                                            style={{position:'absolute', top:'1px', left:'35px'}}
                                                        >
                                                            {agrupacion.agrupacionHml}
                                                        </div>
                                                    </div>
                                                    {
                                                        columnas_filtro_descargar.map((columna, pos) => {
                                                            return(
                                                                columna.agrupacion == agrupacion.agrupacion
                                                                ?columna.seleccionado == false
                                                                    ?agrupacion.abierto == true
                                                                        ?<div style={{paddingLeft:'30px', marginBottom:'2px'}}>
                                                                            <Checkbox 
                                                                                className='W600-S12-H16-C1E1E1E'
                                                                                onChange={() => dispatch(SeleccionarColumnaFiltroDescargaReducer(pos, true))}
                                                                                checked={false}
                                                                            >
                                                                                {columna.columna}
                                                                            </Checkbox>
                                                                        </div>
                                                                        :null
                                                                    :null
                                                                :null
                                                            )
                                                        })
                                                    }
                                                </>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </Col>
                        <Col xl={2} style={{alignSelf: "center"}}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div>
                                    <div
                                        style={{marginBottom:'5px'}} 
                                        className='Caja-Flecha-Columnas-Descargar'>
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-4px",
                                                    left: "1px",
                                                }}
                                            >
                                                <CaretRightOutlined />
                                            </div>
                                    </div>
                                    <div className='Caja-Flecha-Columnas-Descargar'>
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "-3px",
                                                right: "1px",
                                            }}
                                        >
                                            <CaretLeftOutlined />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={11}>
                            <div className='Columna-Filtro-Columnas-Descargar'>
                                <div className='Contenedor-Cabecera-Columna-Filtro-Columnas-Descargar'>
                                    <div className='Wbold-S14-H19-C1E1E1E'>
                                        Columnas a Mostrar
                                    </div>
                                    <div className='Wnormal-S11-H15-C706C64-L0015'>
                                        Seleccionar las columnas que desea mostrar
                                    </div>
                                </div>
                                <div
                                    style={{
                                        overflowY: "auto",
                                        height: "227px"
                                    }}
                                >
                                    {
                                        columnas_seleccionadas_filtro_descarga.map((columna, pos) => {
                                            return(
                                                columna.seleccionado == true
                                                ?<div className='Fila-Columna-Filtro-Descargar-Seleccionados'>
                                                    <Checkbox 
                                                        className='W600-S12-H16-C1E1E1E'
                                                        onChange={() => dispatch(SeleccionarColumnaFiltroDescargaReducer(pos, false))}
                                                        checked={true}
                                                    >
                                                        {columna.columna}
                                                    </Checkbox>
                                                    <div 
                                                        style={{
                                                            position:'absolute',
                                                            top: "7px",
                                                            right: "25px",
                                                            fontSize: "11px",
                                                        }}
                                                    >
                                                        <div
                                                            style={
                                                                pos == 0
                                                                ?{
                                                                    position: "absolute",
                                                                    top: "-5px",
                                                                    color: "#C4C4C4",
                                                                    height: "9px",
                                                                    width: "11px",
                                                                    cursor:'not-allowed'
                                                                }
                                                                :{
                                                                    position: "absolute",
                                                                    top: "-5px",
                                                                    height: "9px",
                                                                    width: "11px",
                                                                    cursor:'pointer'
                                                                }
                                                            }
                                                            // onClick={() => alert('sube')} 
                                                            onClick={() => dispatch(CambiarOrdenColumnasFiltroDescargaReducer(parseFloat(columna.orden) - 1, "SUBIR", pos))} 
                                                        >
                                                            <CaretUpOutlined 
                                                                style={{position: "absolute"}}
                                                            />
                                                        </div>
                                                        <div
                                                            style={
                                                                (parseFloat(columnas_seleccionadas_filtro_descarga.length)-1) == parseFloat(pos)
                                                                ?{
                                                                    position: "absolute",
                                                                    top: "4px",
                                                                    color: "#C4C4C4",
                                                                    height: "9px",
                                                                    width: "11px",
                                                                    cursor:'not-allowed'
                                                                }
                                                                :{
                                                                    position: "absolute",
                                                                    top: "4px",
                                                                    height: "9px",
                                                                    width: "11px",
                                                                    cursor:'pointer'
                                                                }
                                                            }
                                                            onClick={() => dispatch(CambiarOrdenColumnasFiltroDescargaReducer(parseFloat(columna.orden) + 1, "BAJAR", pos))} 
                                                        >
                                                            <CaretDownOutlined 
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "-1px",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                :null
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div style={{display:'flex', justifyContent: "right", marginTop:'20px'}}>
                        <Button
                            style={
                                columnas_seleccionadas_filtro_descarga.length > 0
                                ?{marginRight:'10px', background:'#3646C3', borderRadius:'14px'}
                                :{marginRight:'10px', cursor:'not-allowed', borderRadius:'14px', border: "1px solid #1E1E1E"}
                            } 
                            className={
                                columnas_seleccionadas_filtro_descarga.length > 0
                                ?'Btn-Opciones-Modal-Filtros-Columnas-Descargar Wbold-S12-H16-CFFFFFF'
                                :'Btn-Opciones-Modal-Filtros-Columnas-Descargar W600-S12-H16-C1E1E1E'
                            }
                            onClick={async () => {
                                if(columnas_seleccionadas_filtro_descarga.length > 0){
                                    await dispatch(ObtenerDataDescargarExcelReducer())

                                    if(enviarCorreo == true){
                                        setInfoDataCorreo(data_descargar_excel_promociones)
                                        setNombreArchivoCorreoExcel(nombreExcelDescargar)
                                        setTituloArchivoCorreoExcel(nombreExcelHojaDescargar)
                                        setSeleccionoDescargar(false)
                                        setMostrarModalFiltroColumnas(false)
                                        setMostrarModalEnviarCorreo(true)

                                    }else{
                                        refBtnDescarga.current.click()
                                    }
                                }
                            }}
                            loading={cargando_btn_excel_descargar}
                        >
                            Aceptar
                        </Button>
                        <div
                            onClick={() => {
                                setSeleccionoEnvioCorreo(false)
                                setSeleccionoDescargar(false)
                                setMostrarModalFiltroColumnas(false)
                            }} 
                            className='Btn-Opciones-Modal-Filtros-Columnas-Descargar W600-S12-H16-C1E1E1E'>Cancelar</div>
                    </div>
                    <ExcelFile 
                        // filename={"Promociones Kimberly ("+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro+")"}
                        filename={nombreExcelDescargar}
                        element={
                            <button ref={refBtnDescarga} style={{display:'none'}} >
                                descargar
                            </button>
                        }>
                        <ExcelSheet 
                            dataSet={data_descargar_excel_promociones} 
                            // name={"Promociones "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                            name={nombreExcelHojaDescargar}
                        />
                    </ExcelFile>
                </div>
            </Modal>
        </>
    )
}

export default ModalFiltroColumnas