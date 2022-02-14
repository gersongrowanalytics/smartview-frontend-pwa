import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
    loginReducer
} from '../../Redux/Acciones/Auth'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import {Link} from "react-router-dom";


const LoginFormulario = () => {
    
    const [txtPaisSeleccionado, setTxtPaisSeleccionado] = useState("0");

    const dispatch = useDispatch()
    
    const seleccionarPais = (pais) => {
        setTxtPaisSeleccionado(pais)
        console.log(pais);
    }

    const onFinish = (e) =>  {
        e['pais'] = txtPaisSeleccionado
        console.log(e)
        dispatch(loginReducer(e));
    };
    
    const EnviarLogin = () => {
        let valores = {
            usuario : "Administrador",
            contrasena : "gerson$$"
        }
        dispatch(loginReducer(valores))
    }


    return (
        <div id="Login-Contenedor-Formulario">
            <div className='Login-Banner banner' style={{top: "0"}}>
                <p>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                </p>
            </div>
            <div className='Login-Banner banner banner2' style={{top:"0"}}>
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
                src={GrowIcono} />
            
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
                    >
                        <Select.Option danger value="Peru">Peru</Select.Option>
                        <Select.Option value="Chile">Chile</Select.Option>
                        <Select.Option value="Argentina">Argentina</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    initialValue=""
                    rules= {[
                        {
                            required: true,
                            message:"Ingrese un correo electrónico"
                        },
                        {
                            type: 'email',
                            message: 'Ingrese un correo electrónico válido'
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
                        (txtPaisSeleccionado == "0" || txtPaisSeleccionado == "") ? "Login-Formulario-Boton-Desactivado" : "Login-Formulario-Boton"
                    }
                >
                    Iniciar Sesión
                </Button>
            </Form>
            </div>
            <div className='Login-Banner banner' style={{bottom:"0"}}>
                <p>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                </p>
            </div>
            <div className='Login-Banner banner banner2'style={{bottom:"0"}}>
               <p>                
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span> 
                    <span className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</span>
                    <span className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</span>
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
