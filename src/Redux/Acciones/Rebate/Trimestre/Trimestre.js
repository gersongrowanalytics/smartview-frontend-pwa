import {
    CARGANDO_DATA_REBATE_TRIMESTRAL,
    OBTENER_DATA_REBATE_TRIMESTRAL,
    SELECCIONAR_GRUPO_REBATE,
    CARGANDO_BTN_GUARDAR_TRIMESTRE
} from '../../../../Constantes/Rebate/Rebate'
import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import { message, notification } from 'antd'

export const ObtenerDataRebateTrimestralReducer = () => async (dispatch, getState) => {

    dispatch({
        type : CARGANDO_DATA_REBATE_TRIMESTRAL,
        payload : true
    })

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    await fetch(config.api+'mostrar-rebate-trimestral',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                re_anio : anioSeleccionadoFiltro,
                dia  : "01",
                re_mes  : mesSeleccionadoFiltro
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
                    type : OBTENER_DATA_REBATE_TRIMESTRAL,
                    payload : data.datos
                })

                data.datos.map((dat, pos) => {
                    if(dat.mostrando == true){
                        dispatch({
                            type: SELECCIONAR_GRUPO_REBATE,
                            payload : dat.trenombre
                        })
                    }
                })
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type : CARGANDO_DATA_REBATE_TRIMESTRAL,
        payload : false
    })

    return true
}

export const ActivarCarouselTablaRebateTrimestralReducer = (opcion) => async (dispatch, getState) => {

    let data_rebate_trimestral = getState().rebate.data_rebate_trimestral

    let nuevoMostrando = false
    let esUltimo = false

    if(opcion == "retroceder"){

        let esPrimera = false
        let posSelec = 0

        await data_rebate_trimestral.map((dat, pos) => {

            if(dat.mostrando == true){
                data_rebate_trimestral[pos]['retroceder'] = true
                data_rebate_trimestral[pos]['mostrando'] = false
                data_rebate_trimestral[pos]['ocultando'] = true
                nuevoMostrando = true

                posSelec = pos
                
                if(pos == 0){
                    esPrimera = true
                }
    
            }else{
                
            }
        })

        if(esPrimera == true){
            posSelec = parseInt(data_rebate_trimestral.length) - 1
            data_rebate_trimestral[posSelec]['retroceder'] = true
            data_rebate_trimestral[posSelec]['mostrando'] = true
            data_rebate_trimestral[posSelec]['ocultando'] = false

            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate_trimestral[posSelec]['trenombre']
            })

        }else{
            posSelec = parseInt(posSelec) - 1
            data_rebate_trimestral[posSelec]['retroceder'] = true
            data_rebate_trimestral[posSelec]['mostrando'] = true
            data_rebate_trimestral[posSelec]['ocultando'] = false
            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate_trimestral[posSelec]['trenombre']
            })
        }

    }else{
        await data_rebate_trimestral.map((dat, pos) => {

            if(dat.mostrando == true){
                data_rebate_trimestral[pos]['retroceder'] = false
                data_rebate_trimestral[pos]['mostrando'] = false
                data_rebate_trimestral[pos]['ocultando'] = true
                nuevoMostrando = true
    
                if(data_rebate_trimestral.length == pos+1){
                    esUltimo = true
                }
    
            }else{
                if(nuevoMostrando == true){
                    nuevoMostrando = false
                    data_rebate_trimestral[pos]['retroceder'] = false
                    data_rebate_trimestral[pos]['mostrando'] = true
                    data_rebate_trimestral[pos]['ocultando'] = false
                    dispatch({
                        type: SELECCIONAR_GRUPO_REBATE,
                        payload : data_rebate_trimestral[pos]['trenombre']
                    })
                }
            }
        })
    
        if(esUltimo == true){
            data_rebate_trimestral[0]['retroceder'] = false
            data_rebate_trimestral[0]['mostrando'] = true
            data_rebate_trimestral[0]['ocultando'] = false
            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate_trimestral[0]['trenombre']
            })
        }
    }

    dispatch({
        type: OBTENER_DATA_REBATE_TRIMESTRAL,
        payload : data_rebate_trimestral
    })

    return true

}

