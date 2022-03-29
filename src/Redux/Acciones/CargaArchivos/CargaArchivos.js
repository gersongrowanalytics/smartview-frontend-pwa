import axios from 'axios'
import {message} from "antd";
import config from '../../../config'
import {
    GUARDAR_NOTIFICACIONES_CARGA_ARCHIVOS
} from '../../../Constantes/CargaArchivos/CargaArchivos'


export const CargarArchivoReducer = (url, data) => async(dispatch, getState) => {

    let respuesta = false

    let headerFetch = {
        'Accept' : 'application/json',
        'content-type': 'multipart/form-data',
    }

    if(config.produccion == true){
        headerFetch = {
            'Accept' : 'application/json',
            'content-type': 'multipart/form-data',
            'api_token': localStorage.getItem('usutoken'),
            'api-token': localStorage.getItem('usutoken'),
        }
    }

    await axios.post(url, data,{
        mode:'cors',
        headers: headerFetch
    })
    .then(rpta => {
        let datos = rpta.data
        if(datos.respuesta == true){
            respuesta = true
        }else{
            // message.error(datos.mensaje);
        }


        if(respuesta == false){
            let notificaciones_data_carga_archivos = getState().cargaArchivos.notificaciones_data_carga_archivos

            let nuevaNotificacion = datos.notificacionesLogs
            let numeroNotificacion = parseInt(notificaciones_data_carga_archivos.length)+1
            nuevaNotificacion.titulo = "Notificación "+numeroNotificacion

            notificaciones_data_carga_archivos.unshift(nuevaNotificacion)

            dispatch({
                type: GUARDAR_NOTIFICACIONES_CARGA_ARCHIVOS,
                payload: notificaciones_data_carga_archivos
            })
        }else{
            let notificaciones_data_carga_archivos = getState().cargaArchivos.notificaciones_data_carga_archivos

            let numeroNotificacion = parseInt(notificaciones_data_carga_archivos.length)+1

            let nuevaNotificacion = {
                "RESPUESTA" : true,
                "titulo" : "Notificación "+numeroNotificacion,
                "MENSAJE" : "El archivo se subio correctamente"
            }

            notificaciones_data_carga_archivos.unshift(nuevaNotificacion)

            dispatch({
                type: GUARDAR_NOTIFICACIONES_CARGA_ARCHIVOS,
                payload: notificaciones_data_carga_archivos
            })
        }

        // dispatch(ObtenerNotificacionesReducer(datos.notificacionesLogs))

    })
    .catch((error)=> {
        console.log(error)
    });

    return respuesta
}