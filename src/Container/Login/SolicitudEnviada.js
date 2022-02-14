import React, {useState} from 'react'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import {Link} from "react-router-dom";

const SolicitudEnviada = () => {

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
            
                <span id="Login-Formulario-Titulo-Solicitud">
                    Su solicitud fue enviada a su correo con éxito
                </span>
                <br></br>
                <p id='Solicitud-Informacion'>
                    Si no has recibido el email de confirmación, puedes &nbsp;<span style={{color: "#1876F2"}}>reenviarlo.</span>
                </p>
                <br/>
                    <Link to="/login" >
                            <span id="Login-Formulario-Texto" style={{textDecoration: "auto"}}>Iniciar Sesión</span>
                    </Link>
                <br/>  
                <Button 
                    htmlType="submit"
                    id="Login-Formulario-Boton-Desactivado"
                >
                    Listo
                </Button>
           
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

export default SolicitudEnviada;
