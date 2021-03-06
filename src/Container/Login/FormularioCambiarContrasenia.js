import React, {useState, useEffect} from 'react'
import {Form, Input, Select, Button } from "antd";
import '../../Estilos/Rutas/Login/Login.css';
import GrowIcono from '../../Assets/Img/Login/Isotipo-Grow.png';
import GrowLogoColor from '../../Assets/Logo/colorlogoCompletoKim.png';
import {Link, useParams} from "react-router-dom";
import {
    CambiarContraseniaReducer
} from '../../Redux/Acciones/Auth'
import {useSelector, useDispatch} from "react-redux";

const FormularioCambiarContrasenia = () => {

    const {token} = useParams()
    const dispatch = useDispatch()

    const [contraseniaIngresada, setcontraseniaIngresada] = useState("")
    const [animacionInicial, setanimacionInicial] = useState(true)

    const obtenerContrasenia = (e) =>{
        setcontraseniaIngresada(e.target.value);
    }

    const {
        cargandoLogin
    } = useSelector(({auth}) => auth);

    const onFinish = async (e) => {
        let contrasenia = e.contrasenia

        let data = {
            "token" : token,
            "nuevaContrasenia" : contrasenia
        }

        dispatch(CambiarContraseniaReducer(data))
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
                Recuperar Contrase??a
            </span>
            <Form
                onFinish={onFinish}
            >
                <Form.Item
                    initialValue=""
                    rules= {[
                        {
                            required: true, message:"Ingrese una contrase??a"
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
                        placeholder="Nueva Contrase??a"
                        />
                </Form.Item>

                <Form.Item
                    initialValue=""
                    rules= {[
                        {
                            required: true, 
                            message:"Ingrese una contrase??a"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('contrasenia') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('??Las dos contrase??as que ingresaste no coinciden!'));
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
                        placeholder="Confirmar Nueva Contrase??a" />
                </Form.Item>  
                <br/>
                <Button 
                    htmlType="submit"
                    disabled={
                        (contraseniaIngresada == "0" || contraseniaIngresada == "") ? true :false
                    }
                    id={
                        (contraseniaIngresada == "0" || contraseniaIngresada == "") ? "Login-Formulario-Boton" : "Login-Formulario-Boton"
                    }
                    loading={cargandoLogin}
                >
                    Guardar
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
    )
}

export default FormularioCambiarContrasenia;