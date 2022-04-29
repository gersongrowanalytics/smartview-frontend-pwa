import React, {useRef, useState} from 'react'
import { Link } from "react-router-dom";
import {Tooltip, Select, Spin, notification} from "antd";
import FiltroAnioVentasPromociones from '../../../Componentes/Filtros/Botones/FiltroAnioVentasPromociones'
import FiltroMesVentasPromociones from '../../../Componentes/Filtros/Botones/FiltroMesVentasPromociones'
import IconoFlechaAbajo from '../../../Assets/Img/Rebate/flechaabajonegro.png'
import ReactExport from 'react-data-export';
import {useDispatch, useSelector} from "react-redux";
import {
    CrearRebatesReducer,
    FiltrarGrupoReducer,
    HabilitarEditarTodosReducer
} from '../../../Redux/Acciones/Rebate/Rebate'
import IconoEditar from '../../../Assets/Img/Rebate/editar.png'
import IconoEditarBlanco from '../../../Assets/Img/Rebate/editarblanco.png'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const FiltrosRebate = (props) => {

    const guardarData = props.guardarData
    const editarData = props.editarData
    const editandoRebate = props.editandoRebate
    const mostrarCustomerGroup = props.mostrarCustomerGroup
    const seleccionarCustomerGroup = props.seleccionarCustomerGroup
    const tipoRebate = props.tipoRebate
    const data_rebate = props.data_rebate

    const dispatch = useDispatch()
    const {
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        // data_rebate,
        data_rebate_descargar,
        grupo_seleccionado_rebate,
    } = useSelector(({rebate}) => rebate);


    const RefBtnRebateMensual = useRef(null)
    const RefBtnRebateTrimestral = useRef(null)
    const RefBtnRebateBonus = useRef(null)

    return (
        <>
        
            <Link 
                style={{display:'none'}}
                ref={RefBtnRebateMensual}
                to="/rebate" ></Link>
            <Link 
                style={{display:'none'}}
                ref={RefBtnRebateTrimestral}
                to="/rebate/trimestral" ></Link>
            <Link 
                style={{display:'none'}}
                ref={RefBtnRebateBonus}
                to="/rebate/bonus" ></Link>

            <div 
                className='Wbold-S20-H35-C3646C4' 
                style={{paddingLeft:'40px', marginBottom:'20px', marginTop: "95px", background:'#EDF0FA', paddingTop:'5px', paddingBottom:'5px'}}
            >
                Rebate
            </div>
            
            <div
                className='Contenedor-Fila-Filtros-Rebate'
            >
                <Select
                    bordered = {true}
                    dropdownStyle={{
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        borderRadius: "0px 0px 10px 10px"
                    }}
                    className="Btn-Select-Grupo-Rebate W600-S14-H19-C1E1E1E-L0015"
                    placeholder={
                        window.location.href.includes('/rebate/bonus')
                        ?"Rebate Bonus"
                        :window.location.href.includes('/rebate/trimestral')
                            ?"Rebate Trimestral"
                            :"Rebate Mensual"
                    }
                    style={{ 
                        marginRight:'20px'
                    }}
                    onChange={(e) => {
                        if(e == 1){
                            RefBtnRebateMensual.current.click()
                        }else if(e == 2){
                            RefBtnRebateTrimestral.current.click()
                        }else if(e == 3){
                            RefBtnRebateBonus.current.click()
                        }
                    }}
                    suffixIcon={
                        <div>
                            <img 
                                src={IconoFlechaAbajo} 
                                style={{
                                    width: "23px",
                                    height: "21px",
                                    position: "absolute",
                                    top: "-5px",
                                    right: "-6px"
                                }}
                            />
                        </div>
                    }
                >
                    <Select.Option danger value={"1"}>{"Rebate Mensual"}</Select.Option>
                    <Select.Option danger value={"2"}>{"Rebate Trimestral"}</Select.Option>
                    <Select.Option danger value={"3"}>{"Rebate Bonus"}</Select.Option>
                </Select>


                {
                    mostrarCustomerGroup == true
                    ?<Select
                        bordered = {true}
                        dropdownStyle={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "0px 0px 10px 10px"
                        }}
                        className="Btn-Select-Grupo-Rebate W600-S14-H19-C1E1E1E-L0015"
                        placeholder="Customer Group"
                        style={{ 
                            marginRight:'20px'
                        }}
                        onChange={(e) => {
                            if(e > 0){
                                dispatch(FiltrarGrupoReducer(e, tipoRebate))
                            }
                            seleccionarCustomerGroup(e)
                        }}
                        suffixIcon={
                            <div>
                                <img 
                                    src={IconoFlechaAbajo} 
                                    style={{
                                        width: "23px",
                                        height: "21px",
                                        position: "absolute",
                                        top: "-5px",
                                        right: "-6px"
                                    }}
                                />
                            </div>
                        }
                    >   
                        <Select.Option danger value={0}>{"Customer Group"}</Select.Option>
                        {
                            
                            data_rebate.map((dat) => {
                                return (
                                    <Select.Option danger value={dat.treid}>{dat.trenombre}</Select.Option>
                                )
                            })
                        }
                    </Select>
                    :null
                }
                
                <FiltroMesVentasPromociones />
                <div style={{marginRight:'20px'}}>
                    <FiltroAnioVentasPromociones />
                </div>

                <Spin
                    // spinning={cargando_guardar_rebate_bonus}
                    spinning={props.cargando_guardar}
                >
                    <div
                        className='Btn-Guardar-Data-Rebate W600-S14-H19-C558CFF-L0015'
                        onClick={async () => {
                            // dispatch(CrearRebatesReducer(editandoRebate))
                            await guardarData(editandoRebate)
                        }}
                    >
                        Guardar
                    </div>
                </Spin>


                {
                    editandoRebate == true
                    ?<Tooltip
                        placement="bottom" 
                        title={"Editar"}
                    >
                        <div
                            className='Btn-Editar-Data-Rebate'
                            onClick={() => {
                                editarData()
                            }}
                            style={{
                                background: "#558CFF"
                            }}
                        >
                            <img 
                                src={IconoEditarBlanco} className="Icono-Editar-Blanco-Data-Rebate" 
                                style={{display:'flex'}}
                            />
                        </div>
                    </Tooltip>
                    :<Tooltip
                        placement="bottom" 
                        title={"Editar"}
                    >
                        <div
                            className='Btn-Editar-Data-Rebate'
                            onClick={() => {
                                editarData()
                            }}
                        >
                            <img src={IconoEditar} className="Icono-Editar-Data-Rebate" />
                            <img src={IconoEditarBlanco} className="Icono-Editar-Blanco-Data-Rebate" />
                        </div>
                    </Tooltip>
                }

                {/* <ExcelFile 
                    filename={"Rebate-"+anioSeleccionadoFiltro+"-"+mesSeleccionadoFiltro}
                    element={
                        <div
                            className='Btn-Descargar-Data-Rebate W700-S14-H19-CFFFFFF-L0015'
                        >
                            Descargar
                        </div>
                    }>
                    <ExcelSheet 
                        dataSet={data_rebate_descargar} 
                        name={"Rebate "+" "+mesSeleccionadoFiltro+" "+anioSeleccionadoFiltro}
                    />
                </ExcelFile> */}
                
            </div>

            <div
                className='Contenedor-Completo-Tabla-Rebate'
                style={{marginBottom:'8px'}}
            >
                <div 
                    className='Contenedor-Filtro-Fecha-Seleccionado-Rebate W700-S20-H27-C1E1E1E-L0015'
                >
                    <div
                        className="Filtro-Fecha-Seleccionado-Rebate"
                    >
                        {grupo_seleccionado_rebate} - {mesSeleccionadoFiltro} - {anioSeleccionadoFiltro}
                    </div>
                </div>
            </div>

        
        </>
    )
}

export default FiltrosRebate