import {
    SIGNIN_USER_SUCCESS,
    CARGANDO_BTN_LOGIN,
    DATA_RECUPERAR,
    OBTENER_DATOS_USUARIO_LOGIN
} from "../../Constantes/ActionTypes";
import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"
import { message } from "antd";

export const loginReducer = (usuario) => async ( dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: true
    })

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
    .then(async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                console.log(data.datos)
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
                localStorage.setItem('percelular', data.datos.percelular)
                localStorage.setItem('perdireccion', data.datos.perdireccion)
                localStorage.setItem('usucorreo', data.datos.usucorreo)

                await dispatch(loginCorrecto(data.datos))
                await dispatch(obtenerDatosUsuarioLogin(data.datos))
                // message.success(data.mensaje);
            }else{
                message.error(data.mensaje);
            }
        }
    }).catch((error)=> {
        
    });

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: false
    })

    return true
}

export const loginCorrecto = (user) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: user
    };
};

export const obtenerDatosUsuarioLogin = (user) => {
    return {
        type: OBTENER_DATOS_USUARIO_LOGIN,
        payload: user
    }
}

export const cerrarSesionReducer = () => async (dispatch) => {
    
    localStorage.clear();
    window.location.href = window.location.href;
};

export const RecuperarContraseniaReducer = (data, actualizar = true) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: true
    })

    dispatch({
        type: DATA_RECUPERAR,
        payload: data
    })

    localStorage.setItem('emailEnviarRecuperar', data.correo)

    await fetch(config.api+'recuperar/contrasena/nuevo',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(data),
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
                message.success(data.mensaje);
                if(actualizar == true){
                    window.location.href = "/solicitud-enviada"
                }else{

                }

            }else{
                message.error(data.mensaje);
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: false
    })
}

export const CambiarContraseniaReducer = (dataenviada) => async (dispatch, getState) => {

    let rpta = false

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: true
    })

    await fetch(config.api+'cambiar/contrasenia/nuevo',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(dataenviada),
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
                message.success(data.mensaje);
                rpta = true

                let nuevaData = {
                    "logintoken" : true,
                    "token"      : data.nuevoToken,
                    "usuario"    : "",
                    "contrasena" : dataenviada.nuevaContrasenia
                }

                dispatch(loginReducer(nuevaData))


            }else{
                message.error(data.mensaje);
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: false
    })

}