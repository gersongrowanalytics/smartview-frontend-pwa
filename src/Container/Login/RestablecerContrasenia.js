import React, {useState}  from 'react'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import {Link} from "react-router-dom";

const RestablecerContrasenia = () => {

    const [correoIngresado, setcorreoIngresado] = useState("0");

    const obtenerCorreo = (e) => {
        setcorreoIngresado(e.target.value);
    }
    const onFinish = (e) =>  {
        console.log(e)
    };
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
                Restablecer Contraseñia
            </span>
            <span id="Login-Formulario-Subtitulo">
                Si no conoces tu contraseña actual, puedes <br/> solicitarla
            </span>
            <br/>
            <Form
                onFinish={onFinish}
            >
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
                        style={{
                            width: "299px",
                            fontFamily: "Segoe UI",
                            fontStyle: "normal",
                            fontSize: "18px",
                            lineHeight: "23px",
                            borderRadius: "8px",
                            marginBottom: "10px"
                        }}
                        placeholder="Dirección de correo electrónico"
                        onChange={(e) => obtenerCorreo(e)}
                    />
                </Form.Item>  
                
                <br/>
                    <Link to="/login" >
                            <span id="Login-Formulario-Texto">Iniciar Sesión</span>
                    </Link>
                <br/>   
                <Button 
                    htmlType="submit"
                    disabled={
                        (correoIngresado == "0" || correoIngresado == "" ) ? true : false
                    }
                    id={
                        (correoIngresado == "0" || correoIngresado == "" ) ? "Login-Formulario-Boton-Desactivado" : "Login-Formulario-Boton"
                    }
                >
                    Solicitar
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
        </div>
  )
}

export default RestablecerContrasenia;