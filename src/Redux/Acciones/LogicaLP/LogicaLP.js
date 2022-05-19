import { notification } from 'antd';
import config from '../../../config'
import {
    OBTENER_DATA_DESCARGA_LP,
    OBTENER_TIPOS_REBATES,
    OBTENER_CANALES_SUCURSALES
} from '../../../Constantes/LogicaLP/LogicaLP'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerDataDescargaReducer = (tipoRebate, zona, fechas) => async (dispatch, getState) => {

    await fetch(config.api+'reportes-logicaLP',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                re_tipoRebate: tipoRebate,
                re_zona: zona,
                re_fechas: fechas
            }),
            headers: {
                'Accept' 	   : 'application/json',
                'Content-type' : 'application/json',
                'api_token'    : localStorage.getItem('usutoken'),
                'api-token'    : localStorage.getItem('usutoken')
            }
        }
    )
    .then( async res => {
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
    })
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if (data.respuesta == true) {
                let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.data)
                notification.success({
                    message: `Notificación`,
                    description: data.mensaje,
                    placement: 'topRight',
                })
                dispatch({
                    type: OBTENER_DATA_DESCARGA_LP,
                    payload: {
                       datos: data_excel_descargar,
                       sucursales: data.sucursales
                    }
                })
            }else{
                console.log('Error', data.mensaje)
                notification.info({
                    message: `Notificación`,
                    description: data.mensaje,
                    placement: 'topRight',
                })
            }
        }
    }).catch((error)=> {
        console.log("ObtenerDatosExcelLPReducer: "+error)
    });
}

export const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {

    if(data_excel_descargar.length){
        for(let i=0; i < data_excel_descargar.length; i++){
            await data_excel_descargar[i]['0']['data'].map((dato, posicion) => {
                data_excel_descargar[i]['0']['data'][posicion].map((dat) => {
                dat.value = dat.value == null ?"" :dat.value
              })
            })
        }
        return data_excel_descargar
    }else{
        console.log('Sin datos')
    }
}

export const ObtenerTiposRebatesReducer = () => async (dispatch, getState) => {

    await fetch(config.api+'mostrar-tipo-rebates',
        {
            mode:'cors',
            method: 'GET',
            headers: {
                'Accept' 	   : 'application/json',
                'Content-type' : 'application/json',
                'api_token'    : localStorage.getItem('usutoken'),
                'api-token'    : localStorage.getItem('usutoken')
            }
        }
    )
    .then( async res => {
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
    })
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if (data.respuesta == true) {
                dispatch({
                    type: OBTENER_TIPOS_REBATES,
                    payload: data.data
                })
            }else{
                console.log('Error', data.mensaje)
            }
        }
    }).catch((error)=> {
        console.log("ObtenerDatosTiposRebatesReducer: "+error)
    });
}

export const ObtenerCanalesSucursalesReducer = () => async (dispatch, getState) => {

    await fetch(config.api+'mostrar-canales-sucursales',
        {
            mode:'cors',
            method: 'GET',
            headers: {
                'Accept' 	   : 'application/json',
                'Content-type' : 'application/json',
                'api_token'    : localStorage.getItem('usutoken'),
                'api-token'    : localStorage.getItem('usutoken')
            }
        }
    )
    .then( async res => {
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
    })
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if (data.respuesta == true) {
                dispatch({
                    type: OBTENER_CANALES_SUCURSALES,
                    payload: data.data
                })
            }else{
                console.log('Error', data.mensaje)
            }
        }
    }).catch((error)=> {
        console.log("ObtenerCanalesSucursalesReducer: "+error)
    });
}