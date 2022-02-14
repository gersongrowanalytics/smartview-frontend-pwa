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

    // const cargando_login = useSelector(({login}) => login.cargando_login)

    // const change_left = () => {
    //     var element = document.getElementById("banner");
    //     element.classList.remove("Login-Banner");
    //     element.classList.addClass("Login-Banner-left");
    // }

    // const change_right = () => {
    //     var element2 = document.getElementById("banner");
    //     element2.classList.remove("Login-Banner-left");
    //     element2.classList.addClass("Login-Banner");
    // }

    // const to_left = () => {
    //     setInterval(change_left, 20000);
    // };

    // const to_right = () => {
    //     setInterval(change_right, 20000);
    // };
    
    // to_left();
    // to_right();

    return (
        <div id="Login-Contenedor-Formulario">
            <div className='Login-Banner' id='banner'>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p> 
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
                        // dropdownStyle = {{
                        //     background: "#FFFF00"
                        // }}
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
            <div className='Login-Banner' >
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-ConRelleno'>CRECIENDO JUNTOS</p>
                <p className='Login-Banner-Letras-SinRelleno'>CRECIENDO JUNTOS</p>
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
