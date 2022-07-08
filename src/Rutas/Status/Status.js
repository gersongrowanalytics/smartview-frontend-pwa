import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import TablaStatus from '../../Componentes/Rutas/Status/TablaStatus'
import '../../Estilos/Rutas/Status/Status.css'
import DataAnalytics from '../../Assets/Img/Status/DataAnalytics.png'
import Soporte from '../../Assets/Img/Status/SoporteGrow.png'
import TradeMarketing from '../../Assets/Img/Status/TradeMarketing.png'

import {
    ObtenerDataControlArchivosReducer,
    ObtenerDataAreasReducer
} from '../../Redux/Acciones/Status/Status'

const Status = () => {

    const dispatch = useDispatch()

    const {
        data_control_archivos,
        data_areas
    } = useSelector(({status}) => status);

    useEffect(() => {
        dispatch(ObtenerDataControlArchivosReducer())
        dispatch(ObtenerDataAreasReducer())
    }, [])
        console.log(data_areas)
    return (
        <>
            <div 
                className='Wbold-S20-H35-C3646C4' 
                style={{paddingLeft:'40px', marginBottom:'20px', marginTop: "95px", background:'#EDF0FA', paddingTop:'5px', paddingBottom:'5px', fontSize: '26px'}}
            >
                Status
            </div>
            <div className='Contenedor-Status'>
                <Row style={{paddingTop: '46px'}}>
                    <Col lg={24} xl={24}> 
                        <div className='Contenedor-Datos-Superior'>
                            {
                                data_areas.map((area,pos) => {
                                    return(
                                        <div 
                                            className='Caja-Opciones-Datos'
                                            style={{marginRight: '36px'}}    
                                        >
                                            <img 
                                                src={pos == 0 ? TradeMarketing : pos == 1 ? DataAnalytics : pos == 2 ? Soporte : null}
                                                style={{width: '35px'}}
                                            />
                                            <div className='Txt-Titulos-Cajas'>{area.arenombre}</div>
                                            <div className='Txt-Porcentaje-Cajas'>{area.areporcentaje}</div>
                                        </div>
                                    )
                                    
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '14px'}}>
                    <Col lg={24} xl={24}>
                        <TablaStatus
                            data_control_archivos={data_control_archivos}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Status