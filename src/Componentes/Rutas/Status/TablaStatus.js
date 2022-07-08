import React, { useState } from 'react'
import '../../../Estilos/Componentes/Status/TablaStatus.css'
import ModalStatus from './ModalStatus';
import DataAnalytics from '../../../Assets/Img/Status/DataAnalytics.png'
import Soporte from '../../../Assets/Img/Status/SoporteGrow.png'
import TradeMarketing from '../../../Assets/Img/Status/TradeMarketing.png'

const TablaStatus = (props) => {
   
    const data_control_archivos = props.data_control_archivos;

    const [modalAbierto, setModalAbierto] = useState(false)

    return (
        <div className='Contenedor-Tabla-Status'>
            <table className='Tabla-Status'>
                <thead>
                    <tr>
                        <th style={{width: '152px'}}>Área</th>
                        <th style={{width: '27%', textAlign: 'left', paddingLeft: '40px'}}>Base de Datos</th>
                        <th>Responsable</th>
                        <th>Usuario</th>
                        <th>DeadLine</th>
                        <th>Fecha de Carga</th>
                        <th>Días de Retraso</th>
                        <th style={{width: '10%'}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data_control_archivos.map((archivos, pos) => {
                            if (archivos.coabasedatos == 'Sell In Objetivo' && archivos.areid == '1') {
                                return(
                                    <tr>
                                        <td rowSpan={10} style={{background: 'white'}}>
                                            <img src={TradeMarketing} style={{width:'35px'}}/>
                                            <div>{archivos.arenombre}</div>
                                        </td>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}>{archivos.coabasedatos}</td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso'>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'}>{archivos.estnombre}</td>
                                    </tr>
                                )
                            }else if (archivos.coabasedatos == 'Mecánica Promocional Centro' && archivos.areid == '1') {
                                return (
                                    <tr>
                                        <td style={{textAlign: 'left', paddingLeft: '30px' , paddingTop: '8px', paddingBottom: '8px'}}>
                                            <div style={{marginBottom: '6px'}}>{archivos.coabasedatos}</div>
                                            <div className='Txt-Detalle' 
                                                onClick={() => setModalAbierto(true)}
                                            >
                                                Click Detalle
                                            </div>
                                        </td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso' style={{paddingTop: '16px', paddingBottom: '8px'}}>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'} >{archivos.estnombre}</td>
                                    </tr>   
                                )
                            }else if(archivos.areid == '1'){
                                return (
                                    <tr>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}>{archivos.coabasedatos}</td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso'>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'} >{archivos.estnombre}</td>
                                    </tr>   
                                )
                            }
                        })
                    }
                    {
                        data_control_archivos.map((archivos, pos) => {
                            if (archivos.coabasedatos == 'Sell In Real' && archivos.areid == '2') {
                                return(
                                    <tr>
                                        <td rowSpan={4} style={{background: 'white'}}>
                                            <img src={DataAnalytics} style={{width:'35px'}}/>
                                            <div>{archivos.arenombre}</div>
                                        </td>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}>{archivos.coabasedatos}</td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso'>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'} >{archivos.estnombre}</td>
                                    </tr>
                                )
                            }else if(archivos.areid == '2'){
                                return (
                                    <tr>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}>{archivos.coabasedatos}</td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso'>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'} >{archivos.estnombre}</td>
                                    </tr>   
                                )
                            }
                        })
                    }  
                    {
                        data_control_archivos.map((archivos, pos) => {
                            if (archivos.coabasedatos == 'Sell Out Real DT' && archivos.areid == '3') {
                                return(
                                    <tr>
                                        <td rowSpan={4} style={{background: 'white'}}>
                                            <img src={Soporte} style={{width:'35px'}}/>
                                            <div>{archivos.arenombre}</div>
                                        </td>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}>{archivos.coabasedatos}</td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso'>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'} >{archivos.estnombre}</td>
                                    </tr>
                                )
                            }else if(archivos.areid == '3'){
                                return (
                                    <tr>
                                        <td style={{textAlign: 'left', paddingLeft: '30px'}}>{archivos.coabasedatos}</td>
                                        <td>{archivos.pernombrecompletoresponsable}</td>
                                        <td>{archivos.pernombrecompletosubida}</td>
                                        <td>24 Mayo 2022</td>
                                        <td>{archivos.fecfecha}</td>
                                        <td className='Columna-Dias-Retraso'>
                                            <div style={{marginRight: '6px'}}>{archivos.coadiasretraso} días</div>
                                            <div className='Circulo-Dias'></div>
                                        </td>
                                        <td className={archivos.estnombre == 'Cargado' ? 'Verde' : 'Rojo'} >{archivos.estnombre}</td>
                                    </tr>   
                                )
                            }
                        })
                    }  
                </tbody>
            </table>
            <ModalStatus
                modalAbierto={modalAbierto}
                setAbrilModal={(valor) => {
                    setModalAbierto(valor)
                }}
            />
        </div>
    )
}

export default TablaStatus