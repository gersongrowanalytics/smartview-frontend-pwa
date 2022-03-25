import React, {useEffect, useState} from 'react'
import { Row, Col, Modal } from 'antd'
import { Link } from "react-router-dom"
import '../../Estilos/Rutas/Administrativo/AdministrativoPermisos.css'
import Agregar from '../../Assets/Img/Administrativo/Usuarios/Agregar-blue.png'
import FlechaAbajo from '../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import FlechaAbajoNegro from '../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo.png'

const AdministrativoPermisos = () => {

    const [btnSeleccionado, setBtnSeleccionado] = useState("PERMISOS")
    const [mostrarModalCrear, setmostrarModalCrear] = useState(false)
    const [mostrarSelectCategoria, setmostrarSelectCategoria] = useState(false)
    const [categoriaSeleccionada, setcategoriaSeleccionada] = useState("0")
    const a = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14']
    
    const SeleccionarCategoria = (valor) => {
        setcategoriaSeleccionada(valor)
        setmostrarSelectCategoria(false)
    }

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
                    <div className='Contenedor-Btn-Adm-Usuarios'>
                        <div 
                            className='Btn-Crear-Administrativo-Usuario'
                            onClick={() => {
                                setmostrarModalCrear(true)
                            }}
                        >
                            <span className='Texto-Btn-Adm-Usuarios'>Crear</span>
                            <img src={Agregar} style={{width: '25px'}}></img>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl={24}>
                    <div className='Contenedor-Tabla-Permisos'>
                        <table className='Tabla-Adm-Permisos'>
                            <thead>
                                <tr>
                                    <th>
                                        <div>
                                            <span>Item</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Categoría</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Permiso</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Slug</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Ruta</span>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Fecha de Creación</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    a.map((e) => {
                                        return(
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    Canal
                                                </td>
                                                <td>
                                                    Canal Moderno
                                                </td>
                                                <td>
                                                    usuario.mostrar.permisos
                                                </td>
                                                <td>
                                                    Admistrador/Admistrador/Admistrador
                                                </td>
                                                <td>
                                                    31 Mar 2022
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
            <Modal
                centered
                title={null}
                visible={mostrarModalCrear}
                footer={null}
                closeIcon={<div></div>}
                width="371px"
                height="289px"
                className='Caja-Modal-CrearPermiso'
                onCancel={() => setmostrarModalCrear(false)}
            >
                <div>
                    <div className='Titulo-Modal-Crear-Permiso'>
                        Nuevo Permiso
                    </div>
                    <div>
                        <Row style={{marginTop:'21px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Categoría</span>
                            </Col>
                            <Col xl={17}>
                                <div className='Modal-Select-Crear-Permiso'>
                                    {
                                        categoriaSeleccionada != "0" ? (
                                            <div className='Texto-Categoria-Seleccionada-Modal'>{categoriaSeleccionada}</div>
                                        ) : (
                                            <input className='Modal-Input-Select-Crear-Permiso' placeholder='Escribir aqui'/>
                                        )
                                    }
                                    <img 
                                        src={FlechaAbajoNegro} 
                                        style={{width: '28px', cursor:'pointer'}}
                                        onClick={()=>setmostrarSelectCategoria(!mostrarSelectCategoria)}
                                    />
                                </div>
                                <div 
                                    className={mostrarSelectCategoria == true 
                                            ? 'Contenedor-Select-Categoria-Modal'
                                            : 'Contenedor-Select-Categoria-Modal-Ocultar'}
                                >
                                    {
                                        a.map((e)=>{
                                            return (
                                                <div 
                                                    className='Opciones-Select-Categoria-Modal'
                                                    onClick={()=> SeleccionarCategoria("Canal")}
                                                >
                                                    <span>Canal</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Permiso:</span>
                            </Col>
                            <Col xl={17}>
                                <input className='Modal-Input-Crear-Permiso' placeholder='Escribir aqui'/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Slug:</span>
                            </Col>
                            <Col xl={17}>
                                <input className='Modal-Input-Crear-Permiso' placeholder='Escribir aqui'/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px', marginBottom:'21px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Ruta:</span>
                            </Col>
                            <Col xl={17} >
                                <input className='Modal-Input-Crear-Permiso' placeholder='Escribir aqui'/>
                            </Col>
                        </Row>
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <button className='Boton-Aceptar-Eliminar-Modal'>
                            Guardar
                        </button>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmostrarModalCrear(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AdministrativoPermisos