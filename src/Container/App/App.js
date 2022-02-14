import React from 'react';
import {Route, Routes } from "react-router-dom";
import Login from '../Login/Login'
import {useSelector, useDispatch} from "react-redux";
import Rutas from '../../Rutas';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import RestablecerContrasenia from '../Login/RestablecerContrasenia';
import FormularioCambiarContrasenia from '../Login/FormularioCambiarContrasenia';
import SolicitudEnviada from '../Login/SolicitudEnviada';


function App() {

    const {authUser} = useSelector(({auth}) => auth);

    return (
        <div
            style={{
                margin: '0',
                padding:'0'
            }}
        >
            {
                // authUser == null
                true == true
                ?<Routes>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/restablecer' element={<RestablecerContrasenia/>}/>
                    <Route exact path='/cambiar-contrasenia' element={<FormularioCambiarContrasenia/>}/>
                    <Route exact path='/solicitud-enviada' element={<SolicitudEnviada/>}/>
                </Routes>
                :<>
                    <Rutas />
                </>
            }
            
        </div>
    );
}

export default App;
