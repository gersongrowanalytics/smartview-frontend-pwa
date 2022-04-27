import React, {useEffect, useState} from 'react'
import { Row, Col, Switch, Form, Input, Modal } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../../Estilos/Rutas/Administrativo/AdministrativoPerfil.css'
import FlechaAbajo from '../../../Assets/Img/Administrativo/Perfil/caret-down-black.png'
import FlechaDerecha from '../../../Assets/Img/Administrativo/Perfil/caret-right-black.png'
import ImagenPerfil from '../../../Assets/Img/Administrativo/Perfil/Completo-Administrador.png'
import Editar from '../../../Assets/Img/Administrativo/Perfil/Editar-white.png'
import Cerrar from '../../../Assets/Img/Administrativo/Perfil/Cortar.png'
import Check from  '../../../Assets/Img/Administrativo/Perfil/Palomita-white.png'
import {
     cambiarEstadoAbiertoTiposPermisos,
     cambiarEstadoPermisos,
     editarPermisosTipoUsuario,
     cambiarEstadoTipoPermiso
} from '../../../Redux/Acciones/Administrativo/TiposUsuarios/TiposUsuarios'

const TiposUsuarios = () => {

    const dispatch = useDispatch()
    const [btnSeleccionado, setBtnSeleccionado] = useState("TIPOS")
    const [editando, seteditando] = useState(false)
    const [estadoTipoUsuario, setestadoTipoUsuario] = useState("Inactivo")
    const [valorEstadoTu, setvalorEstadoTu] = useState("2")
    const [estadoBooleanTipoUsuario, setestadoBooleanTipoUsuario] = useState(false)
    const [modalTipoUsuario, setmodalTipoUsuario] = useState(false)
    const [respuestaCrearTipoUsuario, setrespuestaCrearTipoUsuario] = useState("")
    
    const [anioSeleccionado, setanioSeleccionado] = useState("0")
    const [mesSeleccionado, setmesSeleccionado] = useState("0")
    const [anioOpcionesAbierto, setanioOpcionesAbierto] = useState(false)
    const [mesOpcionesAbierto, setmesOpcionesAbierto] = useState(false)

    const [form] = Form.useForm()

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre']

    const { 
        permisosTipoUsuario,
        tpunombre,
        tpuimagen,
        tpufechainicio,
        tpufechafinal,
        estid,
        tpuid
    } = useSelector(({tiposUsuarios}) => tiposUsuarios);

    console.log(tpuimagen)
    const SeleccionarAño = (valor) => {
        setanioSeleccionado(valor)
        setanioOpcionesAbierto(false)
    }
    const SeleccionarMes = (valor) => {
        setmesSeleccionado(valor)
        setmesOpcionesAbierto(false)
    }

    const formatearFecha = (fecha) => {
        if(fecha){
            let date = fecha.split('-') 
            let mes = date[1].replace(/^(0+)/g, '')   
            return date[2] + " " + meses[mes] + " " + date[0]
        }else{
            return 'NaN'
        }
    }

    const cambiarEstado = (valor) => {
        if (valor == true) {
            setestadoBooleanTipoUsuario(true)
            setestadoTipoUsuario("Activo")
            setvalorEstadoTu("1")
        }else if (valor == false) {
            setestadoBooleanTipoUsuario(false)
            setestadoTipoUsuario("Inactivo")
            setvalorEstadoTu("2")
        }
    }

    const camposEditarFormularioTipoUsuario = () => {
        form.setFieldsValue({
            nombre: tpunombre,
            fechaInicio: tpufechainicio,
            fechaFinal: tpufechafinal,
        });
    }

    const editarDatosTiposUsuarios = () => {
        seteditando(!editando)
        camposEditarFormularioTipoUsuario()
        if(estid == 'Activo'){
            setestadoBooleanTipoUsuario(true)
            setestadoTipoUsuario("Activo")
            setvalorEstadoTu("1")
        }else{
            setestadoBooleanTipoUsuario(false)
            setestadoTipoUsuario("Inactivo")
            setvalorEstadoTu("2")
        }
    }
    const imagenCircular = [
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/Circular/tpu-mujer-1.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/Circular/tpu-hombre-5.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/Circular/tpu-hombre-3.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/Circular/tpu-hombre-1.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/Circular/tpu-hombre-2.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/Circular/tpu-hombre-4.png'
    ]
    const imagenPerfil = [
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-m-2png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-h-4.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-h-5.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-h-6.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-h-7.png',
        'https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-h-4.png'
    ]

    const onFinish = async(valores) => {
        let editarTipoUsuario = true
        let editarPermisos = false
        if (tpuid == '0') {
            let posicionArrayImagenRandom = Math.round(Math.random()*(2-0)+parseInt(0))
            let tipoUsuarioDatos = {
                're_nombre': valores['nombre'],
                're_estado': valorEstadoTu,
                're_fechaInicio': valores['fechaInicio'],
                're_fechaFinal': valores['fechaFinal'],
                're_imagen': imagenCircular[posicionArrayImagenRandom],
                're_imagencircular': imagenPerfil[posicionArrayImagenRandom]
            }
            setmodalTipoUsuario(true)
            if (await dispatch(editarPermisosTipoUsuario(tipoUsuarioDatos, permisosTipoUsuario, tpuid, editarTipoUsuario, editarPermisos)) == true){
                setrespuestaCrearTipoUsuario('Su usuario fue creado con éxito')
            }else{
                setrespuestaCrearTipoUsuario('Lo siento, error al crear su usuario')
            }
        }else{
            let tipoUsuarioDatos = {
                're_nombre': valores['nombre'],
                're_estado': valorEstadoTu,
                're_fechaInicio': valores['fechaInicio'],
                're_fechaFinal': valores['fechaFinal'],
                're_imagen': " ",
                're_imagencircular': " "
            }
            await dispatch(editarPermisosTipoUsuario(tipoUsuarioDatos, permisosTipoUsuario, tpuid, editarTipoUsuario, editarPermisos))
            seteditando(!editando)
        }
    }

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
            <Row>
                <Col xl={13}>
                    <div className='Contenedor-Perfil'>
                        <div className='Titulo-Perfil'>
                            {tpunombre}
                        </div>
                        {/* AÑO */}
                        {/* <div className='Fila-Select-Anio-Mes-Perfil'>
                            <div    
                                className='Select-Anio-Perfil'
                                onClick={() => setanioOpcionesAbierto(!anioOpcionesAbierto)}
                            >
                                <span className='Texto-Select-Anio-Perfil'>Año</span>
                                <img src={FlechaAbajo} style={{width: '11px'}}></img>
                            </div>
                            <div 
                                className={anioOpcionesAbierto == true 
                                    ? 'Contenido-Select-Anio'
                                    : 'Contenido-Select-Anio-Oculto'}
                            >
                                <div 
                                    className='Opciones-Select-Anio' 
                                    onClick={() => SeleccionarAño(2020)}
                                >
                                    2020
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2021)}
                                >
                                    2021
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2022)}
                                >
                                    2022
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2023)}
                                >
                                    2023
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2024)}
                                >
                                    2024
                                </div>
                            </div>
                            {
                                anioSeleccionado != "0" 
                                ? (
                                    <div className='Anio-Mes-Seleccionado'>
                                        <span className='Texto-Anio-Mes-Seleccionado'>
                                            {anioSeleccionado}
                                        </span>
                                        <img 
                                            src={Cerrar} 
                                            style={{width: '11px', cursor: 'pointer'}}
                                            onClick={() => setanioSeleccionado(0)}
                                        ></img>
                                    </div>
                                ) : null
                            }
                            
                        </div> */}
                        {/* MES */}
                        {/* <div className='Fila-Select-Anio-Mes-Perfil'>
                            <div 
                                className='Select-Mes-Perfil'
                                onClick={() => setmesOpcionesAbierto(!mesOpcionesAbierto)}
                            >
                                <span className='Texto-Select-Mes-Perfil'>Mes</span>
                                <img src={FlechaAbajo} style={{width: '11px'}}></img>
                            </div>
                            <div 
                                className={mesOpcionesAbierto == true 
                                    ? 'Contenido-Select-Mes'
                                    : 'Contenido-Select-Mes-Oculto'}
                            >
                                {
                                    meses.map((mes)=>{
                                        return (
                                            <div 
                                                className='Opciones-Select-Anio'
                                                onClick={() => SeleccionarMes(mes)}
                                            >
                                                {mes}
                                            </div>
                                        );
                                    })
                                }
                                
                            </div>
                            {
                                mesSeleccionado != "0" 
                                ? (
                                    <div className='Anio-Mes-Seleccionado'>
                                        <span className='Texto-Anio-Mes-Seleccionado'>
                                            {mesSeleccionado}
                                        </span>
                                        <img 
                                            src={Cerrar} 
                                            style={{width: '11px', cursor: 'pointer'}}
                                            onClick={() => setmesSeleccionado(0)}
                                        ></img>
                                    </div>
                                ) : null
                            }
                        </div> */}
                        {
                            permisosTipoUsuario.map((permiso,posicionTipoPermiso) => {
                                return (
                                    <>
                                        <div className='Select-Canal-Perfil'>
                                            <div 
                                                className='Campo-Switch-Abrir-Cerrar' 
                                                onClick={() => dispatch(cambiarEstadoAbiertoTiposPermisos(posicionTipoPermiso))}
                                            >
                                                {
                                                    permiso.abrir_opciones == true ? (
                                                        <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                                    ) : (
                                                        <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                                    )
                                                }
                                                <span className='Texto-Select-Canal-Perfil' >{permiso.tipo_permiso}</span>
                                            </div>
                                            <div className='Switch-Estilos Switch-Modulo'>
                                                <Switch 
                                                    size="small" 
                                                    onChange={(estado) => dispatch(cambiarEstadoTipoPermiso(estado, posicionTipoPermiso))} 
                                                    checked={permiso.seleccionar_tipoPermiso}
                                                />
                                            </div>
                                        </div>
                                        <div 
                                            className={ permiso.abrir_opciones == true
                                            ? 'Contenido-Select-Canal'
                                            : 'Contenido-Select-Canal-Oculto'}    
                                        >
                                            {
                                                permiso.permisos.map((subpermisos, posicionPermiso)=>{
                                                    return(
                                                        <div className='Opciones-Select-Canal-Perfil Switch-Submodulo'>
                                                            <div>
                                                                {subpermisos.pemnombre}
                                                            </div>
                                                            <Switch 
                                                                size="small" 
                                                                style={{marginRight:'12px'}} 
                                                                checked={subpermisos.seleccionado}
                                                                onChange={() => dispatch(cambiarEstadoPermisos(posicionPermiso, posicionTipoPermiso))}
                                                            /> 
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }
                        {
                            tpuid == '0' ? (
                                <Form
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    form={form}
                                >
                                    <Form.Item>
                                        <button 
                                            type='submit'
                                            className='Btn-Crear-Guardar-Perfil'
                                            style={{
                                                marginRight: "90px"
                                            }}
                                        >Crear y Guardar</button>
                                    </Form.Item>
                                </Form>
                                
                            ) : (
                                <div 
                                    className='Btn-Guardar-Perfil'
                                    style={{
                                        marginRight: "90px"
                                    }}
                                    onClick={() => {dispatch(editarPermisosTipoUsuario(null, permisosTipoUsuario, tpuid, false, true))}}
                                >Guardar</div>
                            )
                        }
                    </div>
                </Col>
                <Col xl={11}>
                    <div className='Contenedor-Imagen-Perfil'>
                        {
                            (tpuimagen == " " || tpuimagen == null) ? (
                                <img src={"https://pre-back.leadsmartview.com/Sistema/tiposUsuarios/tpu-h-4.png"} style={{width: '80%'}}></img>
                            ) : ( 
                                <img src={tpuimagen} style={{width: '80%', marginTop:'100px'}}></img>
                            )
                        }
                        {
                            tpuid != 0 ? (
                                <div className='Contenedor-Informacion-Perfil'>
                                    {
                                        editando == true ? (
                                            <Form
                                                onFinish={onFinish}
                                                autoComplete="off"
                                                form={form}
                                            >
                                                <div className='Input-Administrativo-Perfil'>
                                                    <Form.Item name='nombre'>
                                                        <Input 
                                                            style={{fontWeight: '700'}}
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className='Switch-Administrativo-Perfil'>   
                                                    <span>{estadoTipoUsuario}</span>
                                                    <Switch 
                                                        size="small" 
                                                        style={{marginRight:'12px'}}
                                                        onChange={(e)=> cambiarEstado(e)}
                                                        checked={estadoBooleanTipoUsuario}
                                                    />
                                                </div>
                                                <div className='Input-Date-Administrativo-Perfil'>
                                                    <div>Fecha Inicio: </div>
                                                    <Form.Item name='fechaInicio'>
                                                        <Input 
                                                            type="date"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <div className='Input-Date-Administrativo-Perfil'>
                                                    <div>Fecha Final: </div>
                                                    <Form.Item name='fechaFinal'>
                                                        <Input 
                                                            type="date"
                                                        />
                                                    </Form.Item>
                                                </div>
                                                <Form.Item>
                                                    <div className='Contenedor-Btn-Editar'>
                                                        <button 
                                                            type='submit' 
                                                            className='Circulo-Editar-Check-Perfil'
                                                        >
                                                            <img src={Check} style={{width: '28px'}}></img>
                                                        </button>
                                                    </div>
                                                </Form.Item> 
                                            </Form>
                                        ) : (
                                            <>
                                                <div>{tpunombre}</div>
                                                <div style={{fontWeight:'400'}}>{estid}</div>
                                                <div style={{fontWeight:'400'}}>Fecha Inicio: {formatearFecha(tpufechainicio)}</div>
                                                <div style={{fontWeight:'400'}}>Fecha Fin: {formatearFecha(tpufechafinal)}</div>
                                                <div 
                                                    className='Circulo-Editar-Perfil'
                                                    onClick={() => editarDatosTiposUsuarios()}
                                                >
                                                    <img src={Editar} style={{width: '14px'}}/>
                                                </div>
                                            </>
                                            
                                        )
                                    }
                                </div>  
                            ) : (   
                                <div 
                                    className='Contenedor-Informacion-Perfil'
                                    style={{
                                        marginRight: '20%',
                                        marginTop: '0px'
                                    }}
                                >
                                    <Form
                                        onFinish={onFinish}
                                        autoComplete="off"
                                        form={form}
                                    >
                                        <div className='Input-Administrativo-Perfil'>
                                            <Form.Item name='nombre'>
                                                <Input 
                                                    style={{fontWeight: '700'}}
                                                    placeholder="Ingresar nombre"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className='Switch-Administrativo-Perfil'>   
                                            <span>{estadoTipoUsuario}</span>
                                            <Switch 
                                                size="small" 
                                                style={{marginRight:'12px'}}
                                                onChange={(e)=> cambiarEstado(e)}
                                                checked={estadoBooleanTipoUsuario}
                                            />
                                        </div>
                                        <div 
                                            // className='Input-Date-Administrativo-Perfil'
                                            style={{
                                                display:'flex',
                                                height: "33px",
                                                position:'relative',
                                                marginTop:'15px'
                                            }}
                                        >
                                            <div 
                                                className='W400-S14-H19-C1E1E1E'
                                                style={{
                                                    paddingTop: "6px",
                                                }}
                                            >
                                                Fecha Inicio:
                                            </div>
                                            <div
                                                style={{
                                                    position:'absolute',
                                                    right:'0'
                                                }}
                                                className="Contenedor-Fechas-EditarCrear-TiposUsuarios"
                                            >
                                                <Form.Item name='fechaInicio'>
                                                    <Input 
                                                        type="date"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div 
                                            // className='Input-Date-Administrativo-Perfil'
                                            style={{
                                                display:'flex',
                                                height: "33px",
                                                position:'relative',
                                                marginTop:'15px'
                                            }}
                                        >
                                            <div 
                                                className='W400-S14-H19-C1E1E1E'
                                                style={{
                                                    paddingTop: "6px",
                                                }}
                                            >
                                                Fecha Final:
                                            </div>
                                            <div
                                                style={{
                                                    position:'absolute',
                                                    right:'0'
                                                }}
                                                className="Contenedor-Fechas-EditarCrear-TiposUsuarios"
                                            >
                                                <Form.Item name='fechaFinal'>
                                                    <Input 
                                                        type="date"
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        {/* <Form.Item>
                                            <div className='Contenedor-Btn-Editar'>
                                                <button 
                                                    type='submit' 
                                                    className='Circulo-Editar-Check-Perfil'
                                                >
                                                    <img src={Check} style={{width: '28px'}}></img>
                                                </button>
                                            </div>
                                        </Form.Item>  */}
                                    </Form>
                                </div> 
                            )
                        } 
                    </div>     
                </Col>
            </Row>
            <Modal
                centered
                title={null}
                visible={modalTipoUsuario}
                footer={null}
                closeIcon={<div></div>}
                width="310px"
                height="139px"
                className='Caja-Modal-Tipo-Usuario'
                onCancel={() => setmodalTipoUsuario(false)}
            >
                <div className='Contenedor-Modal-Tipo-Usuario'>
                    <div className='Titulo-Modal-Tipo-Usuario'>
                        Crear Nuevo Tipo de Usuario
                    </div>
                    <div>
                        {respuestaCrearTipoUsuario}
                    </div>
                    <Link to='/administrativo'>
                        <div className='Btn-Listo-Modal-Tipo-Usuario'>
                            Listo
                        </div>
                    </Link>
                </div>
            </Modal>
        </div>
    )
}

export default TiposUsuarios