import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_CONTROL_ARCHIVOS,
    OBTENER_DATOS_AREAS
} from '../../../Constantes/Status/Status'

export const ObtenerDataControlArchivosReducer = () =>async (dispatch, getState) => {

    await fetch(config.api+'status/obtener',
        {
            mode:'cors',
            method: 'POST',
            // body: JSON.stringify({
            // }),
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
    .then(async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_DATOS_CONTROL_ARCHIVOS,
                    payload : data.datos
                })
            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

}

export const ObtenerDataAreasReducer = () =>async (dispatch, getState) => {

    await fetch(config.api+'status/areas',
        {
            mode:'cors',
            method: 'POST',
            // body: JSON.stringify({
            // }),
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
    .then(async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_DATOS_AREAS,
                    payload : data.datos
                })
            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

}
