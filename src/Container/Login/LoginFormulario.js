import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    loginReducer,
    MostrarCargandoLogin
} from '../../Redux/Acciones/Auth'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import GrowLogoColor from '../../Assets/Logo/colorlogoCompletoKim.png';
import {Link} from "react-router-dom";
import IconoFechaAbajo from '../../Assets/Img/Login/flechaabajo.png'
import IconoWhastapp from '../../Assets/Img/Login/whatsapp.png'

const LoginFormulario = () => {
    
    const [txtPaisSeleccionado, setTxtPaisSeleccionado] = useState("0");
    const [animacionInicial, setanimacionInicial] = useState(true)

    const dispatch = useDispatch()

    const {
        cargandoLogin
    } = useSelector(({auth}) => auth);
    
    const seleccionarPais = (pais) => {
        setTxtPaisSeleccionado(pais)
        console.log(pais);
    }

    const onFinish = (datos) =>  {
        datos['pais'] = txtPaisSeleccionado;

        let valores = {
            usuario : datos['correo'],
            contrasena : datos['contrasenia']
        }

        dispatch(loginReducer(valores));
        dispatch(MostrarCargandoLogin());
    };

    const EnviarLogin = () => {
        let valores = {
            usuario : "Administrador",
            contrasena : "gerson$$"
        }

        // contrasena: "gerson$$"
        // usuario: "Administrador"
        dispatch(loginReducer(valores))
    }

    useEffect(() => {
        setTimeout(() => {
            setanimacionInicial(false)
        }, 14500);
    }, [])
    
    const refWsp = useRef(null)

    return (
        <div id="Login-Contenedor-Formulario">

            <div
                className='Btn-Wsp-Login'
                onClick={() => {
                    refWsp.current.click()
                }}
            >
                <img src={IconoWhastapp} className="Icono-Btn-Wsp-Login" />
            </div>

            <a 
                href="https://api.whatsapp.com/send?phone=51951331671"
                ref={refWsp}
                style={{display:'none'}}
                target="_blank"
            >
                
            </a>

            <div className={ animacionInicial == true ? 'Login-Banner banner0' : 'Login-Banner ocultar'} style={{top:"0"}}>
                <p>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                </p>
            </div>
            <div className='Login-Banner banner' style={{top:"0"}}>
                <p>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                </p>
            </div>
            <div className='Login-Banner banner banner2' style={{top:"0", marginRight:"7px"}}>
                <p>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                </p>
            </div>
            <div id='Login-Formulario'>
                <img
                    id="Icono" 
                    src={GrowLogoColor} />
            
            <span id="Login-Formulario-Titulo">
                Iniciar sesión
            </span>
            <Form
                onFinish={onFinish}
            >
                <Form.Item
                    name="pais"
                    rules= {[
                        {
                            required: true,
                            message:"Seleccione un país"
                        }
                    ]}
                >
                    <Select
                        bordered = {true}
                        dropdownStyle={{
                            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            borderRadius: "0px 0px 10px 10px"
                        }}
                        className="seleccionar"
                        placeholder="País"
                        style={{ 
                            width: "299px",
                            fontFamily: "Segoe UI",
                            fontStyle: "normal",
                            fontSize: "18px",
                            lineHeight: "23px",
                            height: "47px",
                            borderRadius: "8px"
                        }}
                        size={"large"}
                        onChange={
                            (e) => seleccionarPais(e)
                        }
                        suffixIcon={
                            <div>
                                <img 
                                    src={IconoFechaAbajo} 
                                    style={{
                                        width: "23px",
                                        height: "21px",
                                        position: "absolute",
                                        top: "-5px",
                                        right: "-6px"
                                    }}
                                />
                            </div>
                        }
                    >
                        <Select.Option danger value="Peru">Perú</Select.Option>
                        <Select.Option value="Chile">Chile</Select.Option>
                        <Select.Option value="Bolivia">Bolivia</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    initialValue=""
                    rules= {[
                        {
                            required: true,
                            message:"Ingrese un correo electrónico"
                        }
                    ]}
                    name="correo"
                >
                    <Input 
                        autoComplete={"off"}
                        id="Login-Formulario-Input" 
                        placeholder="Dirección de correo electrónico" />
                </Form.Item>  
                <Form.Item
                    initialValue=""
                    rules= {[
                        {
                            required: true, message:"Ingrese una contraseña"
                        }
                    ]}
                    name="contrasenia"
                >
                    <Input.Password 
                        type="password"
                        id="Login-Formulario-Input-Contrasenia" 
                        style={{
                            width: "299px",
                            fontFamily: "Segoe UI",
                            fontStyle: "normal",
                            fontSize: "18px",
                            lineHeight: "23px",
                            borderRadius: "8px"
                        }}
                        placeholder="Contraseña" />
                </Form.Item>  
                <br/>
                <span 
                    id="Login-Formulario-Texto"
                    onClick={() => {
                        refWsp.current.click()
                    }}
                    style={{
                        cursor:'pointer'
                    }}

                > 
                    ¿No tienes cuenta? comunicate con nosotros 
                </span>
                <br/>
                    <Link to="/restablecer" >
                            <span id="Login-Formulario-Texto">¿Se te olvidó tu contraseña?</span>
                    </Link>
                <br/>   
                <Button 
                    htmlType="submit"
                    disabled={
                        (txtPaisSeleccionado == "0" || txtPaisSeleccionado == "") ? true :false
                    }
                    id={
                        (txtPaisSeleccionado == "0" || txtPaisSeleccionado == "") ? "Login-Formulario-Boton" : "Login-Formulario-Boton"
                    }
                    loading={cargandoLogin}
                >
                    Iniciar Sesión
                </Button>
            </Form>
            </div>
            <div className={ animacionInicial == true ? 'Login-Banner banner0' : 'Login-Banner ocultar'} style={{bottom:"0"}}>
                <p>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                </p>
            </div>
            <div className='Login-Banner banner' style={{bottom:"0"}}>
                <p>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                </p>
            </div>
            <div className='Login-Banner banner banner2'style={{bottom:"0"}}>
               <p>                
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
               </p>
            </div>
            {/* <button
                onClick={() => EnviarLogin()}
            >
                Login
            </button> */}
        </div>
    );
};

export default LoginFormulario;
