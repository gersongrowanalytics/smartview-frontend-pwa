import React, {useState} from 'react'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import {Link} from "react-router-dom";

const FormularioCambiarContrasenia = () => {

  const [contraseniaIngresada, setcontraseniaIngresada] = useState("0")

  const obtenerContrasenia = (e) =>{
    setcontraseniaIngresada(e.target.value);
    console.log(e.target.value)
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
                Recuperar Contraseña
            </span>
            <Form
                onFinish={onFinish}
            >
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
                            borderRadius: "8px",
                            marginBottom: "10px"
                        }}
                        placeholder="Nueva Contraseña"
                      />
                </Form.Item>

                <Form.Item
                    initialValue=""
                    rules= {[
                        {
                            required: true, 
                            message:"Ingrese una contraseña"
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('contrasenia') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('¡Las dos contraseñas que ingresaste no coinciden!'));
                          },
                        }),
                    ]}
                    name="confirm-contrasenia"
                    dependencies={['contrasenia']}
                    onChange={(e) => obtenerContrasenia(e)} 
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
                        placeholder="Confirmar Nueva Contraseña" />
                </Form.Item>  
                <br/>
                <Button 
                    htmlType="submit"
                    disabled={
                      (contraseniaIngresada == "0" || contraseniaIngresada == "") ? true :false
                    }
                    id={
                      (contraseniaIngresada == "0" || contraseniaIngresada == "") ? "Login-Formulario-Boton-Desactivado" : "Login-Formulario-Boton"
                    }
                >
                    Guardar
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
  )
}

export default FormularioCambiarContrasenia;