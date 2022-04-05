import React, { useEffect, useState } from 'react'
import { Row, Col, Switch, Input, Checkbox, Modal, Form, message, Spin } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../../Estilos/Rutas/Administrativo/AdministrativoUsuarios.css'
import Agregar from '../../../Assets/Img/Administrativo/Usuarios/Agregar-blue.png'
import FlechaAbajo from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import Persona from '../../../Assets/Img/Administrativo/Usuarios/Persona-white.png'
import FlechaAbajoNegro from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo.png'
import { SearchOutlined } from '@ant-design/icons'
import Borrar from '../../../Assets/Img/Administrativo/Usuarios/Cortar.png'
import {
    dataPaises,
    dataUsuarios,
    dataTiposUsuarios,
    crearUsuario
} from '../../../Redux/Acciones/Administrativo/Usuarios/Usuarios'
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';

const Usuarios = () => {
    const [btnSeleccionado, setBtnSeleccionado] = useState("USUARIOS")
    const [paginaActualTabla, setpaginaActualTabla] = useState("1")
    const [estadoBooleanUsuario, setestadoBooleanUsuario] = useState(false)
    const [estadoUsuario, setestadoUsuario] = useState("Inactivo")
    const [tipoUsuario, settipoUsuario] = useState("")
    const [valorFormularioTipoUsuario, setvalorFormularioTipoUsuario] = useState("")
    const [tipoUsuarioAbierto, settipoUsuarioAbierto] = useState(false)
    const [busquedaAbierto, setbusquedaAbierto] = useState(false)
    const [paisesAbierto, setpaisesAbierto] = useState(false)
    const [paisesSeleccionados, setpaisesSeleccionados] = useState([])
    const [abrirModalZona, setabrirModalZona] = useState(false)
    const [fechaInicio, setfechaInicio] = useState("")
    const [fechaFinal, setfechaFinal] = useState("")
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const { 
        usuarios,
        cargandoTablaUsuarios,
        paginasTotales,
        paginaActual,
        indexRegistro,
        paisesUsuario,
        tiposUsuarios
    } = useSelector(({usuarios}) => usuarios);

    const {
        zonas,
        sucursalesUsuario,
        gsus
    } = useSelector(({sucursales}) => sucursales);

    let cantidadZonas = Math.round(zonas.length / 3)
    let arrayCantidadZonas = []
    for (let i = 1; i <= cantidadZonas; i++) {
        arrayCantidadZonas.push(i)
    }

    const cargarDatosTabla = async(paginaActualTabla) => {
        await dispatch(dataUsuarios(paginaActualTabla))
        await dispatch(dataPaises())
        await dispatch(dataTiposUsuarios())
    }

    const paginaAnterior = (pagina) => {
        if (cargandoTablaUsuarios == false) {
            let paginaAnterior = parseFloat(pagina) - 1;
            if (pagina == "1") {
                setpaginaActualTabla("1")
            }else{
                setpaginaActualTabla(paginaAnterior)
            }
        }
    }

    const paginaSiguiente = (pagina) => {
        if (cargandoTablaUsuarios == false) {
            let paginaSiguiente = parseFloat(pagina) + 1;
            if (pagina == paginasTotales) {
                setpaginaActualTabla(paginasTotales)
            }else{
                setpaginaActualTabla(paginaSiguiente)
            }
        }
    }

    const cambiarEstado = (valor) => {
        if (valor == true) {
            setestadoBooleanUsuario(true)
            setestadoUsuario("Activo")
        }else if (valor == false) {
            setestadoBooleanUsuario(false)
            setestadoUsuario("Inactivo")
        }
    }

    const seleccionarTipoUsuario = (tipo) => {
        setvalorFormularioTipoUsuario(tipo.tpuid)
        settipoUsuarioAbierto(false)
        settipoUsuario(tipo.tpunombre)
    }

    const SeleccionarPais = (valor, posicion) => {
        let paisEliminar = paisesUsuario[posicion]['painombre']
        let paisPosicion
        if (valor == true) {
            setpaisesSeleccionados([...paisesSeleccionados, paisesUsuario[posicion]]);
        }else if(valor == false){
            paisesSeleccionados.filter((pais,pos) => {
                if(pais.painombre == paisEliminar){
                    return paisPosicion = pos
                }
            })
            paisesSeleccionados.splice(paisPosicion,1)
            setpaisesSeleccionados([...paisesSeleccionados])
        }
    }

    const EliminarPaisSeleccionado = (posicion) => {
        let paisEliminar = paisesSeleccionados[posicion]['painombre']
        let paisPosicion
        paisesSeleccionados.filter((pais,pos) => {
            if(pais.nombre == paisEliminar){
                return paisPosicion = pos
            }
        })
        paisesSeleccionados.splice(paisPosicion,1)
        setpaisesSeleccionados([...paisesSeleccionados])
    }

    const onFinish = async(valores) => {
        
        let estado
        if (estadoBooleanUsuario == true) {
            estado = '1'
        }else{
            estado = '2'
        }

        let usuarioDatos = {
            'nombre'      : valores['Nombre'],
            'apellidos'   : valores['Apellidos'],
            'correo_inst' : valores['Correo Coorporativo'],
            'correo'      : valores['Correo Personal'],
            'contrasenia' : valores['Contraseña'],
            'celular'     : valores['Celular'],
            'tipo_usuario': valorFormularioTipoUsuario,
            'fecha_inicio': fechaInicio,
            'fecha_fin'   : fechaFinal,
            // 'zonas: zonasSeelccionadas,
            'paises' : paisesSeleccionados,
            'estado' : estado,
        }

        if(await dispatch(crearUsuario(usuarioDatos)) == true){
            form.resetFields()
            settipoUsuario("")
            setfechaInicio("")
            setfechaFinal("")
            setpaisesSeleccionados([])
            cargarDatosTabla(paginaActualTabla)
            message.success("Usuario creado correctamente")
        }else{
            console.log("error")
        }
        
        console.log(usuarioDatos)
    };

    useEffect(() => {
        setpaisesSeleccionados(paisesSeleccionados)
    }, [paisesSeleccionados])
    
    useEffect(() => {
        cargarDatosTabla(paginaActualTabla)
    },[paginaActualTabla])

    const a = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']

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
                    <div className='Contenedor-Btn-Adm-Usuarios'>
                        <div className='Paginacion-Control-Archivo' style={{paddingTop:'0px'}}>
                            <div>1 - {paginasTotales} de {paginaActual}</div>
                            <LeftOutlined 
                                style={{marginLeft:'9px'}}
                                onClick={() => paginaAnterior(paginaActualTabla)}
                            />
                            <RightOutlined
                                style={{marginLeft:'34px'}}
                                onClick={() => paginaSiguiente(paginaActualTabla)}
                            />
                        </div>
                        <div className='Btn-Crear-Administrativo-Usuario'>
                            <span className='Texto-Btn-Adm-Usuarios'>Crear</span>
                            <img src={Agregar} style={{width: '25px'}}></img>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: '33px'}}>
                <Col xl={9}>
                    <Spin
                        size='large'
                        spinning={cargandoTablaUsuarios}
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                    >
                        <div className='Contenedor-Tabla-Adm-Usuarios'>
                            <table className='Tabla-Adm-Usuarios'>
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
                                                <span>Pais</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Correo Coorporativo</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Correo Personal</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Contraseña</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Celular</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Fecha Inicio</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Fecha Fin</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Zona</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>   
                                        <th>
                                            <div>
                                                <span>Estado</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}></img>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        usuarios.map((usuario,posicion) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {indexRegistro + posicion}
                                                    </td>
                                                    <td>
                                                        {usuario.pernombrecompleto}
                                                    </td>
                                                    <td>
                                                        {usuario.tpunombre}
                                                    </td>
                                                    <td>
                                                        {
                                                            usuario.paises.map((pais) => {
                                                                return (
                                                                    <img src={pais.paiiconomas} className='Banderas-lista' />
                                                                )
                                                            })
                                                            
                                                        }
                                                    </td>
                                                    <td>
                                                        {usuario.usucorreo}
                                                    </td>
                                                    <td>
                                                        {usuario.usucorreopersonal}
                                                    </td>
                                                    <td>
                                                        ************************
                                                    </td>
                                                    <td>
                                                        {usuario.usucelular}
                                                    </td>
                                                    
                                                    <td>
                                                        {usuario.usufechainicio}
                                                    </td>
                                                    <td>
                                                        {usuario.usufechafinal}
                                                    </td>
                                                    <td>
                                                        {usuario.zonnombre}
                                                    </td>
                                                    <td>
                                                        {usuario.estnombre}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Spin>
                </Col>
                <Col xl={15}>
                    <div style={{marginLeft: '15px', marginRight: '58px'}}>
                        <div className='Cabecera-Crear-Adm-Usuario'>
                            <img src={Persona} style={{width:'33px', marginRight: '8px'}}></img>
                            <span>Usuario</span>
                        </div>
                        <div className='Cuerpo-Crear-Adm-Usuario'>
                            <Form
                                onFinish={onFinish}
                                autoComplete="off"
                                form={form}
                            >
                            <Row>
                                <Col xl={12}>
                                    <div className='CampoA-Crear-Adm-Usuario'>
                                        <span>Nombres:</span>
                                        <Form.Item name='Nombre'>
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                    <div className='CampoA-Crear-Adm-Usuario'>
                                        <span>Apellidos:</span>
                                        <Form.Item name='Apellidos'>
                                            <Input/>
                                        </Form.Item>
                                    </div>
                                    <div className='CampoA-Crear-Adm-Usuario'>
                                        <span>Correo Coorporativo:</span>
                                        <Form.Item name='Correo Coorporativo'>
                                            <Input type={'email'}/>
                                        </Form.Item>
                                    </div>
                                    <div className='CampoA-Crear-Adm-Usuario'>
                                        <span>Correo Personal:</span>
                                        <Form.Item name='Correo Personal'>
                                            <Input type={'email'}/>
                                        </Form.Item>
                                    </div>
                                    <div className='CampoA-Crear-Adm-Usuario'>
                                        <span>Contraseña:</span>
                                        <Form.Item name='Contraseña'>
                                            <Input type='password'/>
                                        </Form.Item>
                                    </div>
                                    <div className='CampoA-Crear-Adm-Usuario'>
                                        <span>Celular:</span>
                                        <Form.Item name='Celular'>
                                            <Input />
                                        </Form.Item>
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
                                                            ? 'Contenedor-Opciones-Select-Tipos-Usuarios-Adm-Usuario'
                                                            : 'Contenedor-Opciones-Select-Tipos-Usuarios-Adm-Usuario-Oculto'}
                                            >
                                                {
                                                    tiposUsuarios.map((tipo, posicion) => {
                                                        return (
                                                            <div 
                                                                className='Opciones-Select-Adm-Usuario'
                                                                onClick={() => seleccionarTipoUsuario(tipo)}    
                                                            >
                                                                {tipo.tpunombre}
                                                            </div>   
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Fecha Inicio:</span>
                                        <input 
                                            type={'date'} 
                                            onChange={(e) => setfechaInicio(e.target.value)}
                                        />
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Fecha Fin:</span>
                                        <input 
                                            type={'date'} 
                                            onChange={(e) => setfechaFinal(e.target.value)}
                                        />
                                    </div>
                                    <div className='Campo2-Crear-Adm-Usuario'>   
                                        <span>Zona:</span>
                                        <div 
                                            className='Select-Pais-Adm-Usuario'
                                            onClick={() => {setabrirModalZona(!abrirModalZona)}}
                                        ></div>
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
                                                                    <span>{pais.painombre}</span>
                                                                    <img src={pais.paiicono} style={{width:'32px'}}></img>
                                                                    <img src={Borrar} style={{width:'11px'}} 
                                                                        onClick={() => EliminarPaisSeleccionado(pos)}/>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <div style={{display: 'flex'}}>
                                                            <div className='Contenedor-PreImagen-Pais-Seleccionado'>
                                                                <span>{paisesSeleccionados[0]['painombre']}</span>
                                                                <img src={paisesSeleccionados[0]['paiiconomas']} style={{width:'32px'}}></img>
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
                                                    paisesUsuario.map((pais, posicion) => {
                                                        return (
                                                            <div 
                                                                className='Opciones-Select-Adm-Usuario'
                                                                style={{height:'29px'}}  
                                                            >
                                                                <Checkbox className='Checkbox-Opcion-Adm-Usuario'
                                                                    onChange={(e) => {SeleccionarPais(e.target.checked, posicion)}}
                                                                />
                                                                <div className='Contenedor-Nombre-Img'>
                                                                    <span style={{marginLeft:'10px'}}>{pais.painombre}</span>
                                                                    <img src={pais.paiicono} style={{width:'32px'}}></img>
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
                                        <Form.Item>
                                            <button 
                                                className='Btn-Crear-Adm-Usuario'
                                                type='submit'
                                            >
                                                Guardar
                                            </button>
                                        </Form.Item>
                                    </div>
                                </Col>
                            </Row> 
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal
                centered
                title={null}
                visible={abrirModalZona}
                footer={null}
                closeIcon={<div></div>}
                width="1063px"
                height="438px"
                className='Caja-Modal-Zona'
                onCancel={() => setabrirModalZona(false)}
            >
                <div>
                    <div className='Titulo-Modal-Zona' style={{paddingLeft:'34px'}}>
                        <Checkbox style={{marginRight:'7px'}}/>Descargar Todo
                    </div>
                    <div style={{paddingLeft:'35px'}}>
                        {
                            arrayCantidadZonas.map((e,pos) => {
                                return(
                                    <Row>
                                        {
                                            zonas.map((zona, posicion) => {
                                                if ( (posicion+1) >= (1+3*(pos))  && (posicion+1) <= (3*(pos+1)) ) {
                                                    return (
                                                        <Col xl={8}>
                                                            <div className='Titulo-Modal-Zona'>
                                                                <Checkbox style={{marginRight:'7px'}}/>{zona.zonnombre}
                                                                {/* <div>
                                                                {zona.gsus}
                                                                </div> */}
                                                            </div>
                                                            {
                                                                gsus.map((eG,posG) => {
                                                                    if (eG.gsuid == zona.gsus[0] || eG.gsuid == zona.gsus[1]) {
                                                                        return (
                                                                            <div className='Opciones-Modal-Zona'>
                                                                                <Checkbox style={{marginRight:'7px'}}/>{eG.gsunombre}
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
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
                    <div className='Contenedor-Botones-Modal-Zona'>
                        <button className='Boton-Aceptar-Eliminar-Modal'>
                            Aceptar
                        </button>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setabrirModalZona(false)
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

export default Usuarios