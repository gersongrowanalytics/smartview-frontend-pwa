import React, { useEffect, useState } from 'react'
import { Row, Col, Switch, Input, Checkbox, Modal, Form, Spin, DatePicker } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../../Estilos/Rutas/Administrativo/AdministrativoUsuarios.css'
import Agregar from '../../../Assets/Img/Administrativo/Usuarios/Agregar-blue.png'
import {
    dataPaises,
    dataUsuarios,
    dataTiposUsuarios,
    crearUsuario
} from '../../../Redux/Acciones/Administrativo/Usuarios/Usuarios'
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import TablaUsuarios from '../../../Componentes/Rutas/Administrativo/Usuarios/TablaUsuarios';
import FormularioUsuarios from '../../../Componentes/Rutas/Administrativo/Usuarios/FormularioUsuarios';

const Usuarios = () => {
    const dispatch = useDispatch()
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

    const [editarFilaUsuario, setEditarFilaUsuario] = useState(false)

    const [form] = Form.useForm()
    
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

    const crearAdmUsuario = () => {
        setEditarFilaUsuario(false)
        form.resetFields()
        settipoUsuario("")
        setfechaInicio("")
        setfechaFinal("")
        setpaisesSeleccionados([])
        setestadoUsuario("Inactivo")
        setestadoBooleanUsuario(false)
    }

    const seleccionarUsuarioEditar = (usuario) => {

        setEditarFilaUsuario(true)

        form.setFieldsValue({
            Nombre: usuario.pernombre,
            Apellidos: usuario.perapellidopaterno,
            CorreoPersonal: usuario.usucorreopersonal,
            CorreoCoorporativo: usuario.usucorreo,
            // Contraseña: usuario.usucontrasena,
            Celular: usuario.percelular
        });
        // let dateInput = document.getElementById('fecha_final');
        // console.log(dateInput.value)
        // dateInput.value = usuario.usufechafinal;
        // setvalorFormularioTipoUsuario(usuario.)

        setvalorFormularioTipoUsuario(usuario.tpuid)
        settipoUsuario(usuario.tpunombre)

        setfechaFinal(usuario.usufechafinal)
        setfechaInicio(usuario.usufechainicio)

        paisesUsuario.map((pais, pos) => {
            usuario.paises.map((usuarioPais) => {
                if(usuarioPais.paiid == pais.paiid){
                    SeleccionarPais(true, pos)
                }
            })
        })
        cambiarEstado(usuario.estid)
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
            'correo_inst' : valores['CorreoCoorporativo'],
            'correo'      : valores['CorreoPersonal'],
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
            crearAdmUsuario()
            cargarDatosTabla(paginaActualTabla)
        }else{
            // console.log("error")
        }
        // console.log(usuarioDatos)
    };

    useEffect(() => {
        setpaisesSeleccionados(paisesSeleccionados)
    }, [paisesSeleccionados])
    
    useEffect(() => {
        cargarDatosTabla(paginaActualTabla)
    },[paginaActualTabla])

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
                        <div 
                            className='Btn-Crear-Administrativo-Usuario'
                            onClick={() => crearAdmUsuario()}    
                        >
                            <span className='Texto-Btn-Adm-Usuarios'>Crear</span>
                            <img src={Agregar} style={{width: '25px'}}></img>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: '33px'}}>
                <Col xl={9}>
                    <TablaUsuarios 
                        seleccionarUsuarioEditar = {(usuario) => {
                            seleccionarUsuarioEditar(usuario)
                        }}
                        busquedaAbierto = {busquedaAbierto}
                        setbusquedaAbierto = {setbusquedaAbierto}
                    />
                </Col>
                <Col xl={15}>
                    <FormularioUsuarios 
                        paisesSeleccionados      = {paisesSeleccionados}
                        setpaisesSeleccionados   = {setpaisesSeleccionados}
                        EliminarPaisSeleccionado = {(posicion) => {
                            EliminarPaisSeleccionado(posicion)
                        }}
                        tipoUsuarioAbierto      = {tipoUsuarioAbierto}
                        settipoUsuarioAbierto   = {(bool) => {
                            settipoUsuarioAbierto(bool)
                        }}
                        paisesAbierto           = {paisesAbierto}
                        setpaisesAbierto        = {(pais) => {
                            setpaisesAbierto(pais)
                        }}
                        abrirModalZona          = {abrirModalZona}
                        setabrirModalZona       = {setabrirModalZona}
                        fechaInicio             = {fechaInicio}
                        setfechaInicio          = {setfechaInicio}
                        estadoUsuario           = {estadoUsuario}
                        setestadoUsuario        = {setestadoUsuario}
                        tipoUsuario             = {tipoUsuario}
                        settipoUsuario          = {settipoUsuario}
                        onFinish                = {onFinish}
                        seleccionarTipoUsuario  = {seleccionarTipoUsuario}
                        SeleccionarPais         = {SeleccionarPais}
                        cambiarEstado           = {cambiarEstado}
                        estadoBooleanUsuario    = {estadoBooleanUsuario}
                        setestadoBooleanUsuario = {setestadoBooleanUsuario}
                        fechaFinal              = {fechaFinal}
                        setfechaFinal           = {setfechaFinal}
                        editarFilaUsuario       = {editarFilaUsuario}
                        form = {form}

                    />
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