import { estadoRequestReducer } from "./EstadoRequest"
import {
    OBTENER_FECHAS_FILTRO_EXITO,
    OBTENER_FECHAS_FILTRO_FAIL,
    FILTRO_SELECCIONAR_FECHA_DIA,
    FILTRO_SELECCIONAR_FECHA_MES,
    FILTRO_SELECCIONAR_FECHA_ANO,
    REINICIAR_FECHAS,
    SELECCIONAR_MES_FILTRO,
    SELECCIONAR_ANIO_FILTRO,
} from "../../Constantes/FechasTypes";
// import {obtenerVentasTprReducer} from 'appRedux/actions/VentasTpr'
// import {filtroSeleccionarZonaUsuarioReducer} from 'appRedux/actions/Zonas'
// import {obtenerPromocionesReducer} from 'appRedux/actions/Promociones'
import config from '../../config'
// import {descargarInformacionPromocionesReducer} from 'appRedux/actions/Promociones'

export const reiniciarFechasReducer = () => {
    return {
        type : REINICIAR_FECHAS
    }
}

export const obtenerFechasReducer = () =>async (dispatch, getState) => {
    await fetch(config.api+'fechas/mostrar/fechas',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'api_token': localStorage.getItem('usutoken'),
                'api-token': localStorage.getItem('usutoken')
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
                dispatch({
                    type: OBTENER_FECHAS_FILTRO_EXITO,
                    payload: data.datos
                })
            }else{
                dispatch({
                    type: OBTENER_FECHAS_FILTRO_FAIL,
                    payload: data.datos
                })
            }
        }
    }).catch((error)=> {
        dispatch({
            type: OBTENER_FECHAS_FILTRO_FAIL,
            fechasFiltro : {"dias": [], "meses": [], "anos": []},
        })
    });
}

export const SeleccionarMesReducer = (mes) => (dispatch, getState) => {

    dispatch({
        type: SELECCIONAR_MES_FILTRO,
        payload: mes
    })

}

export const SeleccionarAnioReducer = (anio) => (dispatch, getState) => {

    dispatch({
        type: SELECCIONAR_ANIO_FILTRO,
        payload: anio
    })

}
