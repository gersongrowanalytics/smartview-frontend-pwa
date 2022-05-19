import { Col, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactExport from 'react-data-export';
import {useDispatch, useSelector} from 'react-redux'
import { DatePicker } from 'antd';
import {
    ObtenerDataDescargaReducer,
    ObtenerTiposRebatesReducer,
    ObtenerCanalesSucursalesReducer
} from '../../Redux/Acciones/LogicaLP/LogicaLP'

const LogicaLP = () => {

    const ExcelFile = ReactExport.ExcelFile
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
    const dispatch = useDispatch()
    const { Option } = Select;

    const [tipoRebate, setTipoRebate] = useState("")
    const [zona, setZona] = useState("")
    const [fechas, setFechas] = useState("")
    
    const { 
        sucursalesExcel,
        datosExcel,
        tiposRebates,
        canalesSucursales
    } = useSelector(({ logicaLP }) => logicaLP);

    const SeleccionarTipoRebate = (valor) => {
        setTipoRebate(valor)
    }

    const SeleccionarZona = (valor) => {
        setZona(valor)
    }

    useEffect(() => {
        dispatch(ObtenerTiposRebatesReducer())
        dispatch(ObtenerCanalesSucursalesReducer())
    }, [])
    
    return (
        <div className='Contenedor-Elementos-Enviados'>
            <Row style={{marginBottom: '10px'}}>
                <Col xl={6}  style={{display:'flex', justifyContent:'center'}}>
                    <DatePicker.RangePicker 
                        picker="month"
                        format={'MM/YYYY'}
                        placeholder={['MM/YYYY', 'MM/YYYY']}
                        onChange={(e, fecha) => {
                            setFechas(fecha)
                        }}
                    />
                </Col>
                <Col xl={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Select defaultValue="Seleccionar Tipo Rebate" onChange={SeleccionarTipoRebate}>
                        {
                            tiposRebates.map((rebate) => {
                                return(
                                    <Option value={rebate.treid}>{rebate.trenombre}</Option>
                                )
                            })
                        }
                    </Select>
                </Col>
                <Col xl={4} style={{display: 'flex', justifyContent: 'center'}}>
                    <Select defaultValue="Seleccionar Zona" onChange={SeleccionarZona}>
                        {
                            canalesSucursales.map((zona) => {
                                return(
                                    <Option value={zona.casid}>{zona.casnombre}</Option>
                                )
                            })
                        }
                    </Select>
                </Col>
                <Col xl={5} style={{display:'flex', justifyContent:'center'}}>
                    <button 
                        onClick={() => {dispatch(ObtenerDataDescargaReducer(tipoRebate, zona, fechas))}}
                    >
                        Obtener datos
                    </button>
                </Col>
                <Col xl={3} style={{display:'flex', justifyContent:'center'}}>
                    <ExcelFile 
                        filename="ListaPrecios"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesExcel.map((sucursal, pos) => {
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcel[pos]}                        
                                        name={sucursal.sucnombre}
                                    />
                                )
                            })
                        }
                    </ExcelFile>
                </Col>
                
            </Row>
        </div>
    )
}

export default LogicaLP