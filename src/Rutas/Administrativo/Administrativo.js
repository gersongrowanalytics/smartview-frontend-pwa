import React, {useState} from 'react'
import { Row, Col } from 'antd'
import { Link } from "react-router-dom"
import '../../Estilos/Rutas/Administrativo/Administrativo.css'
import Adm from '../../Assets/Img/Administrativo/TiposUsuarios/Administrador.png'
import Cliente from '../../Assets/Img/Administrativo/TiposUsuarios/Cliente.png'
import Ejecutivo from '../../Assets/Img/Administrativo/TiposUsuarios/Ejecutivo.png'
import Gerente from '../../Assets/Img/Administrativo/TiposUsuarios/Grente.png'
import Otro from '../../Assets/Img/Administrativo/TiposUsuarios/Otro-two.png'
import Otro2 from '../../Assets/Img/Administrativo/TiposUsuarios/Otro.png'
import Agregar from '../../Assets/Img/Administrativo/TiposUsuarios/agregar.png'

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
                                <img src={Adm} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Administrador</div>
                                <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                            </div>
                            <div className='flip-card-back'>
                                <Link 
                                    to={{
                                        pathname: '/administrativo-perfil',
                                    }}
                                >
                                    <img src={Agregar} className='Imagen2-Perfil'/>
                                </Link>
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
                                <img src={Cliente} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Cliente</div>
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
                                <img src={Ejecutivo} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Ejecutivo</div>
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
                                <img src={Gerente} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Gerente</div>
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
                                <img src={Otro} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Otro</div>
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
                                <img src={Otro2} className='Imagen-Perfil'></img>
                                <div className='Texto-Card-Perfil'>Otro</div>
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