export const AgregarFilaRebateTrimestralReducer = (posicion) => async (dispatch, getState) => {

    let data_rebate_trimestral = getState().rebate.data_rebate_trimestral

    data_rebate_trimestral[posicion]['data'].push(
        {
            editando: true, 
            treideditando : data_rebate_trimestral[posicion]['treid']
        }
    )

    dispatch({
        type: OBTENER_DATA_REBATE_TRIMESTRAL,
        payload : data_rebate_trimestral
    })
}

export const EditandoFilaRebateTrimestralReducer = (postabla, posfila, columna, valor) => (dispatch, getState) => {

    let data_rebate_trimestral = getState().rebate.data_rebate_trimestral

    if(columna == "treideditando"){
        data_rebate_trimestral[postabla]['data'][posfila]['treideditando'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['treideditandoerror'] = false
    }else if(columna == "desdeeditando"){
        data_rebate_trimestral[postabla]['data'][posfila]['desdeeditando'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['desdeeditandoerror'] = false
    }else if(columna == "hastaeditando"){
        data_rebate_trimestral[postabla]['data'][posfila]['hastaeditando'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['hastaeditandoerror'] = false
    }else if(columna == "tprideditando"){
        data_rebate_trimestral[postabla]['data'][posfila]['tprideditando'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['tprideditandoerror'] = false
    }else if(columna == "cat-1"){
        data_rebate_trimestral[postabla]['data'][posfila]['cat-1'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['cat-1error'] = false
    }else if(columna == "cat-2"){
        data_rebate_trimestral[postabla]['data'][posfila]['cat-2'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['cat-2error'] = false
    }else if(columna == "cat-3"){
        data_rebate_trimestral[postabla]['data'][posfila]['cat-3'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['cat-3error'] = false
    }else if(columna == "cat-4"){
        data_rebate_trimestral[postabla]['data'][posfila]['cat-4'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['cat-4error'] = false
    }else if(columna == "cat-5"){
        data_rebate_trimestral[postabla]['data'][posfila]['cat-5'] = valor
        data_rebate_trimestral[postabla]['data'][posfila]['cat-5error'] = false
    }

    dispatch({
        type: OBTENER_DATA_REBATE_TRIMESTRAL,
        payload : data_rebate_trimestral
    })
    
}

export const HabilitarEditarTodosRebateTrimestralReducer = (editando) => async (dispatch, getState) => {

    let data_rebate_trimestral = getState().rebate.data_rebate_trimestral

    await data_rebate_trimestral.map(async (datrebate, posdatrebate) => {
        await datrebate.data.map((dat, posdata) => {
            data_rebate_trimestral[posdatrebate]['data'][posdata]['editando'] = editando
            data_rebate_trimestral[posdatrebate]['data'][posdata]['treideditando'] = data_rebate_trimestral[posdatrebate]['treid']
            data_rebate_trimestral[posdatrebate]['data'][posdata]['desdeeditando'] = data_rebate_trimestral[posdatrebate]['data'][posdata]['ttrporcentajedesde']
            data_rebate_trimestral[posdatrebate]['data'][posdata]['hastaeditando'] = data_rebate_trimestral[posdatrebate]['data'][posdata]['ttrporcentajehasta']

            if(data_rebate_trimestral[posdatrebate]['data'][posdata]['tprnombre'] == "Sell In"){
                data_rebate_trimestral[posdatrebate]['data'][posdata]['tprideditando'] = 1
            }else{
                data_rebate_trimestral[posdatrebate]['data'][posdata]['tprideditando'] = 2
            }
            
            
        })
    })

    dispatch({
        type: OBTENER_DATA_REBATE_TRIMESTRAL,
        payload : data_rebate_trimestral
    })

}

export const CrearRebatesTrimestralReducer = (reiniciar) => async (dispatch, getState) => {

    const data_rebate_trimestral = getState().rebate.data_rebate_trimestral
    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    if(await dispatch(ValidarDatosCrearRebateTrimestralReducer())){

        dispatch({
            type : CARGANDO_BTN_GUARDAR_TRIMESTRE,
            payload : true
        })

        await fetch(config.api+'crear-varios-rebate-trimestral',
            {
                mode:'cors',
                method: 'POST',
                body: JSON.stringify({
                    anio : anioSeleccionadoFiltro,
                    dia  : "01",
                    mes  : mesSeleccionadoFiltro,
                    data : data_rebate_trimestral,
                    reiniciar : reiniciar,
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
                    
                    dispatch(ObtenerDataRebateTrimestralReducer())
                    notification.success({
                        message: `Notificación`,
                        description: data.mensaje,
                        placement: 'topRight',
                    })
                }else{
                    notification.info({
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
            type : CARGANDO_BTN_GUARDAR_TRIMESTRE,
            payload : false
        })

    }else{

        message.error('Lo sentimos algunos campos son necesarios llenar')

    }

    

}

export const ValidarDatosCrearRebateTrimestralReducer = () => async (dispatch, getState) => {

    let respuesta = true
    let data_rebate_trimestral = getState().rebate.data_rebate_trimestral

    console.log(data_rebate_trimestral)
    
    await data_rebate_trimestral.map(async (datrebate, posdatrebate) => {
        await datrebate.data.map((dat, posdata) => {

            if(dat['editando'] == true){

                if(dat['treideditando']){
                    if(dat['treideditando'] == 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['treideditandoerror'] = true    
                        respuesta = false
                    }
                }else{
                    data_rebate_trimestral[posdatrebate]['data'][posdata]['treideditandoerror'] = true
                    respuesta = false
                }

                if(dat['desdeeditando']){
                    if(dat['desdeeditando'].length == 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['desdeeditandoerror'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate_trimestral[posdatrebate]['data'][posdata]['desdeeditandoerror'] = true
                    respuesta = false
                }

                if(dat['hastaeditando']){
                    if(dat['hastaeditando'].length == 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['hastaeditandoerror'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate_trimestral[posdatrebate]['data'][posdata]['hastaeditandoerror'] = true
                    respuesta = false
                }

                if(dat['tprideditando']){
                    if(dat['tprideditando'] == 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['tprideditandoerror'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate_trimestral[posdatrebate]['data'][posdata]['tprideditandoerror'] = true
                    respuesta = false
                }

                if(dat['cat-1']){
                    if(dat['cat-1'].length == 0){
                        if(dat['cat-1'] != 0){
                            data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-1error'] = true
                            respuesta = false
                        }
                    }
                }else{
                    if(dat['cat-1'] != 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-1error'] = true
                        respuesta = false
                    }
                }

                if(dat['cat-2']){
                    if(dat['cat-2'].length == 0){
                        if(dat['cat-2'] != 0){
                            data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-2error'] = true
                            respuesta = false
                        }
                    }
                }else{
                    if(dat['cat-2'] != 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-2error'] = true
                        respuesta = false
                    }
                }
                
                if(dat['cat-3']){
                    if(dat['cat-3'].length == 0){
                        if(dat['cat-3'] != 0){
                            data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-3error'] = true
                            respuesta = false
                        }
                    }
                }else{
                    if(dat['cat-3'] != 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-3error'] = true
                        respuesta = false
                    }
                }

                if(dat['cat-4']){
                    if(dat['cat-4'].length == 0){
                        if(dat['cat-4'] != 0){
                            data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-4error'] = true
                            respuesta = false
                        }
                    }
                }else{
                    if(dat['cat-4'] != 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-4error'] = true
                        respuesta = false
                    }
                }

                if(dat['cat-5']){
                    if(dat['cat-5'].length == 0){
                        if(dat['cat-5'] != 0){
                            data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-5error'] = true
                            respuesta = false
                        }
                    }
                }else{
                    if(dat['cat-5'] != 0){
                        data_rebate_trimestral[posdatrebate]['data'][posdata]['cat-5error'] = true
                        respuesta = false
                    }
                }
                
            }

        })
    })

    dispatch({
        type: OBTENER_DATA_REBATE_TRIMESTRAL,
        payload : data_rebate_trimestral
    })

    return respuesta
    

}