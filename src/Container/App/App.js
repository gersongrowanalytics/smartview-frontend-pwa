import React from 'react';
import {Route, Routes, Navigate } from "react-router-dom";
import Login from '../Login/Login'
import {useSelector, useDispatch} from "react-redux";
import Rutas from '../../Rutas';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import RestablecerContrasenia from '../Login/RestablecerContrasenia';
import FormularioCambiarContrasenia from '../Login/FormularioCambiarContrasenia';
import SolicitudEnviada from '../Login/SolicitudEnviada';
import GrowText from '../../Assets/Img/Login/Grow_tex.png';
import GrowLion from '../../Assets/Img/Login/Grow_lion.png';

function App() {

    const {authUser, cargando_vista_inicio_sistema, mostrar_cargando_preload_sistema, datosUsuarioLogeado} = useSelector(({auth}) => auth);

    return (
        <div
            style={{
                margin: '0',
                padding:'0'
            }}
        >
            {
                authUser == null
                ?<Routes>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/restablecer' element={<RestablecerContrasenia/>}/>
                    <Route exact path='/cambiar-contrasenia/:token' element={<FormularioCambiarContrasenia/>}/>
                    <Route exact path='/solicitud-enviada' element={<SolicitudEnviada/>}/>
                    <Route path="*" element={<Navigate replace to="/login" />} />
                </Routes>
                :<>
                    {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                    {
                        datosUsuarioLogeado == {}
                        ?null
                        :<Rutas />
                    }
                    
                    {
                        mostrar_cargando_preload_sistema == true
                        ?<div
                            style={{
                                background:'white',
                                position:'absolute',
                                top:'0',
                                width:'100%',
                                height:'100vh',
                                zIndex:'25',
                                overflow: 'hidden'
                            }}
                            id={
                                cargando_vista_inicio_sistema == true
                                ?""
                                :"Banner-Animacion"
                            }
                        >
                            {/* <div id={"Banner"}> */}
                                <div id='Banner-Fondo'>
                                    {/* <img
                                        id="Banner-Icono" 
                                        src={GrowIcono} 
                                    /> */}
                                    <div
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            position: "relative",
                                        }}
                                    >
                                        <img
                                            className="Banner-Icono-Grow-Text" 
                                            src={GrowText} 
                                        />
                                        <img
                                            className="Banner-Icono-Grow-Lion" 
                                            src={GrowLion} 
                                        />
                                    </div>
                                </div>
                                
                            {/* </div> */}
                        </div>
                        :null
                    }


                </>
            }
            
        </div>
    );
}

export default App;
