import {
    OBTENER_NOTIFICACIONES_USUARIO
} from "../../../Constantes/Notificaciones/Notificaciones";
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerNotificacionesUsuarioReducer = () =>async (dispatch, getState) => {

    await fetch(config.api+'mostrar-notificaciones-usuario',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'api_token': localStorage.getItem('usutoken'),
                'api-token': localStorage.getItem('usutoken'),
            }
        }
    )
    .then( async res => {
        await dispatch(estadoRequestReducer(res.status))
        return res.json()
    })
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest === true){
            if(data.respuesta === true){
                
                dispatch({
                    type: OBTENER_NOTIFICACIONES_USUARIO,
                    payload : {
                        notificaciones : data.data,
                        not_nuevas     : data.not_nuevas,
                        not_antiguas   : data.not_antiguas,
                    }
                })

            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

}

export const VerNotificacionesUsuarioReducer = () => async (dispatch, getState) => {

    await fetch(config.api+'guardar-leido-notificaciones-usuario',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'api_token': localStorage.getItem('usutoken'),
                'api-token': localStorage.getItem('usutoken'),
            }
        }
    )
    .then( async res => {
        await dispatch(estadoRequestReducer(res.status))
        return res.json()
    })
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest === true){
            if(data.respuesta === true){
                
                

            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });    

}