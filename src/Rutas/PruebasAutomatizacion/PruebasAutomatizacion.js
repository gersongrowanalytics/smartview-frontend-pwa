import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactExport from 'react-data-export';

const PruebasAutomatizacion = () => {

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const [datosExcel, setdatosExcel] = useState([])

    const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {

        await data_excel_descargar[0]['data'].map((dato, posicion) => {
            data_excel_descargar[0]['data'][posicion].map((dat) => {
            dat.value = dat.value == null ?"" :dat.value
          })
        })
      
        return data_excel_descargar
    }
    const cargarDataExcel = async() => {
        await fetch('https://backend-smartview.grow-corporate.com/excel-automatizacion',
            {
                mode:'cors',
                method: 'GET',
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
                setdatosExcel(data_excel_descargar)
            }else{

            }
            }).catch((error)=> {
                console.log(error)
        });
    }
    console.log(datosExcel)
    useEffect(() => {
        cargarDataExcel()
    }, [])
    
    return (
        <div className='Contenedor-Elementos-Enviados'>
            <Row>
                <Col xl={24}  style={{display:'flex', justifyContent:'center'}}>
                    ZA
                </Col>
            </Row>
            <Row>
                <Col xl={12} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{marginRight: '28px'}}>LIMA:</div>
                    <ExcelFile 
                        filename="ZA-LIMA"
                        element={<button>Download Excel</button>}>
                        <ExcelSheet 
                            dataSet={datosExcel}                        
                            name="ReporteControlArchivos"
                        />
                    </ExcelFile>
                </Col>
                <Col xl={12} style={{display:'flex', justifyContent:'center'}}>
                    <div style={{ marginRight: '28px' }}>PROVINCIAS:</div> 
                    <ExcelFile 
                        filename="ZA-PROVINVCIA"
                        element={<button>Download Excel</button>}>
                        <ExcelSheet 
                            // dataSet={datosReporteExcelArchivosSubidos}                        
                            name="ReporteControlArchivos"
                        />
                    </ExcelFile>
                </Col>
            </Row>
        </div>
    )
}

export default PruebasAutomatizacion