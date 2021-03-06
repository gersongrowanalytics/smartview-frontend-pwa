import React, {useState, useEffect} from 'react'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import {Link} from "react-router-dom";
import GrowLogoColor from '../../Assets/Logo/colorlogoCompletoKim.png';
import {
    RecuperarContraseniaReducer
} from '../../Redux/Acciones/Auth'
import {useSelector, useDispatch} from "react-redux";

const SolicitudEnviada = () => {

    const [animacionInicial, setanimacionInicial] = useState(true)

    const onFinish = (e) =>  {
        console.log(e)
    };

    const {
        data_recupear
    } = useSelector(({auth}) => auth);
    
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            setanimacionInicial(false)
        }, 14500);
    }, [])
      
  return (
    <div id="Login-Contenedor-Formulario">
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
            
                <span id="Login-Formulario-Titulo-Solicitud">
                    Su solicitud fue enviada a su correo con ??xito
                </span>
                <br></br>
                <p id='Solicitud-Informacion'>
                    Si no has recibido el email de confirmaci??n, puedes &nbsp;
                    <span 
                        onClick={() => {
                             
                            let nuevaData = {
                                "correo" : localStorage.getItem('emailEnviarRecuperar')
                            }

                            dispatch(RecuperarContraseniaReducer(nuevaData))
                        }}
                        style={{color: "#1876F2", cursor:'pointer'}}>reenviarlo.</span>
                </p>
                <br/>
                    <Link to="/login" >
                            <span id="Login-Formulario-Texto" style={{textDecoration: "auto"}}>Iniciar Sesi??n</span>
                    </Link>
                <br/>  
                <Link to="/login" >
                    <Button 
                        htmlType="submit"
                        id="Btn-Solicitud-Enviada"
                        className='Wbold-S18-H24-CFFFFFF'
                    >
                        Listo
                    </Button>
                </Link>
           
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
  )
}

export default SolicitudEnviada;
