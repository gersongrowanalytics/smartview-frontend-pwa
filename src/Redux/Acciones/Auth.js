import {
    SIGNIN_USER_SUCCESS,
} from "../../Constantes/ActionTypes";
import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"
import { message } from "antd";

export const loginReducer = (usuario) => async ( dispatch, getState) => {

    await fetch(config.api+'login',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            }
        }
    )
    .then( async res => {
        await dispatch(estadoRequestReducer(res.status))
        return res.json()
    })
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                localStorage.setItem('contrasena', usuario.contrasena)
                localStorage.setItem('usuario', usuario.usuario)
                localStorage.setItem('user_id', data.datos.usuid)
                localStorage.setItem('usutoken', data.datos.usutoken)
                localStorage.setItem('usuusuario', data.datos.usuusuario)
                localStorage.setItem('pernombre', data.datos.pernombre)
                localStorage.setItem('pernombrecompleto', data.datos.pernombrecompleto)
                localStorage.setItem('tpunombre', data.datos.tpunombre)
                localStorage.setItem('ejecutivo', data.datos.ejecutivo)          
                localStorage.setItem('distribuidora', data.datos.pernombrecompleto)
                localStorage.setItem('tpuprivilegio', data.datos.tpuprivilegio)

                dispatch(loginCorrecto(data.datos))
                message.success(data.mensaje);
            }else{
                message.error(data.mensaje);
            }
        }
    }).catch((error)=> {
        
    });
}

export const loginCorrecto = (user) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: user
    };
};

export const cerrarSesionReducer = () => async (dispatch) => {
    
    localStorage.clear();
    window.location.href = window.location.href;
};