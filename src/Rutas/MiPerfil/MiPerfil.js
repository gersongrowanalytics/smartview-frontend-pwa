import React, {useState, useEffect, useRef} from 'react'
import { Row, Col } from 'antd'
import '../../Estilos/Rutas/MiPerfil/MiPerfil.css'
import Camara from '../../Assets/Img/MiPerfil/Foto_perfil_cámara.png'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Input, Select, Button } from "antd";

const MiPerfil = () => {

    const [txtIdioma, settxtIdioma] = useState("")
    const [imagenPrevi, setimagenPrevi] = useState(Camara)
    const [imagenUsuario, setimagenUsuario] = useState(localStorage.getItem('usuimagen'))
    const dispatch = useDispatch()

    const { 
        datosUsuarioLogeado
    } = useSelector(({auth}) => auth);

    const seleccionarIdioma = (idioma) => {
        settxtIdioma(idioma)
        console.log(idioma);
    }

    const onFinish = (datos) =>  {

        let datosUsuario = {
            imagenPrev: localStorage.getItem('usuImagenPrev'),
            nombre : datos['nombre'],
            apellido : datos['apellido'],
            email: datos['email'],
            telefono: datos['telefono'],
            idioma: datos['idioma'],
            pais: datos['pais'],
            direccion: datos['direccion']
            
        }
        console.log('datos',datosUsuario)
        // dispatch(EditarPerfilReducer(datos));
    };


    return (
        <div>
            <Form
                onFinish={onFinish}
                initialValues={{
                    nombre: localStorage.getItem('pernombre'),
                    apellido: localStorage.getItem('pernombrecompleto'),
                    email: localStorage.getItem('usucorreo'),
                    telefono: localStorage.getItem('percelular'),
                    direccion: localStorage.getItem('perdireccion'),
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
                            localStorage.getItem('usuimagen') == null ? (
                                <>
                                    <div className='imagen-upload'>
                                        <label htmlFor="file-input">
                                            <img className='Foto-Perfil' src={imagenPrevi}></img>
                                        </label>
                                        <input 
                                            id='file-input' 
                                            type="file"
                                            onChange={(e) => {
                                                let reader = new FileReader()
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = function(){
                                                    setimagenPrevi(reader.result)
                                                    localStorage.setItem('usuImagenPrev', reader.result)
                                                    // dispatch(OpcionesImagenPrevImagenReducer(reader.result, row.index, row.original.proimagen))
                                                };
                                            }}  
                                        />
                                    </div>
                                
                                </>
                                
                            ) : (
                                <div className='imagen-upload'>
                                        <label htmlFor="file-input">
                                            <img className='Foto-Perfil' src={imagenUsuario}></img>
                                        </label>
                                        <input 
                                            id='file-input' 
                                            type="file"
                                            onChange={(e) => {
                                                let reader = new FileReader()
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = function(){
                                                    setimagenUsuario(reader.result)
                                                    localStorage.setItem('usuImagenPrev', reader.result)
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
                        <div className='Campos-Perfil'>Apellido *:</div>
                    </Col>
                    <Col xs={14} xl={9} offset={1}>
                        <Form.Item
                            name="apellido"
                            className='InputFormPerfil'
                            rules= {[
                                {
                                    required: true,
                                    message:"Ingrese un apellido"
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
                                <Select.Option value='ingles'>Ingles</Select.Option>
                                <Select.Option value='ruso'>Ruso</Select.Option>
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
                <Row style={{marginTop:'50px', marginBottom: '58px'}}>
                    <Col xs={2} xl={6}></Col>
                    <Col xs={10} xl={3} className='Primera-Columna-Perfil'>
                        <button
                            type='submit'  
                            className='Boton-Guardar-Perfil'
                        >
                            Guardar Cambios
                        </button>
                    </Col>
                    <Col xs={9} xl={9} offset={1} className='Segunda-Columna-Perfil'>
                        <button 
                            className='Boton-Baja-Perfil'
                        >
                            Solicitar Baja
                        </button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default MiPerfil