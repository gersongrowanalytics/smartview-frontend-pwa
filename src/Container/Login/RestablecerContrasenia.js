import React, {useState, useEffect}  from 'react'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import GrowLogoColor from '../../Assets/Logo/colorlogoCompletoKim.png';
import {Link} from "react-router-dom";
import {
    RecuperarContraseniaReducer
} from '../../Redux/Acciones/Auth'
import {useDispatch, useSelector} from "react-redux";

const RestablecerContrasenia = () => {

    const [animacionInicial, setanimacionInicial] = useState(true)

    const dispatch = useDispatch();
    const {
        cargandoLogin
    } = useSelector(({auth}) => auth);

    const [correoIngresado, setcorreoIngresado] = useState("");

    const obtenerCorreo = (e) => {
        setcorreoIngresado(e.target.value);
    }

    const onFinish = (e) =>  {
        dispatch(RecuperarContraseniaReducer(e))
    };

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
            
            <span id="Login-Formulario-Titulo">
                Restablecer Contraseña
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
                        (correoIngresado == "0" || correoIngresado == "" ) ? "Login-Formulario-Boton" : "Login-Formulario-Boton"
                    }
                    loading={cargandoLogin}
                >
                    Solicitar
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
        </div>
  )
}

export default RestablecerContrasenia;