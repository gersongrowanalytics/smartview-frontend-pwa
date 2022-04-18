import { estadoRequestReducer } from "../EstadoRequest"
import {
    ENVIAR_MAIL_PROMOCIONES_ACTIVAS,
    ENVIAR_MAIL_PROMOCIONES_NUEVAS
} from '../../../Constantes/Promociones/Promociones'
import config from '../../../config'

export const EnviarMailPromocionesActivasReducer = (sucursales, fecha) =>async (dispatch, getState) => {

    await fetch(config.api+'promociones/mail/enviar-correo-promociones-activas',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                "sucursales" : sucursales,
                "fecha" : fecha
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

export const EnviarMailPromocionesNuevasReducer = (sucursales, fecha) =>async (dispatch, getState) => {

    await fetch(config.api+'promociones/mail/enviar-correo-promociones-nuevas',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                "sucursales" : sucursales,
                "fecha" : fecha
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