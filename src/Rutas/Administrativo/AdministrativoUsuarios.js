import React, {useEffect, useState} from 'react'
import { Row, Col, Switch } from 'antd'
import { Link } from "react-router-dom"
import '../../Estilos/Rutas/Administrativo/AdministrativoUsuarios.css'
import Agregar from '../../Assets/Img/Administrativo/Usuarios/Agregar-blue.png'

const AdministrativoUsuarios = () => {
    const [btnSeleccionado, setBtnSeleccionado] = useState("USUARIOS")

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
                        <div 
                            className={btnSeleccionado == 'PERMISOS' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'135px'}}
                            onClick={() => {setBtnSeleccionado("PERMISOS")}}
                        >
                            Permisos
                        </div>
                        <div 
                            className={btnSeleccionado == 'CONTROL' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'135px'}}
                            onClick={() => {setBtnSeleccionado("CONTROL")}}
                        >
                            Control de archivo
                        </div>
                    </div>
                </Col>
                <Col lg={12} xl={12}>
                    <div className='Contenedor-Btn-Adm-Usuarios'>
                        <div className='Btn-Crear-Administrativo-Usuario'>
                            <span className='Texto-Btn-Adm-Usuarios'>Crear</span>
                            <img src={Agregar} style={{width: '25px'}}></img>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>

            </Row>
        </div>
    )
}

export default AdministrativoUsuarios