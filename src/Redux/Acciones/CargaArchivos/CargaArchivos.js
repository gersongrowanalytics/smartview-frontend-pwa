import axios from 'axios'
import {message} from "antd";
import config from '../../../config'

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
            message.error(datos.mensaje);
        }
        // dispatch(ObtenerNotificacionesReducer(datos.logs))

    })
    .catch((error)=> {
        console.log(error)
    });

    return respuesta
}