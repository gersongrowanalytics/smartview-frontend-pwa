import {
    CARGANDO_DATA_REBATE_BONUS,
    OBTENER_DATA_REBATE_BONUS
} from '../../../../Constantes/Rebate/Rebate'
import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"

export const ObtenerDataRebateBonusReducer = () => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_DATA_REBATE_BONUS,
        payload : true
    })

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    await fetch(config.api+'mostrar-rebate-bonus',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                anio : anioSeleccionadoFiltro,
                dia  : "01",
                mes  : mesSeleccionadoFiltro
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
    .then(async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
                dispatch({
                    type : OBTENER_DATA_REBATE_BONUS,
                    payload : data.datos
                })
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type : CARGANDO_DATA_REBATE_BONUS,
        payload : false
    })

    return true
}

export const SeleccionarCategoriaRebateBonusReducer = (posicion) => async (dispatch, getState) => {

    let data_rebate_bonus = getState().rebate.data_rebate_bonus

    data_rebate_bonus['cats'][posicion]['seleccionado'] = !data_rebate_bonus['cats'][posicion]['seleccionado']

    await dispatch({
        type : OBTENER_DATA_REBATE_BONUS,
        payload : data_rebate_bonus
    })

    return true

}

export const CrearRebateBonusReducer = (data) => async (dispatch, getState) => {



    await fetch(config.api+'crear-rebate-bonus',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(data),
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
                
                
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });
    
}