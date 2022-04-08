import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../Estilos/Rutas/Administrativo/Administrativo.css'
import Adm from '../../Assets/Img/Administrativo/TiposUsuarios/Administrador.png'
import Cliente from '../../Assets/Img/Administrativo/TiposUsuarios/Cliente.png'
import Ejecutivo from '../../Assets/Img/Administrativo/TiposUsuarios/Ejecutivo.png'
import Gerente from '../../Assets/Img/Administrativo/TiposUsuarios/Grente.png'
import Otro from '../../Assets/Img/Administrativo/TiposUsuarios/Otro-two.png'
import Otro2 from '../../Assets/Img/Administrativo/TiposUsuarios/Otro.png'
import Agregar from '../../Assets/Img/Administrativo/TiposUsuarios/agregar.png'
import {
    dataTiposUsuarios
} from '../../Redux/Acciones/Administrativo/Usuarios/Usuarios'
import {
    dataPermisos
} from '../../Redux/Acciones/Administrativo/Permisos/Permisos'
import {
    ObtenerPermisosTipoUsuario
} from '../../Redux/Acciones/Administrativo/TiposUsuarios/TiposUsuarios'

const Administrativo = () => {

    const dispatch = useDispatch()
    const [btnSeleccionado, setBtnSeleccionado] = useState("TIPOS")

    const { 
        tiposUsuarios
    } = useSelector(({usuarios}) => usuarios);
    console.log(tiposUsuarios)

    let cantidadFilas = Math.round(tiposUsuarios.length / 4)
    let arrayCantidadFilas = []
    for (let i = 1; i <= cantidadFilas; i++) {
        arrayCantidadFilas.push(i)
    }
    console.log(arrayCantidadFilas)
    const cargarDatos = async() => {
        await dispatch(dataTiposUsuarios())
        await dispatch(dataPermisos())
    }

    useEffect(() => {
        cargarDatos()
    },[])

    return (
        <div className='Contenedor-Administrativo'>
            <Row>
                <Col lg={24} xl={24}>
                    <div className='Titulo-Administrativo'>Administrador</div>
                </Col>
            </Row>
            <Row>
                <Col lg={13} xl={13}>
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
                <Col lg={11} xl={11}>
                    <div className='Contenedor-Busqueda-Administrativo'>
                        <input 
                            className='Busqueda-Administrativo'
                            placeholder='Buscar'
                        />
                    </div>
                </Col>
            </Row>
            {
                arrayCantidadFilas.map((fila, pos) => {
                    return(
                        <Row style={{paddingLeft: '40px', paddingTop: '27px', paddingRight: '60px'}}>
                            {
                                tiposUsuarios.map((tipo, posicion) => {
                                    if ((posicion+1) >= (1+6*(pos))  && (posicion+1) <= (6*(pos+1)) ) {
                                        return (
                                            <Col xl={4}>
                                                <div className='flip-card'>
                                                    <div className='flip-card-inner'>
                                                        <div className='flip-card-front'>
                                                            <img src={Adm} className='Imagen-Perfil'></img>
                                                            <div className='Texto-Card-Perfil'>{tipo.tpunombre}</div>
                                                            <div className='Texto2-Card-Perfil'>Ver Perfil</div>
                                                        </div>
                                                        <div className='flip-card-back'>
                                                            <Link 
                                                                to={{ pathname: '/administrativo/perfil'}}
                                                                onClick={() => {dispatch(ObtenerPermisosTipoUsuario(tipo.tpuid))
                                                                console.log(tipo.tpuid)}}
                                                            >
                                                                <img src={Agregar} className='Imagen2-Perfil'/>
                                                            </Link>
                                                            <div className='Texto3-Card-Perfil'>Crear Nuevo</div>
                                                            <div className='Texto3-Card-Perfil'>Tipo de Usuario</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        )
                                    }
                                })
                            }
                        </Row>
                    )
                })
            }
        </div>
    )
}

export default Administrativo