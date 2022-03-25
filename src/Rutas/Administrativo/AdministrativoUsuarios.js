import React, {useEffect, useState} from 'react'
import { Row, Col, Switch,Input, Checkbox } from 'antd'
import { Link } from "react-router-dom"
import '../../Estilos/Rutas/Administrativo/AdministrativoUsuarios.css'
import Agregar from '../../Assets/Img/Administrativo/Usuarios/Agregar-blue.png'
import FlechaAbajo from '../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import Persona from '../../Assets/Img/Administrativo/Usuarios/Persona-white.png'
import FlechaAbajoNegro from '../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo.png'
import { SearchOutlined } from '@ant-design/icons'
import BanderaPeru from '../../Assets/Img/Administrativo/Usuarios/Bandera-Perú.png'
import BanderaBolivia from '../../Assets/Img/Administrativo/Usuarios/Bancedra-Bolivia.png'
import BanderaChile from '../../Assets/Img/Administrativo/Usuarios/Bandera-Chile.png'
import Borrar from '../../Assets/Img/Administrativo/Usuarios/Cortar.png'

const AdministrativoUsuarios = () => {
    const [btnSeleccionado, setBtnSeleccionado] = useState("USUARIOS")
    const [estadoBooleanUsuario, setestadoBooleanUsuario] = useState(true)
    const [estadoUsuario, setestadoUsuario] = useState("Activado")
    const [tipoUsuario, settipoUsuario] = useState("")
    const [tipoUsuarioAbierto, settipoUsuarioAbierto] = useState(false)
    const [busquedaAbierto, setbusquedaAbierto] = useState(false)
    const [paisesAbierto, setpaisesAbierto] = useState(false)
    const [paisesSeleccionados, setpaisesSeleccionados] = useState([])

    const tiposUsuarios = ['Administrador','Gerente de Negocio','Cliente']
    const paises = [
        {
            bandera: BanderaPeru,
            nombre: 'Perú'
        },
        {
            bandera: BanderaBolivia,
            nombre: 'Bolivia'
        },
        {
            bandera: BanderaChile,
            nombre: 'Chile'
        }
    ]


    const cambiarEstado = (valor) => {
        if (valor == true) {
            setestadoBooleanUsuario(true)
            setestadoUsuario("Activado")
        }else if (valor == false) {
            setestadoBooleanUsuario(false)
            setestadoUsuario("Desactivado")
        }
    }

    const seleccionarTipoUsuario = (posicion) => {
        if (posicion == '0') {
            settipoUsuarioAbierto(false)
            settipoUsuario('Administrador')
        }else if(posicion == '1'){
            settipoUsuarioAbierto(false)
            settipoUsuario('Gerente de Negocio')
        }else if(posicion == '2'){
            settipoUsuarioAbierto(false)
            settipoUsuario('Cliente')
        }
    }

    const SeleccionarPais = (valor, posicion) => {
        let paisEliminar = paises[posicion]['nombre']
        let paisPosicion
        if (valor == true) {
            setpaisesSeleccionados([...paisesSeleccionados, paises[posicion]]);
        }else if(valor == false){
            paisesSeleccionados.filter((pais,pos) => {
                if(pais.nombre == paisEliminar){
                    return paisPosicion = pos
                }
            })
            paisesSeleccionados.splice(paisPosicion,1)
            setpaisesSeleccionados([...paisesSeleccionados])
        }
    }

    const EliminarPaisSeleccionado = (posicion) => {
        let paisEliminar = paisesSeleccionados[posicion]['nombre']
        let paisPosicion
        paisesSeleccionados.filter((pais,pos) => {
            if(pais.nombre == paisEliminar){
                return paisPosicion = pos
            }
        })
        paisesSeleccionados.splice(paisPosicion,1)
        setpaisesSeleccionados([...paisesSeleccionados])
    }

    useEffect(() => {
        setpaisesSeleccionados(paisesSeleccionados)
    }, [paisesSeleccionados])
    
    const a = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14']

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
                        <div className='Btn-Crear-Administrativo-Usuario'>
                            <span className='Texto-Btn-Adm-Usuarios'>Crear</span>
                            <img src={Agregar} style={{width: '25px'}}></img>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: '33px'}}>
                <Col xl={9}>
                    <div className='Contenedor-Tabla-Adm-Usuarios'>
                        <table 
                            className='Tabla-Adm-Usuarios'
                        >
                            <thead> 
                                <tr>
                                    <th style={{width: '19%'}}>
                                        <div>
                                            <span>Item</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                        </div>
                                    </th>
                                    <th>
                                        <div
                                            style={{cursor:'pointer'}}
                                            onClick={() => setbusquedaAbierto(!busquedaAbierto)}    
                                        >
                                            <span>Nombre y Apellido</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '6px'}}></img>
                                        </div>
                                        <div 
                                            className={ busquedaAbierto == true 
                                                ? 'Contenedor-Busqueda-Adm-Usuario'
                                                : 'Contenedor-Busqueda-Adm-Usuario-Ocultar'}
                                        >
                                            <div className='Cabecera-Buscar-Adm-Usuario'>
                                                <Input placeholder="Buscar" suffix={<SearchOutlined />} className='Buscar-Tabla-Adm-Usuario'/>
                                            </div>
                                            {
                                                a.map((e) => {
                                                    return (
                                                        <div className='Opcion-Busqueda-Adm-Usuario'>
                                                            <Checkbox className='Checkbox-Opcion-Adm-Usuario'/>
                                                            <span className='Txt-Opcion-Busqueda-Adm-Usuario'>
                                                                Nombre de Persona Apellido
                                                            </span>
                                                            
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className='Footer-Buscar-Adm-Usuario'>
                                                <div className='Btn-Opcion-Busqueda-Adm-Usuario' style={{marginRight:'5px'}}>
                                                    Aceptar
                                                </div>
                                                <div className='Btn-Opcion-Busqueda-Adm-Usuario'>
                                                    Cancelar
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Tipo de usuario</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Tipo de usuario2</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Tipo de usuario3</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Tipo de usuario4</span>
                                            <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    a.map((elemento) => {
                                        return (
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    Nombre de Persona Apellido
                                                </td>
                                                <td>
                                                    Administrador
                                                </td>
                                                <td>
                                                    Administrador2
                                                </td>
                                                <td>
                                                    Administrador3
                                                </td>
                                                <td>
                                                    Administrador4
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col xl={15}>
                    <div style={{marginLeft: '15px', marginRight: '58px'}}>
                        <div className='Cabecera-Crear-Adm-Usuario'>
                            <img src={Persona} style={{width:'33px', marginRight: '8px'}}></img>
                            <span>Usuario</span>
                        </div>
                        <div className='Cuerpo-Crear-Adm-Usuario'>
                            <Row>
                                <Col xl={12}>
                                    <div className='Campo1-Crear-Adm-Usuario'>
                                        <span>Nombre:</span>
                                        <input/>
                                    </div>
                                    <div className='Campo1-Crear-Adm-Usuario'>
                                        <span>Apellidos:</span>
                                        <input/>
                                    </div>
                                    <div className='Campo1-Crear-Adm-Usuario'>
                                        <span>Correo:</span>
                                        <input/>
                                    </div>
                                    <div className='Campo1-Crear-Adm-Usuario'>
                                        <span>Correo personal:</span>
                                        <input/>
                                    </div>
                                    <div className='Campo1-Crear-Adm-Usuario'>
                                        <span>Contraseña:</span>
                                        <input type='password'/>
                                    </div>
                                </Col>
                                <Col xl={12}>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Tipo de Usuario:</span>
                                        <div>
                                            <div 
                                                className='Select-Adm-Usuario'
                                                onClick={() => settipoUsuarioAbierto(!tipoUsuarioAbierto)}
                                            >
                                                <span>{tipoUsuario}</span>
                                                <img src={FlechaAbajoNegro} style={{width: '28px'}}></img>
                                            </div>
                                            <div className={tipoUsuarioAbierto == true 
                                                            ? 'Contenedor-Opciones-Select-Adm-Usuario'
                                                            : 'Contenedor-Opciones-Select-Adm-Usuario-Oculto'}
                                            >
                                                {
                                                    tiposUsuarios.map((tipo, posicion) => {
                                                        return (
                                                            <div 
                                                                className='Opciones-Select-Adm-Usuario'
                                                                onClick={() => seleccionarTipoUsuario(posicion)}    
                                                            >
                                                                {tipo}
                                                            </div>   
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Fecha Inicio:</span>
                                        <input/>
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Fecha Fin:</span>
                                        <input/>
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>País:</span>
                                        <div>
                                            <div 
                                                className='Select-Pais-Adm-Usuario'
                                                onClick={() => setpaisesAbierto(!paisesAbierto)}
                                            >
                                                {
                                                    paisesSeleccionados.length <= '2' ? (
                                                        paisesSeleccionados.map((pais, pos) => {
                                                            return (
                                                                <div className='Contenedor-PreImagen-Pais-Seleccionado'>
                                                                    <span>{pais.nombre}</span>
                                                                    <img src={pais.bandera} style={{width:'32px'}}></img>
                                                                    <img src={Borrar} style={{width:'11px'}} 
                                                                    onClick={() => EliminarPaisSeleccionado(pos)}></img>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <div style={{display: 'flex'}}>
                                                            <div className='Contenedor-PreImagen-Pais-Seleccionado'>
                                                                <span>{paisesSeleccionados[0]['nombre']}</span>
                                                                <img src={paisesSeleccionados[0]['bandera']} style={{width:'32px'}}></img>
                                                                <img src={Borrar} style={{width:'11px'}}></img>
                                                            </div>
                                                            <div className='Contenedor-Cantidad-PreImagen-Pais-Seleccionado'>
                                                               + { (paisesSeleccionados.length - 2)  } ...
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <img 
                                                    src={FlechaAbajoNegro} 
                                                    style={{width: '28px'}}
                                                    className={paisesSeleccionados.length == '0' ? 'Espaciado-Preseleccionar-Pais':''}
                                                ></img>
                                            </div>
                                            <div className={paisesAbierto == true 
                                                            ? 'Contenedor-Opciones-Select-Adm-Usuario'
                                                            : 'Contenedor-Opciones-Select-Adm-Usuario-Oculto'}
                                            >
                                                {
                                                    paises.map((pais, posicion) => {
                                                        return (
                                                            <div 
                                                                className='Opciones-Select-Adm-Usuario'
                                                                style={{height:'29px'}}  
                                                            >
                                                                <Checkbox className='Checkbox-Opcion-Adm-Usuario'
                                                                    onChange={(e) => {SeleccionarPais(e.target.checked, posicion)}}
                                                                />
                                                                <div className='Contenedor-Nombre-Img'>
                                                                    <span style={{marginLeft:'10px'}}>{pais.nombre}</span>
                                                                    <img src={pais.bandera} style={{width:'32px'}}></img>
                                                                </div>
                                                            </div>   
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Estado:</span>
                                        <div className='Contenedor-Estado-Adm-Usuario Switch-Adm'>
                                            <span>{estadoUsuario}</span>
                                            <Switch 
                                                size="small" 
                                                style={{marginRight:'12px'}}
                                                onChange={(e)=> cambiarEstado(e)}
                                                checked={estadoBooleanUsuario}
                                            />
                                        </div>
                                    </div>
                                    <div className='Posicion-Btn-Crear-Adm-Usuario'>
                                        <div className='Btn-Crear-Adm-Usuario'>
                                            Guardar
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default AdministrativoUsuarios