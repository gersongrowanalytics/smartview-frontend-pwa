import axios from 'axios'
import {message} from "antd";
import config from '../../../config'
import {
    GUARDAR_NOTIFICACIONES_CARGA_ARCHIVOS
} from '../../../Constantes/CargaArchivos/CargaArchivos'
import {
    EnviarMailPromocionesActivasReducer,
    EnviarMailPromocionesNuevasReducer
} from '../../../Redux/Acciones/Promociones/MailPromociones'

export const CargarArchivoReducer = (url, data, tipo) => async(dispatch, getState) => {

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

            if(tipo == "Mecanica de Promociones"){
                dispatch(EnviarMailPromocionesActivasReducer(
                    datos.sucursalesSeleccionadas,
                    datos.fechaSeleccionadaMes
                ))

                if(datos.sucursalesSeleccionadasPromocionesNuevas.length > 0){
                    dispatch(EnviarMailPromocionesNuevasReducer(
                        datos.sucursalesSeleccionadas,
                        datos.fechaSeleccionadaMes
                    ))
                }
            }
        }

        // dispatch(ObtenerNotificacionesReducer(datos.notificacionesLogs))

    })
    .catch((error)=> {
        console.log(error)
    });

    return respuesta
}

export const EliminarNotificacionReducer = (pos) => (dispatch, getState) => {

    let notificaciones_data_carga_archivos = getState().cargaArchivos.notificaciones_data_carga_archivos

    


}
