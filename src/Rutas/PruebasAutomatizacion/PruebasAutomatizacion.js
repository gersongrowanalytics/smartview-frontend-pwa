import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactExport from 'react-data-export';
import { 
    Tooltip,
    Input,
    DatePicker
} from 'antd';
import './pruebas.css'
const PruebasAutomatizacion = () => {

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const [datosExcelZALima, setdatosExcelZALima] = useState([])
    const [datosExcelZAProv, setdatosExcelZAProv] = useState([])
    const [datosExcelZBLima, setdatosExcelZBLima] = useState([])
    const [datosExcelZBProv, setdatosExcelZBProv] = useState([])
    const [datosExcelZCLima, setdatosExcelZCLima] = useState([])
    const [datosExcelZCProv, setdatosExcelZCProv] = useState([])
    // console.log('FUNCIONAL',datosExcelZALima)
    console.log('STATE',datosExcelZBLima['0'])
    //SUCURSALES
    const [sucursalesZALima, setSucursalesZALima] = useState([])
    const [sucursalesZAProv, setSucursalesZAProv] = useState([])
    const [sucursalesZBLima, setSucursalesZBLima] = useState([])
    const [sucursalesZBProv, setSucursalesZBProv] = useState([])
    const [sucursalesZCLima, setSucursalesZCLima] = useState([])
    const [sucursalesZCProv, setSucursalesZCProv] = useState([])
    // console.log(sucursalesZALima)
    //DATE
    const [fechas, setFechas] = useState("")

    const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {
        // console.log(data_excel_descargar)
        if(data_excel_descargar.length){
            for(let i=0; i < data_excel_descargar.length; i++){
                await data_excel_descargar[i]['0']['data'].map((dato, posicion) => {
                    data_excel_descargar[i]['0']['data'][posicion].map((dat) => {
                    dat.value = dat.value == null ?"" :dat.value
                  })
                })
            }
            console.log('LIMPIAR',data_excel_descargar)
            return data_excel_descargar
        }else{
            console.log('SIN DATOS')
        }
        
    }

    const cargarDataExcel = async(tipoRebate, zona) => {
        await fetch('https://backend-smartview.grow-corporate.com/excel-automatizacion',
            {
                mode:'cors',
                method: 'POST',
                body: JSON.stringify({
                    re_tipoRebate: tipoRebate,
                    re_zona: zona,
                    re_fechas: fechas
                }),
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json',
                    'api_token': localStorage.getItem('usutoken'),
                    'api-token': localStorage.getItem('usutoken')
                }
            }
        ).then( async res => {
            return res.json()
        }).then(async data => {
            if (data.respuesta == true) {
                let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.data)
                if(tipoRebate == '26' && zona == 'LIMA'){
                    setdatosExcelZALima(data_excel_descargar)
                    setSucursalesZALima(data.sucursales)
                }else if(tipoRebate == '26' && zona == 'PROVINCIA'){
                    await setdatosExcelZAProv(data_excel_descargar)
                    await setSucursalesZAProv(data.sucursales)
                }else if(tipoRebate == '15' && zona == 'LIMA'){
                    setdatosExcelZBLima(data_excel_descargar)
                    setSucursalesZBLima(data.sucursales)
                }else if(tipoRebate == '15' && zona == 'PROVINCIA'){
                    setdatosExcelZBProv(data_excel_descargar)
                    setSucursalesZBProv(data.sucursales)
                }else if(tipoRebate == '24' && zona == 'LIMA'){
                    setdatosExcelZCLima(data_excel_descargar)
                    setSucursalesZCLima(data.sucursales)
                }else if(tipoRebate == '24' && zona == 'PROVINCIA'){
                    setdatosExcelZCProv(data_excel_descargar)
                    setSucursalesZCProv(data.sucursales)
                }
            }else{

            }
            }).catch((error)=> {
                console.log(error)
        });
    }
    
    return (
        <div className='Contenedor-Elementos-Enviados'>

            <Row style={{marginBottom: '10px'}}>
                <Col xl={24}  style={{display:'flex', justifyContent:'center'}}>
                    
                        <DatePicker.RangePicker 
                            picker="month"
                            format={'MM/YYYY'}
                            placeholder={['MM/YYYY', 'MM/YYYY']}
                            onChange={(e, fecha) => {
                                setFechas(fecha)
                                console.log(fecha)
                            }}
                        />
                </Col>
            </Row>
            <Row style={{marginBottom: '10px'}}>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{marginRight: '28px'}}>ZA LIMA:</div>
                    <ExcelFile 
                        filename="ZA-LIMA"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesZALima.map((sucursalLima, pos) => {
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcelZALima[pos]}                        
                                        name={sucursalLima.sucnombre}
                                    />
                                )
                            })
                        }
                    </ExcelFile>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        className='BTN-OBTENER-DATA'
                        onClick={() => {cargarDataExcel('26','LIMA')}}
                    >
                        OBTENER DATA
                    </div>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{ marginRight: '28px' }}>ZA PROVINCIAS:</div> 
                    <ExcelFile 
                        filename="ZA-PROVINCIA"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesZAProv.map((sucursalProv, pos) => {
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcelZAProv[pos]}                        
                                        name={sucursalProv.sucnombre}
                                    />
                                )
                            })
                        }
                    </ExcelFile>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        className='BTN-OBTENER-DATA'
                        onClick={() => {cargarDataExcel('26','PROVINCIA')}}
                    >
                        OBTENER DATA
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: '10px'}}>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        style={{marginRight: '28px'}}
                        onClick={() => console.log(sucursalesZBLima)}
                        >ZB LIMA:</div>
                    <ExcelFile 
                        filename="ZB-LIMA"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesZBLima.map((sucursalLima, pos) => {
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcelZBLima[pos]} 
                                        name={pos == 2 ?"R & G" :sucursalLima.sucnombre}
                                    />
                                )
                            })
                        }
                        
                    </ExcelFile>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        className='BTN-OBTENER-DATA'
                        onClick={() => {cargarDataExcel('15','LIMA')}}
                    >
                        OBTENER DATA
                    </div>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{ marginRight: '28px' }}>ZB PROVINCIAS:</div> 
                    <ExcelFile 
                        filename="ZB-PROVINCIA"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesZBProv.map((sucursalProv,pos) => {
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcelZBProv[pos]}                        
                                        name={sucursalProv.sucnombre}
                                    />
                                )
                            })
                        }
                    </ExcelFile>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        className='BTN-OBTENER-DATA'
                        onClick={() => {cargarDataExcel('15','PROVINCIA')}}
                    >
                        OBTENER DATA
                    </div>
                </Col>
            </Row>
            <Row style={{marginBottom: '10px'}}>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{marginRight: '28px'}}>ZC LIMA:</div>
                    <ExcelFile 
                        filename="ZC-LIMA"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesZCLima.map((sucursalLima, pos) => {
                                console.log(datosExcelZCLima[pos])
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcelZCLima[pos]}                        
                                        name={sucursalLima.sucnombre}
                                    />
                                )
                            })
                        }
                    </ExcelFile>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        className='BTN-OBTENER-DATA'
                        onClick={() => {cargarDataExcel('24','LIMA')}}
                    >
                        OBTENER DATA
                    </div>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{ marginRight: '28px' }}>ZC PROVINCIAS:</div> 
                    <ExcelFile 
                        filename="ZC-PROVINCIA"
                        element={<button>Download Excel</button>}>
                        {
                            sucursalesZCProv.map((sucursalProv,pos) => {
                                return(
                                    <ExcelSheet 
                                        dataSet={datosExcelZCProv[pos]}                        
                                        name={sucursalProv.sucnombre}
                                    />
                                )
                            })
                        }
                    </ExcelFile>
                </Col>
                <Col xl={6} style={{display:'flex', justifyContent:'center'}}>
                    <div 
                        className='BTN-OBTENER-DATA'
                        onClick={() => {cargarDataExcel('24','PROVINCIA')}}
                    >
                        OBTENER DATA
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PruebasAutomatizacion