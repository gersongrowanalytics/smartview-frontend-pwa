import React from 'react'
import '../../../Estilos/Rutas/Ventas/Contraprestaciones.css'
import { Row, Col, Switch } from 'antd';
import {Link} from "react-router-dom";

const Contraprestaciones = () => {
    return (
        <div className='Contenedor-Contraprestaciones'>
            <div className='Wbold-S26-H35-C1E1E1E'>Contraprestaciones</div>
            <div style={{marginTop:'20px'}}>
                <Row>
                    <Col xl={19}>
                        <div className='Contenedor-Tabla-Ventas-Contraprestaciones'>
                            <table className='Tabla-Ventas-Contraprestaciones'>
                                <thead className='Wbold-S16-H21-C1E1E1E'>
                                    <tr >
                                        <th style={{textAlign: "left", paddingBottom: "10px", paddingRight:'20px'}}> 
                                            Contraprestaciones
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Métrica
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Infant
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Wipes
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Family
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Adult
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Fem
                                        </th>
                                        <th className='Th-Tabla-Ventas-Contraprestaciones'>
                                            Gran Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        [{},{},{},{},{},{},{},{},].map((dat, pos) => {
                                            return(
                                                <tr className='W600-S14-H19-L0015-C1E1E1E'>
                                                    <td style={{paddingBottom: "5px", paddingRight:'100px', position:'relative'}}>
                                                        <div style={{display:'flex'}}>
                                                            <div>
                                                                Driver de crecimiento escalonado
                                                            </div>
                                                            {
                                                                pos == 4
                                                                ?<Link to="/contraprestaciones">
                                                                    <div 
                                                                        className='W600-S12-H16-C1EC0ED-L0015-underline ver-detalle-tabla-ventas-contraprestaciones'
                                                                        style={{position:'absolute', right:'0'}}
                                                                    >
                                                                        Ver detalle
                                                                    </div>
                                                                </Link>
                                                                :null
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones'>
                                                        Sell In
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones'>
                                                        123,30
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones'>
                                                        123,30
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones'>
                                                        123,30
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones'>
                                                        123,30
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones'>
                                                        123,30
                                                    </td>
                                                    <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                                        123,30
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    <tr>
                                        <td style={{textAlign: "left", paddingTop:'10px'}} className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            Total
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            123,30
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            123,30
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            123,30
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            123,30
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            123,30
                                        </td>
                                        <td className='Td-Tabla-Ventas-Contraprestaciones Wbold-S16-H21-C1E1E1E'>
                                            
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </Col>
                    <Col xl={5}>
                        <div className='Contenedor-Monto-Ventas-Contraprestaciones'>
                            <div style={{textAlign: "-webkit-center"}}>
                                <div className='Circulo-Monto-Ventas-Contraprestaciones Wbold-S40-H53-C3646C4'>
                                    200
                                </div>
                                <div className='Wbold-S16-H21-CFFFFFF Txt-Monto-Ventas-Contraprestaciones'>
                                    Monto Total de Contraprestación
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Contraprestaciones