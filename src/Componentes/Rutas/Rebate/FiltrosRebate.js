import React, {useRef, useState} from 'react'
import { Link } from "react-router-dom";
import {Tooltip, Select, Spin} from "antd";
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

    const dispatch = useDispatch()
    const {
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        data_rebate,
        data_rebate_descargar,
        grupo_seleccionado_rebate,
        cargando_guardar_rebate_bonus
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
                    placeholder="Tipo de Rebate"
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

                <Select
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
                        dispatch(FiltrarGrupoReducer(e))
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
                    {
                        data_rebate.map((dat) => {
                            return (
                                <Select.Option danger value={dat.treid}>{dat.trenombre}</Select.Option>
                            )
                        })
                    }
                </Select>
                
                <FiltroMesVentasPromociones />
                <div style={{marginRight:'20px'}}>
                    <FiltroAnioVentasPromociones />
                </div>

                <Spin
                    spinning={cargando_guardar_rebate_bonus}
                >
                    <div
                        className='Btn-Guardar-Data-Rebate W600-S14-H19-C558CFF-L0015'
                        onClick={() => {
                            // dispatch(CrearRebatesReducer(editandoRebate))
                            guardarData(editandoRebate)
                        }}
                    >
                        Guardar
                    </div>
                </Spin>
                
                <Tooltip
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

                <ExcelFile 
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
                </ExcelFile>
                
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