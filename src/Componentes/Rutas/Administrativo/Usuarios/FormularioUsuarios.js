import React, {useState, useEffect} from 'react'
import { Row, Col, Switch, Input, Checkbox, Form } from 'antd'
import FlechaAbajoNegro from '../../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo.png'
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import Persona from '../../../../Assets/Img/Administrativo/Usuarios/Persona-white.png'
import Borrar from '../../../../Assets/Img/Administrativo/Usuarios/Cortar.png'
import ModalSeleccionarDt from './ModalSeleccionarDt'

const FormularioUsuarios = (props) => {

    const { 
        paisesUsuario,
        tiposUsuarios
    } = useSelector(({usuarios}) => usuarios);

    const paisesSeleccionados       = props.paisesSeleccionados
    const EliminarPaisSeleccionado  = props.EliminarPaisSeleccionado
    const tipoUsuarioAbierto        = props.tipoUsuarioAbierto
    const settipoUsuarioAbierto     = props.settipoUsuarioAbierto
    const paisesAbierto             = props.paisesAbierto
    const setpaisesAbierto          = props.setpaisesAbierto
    const abrirModalZona            = props.abrirModalZona
    const setabrirModalZona         = props.setabrirModalZona
    const fechaInicio               = props.fechaInicio
    const setfechaInicio            = props.setfechaInicio
    const estadoUsuario             = props.estadoUsuario
    const setestadoUsuario          = props.setestadoUsuario
    const tipoUsuario               = props.tipoUsuario
    const settipoUsuario            = props.settipoUsuario
    const ObtenerDatosFormulario    = props.ObtenerDatosFormulario
    const seleccionarTipoUsuario    = props.seleccionarTipoUsuario
    const fechaFinal                = props.fechaFinal
    const setfechaFinal             = props.setfechaFinal
    const SeleccionarPais           = props.SeleccionarPais
    const cambiarEstado             = props.cambiarEstado
    const estadoBooleanUsuario      = props.estadoBooleanUsuario
    const setestadoBooleanUsuario   = props.setestadoBooleanUsuario
    const editarFilaUsuario         = props.editarFilaUsuario
    const ConfirmoEditar            = props.ConfirmoEditar
    const form   = props.form

    const [mostrarModal, setMostrarModal] = useState(false)

    return (
        <div>
            <div style={{marginLeft: '40px', marginRight: '58px', paddingBottom:'20px'}}>
                <div className='Cabecera-Crear-Adm-Usuario'>
                    <img src={Persona} style={{width:'33px', marginRight: '8px'}}></img>
                    <span>Usuario</span>
                </div>
                <div className='Cuerpo-Crear-Adm-Usuario'>
                    <Form
                        onFinish={ObtenerDatosFormulario}
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
                                <Form.Item name='CorreoCoorporativo'>
                                    <Input type={'email'}/>
                                </Form.Item>
                            </div>
                            <div className='CampoA-Crear-Adm-Usuario'>
                                <span>Correo Personal:</span>
                                <Form.Item name='CorreoPersonal'>
                                    <Input type={'email'} autoComplete={'off'}/>
                                </Form.Item>
                            </div>
                            <div className='CampoA-Crear-Adm-Usuario'>
                                <span>Contraseña:</span>
                                <Form.Item name='Contraseña'>
                                    <Input type='password' autoComplete={'new-password'}/>
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
                                        onClick={() => {
                                            settipoUsuarioAbierto(!tipoUsuarioAbierto)
                                            setpaisesAbierto(false)
                                        }}
                                    >
                                        {
                                            tipoUsuario.length == '0' ? (
                                                <div className='Txt-PreSeleccion'>Seleccionar aquí</div>
                                            ) : (
                                                <div>{tipoUsuario}</div>
                                            )
                                        }
                                        <img src={FlechaAbajoNegro} style={{width: '20px'}}></img>
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
                                                        key={tipo.tpuid}
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
                                    value={fechaInicio}
                                />
                                {/* <Form.Item name='fecha_inicio'>
                                    <DatePicker onChange={(e) => {console.log(e._d)}} placeholder='Seleccionar fecha'
                                        className='Fecha-Input'/>
                                </Form.Item> */}
                                
                            </div>
                            <div className='Campo2-Crear-Adm-Usuario'>   
                                <span>Fecha Fin:</span>
                                <input 
                                    id='fecha_final'
                                    type={'date'}
                                    // onChange={(e) => setfechaFinal(new Date(e.target.value))}
                                    onChange={(e) => setfechaFinal(e.target.value)}
                                    value={fechaFinal}
                                />
                                {/* {
                                    fechaFinal == null ? (
                                        <input 
                                            id='fecha_final'
                                            type={'date'}
                                            onChange={(e) => setfechaFinal(new Date(e.target.value))}
                                        />
                                    ) : (
                                        <input 
                                            id='fecha_final'
                                            type={'date'} 
                                            value={fechaFinal}
                                            onChange={(e) => setfechaFinal(new Date(e.target.value))}
                                        />
                                    )   
                                } */}
                                
                            </div>
                            <div className='Campo2-Crear-Adm-Usuario'>   
                                <span>Distribuidora:</span>
                                <div 
                                    className='Select-Pais-Adm-Usuario'
                                    onClick={() => {
                                        setMostrarModal(!mostrarModal)
                                    }}
                                    style={{
                                        paddingLeft:'20px'
                                    }}
                                >
                                    Selecciona Distribuidoras
                                </div>
                            </div>
                            <div className='Campo2-Crear-Adm-Usuario'>   
                                <span>País:</span>
                                <div>
                                    <div 
                                        className='Select-Pais-Adm-Usuario'
                                        onClick={() => {
                                            setpaisesAbierto(!paisesAbierto)
                                            settipoUsuarioAbierto(false)
                                        }}
                                    >
                                        {
                                            paisesSeleccionados.length == '0' ? (
                                                <div className='Txt-PreSeleccion' style={{paddingLeft:'19px'}}>Seleccionar aquí</div>
                                            ) : (
                                                paisesSeleccionados.length <= '2' ? (
                                                    paisesSeleccionados.map((pais, pos) => {
                                                        return (
                                                            <div className='Contenedor-PreImagen-Pais-Seleccionado'>
                                                                <span>{pais.painombre}</span>
                                                                <img src={pais.paiicono} style={{width:'32px'}}></img>
                                                                <img src={Borrar} style={{width:'8px'}} 
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
                                            )
                                        }
                                        <img 
                                            src={FlechaAbajoNegro} 
                                            style={{width: '20px'}}
                                            // className={paisesSeleccionados.length == '0' ? 'Espaciado-Preseleccionar-Pais':''}
                                        />
                                    </div>
                                    <div 
                                        className={
                                            paisesAbierto == true 
                                            ? 'Contenedor-Opciones-Select-Adm-Usuario'
                                            : 'Contenedor-Opciones-Select-Adm-Usuario-Oculto'
                                        }
                                    >
                                        {
                                            paisesUsuario.map((pais, posicion) => {
                                                return (
                                                    <div 
                                                        className='Opciones-Select-Adm-Usuario'
                                                        style={{height:'29px'}}  
                                                    >
                                                        <Checkbox className='Checkbox-Opcion-Adm-Usuario'
                                                            onChange={(e) => {
                                                                SeleccionarPais(e.target.checked, posicion)
                                                            }}
                                                            checked={pais.seleccionado}
                                                        />
                                                        <div className='Contenedor-Nombre-Img'>
                                                            <span style={{marginLeft:'10px'}}>{pais.painombre}</span>
                                                            <img src={pais.paiicono} style={{width:'20px'}}></img>
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
                            <div 
                                className='Posicion-Btn-Crear-Adm-Usuario'>
                                <Form.Item>
                                    <button 
                                        className='Btn-Crear-Adm-Usuario'
                                        type='submit'
                                    >
                                        {
                                            editarFilaUsuario == true
                                            ?ConfirmoEditar == true
                                                ?"Guardar Edición"
                                                :"Editar"
                                            :"Guardar"
                                        }
                                    </button>
                                </Form.Item>
                            </div>
                        </Col>
                    </Row> 
                    </Form>
                </div>
            </div>


            <ModalSeleccionarDt
                mostrarModal = {mostrarModal}
                setMostrarModal = {setMostrarModal}
            />

        </div>
    )
}

export default FormularioUsuarios