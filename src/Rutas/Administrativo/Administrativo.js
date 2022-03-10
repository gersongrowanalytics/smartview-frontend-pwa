import React, {useState} from 'react'
import { Row, Col } from 'antd'
import { Link } from "react-router-dom"
import '../../Estilos/Rutas/Administrativo/Administrativo.css'
import Perfil from '../../Assets/Img/Administrativo/adm.png'
import Agregar from '../../Assets/Img/Administrativo/agregar.png'
const Administrativo = () => {

    const [btnSeleccionado, setBtnSeleccionado] = useState("TIPOS")

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
                        <div 
                            className={btnSeleccionado == 'TIPOS' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'159px'}}
                            onClick={() => {setBtnSeleccionado("TIPOS")}}
                        >
                            Tipos Usuarios
                        </div>
                        <div 
                            className={btnSeleccionado == 'USUARIOS' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'149px'}}
                            onClick={() => {setBtnSeleccionado("USUARIOS")}}
                        >
                            Usuarios
                        </div>
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
                    <div className='Contenedor-Busqueda-Administrativo'>
                        <input 
                            className='Busqueda-Administrativo'
                            placeholder='Buscar'
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{paddingLeft: '40px', paddingTop: '27px', paddingRight: '60px'}}>
                <Col xl={4}>
                    <div className='flip-card'>
                        <div className='flip-card-inner'>
                            <div className='flip-card-front'>
                                <img src={Perfil} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <img src={Agregar} className='Imagen2-Perfil'/>
                                <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='flip-card'>
                        <div className='flip-card-inner'>
                            <div className='flip-card-front'>
                                <img src={Perfil} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <img src={Agregar} className='Imagen2-Perfil'/>
                                <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='flip-card'>
                        <div className='flip-card-inner'>
                            <div className='flip-card-front'>
                                <img src={Perfil} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <img src={Agregar} className='Imagen2-Perfil'/>
                                <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='flip-card'>
                        <div className='flip-card-inner'>
                            <div className='flip-card-front'>
                                <img src={Perfil} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <img src={Agregar} className='Imagen2-Perfil'/>
                                <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='flip-card'>
                        <div className='flip-card-inner'>
                            <div className='flip-card-front'>
                                <img src={Perfil} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <img src={Agregar} className='Imagen2-Perfil'/>
                                <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={4}>
                    <div className='flip-card'>
                        <div className='flip-card-inner'>
                            <div className='flip-card-front'>
                                <img src={Perfil} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <img src={Agregar} className='Imagen2-Perfil'/>
                                <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Administrativo