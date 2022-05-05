import {
    SIGNIN_USER_SUCCESS,
    CARGANDO_BTN_LOGIN,
    DATA_RECUPERAR,
    OBTENER_DATOS_USUARIO_LOGIN,
    SELECCIONAR_OTRO_CANAL_SISTEMA,
    MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
    ADMINISTRAR_TARJETAS_HOME_DATA_LOGIN
} from "../../Constantes/ActionTypes";
import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"
import { message, notification } from "antd";
import {ObtenerPermisosUsuarioReducer} from './Setting'
import { defineLocale } from "moment";

export const MostrarCargandoLogin = () => (dispatch, getState) => {

    dispatch({
        type: "MOSTRAR_CARGANDO_PRELOAD_SISTEMA",
        payload : false
    })

}

export const loginReducer = (usuario) => async ( dispatch, getState) => {

    let redireccionar = false

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: true
    })

    dispatch({
        type: "CARGANDO_VISTA_INICIO_SISTEMA",
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

                dispatch(ObtenerPermisosUsuarioReducer())

                // console.log(data.datos) 
                localStorage.setItem('contrasena', usuario.contrasena)
                localStorage.setItem('usuario', usuario.usuario)
                localStorage.setItem('user_id', data.datos.usuid)
                localStorage.setItem('usutoken', data.datos.usutoken)
                localStorage.setItem('usuusuario', data.datos.usuusuario)
                localStorage.setItem('pernombre', data.datos.pernombre)
                localStorage.setItem('pernombrecompleto', data.datos.pernombrecompleto)
                localStorage.setItem('perapellidopaterno', data.datos.perapellidopaterno)
                localStorage.setItem('perapellidomaterno', data.datos.perapellidomaterno)
                localStorage.setItem('tpunombre', data.datos.tpunombre)
                localStorage.setItem('ejecutivo', data.datos.ejecutivo)          
                localStorage.setItem('distribuidora', data.datos.pernombrecompleto)
                localStorage.setItem('tpuprivilegio', data.datos.tpuprivilegio)
                localStorage.setItem('percelular', data.datos.percelular)
                localStorage.setItem('perdireccion', data.datos.perdireccion)
                localStorage.setItem('usucorreo', data.datos.usucorreo)
                localStorage.setItem('usuimagen', data.datos.usuimagen)

                await dispatch(loginCorrecto(data.datos))
                await dispatch(obtenerDatosUsuarioLogin(data.datos))

                dispatch({
                    type: MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
                    payload: data.mostrarterminos
                })

                redireccionar = data.mostrarterminos

                // message.success(data.mensaje);
            }else{
                message.error(data.mensaje);
                if(localStorage.getItem('user_id') > 0){
                    // message.error(data.mensaje);
                    // console.log('ya existe una sesion y ahora esta equivocado')
                    dispatch(cerrarSesionReducer())
                }else{
                    // console.log('No existe nada')
                    message.error(data.mensaje);
                }
            }
        }
    }).catch((error)=> {
        
    });

    dispatch({
        type: "CARGANDO_VISTA_INICIO_SISTEMA",
        payload: false
    })

    dispatch({
        type: CARGANDO_BTN_LOGIN,
        payload: false
    })

    return {
        "redirigirterminos" : redireccionar
    }
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

export const cerrarSesionReducer = () => async (dispatch, getState) => {

    await fetch(config.api+'cerrar-session',
        {
            mode:'cors',
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'api-token'	   : localStorage.getItem('usutoken'),
                'api_token'	   : localStorage.getItem('usutoken')
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

                    

                }else{
                    
                }
            }
    }).catch((error)=> {
        console.log(error)
    });

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
                // message.error(data.mensaje);
                notification.error({
                    message: `Notificación`,
                    description: data.mensaje,
                    placement: 'topRight',
                })
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

export const CambiarCanalSeleccionadoReducer = (canal) => (dispatch, getState) => {
    dispatch({
        type: SELECCIONAR_OTRO_CANAL_SISTEMA,
        payload : canal
    })
}