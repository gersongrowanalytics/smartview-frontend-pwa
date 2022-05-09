import React, {useState, useEffect, useRef} from 'react'
import { Row, Col, Spin, notification, Switch} from 'antd'
import '../../Estilos/Rutas/MiPerfil/MiPerfil.css'
import Camara from '../../Assets/Img/MiPerfil/Foto_perfil_cámara.png'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Select, Button } from "antd";
import {
    EditarPerfilReducer
} from '../../Redux/Acciones/MiPerfil/MiPerfil'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ModalImagen from '../../Componentes/Rutas/MiPerfil/ModalImagen'

const MiPerfil = () => {

    const dispatch = useDispatch()

    const [txtIdioma, settxtIdioma] = useState("")
    const [imagenPrevi, setimagenPrevi] = useState(Camara)
    const [imagenUsuario, setimagenUsuario] = useState(localStorage.getItem('usuimagen'))
    const [modalAbiertoEditarImagen, setModalAbiertoEditarImagen] = useState(false)
    const [imagenRecortada, setImagenRecortada] = useState("")
    const [editarContrasenia, setEditarContrasenia] = useState(false)
    
    const { 
        datosUsuarioLogeado
    } = useSelector(({ auth }) => auth);
    
    const {
        cargandoBtnEditar
    } = useSelector(({ miperfil }) => miperfil);

    const seleccionarIdioma = (idioma) => {
        settxtIdioma(idioma)
    }

    const abrirNotificacion = (respuesta) => {
        notification.info({
            message: `Notificación de edición`,
            description: respuesta == "true"
                ? "Los datos de su usuario fueron editados exitosamente"
                : "Lo sentimos, hubo un error al editar su usuario",
            icon: respuesta == "true"
                ? <CheckCircleOutlined style={{ color: '#00BB2D' }} />
                : <CloseCircleOutlined style={{ color: '#FF0000' }} />,
        });
    };
    
    const onFinish = async(datos) =>  {

        let datosUsuario = {
            re_imagen          : localStorage.getItem('usuimagen'),
            re_nombre          : datos['nombre'],
            re_apellidoPaterno : datos['apellidoPaterno'],
            re_apellidoMaterno : datos['apellidoMaterno'],
            re_correo          : datos['email'],
            re_telefono        : datos['telefono'],
            // idioma             : datos['idioma'],
            // pais               : datos['pais'],
            re_direccion        : datos['direccion'],
            re_editarContrasenia: editarContrasenia,
            re_contrasenia      : editarContrasenia == true ? datos['contraseniaActual'] : "_",
            re_nuevaContrasenia : editarContrasenia == true ? datos['contraseniaNueva'] : "_",
        }
        // console.log(datosUsuario)
        if ( await dispatch(EditarPerfilReducer(datosUsuario)) == true) {
            abrirNotificacion('true')
        } else {
            abrirNotificacion('false')
        }    
    };
    
    return (
        <div
            style={{marginTop:'115px'}}
        >
            <Form
                onFinish={onFinish}
                initialValues={{
                    nombre            : localStorage.getItem('pernombre') == "null" ? "" : localStorage.getItem('pernombre'),
                    apellidoPaterno   : localStorage.getItem('perapellidopaterno') == "null" ? "" : localStorage.getItem('perapellidopaterno'),
                    apellidoMaterno   : localStorage.getItem('perapellidomaterno') == "null" ? "" : localStorage.getItem('perapellidomaterno'),
                    email             : localStorage.getItem('usuusuario') == "null" ? "" : localStorage.getItem('usuusuario'),
                    telefono          : localStorage.getItem('percelular') == "null" ? "" : localStorage.getItem('percelular'),
                    direccion         : localStorage.getItem('perdireccion') == "null" ? "" : localStorage.getItem('perdireccion'),
                    idioma: "espanol"
                }}
            >
                <Row style={{marginTop:'60px'}}>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil' style={{display:'flex', alignItems: 'center'}}>Foto De Perfil</div>
                    </Col>
                    <Col xl={10} offset={1}>
                        {
                            localStorage.getItem('usuimagen') == 'null' ? (
                            // !localStorage.getItem('usuimagen') ? (
                                <>
                                {/* primera */}
                                    <div className='imagen-upload'>
                                        <label htmlFor="file-input">
                                            <img className='Foto-Perfil' src={imagenPrevi}/>
                                        </label>
                                        <input 
                                            id='file-input' 
                                            type="file"
                                            onChange={(e) => {
                                                let reader = new FileReader()
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = function(){
                                                    setimagenPrevi(reader.result)
                                                    setModalAbiertoEditarImagen(true)
                                                    // localStorage.setItem('usuImagenPrev', reader.result)
                                                    // dispatch(OpcionesImagenPrevImagenReducer(reader.result, row.index, row.original.proimagen))
                                                };
                                            }}  
                                        />
                                    </div>
                                </>
                                
                            ) : (
                                <div className='imagen-upload'>
                                {/* segunda */}
                                        <label htmlFor="file-input">
                                            <img className='Foto-Perfil' src={imagenUsuario}/>
                                        </label>
                                        <input 
                                            id='file-input' 
                                            type="file"
                                            onChange={(e) => {
                                                // console.log(e.target.files[0].name)
                                                let reader = new FileReader()
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = function(){
                                                    setimagenPrevi(reader.result)
                                                    setModalAbiertoEditarImagen(true)
                                                    // localStorage.setItem('usuImagenPrev', reader.result)
                                                    // dispatch(OpcionesImagenPrevImagenReducer(reader.result, row.index, row.original.proimagen))
                                                };
                                                
                                            }} 
                                        />
                                </div> 
                            )
                        }
                    </Col>
                </Row>
                <Row style={{marginTop:'25px'}}>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Nombre *:</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="nombre"
                            className='InputFormPerfil'
                            rules= {[
                                {
                                    required: true,
                                    message:"Ingrese un nombre"
                                }
                            ]}
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Apellido Paterno *:</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="apellidoPaterno"
                            className='InputFormPerfil'
                            rules= {[
                                {
                                    required: true,
                                    message:"Ingrese su apellido paterno"
                                }
                            ]}
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Apellido Materno *:</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="apellidoMaterno"
                            className='InputFormPerfil'
                            rules= {[
                                {
                                    required: true,
                                    message:"Ingrese su apellido materno"
                                }
                            ]}
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Email *:</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="email"
                            className='InputFormPerfil'
                            rules= {[
                                {
                                    required: true,
                                    message:"Ingrese un email"
                                }
                            ]}
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Teléfono *:</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="telefono"
                            className='InputFormPerfil'
                            rules= {[
                                {
                                    required: true,
                                    message:"Ingrese un teléfono"
                                }
                            ]}
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Idioma :</div>
                    </Col>
                    <Col xl={10} offset={1}>
                        <Form.Item
                            name="idioma"
                        >
                            <Select 
                                className='Select-Perfil'
                                size={"large"}
                                style={{ 
                                    width: "95px",
                                    fontFamily: "Segoe UI",
                                    fontStyle: "normal",
                                    fontSize: "12px",
                                    lineHeight: "16px",
                                }}
                                onChange={
                                    (e) => seleccionarIdioma(e)
                                }
                            >
                                <Select.Option value='espanol'>Español</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>País :</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="pais"
                            className='InputFormPerfil'
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Dirección :</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="direccion"
                            className='InputFormPerfil'
                        >
                            <Input className='Input-Perfil'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xl={6}/>
                    <Col xs={5} xl={3} className='Primera-Columna-Perfil'>
                        <div className='Campos-Perfil'>Contraseña :</div>
                    </Col>
                    <Col xs={14} xl={9}>
                        <div>
                            {
                                editarContrasenia == true
                                    ? <div style={{marginLeft: '56px', paddingRight: '35px'}}>
                                        <div className='Text-Inputs-Contrasenia'>
                                            *Contraseña Actual
                                        </div>
                                        <Form.Item
                                            name="contraseniaActual"
                                            className='InputFormPerfil'
                                        >
                                            <Input.Password
                                                className='Input-Perfil'
                                                autoComplete={'new-password'}
                                            />
                                        </Form.Item>
                                        <div className='Text-Inputs-Contrasenia'>
                                            *Nueva Contraseña
                                        </div>
                                        <Form.Item
                                            name="contraseniaNueva"
                                            className='InputFormPerfil'
                                        >
                                            <Input.Password
                                                className='Input-Perfil'
                                                autoComplete={'new-password'}
                                            />
                                        </Form.Item>
                                        <div className='Text-Inputs-Contrasenia'>
                                            *Confirmar nueva contraseña
                                        </div>
                                        <Form.Item
                                            name="contraseniaConfirmacion"
                                            className='InputFormPerfil'
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                  validator(_, value) {
                                                    if (!value || getFieldValue('contraseniaNueva') === value) {
                                                      return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('¡Las dos contraseñas que ingresaste no coinciden!'));
                                                  },
                                                }),
                                              ]}
                                        >
                                            <Input.Password
                                                className='Input-Perfil'
                                                autoComplete={'new-password'}
                                            />
                                        </Form.Item>
                                    </div>
                                    : <div
                                        className='Campos-Perfil'
                                        style={{ marginLeft: '56px'}}
                                      >
                                        Cambiar contraseña
                                      </div>
                            }
                        </div>
                    </Col>
                    <Col xl={1} style={{display:'flex', justifyContent: 'flex-end'}}>
                        <Switch
                            onChange={(e) => {setEditarContrasenia(e)}}
                        />
                    </Col>
                    <Col xs={2} xl={5}/>
                </Row>
                <Row style={{marginTop:'50px', marginBottom: '58px'}}>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={10} xl={3} className='Primera-Columna-Perfil Posicion'>
                        <Spin spinning={cargandoBtnEditar}>
                            <button
                                type='submit'  
                                className='Boton-Guardar-Perfil'
                            >
                                Guardar Cambios
                            </button>
                        </Spin>
                    </Col>
                    <Col xl={9}>
                        <Link to="/ventas">
                            <div className='Boton-Cancelar-Perfil'>
                                Cancelar Cambios
                            </div>
                        </Link>
                    </Col>
                    {/* <Col xs={0} xl={0} offset={1} className='Segunda-Columna-Perfil'>
                        <button 
                            className='Boton-Baja-Perfil'
                            style={{ display:'none'}}
                        >
                            Solicitar Baja
                        </button>
                    </Col> */}
                </Row>
            </Form>
            <ModalImagen
                modalAbiertoEditarImagen={modalAbiertoEditarImagen}
                imagenPrevi={ imagenPrevi }
                imagenUsu = { imagenUsuario }
                imagenRecortada = {imagenRecortada}
                setAbrilModal={(valor) => {
                    setModalAbiertoEditarImagen(valor)
                }}
                setImagenPrevisualizar={(imagen) => {
                    setimagenPrevi(imagen)
                }}
                setImagenRecortadaCircular={(imagen) => {
                    setImagenRecortada(imagen)
                }}
                setImagenUsuario={(imagen) => {
                    setimagenUsuario(imagen)
                }}
            />
        </div>
    )
}

export default MiPerfil

