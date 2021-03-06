import React, {useState, useEffect, useRef} from 'react'
import FiltroAnioVentasPromociones from '../../Componentes/Filtros/Botones/FiltroAnioVentasPromociones'
import FiltroMesVentasPromociones from '../../Componentes/Filtros/Botones/FiltroMesVentasPromociones'
import '../../Estilos/Rutas/Rebate/Rebate.css'
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {
    ObtenerRebatesActualesReducer, 
    AgregarFilaRebateReducer,
    ActivarCarouselTablaRebateReducer,
    ObtenerGrupoRebateReducer,
    EditarFilaRebateReducer,
    EditandoFilaRebateReducer,
    CrearRebatesReducer,
    FiltrarGrupoReducer,
    HabilitarEditarTodosReducer,
    EliminarRebateMensualReducer
} from '../../Redux/Acciones/Rebate/Rebate'
import {InputNumber, Select, Modal, Tooltip, Spin} from "antd";
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import IconoAgregar from '../../Assets/Img/Rebate/agregarceleste.png'
import IconoFlechaBlanca from '../../Assets/Img/Rebate/flechaderechablanca.png'
import ReactExport from 'react-data-export';
import FiltrosRebate from '../../Componentes/Rutas/Rebate/FiltrosRebate';
import IconoEliminar from '../../Assets/Img/ElementosEnviados/Eliminar.png'
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Rebate = () => {

    const dispatch = useDispatch()
    
    const {
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        data_rebate,
        data_grupos_rebate,
        cargando_data_rebate,
        grupo_seleccionado_rebate,
        data_rebate_descargar,
        cargando_guardar_rebate_mensual
    } = useSelector(({rebate}) => rebate);

    const [mostrarFilaAgregar, setMostrarFilaAgregar] = useState(false)
    const [numeroFilasNuevas, setNumeroFilasNuevas] = useState(0)

    const [editandoRebate, setEditandoRebate] = useState(false)
    const [posicionFilaTabla, setposicionFilaTabla] = useState("")
    const [posicionTabla, setPosicionTabla] = useState("")
    
    const [modalAbiertoEliminar, setmodalAbiertoEliminar] = useState(false)
    const [utilizarCarousel, setUtilizarCarousel] = useState(true)

    useEffect(() => {
        if(cargando_data_rebate == false){
            dispatch(ObtenerRebatesActualesReducer())

            if(data_grupos_rebate.length <= 0){
                dispatch(ObtenerGrupoRebateReducer())
            }
        }
    }, [mesSeleccionadoFiltro, anioSeleccionadoFiltro])

    return (
        <>

            <FiltrosRebate 
                guardarData = {async (editando) => {
                    await dispatch(CrearRebatesReducer(editando))
                }}
                editarData = {() => {
                    dispatch(HabilitarEditarTodosReducer(!editandoRebate))
                    setEditandoRebate(!editandoRebate)
                }}
                cargando_guardar = {cargando_guardar_rebate_mensual}
                editandoRebate = {editandoRebate}
                mostrarCustomerGroup = {true}
                seleccionarCustomerGroup = {(treid) => {
                    if(treid == 0){
                        setUtilizarCarousel(true)
                    }else{
                        setUtilizarCarousel(false)
                    }
                }}
                tipoRebate = "RebateMensual"
                data_rebate = {data_rebate}
            />

            {/* <Link 
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
                to="/rebate/bonus" ></Link> */}

            {/* <div 
                className='Wbold-S20-H35-C3646C4' 
                style={{paddingLeft:'40px', marginBottom:'20px', marginTop: "95px", background:'#EDF0FA', paddingTop:'5px', paddingBottom:'5px'}}
            >
                Rebate
            </div> */}
            
            {/* <div
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

                <div
                    className='Btn-Guardar-Data-Rebate W600-S14-H19-C558CFF-L0015'
                    onClick={() => {
                        dispatch(CrearRebatesReducer(editandoRebate))
                    }}
                >
                    Guardar
                </div>
                
                <Tooltip
                    placement="bottom" 
                    title={"Editar"}
                >
                    <div
                        className='Btn-Editar-Data-Rebate'
                        onClick={() => {
                            dispatch(HabilitarEditarTodosReducer(!editandoRebate))
                            setEditandoRebate(!editandoRebate)
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
                
            </div> */}
            
            {/* <div
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
            </div> */}

            <div
                className='Contenedor-Completo-Tabla-Rebate'
            >
                <div
                    className='Contenedor-Tabla-Rebate'
                    style={{
                        height: 350 + (45*numeroFilasNuevas)
                    }}
                >
                    
                    {
                        data_rebate.map((dat, posData) => {
                            return (
                                <table
                                    className=
                                    // {
                                    //     dat.mostrando == true
                                    //     ?"Tabla-Principal-Rebate"
                                    //     :"Tabla-Principal-Rebate Tabla-Principal-Rebate-Ocultando"
                                    // }
                                    {
                                        dat.retroceder == true
                                        ?dat.mostrando == true
                                            ?'Tabla-Principal-Rebate Tabla-Principal-Rebate-Retroceder-Mostrar'
                                            :dat.ocultando == true
                                                ?'Tabla-Principal-Rebate Tabla-Principal-Rebate-Retroceder-Ocultar'
                                                :'Tabla-Principal-Rebate'

                                        :dat.mostrando == true
                                            ?'Tabla-Principal-Rebate Tabla-Principal-Rebate-Mostrar'
                                            :dat.ocultando == true
                                                ?'Tabla-Principal-Rebate Tabla-Principal-Rebate-Ocultando'
                                                :'Tabla-Principal-Rebate'
                                    }
                                    style={{}}
                                >

                                    <thead className='W700-S16-H21-CFFFFFF-L0015'>
                                        <tr>
                                            <th
                                                style={{
                                                    borderTopLeftRadius: "8px"
                                                }}
                                            >
                                                Item 
                                            </th>
                                            <th
                                                style={{width:'50px'}}
                                            >
                                                Customer Group 
                                            </th>
                                            <th>
                                                Escala Inicial 
                                            </th>
                                            <th>
                                                Escala Final 
                                            </th>
                                            <th>
                                                M??trica 
                                            </th>
                                            <th>
                                                Infant 
                                            </th>
                                            <th>
                                                Wipes 
                                            </th>
                                            <th>
                                                Family 
                                            </th>
                                            <th>
                                                Adult 
                                            </th>
                                            <th
                                                style={{
                                                    borderTopRightRadius: "8px"
                                                }}
                                            >
                                                Fem 
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {
                                            dat.data.map((rebate, pos) => {
                                                return (
                                                    <tr 
                                                        className='W600-S14-H19-C1E1E1E'
                                                        onDoubleClick={() => {
                                                            // dispatch(EditarFilaRebateReducer(posData, pos, true))
                                                            dispatch(HabilitarEditarTodosReducer(!editandoRebate))
                                                            setEditandoRebate(!editandoRebate)
                                                        }}
                                                    >
                                                        <td>
                                                            {pos + 1}
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate.treideditandoerror == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <Select 
                                                                        defaultValue={grupo_seleccionado_rebate}
                                                                        style={{ width: 120 }} 
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "treideditando", e))
                                                                        }}
                                                                        className="Select-Editar-Rebate"
                                                                    >
                                                                        {
                                                                            data_grupos_rebate.map((datgrupo, posgrupo) => {
                                                                                return(
                                                                                    <Select.Option value={datgrupo.treid}>{datgrupo.trenombre}</Select.Option>
                                                                                )
                                                                            })
                                                                        } 
                                                                    </Select>
                                                                </>
                                                                :<>
                                                                    {rebate.trenombre}
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate.desdeeditandoerror == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <InputNumber 
                                                                        className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                        rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                        defaultValue={rebate.rtpporcentajedesde}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "desdeeditando", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate.rtpporcentajedesde} %
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate.hastaeditandoerror == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <InputNumber 
                                                                        className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                        rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                        defaultValue={rebate.rtpporcentajehasta}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "hastaeditando", e))
                                                                        }}
                                                                        
                                                                    />
                                                                </>
                                                                :<>
                                                                    {
                                                                        rebate.rtpporcentajehasta == "10000"
                                                                        ?<>&#x221e;</>
                                                                        :rebate.rtpporcentajehasta  
                                                                    } %
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate.tprideditandoerror == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<> 
                                                                    <Select 
                                                                        defaultValue={rebate.tprnombre}
                                                                        style={{ width: 120 }} 
                                                                        className="Select-Editar-Rebate"
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "tprideditando", e))
                                                                        }}
                                                                    >
                                                                        <Select.Option value="1">Sell In</Select.Option>
                                                                        <Select.Option value="2">Sell Out</Select.Option>
                                                                    </Select>
                                                                </>
                                                                :<>
                                                                    {rebate.tprnombre}
                                                                </>
                                                            }
                                                            

                                                        </td>
                                                        <td
                                                            style={
                                                                rebate['cat-1error'] == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <InputNumber 
                                                                        className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                        rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                        defaultValue={rebate["cat-1"]}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "cat-1", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate["cat-1"]} %
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate['cat-2error'] == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <InputNumber 
                                                                        className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                        rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                        defaultValue={rebate["cat-2"]}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "cat-2", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate["cat-2"]} %
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate['cat-3error'] == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <InputNumber 
                                                                        className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                        rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                        defaultValue={rebate["cat-3"]}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "cat-3", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate["cat-3"]} %
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate['cat-4error'] == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{}
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?<>
                                                                    <InputNumber 
                                                                        className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                        rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                        defaultValue={rebate["cat-4"]}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateReducer(posData, pos, "cat-4", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate["cat-4"]} %
                                                                </>
                                                            }
                                                        </td>
                                                        <td
                                                            style={
                                                                rebate['cat-5error'] == true
                                                                ?{border:'1px solid red', color:'red'}
                                                                :{
                                                                    borderRight: '1px solid #E5E5E5'
                                                                }
                                                            }
                                                        >
                                                            {
                                                                rebate.editando == true
                                                                ?null
                                                                :<div className='Td-Icono-Rebate'>
                                                                    <div className='Fondo-Icono-Eliminar'>
                                                                        <img 
                                                                            className='Icono-Eliminar'
                                                                            src={IconoEliminar} 
                                                                            style={{width:'16px'}}
                                                                            onClick={() => {
                                                                                setmodalAbiertoEliminar(!modalAbiertoEliminar)
                                                                                setposicionFilaTabla(pos)
                                                                                setPosicionTabla(posData)
                                                                            }}
                                                                        />
                                                                    </div>

                                                                </div>
                                                            }

                                                            <div 
                                                                className={
                                                                    rebate.editando == true
                                                                    ?''
                                                                    :'Td-Normal-Porcentaje-Rebate'
                                                                }
                                                            >
                                                                {
                                                                    rebate.editando == true
                                                                    ?<>
                                                                        <InputNumber 
                                                                            className="gx-mb-3 gx-w-100 Input-Editar-Porcentaje-Rebate" 
                                                                            rules={[{ required: true, message: 'Es necesario un porcentaje desde' }]}
                                                                            defaultValue={rebate["cat-5"]}
                                                                            min={0}
                                                                            max={10000}
                                                                            formatter={value => `${value}%`}
                                                                            parser={value => value.replace('%', '')}
                                                                            onChange={(e) => {
                                                                                dispatch(EditandoFilaRebateReducer(posData, pos, "cat-5", e))
                                                                            }}
                                                                        />
                                                                    </>
                                                                    :<>
                                                                        {rebate["cat-5"]} %
                                                                    </>
                                                                }
                                                            </div>
                                                            
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }
                                        <div
                                            style={{
                                                height: "11px",
                                                width: "100%"
                                            }}
                                        ></div>
                                        <tr
                                            style={{
                                                border: "1px solid #1EC0ED",
                                                position:'relative'
                                            }}
                                        >
                                            <div 
                                                className='Btn-Agregar-Filas-Rebate'
                                                onMouseEnter={() => {
                                                    setMostrarFilaAgregar(true)
                                                }}
                                                onMouseLeave={() => {
                                                    setMostrarFilaAgregar(false)
                                                }}
                                                onClick={() => {
                                                    dispatch(AgregarFilaRebateReducer(posData))
                                                    setNumeroFilasNuevas(numeroFilasNuevas+1)
                                                }}
                                            >
                                                <img 
                                                    src={IconoAgregar} 
                                                    className="Icono-Btn-Agregar-Filas-Rebate" 
                                                />
                                            </div>
                                        </tr>
                                        <div
                                            style={{
                                                height: "12px",
                                                width: "100%"
                                            }}
                                        ></div>
                                        <tr 
                                            className='Fila-Agregar-Nuevo-Rebate'
                                            style={
                                                mostrarFilaAgregar == true ? {} : {display:'none'}
                                            }
                                        >
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                            <td>a</td>
                                        </tr>

                                    </tbody>

                                </table>
                            )
                        })
                    }
                </div>
                <div 
                    className='Btn-Flecha-Retroceder-Rebate'
                    onClick={async () => {
                        // console.log(data_tablas_contraprestaciones)
                        if(utilizarCarousel == true){
                            await dispatch(ActivarCarouselTablaRebateReducer("retroceder"))
                        }
                    }}
                    style={
                        utilizarCarousel == true
                        ?{}
                        :{cursor: 'not-allowed' }
                    }
                >
                    {/* <LeftOutlined /> */}
                    <img 
                        style={{
                            transform: "rotate(-180deg)",
                            left:'17px'
                        }}
                        src={IconoFlechaBlanca} 
                        className="Icono-Flecha-Blanca-Rebate"
                    />
                </div>
                <div 
                    className='Btn-Flecha-Avanzar-Rebate'
                    onClick={async () => {
                        // console.log(data_tablas_contraprestaciones)
                        if(utilizarCarousel == true){
                            await dispatch(ActivarCarouselTablaRebateReducer())
                        } 
                    }}
                    style={
                        utilizarCarousel == true
                        ?{}
                        :{cursor: 'not-allowed' }
                    }
                >
                    {/* <RightOutlined /> */}
                    <img 
                        src={IconoFlechaBlanca} 
                        className="Icono-Flecha-Blanca-Rebate"
                    />
                </div>
            </div>

            {/* <div 
                className='Contenedor-Btn-Guardar-Rebate'
                onClick={() => {
                    dispatch(CrearRebatesReducer())
                }}
            >
                <div className='Btn-Guardar-Rebate W600-S14-H19-CFFFFFF'>
                    Guardar
                </div>
            </div> */}
            <div style={{marginBottom: "80px"}}>

            </div>

            <Modal
                centered
                title={null}
                visible={modalAbiertoEliminar}
                footer={null}
                closeIcon={<div></div>}
                width="310px"
                height="139px"
                className='Caja-Modal-ReenviarElemento'
                onCancel={() => setmodalAbiertoEliminar(false)}
            >
                <div>
                    <div className='Titulo-Modal-Reenviar-Elemento'>
                        Eliminar Rebate
                    </div>
                    <div className='Texto-Modal-Reenviar-Elemento'>
                        ??Est?? seguro que desea eliminar el rebate?
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <Spin
                            // spinning={false}
                            spinning={false}
                        >
                            <button 
                                className='Boton-Aceptar-Eliminar-Modal'
                                onClick={async () => {
                                    await dispatch(EliminarRebateMensualReducer(
                                        data_rebate[posicionTabla]['data'][posicionFilaTabla]['rtpporcentajedesde'],
                                        data_rebate[posicionTabla]['data'][posicionFilaTabla]['rtpporcentajehasta'],
                                        data_rebate[posicionTabla]['data'][posicionFilaTabla]['rtpporcentajerebate'],
                                        data_rebate[posicionTabla]['data'][posicionFilaTabla]['tprid'],
                                        data_rebate[posicionTabla]['data'][posicionFilaTabla]['treid'],
                                    ))
                                    setmodalAbiertoEliminar(false)
                                }}
                            >
                                Aceptar
                            </button>
                        </Spin>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmodalAbiertoEliminar(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Rebate