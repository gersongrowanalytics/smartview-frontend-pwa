import React, {useEffect, useState} from 'react'
import { Row, Col, Switch,Input, Checkbox } from 'antd'
import { Link } from "react-router-dom"
import '../../../Estilos/Rutas/Administrativo/AdministrativoControlArchivo.css'
import FlechaAbajo from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import Excel from '../../../Assets/Img/Administrativo/ControlArchivo/excel.png'
import BanderaPeru from '../../../Assets/Img/Administrativo/Usuarios/Bandera-Perú.png'

const ControlArchivo = () => {

    const [btnSeleccionado, setBtnSeleccionado] = useState("CONTROL")
    
    const a = ['1','2','3','4','5','6','7','8']

    return (
        <div className='Contenedor-Administrativo'>
            <Row>
                <Col lg={24} xl={24}>
                    <div className='Titulo-Administrativo'>Administrador</div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} xl={12}>
                    <div className='Caja-Botones-Administrativo'>
                        <Link to='/administrativo'>
                            <div 
                                className={btnSeleccionado == 'TIPOS' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'159px'}}
                                onClick={() => {setBtnSeleccionado("TIPOS")}}
                            >
                                Tipos Usuarios
                            </div>
                        </Link>
                        <Link to='/administrativo/usuarios'>
                            <div 
                                className={btnSeleccionado == 'USUARIOS' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'149px'}}
                                onClick={() => {setBtnSeleccionado("USUARIOS")}}
                            >
                                Usuarios
                            </div>
                        </Link>
                        <Link to='/administrativo/permisos'>
                            <div 
                                className={btnSeleccionado == 'PERMISOS' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'135px'}}
                                onClick={() => {setBtnSeleccionado("PERMISOS")}}
                            >
                                Permisos
                            </div>
                        </Link>
                        <Link to='/administrativo/control-archivo'>
                            <div 
                                className={btnSeleccionado == 'CONTROL' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'135px'}}
                                onClick={() => {setBtnSeleccionado("CONTROL")}}
                            >
                                Control de archivo
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className='Paginacion-Control-Archivo'>
                        <div>1- 50 de 6</div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl={24}>
                    <div className='Contenedor-Tabla-Control'>
                        <table className='Tabla-Adm-Control'>
                            <thead>
                                <tr>
                                    <th style={{width:'9%'}}>
                                        <div>
                                            <span>Item</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th style={{width:'22%'}}>
                                        <div>
                                            <span>Archivo</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Tipo</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Nombre Apellido</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Pais</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Estado</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Fecha</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Hora</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    a.map((e)=> {
                                        return(
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <div>
                                                        <img src={Excel} style={{width:'30px'}}/>
                                                        <span>Grow Avance ventas - 23 MAR...</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    Avance de Venta
                                                </td>
                                                <td>
                                                    Nombre Apellido Apellido
                                                </td>
                                                <td>
                                                    <div>
                                                        <span>PE</span>
                                                        <img src={BanderaPeru} style={{width:'30px', marginLeft:'4px'}}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    Cargado
                                                </td>
                                                <td>
                                                    31 Mar 2022
                                                </td>
                                                <td>
                                                    8:00
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ControlArchivo