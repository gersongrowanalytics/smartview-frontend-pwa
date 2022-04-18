import React, {useState, useEffect} from 'react'
import FiltrosRebate from '../../../Componentes/Rutas/Rebate/FiltrosRebate'
import {InputNumber, Select} from "antd";
import IconoFlechaBlanca from '../../../Assets/Img/Rebate/flechaderechablanca.png'
import IconoAgregar from '../../../Assets/Img/Rebate/agregarceleste.png'
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerDataRebateTrimestralReducer,
    ActivarCarouselTablaRebateTrimestralReducer,
    AgregarFilaRebateTrimestralReducer,
    EditandoFilaRebateTrimestralReducer,
    HabilitarEditarTodosRebateTrimestralReducer,
    CrearRebatesTrimestralReducer
} from '../../../Redux/Acciones/Rebate/Trimestre/Trimestre'

const Trimestral = () => {

    const dispatch = useDispatch()
    
    const {
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        data_rebate_trimestral,
        data_grupos_rebate,
        cargando_data_rebate_trimestral,
        grupo_seleccionado_rebate,
    } = useSelector(({rebate}) => rebate);

    const [mostrarFilaAgregar, setMostrarFilaAgregar] = useState(false)
    const [numeroFilasNuevas, setNumeroFilasNuevas] = useState(0)
    const [editandoRebate, setEditandoRebate] = useState(false)

    useEffect(() => {
        if(cargando_data_rebate_trimestral == false){
            dispatch(ObtenerDataRebateTrimestralReducer())
        }
    }, [mesSeleccionadoFiltro, anioSeleccionadoFiltro])

    return (
        <>

            <FiltrosRebate 
                guardarData = {() => {
                    dispatch(CrearRebatesTrimestralReducer(editandoRebate))
                }}
                editarData = {() => {
                    dispatch(HabilitarEditarTodosRebateTrimestralReducer(!editandoRebate))
                    setEditandoRebate(!editandoRebate)
                }}
                editandoRebate = {editandoRebate}
            />

            


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
                        data_rebate_trimestral.map((dat, posData) => {
                            return (
                                <table
                                    className=
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
                                                    borderTopLeftRadius: "8px",
                                                    background:'#FFCD1B'
                                                }}
                                            >
                                                Item 
                                            </th>
                                            <th
                                                style={{width:'50px', background:'#FFCD1B'}}
                                            >
                                                Customer Group 
                                            </th>
                                            <th
                                                style={{background:'#FFCD1B'}}
                                            >
                                                Escala Inicial 
                                            </th>
                                            <th style={{background:'#FFCD1B'}}>
                                                Escala Final 
                                            </th>
                                            <th style={{background:'#FFCD1B'}}>
                                                Métrica 
                                            </th>
                                            <th style={{background:'#FFCD1B'}}>
                                                Infant 
                                            </th>
                                            <th style={{background:'#FFCD1B'}}>
                                                Wipes 
                                            </th>
                                            <th style={{background:'#FFCD1B'}}>
                                                Family 
                                            </th>
                                            <th style={{background:'#FFCD1B'}}>
                                                Adult 
                                            </th>
                                            <th
                                                style={{
                                                    borderTopRightRadius: "8px",
                                                    background:'#FFCD1B'
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "treideditando", e))
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
                                                                        defaultValue={rebate.ttrporcentajedesde}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "desdeeditando", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate.ttrporcentajedesde} %
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
                                                                        defaultValue={rebate.ttrporcentajehasta}
                                                                        min={0}
                                                                        max={10000}
                                                                        formatter={value => `${value}%`}
                                                                        parser={value => value.replace('%', '')}
                                                                        onChange={(e) => {
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "hastaeditando", e))
                                                                        }}
                                                                        
                                                                    />
                                                                </>
                                                                :<>
                                                                    {
                                                                        rebate.ttrporcentajehasta == "10000"
                                                                        ?<>&#x221e;</>
                                                                        :rebate.ttrporcentajehasta  
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "tprideditando", e))
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "cat-1", e))
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "cat-2", e))
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "cat-3", e))
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "cat-4", e))
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
                                                                            dispatch(EditandoFilaRebateTrimestralReducer(posData, pos, "cat-5", e))
                                                                        }}
                                                                    />
                                                                </>
                                                                :<>
                                                                    {rebate["cat-5"]} %
                                                                </>
                                                            }
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
                                                    dispatch(AgregarFilaRebateTrimestralReducer(posData))
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
                        await dispatch(ActivarCarouselTablaRebateTrimestralReducer("retroceder"))
                    }}
                >
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
                        await dispatch(ActivarCarouselTablaRebateTrimestralReducer())
                    }}
                >
                    <img 
                        src={IconoFlechaBlanca} 
                        className="Icono-Flecha-Blanca-Rebate"
                    />
                </div>
            </div>




























        </>
    )
}

export default Trimestral