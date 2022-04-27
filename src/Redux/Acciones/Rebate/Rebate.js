import {
    OBTENER_REBATES_ACTUALES_REBATE,
    OBTENER_GRUPOS_REBATES_REBATE,
    CARGANDO_DATA_REBATE,
    SELECCIONAR_GRUPO_REBATE,
    OBTENER_REBATE_DESCARGAR_REBATE,
    CARGANDO_GUARDAR_REBATE_MENSUAL
} from '../../../Constantes/Rebate/Rebate'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import { message } from 'antd'

export const ObtenerRebatesActualesReducer = () => async (dispatch, getState) => {

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    dispatch({
        type : CARGANDO_DATA_REBATE,
        payload : true
    })

    await fetch(config.api+'mostrar-rebates',
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
                    type: OBTENER_REBATES_ACTUALES_REBATE,
                    // payload : data.datos
                    payload : data.tablas
                })

                let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.descargar_data)

                dispatch({
                    type: OBTENER_REBATE_DESCARGAR_REBATE,
                    payload: data_excel_descargar
                })

                data.tablas.map((dat, pos) => {
                    if(dat.mostrando == true){
                        dispatch({
                            type: SELECCIONAR_GRUPO_REBATE,
                            payload : dat.trenombre
                        })
                    }
                })

                // dispatch(AgregarFilaRebateReducer(0))

            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type : CARGANDO_DATA_REBATE,
        payload : false
    })

}

export const AgregarFilaRebateReducer = (posicion) => async (dispatch, getState) => {

    let data_rebate = getState().rebate.data_rebate

    data_rebate[posicion]['data'].push(
        {
            editando: true, 
            treideditando : data_rebate[posicion]['treid']
        }
    )

    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })
}

export const ActivarCarouselTablaRebateReducer = (opcion) => async (dispatch, getState) => {

    let data_rebate = getState().rebate.data_rebate

    let nuevoMostrando = false
    let esUltimo = false

    if(opcion == "retroceder"){

        let esPrimera = false
        let posSelec = 0

        await data_rebate.map((dat, pos) => {

            if(dat.mostrando == true){
                data_rebate[pos]['retroceder'] = true
                data_rebate[pos]['mostrando'] = false
                data_rebate[pos]['ocultando'] = true
                nuevoMostrando = true

                posSelec = pos
                
                if(pos == 0){
                    esPrimera = true
                }
    
            }else{
                
            }
        })

        if(esPrimera == true){
            posSelec = parseInt(data_rebate.length) - 1
            data_rebate[posSelec]['retroceder'] = true
            data_rebate[posSelec]['mostrando'] = true
            data_rebate[posSelec]['ocultando'] = false

            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate[posSelec]['trenombre']
            })

        }else{
            posSelec = parseInt(posSelec) - 1
            data_rebate[posSelec]['retroceder'] = true
            data_rebate[posSelec]['mostrando'] = true
            data_rebate[posSelec]['ocultando'] = false
            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate[posSelec]['trenombre']
            })
        }

    }else{
        await data_rebate.map((dat, pos) => {

            if(dat.mostrando == true){
                data_rebate[pos]['retroceder'] = false
                data_rebate[pos]['mostrando'] = false
                data_rebate[pos]['ocultando'] = true
                nuevoMostrando = true
    
                if(data_rebate.length == pos+1){
                    esUltimo = true
                }
    
            }else{
                if(nuevoMostrando == true){
                    nuevoMostrando = false
                    data_rebate[pos]['retroceder'] = false
                    data_rebate[pos]['mostrando'] = true
                    data_rebate[pos]['ocultando'] = false
                    dispatch({
                        type: SELECCIONAR_GRUPO_REBATE,
                        payload : data_rebate[pos]['trenombre']
                    })
                }
            }
        })
    
        if(esUltimo == true){
            data_rebate[0]['retroceder'] = false
            data_rebate[0]['mostrando'] = true
            data_rebate[0]['ocultando'] = false
            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate[0]['trenombre']
            })
        }
    }

    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })

    return true

}

export const ObtenerGrupoRebateReducer = () => async (dispatch, getState) => {


    await fetch(config.api+'configuracion/rebate/mostrar/GrupoRebate',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({}),
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
                    type: OBTENER_GRUPOS_REBATES_REBATE,
                    payload: data.datos
                })
                

            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

}

export const EditarFilaRebateReducer = (postabla, posfila, editando) => (dispatch, getState) => {
    let data_rebate = getState().rebate.data_rebate

    if(data_rebate[postabla]['data'][posfila]['editando'] == true){
        data_rebate[postabla]['data'][posfila]['editando'] = false
    }else{
        data_rebate[postabla]['data'][posfila]['editando'] = true
        data_rebate[postabla]['data'][posfila]['treideditando'] = data_rebate[postabla]['treid']
        data_rebate[postabla]['data'][posfila]['desdeeditando'] = data_rebate[postabla]['data'][posfila]['rtpporcentajedesde']
        data_rebate[postabla]['data'][posfila]['hastaeditando'] = data_rebate[postabla]['data'][posfila]['rtpporcentajehasta']

        if(data_rebate[postabla]['data'][posfila]['tprnombre'] == "Sell In"){
            data_rebate[postabla]['data'][posfila]['tprideditando'] = 1
        }else{
            data_rebate[postabla]['data'][posfila]['tprideditando'] = 2
        }
    }
    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })

}

export const EditandoFilaRebateReducer = (postabla, posfila, columna, valor) => (dispatch, getState) => {

    let data_rebate = getState().rebate.data_rebate

    if(columna == "treideditando"){
        data_rebate[postabla]['data'][posfila]['treideditando'] = valor
        data_rebate[postabla]['data'][posfila]['treideditandoerror'] = false
    }else if(columna == "desdeeditando"){
        data_rebate[postabla]['data'][posfila]['desdeeditando'] = valor
        data_rebate[postabla]['data'][posfila]['desdeeditandoerror'] = false
    }else if(columna == "hastaeditando"){
        data_rebate[postabla]['data'][posfila]['hastaeditando'] = valor
        data_rebate[postabla]['data'][posfila]['hastaeditandoerror'] = false
    }else if(columna == "tprideditando"){
        data_rebate[postabla]['data'][posfila]['tprideditando'] = valor
        data_rebate[postabla]['data'][posfila]['tprideditandoerror'] = false
    }else if(columna == "cat-1"){
        data_rebate[postabla]['data'][posfila]['cat-1'] = valor
        data_rebate[postabla]['data'][posfila]['cat-1error'] = false
    }else if(columna == "cat-2"){
        data_rebate[postabla]['data'][posfila]['cat-2'] = valor
        data_rebate[postabla]['data'][posfila]['cat-2error'] = false
    }else if(columna == "cat-3"){
        data_rebate[postabla]['data'][posfila]['cat-3'] = valor
        data_rebate[postabla]['data'][posfila]['cat-3error'] = false
    }else if(columna == "cat-4"){
        data_rebate[postabla]['data'][posfila]['cat-4'] = valor
        data_rebate[postabla]['data'][posfila]['cat-4error'] = false
    }else if(columna == "cat-5"){
        data_rebate[postabla]['data'][posfila]['cat-5'] = valor
        data_rebate[postabla]['data'][posfila]['cat-5error'] = false
    }

    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })
    
}

export const CrearRebatesReducer = (reiniciar) => async (dispatch, getState) => {

    const data_rebate = getState().rebate.data_rebate
    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    // console.log(data_rebate)

    if(await dispatch(ValidarDatosCrearRebateReducer())){

        dispatch({
            type: CARGANDO_GUARDAR_REBATE_MENSUAL,
            payload : true
        })

        await fetch(config.api+'crear-varios-rebate',
            {
                mode:'cors',
                method: 'POST',
                body: JSON.stringify({
                    anio : anioSeleccionadoFiltro,
                    dia  : "01",
                    mes  : mesSeleccionadoFiltro,
                    data : data_rebate,
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
                    
                    dispatch(ObtenerRebatesActualesReducer())

                }else{
                    
                }
            }
        }).catch((error)=> {
            console.log(error)
        });

        dispatch({
            type: CARGANDO_GUARDAR_REBATE_MENSUAL,
            payload : false
        })

    }else{

        message.error('Lo sentimos algunos campos son necesarios llenar')

    }

    

}

export const FiltrarGrupoReducer = (grupo) => async (dispatch, getState) => {
    let data_rebate = getState().rebate.data_rebate

    await data_rebate.map((dat, pos) => {
        if(dat.treid == grupo){
            data_rebate[pos]['retroceder'] = true
            data_rebate[pos]['mostrando'] = true
            data_rebate[pos]['ocultando'] = false
            dispatch({
                type: SELECCIONAR_GRUPO_REBATE,
                payload : data_rebate[pos]['trenombre']
            })
        }else{
            data_rebate[pos]['retroceder'] = true
            data_rebate[pos]['mostrando'] = false
            data_rebate[pos]['ocultando'] = true
        }
    })

    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })
}

export const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {

    await data_excel_descargar[0]['data'].map((dato, posicion) => {
        data_excel_descargar[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return data_excel_descargar
}

export const HabilitarEditarTodosReducer = (editando) => async (dispatch, getState) => {

    let data_rebate = getState().rebate.data_rebate

    await data_rebate.map(async (datrebate, posdatrebate) => {
        await datrebate.data.map((dat, posdata) => {
            data_rebate[posdatrebate]['data'][posdata]['editando'] = editando
            data_rebate[posdatrebate]['data'][posdata]['treideditando'] = data_rebate[posdatrebate]['treid']
            data_rebate[posdatrebate]['data'][posdata]['desdeeditando'] = data_rebate[posdatrebate]['data'][posdata]['rtpporcentajedesde']
            data_rebate[posdatrebate]['data'][posdata]['hastaeditando'] = data_rebate[posdatrebate]['data'][posdata]['rtpporcentajehasta']

            if(data_rebate[posdatrebate]['data'][posdata]['tprnombre'] == "Sell In"){
                data_rebate[posdatrebate]['data'][posdata]['tprideditando'] = 1
            }else{
                data_rebate[posdatrebate]['data'][posdata]['tprideditando'] = 2
            }
            
            
        })
    })

    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })

}

export const ValidarDatosCrearRebateReducer = () => async (dispatch, getState) => {

    let respuesta = true
    let data_rebate = getState().rebate.data_rebate

    await data_rebate.map(async (datrebate, posdatrebate) => {
        await datrebate.data.map((dat, posdata) => {

            if(dat['editando'] == true){

                if(dat['treideditando']){
                    if(dat['treideditando'] == 0){
                        data_rebate[posdatrebate]['data'][posdata]['treideditandoerror'] = true    
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['treideditandoerror'] = true
                    respuesta = false
                }

                if(dat['desdeeditando']){
                    if(dat['desdeeditando'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['desdeeditandoerror'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['desdeeditandoerror'] = true
                    respuesta = false
                }

                if(dat['hastaeditando']){
                    if(dat['hastaeditando'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['hastaeditandoerror'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['hastaeditandoerror'] = true
                    respuesta = false
                }

                if(dat['tprideditando']){
                    if(dat['tprideditando'] == 0){
                        data_rebate[posdatrebate]['data'][posdata]['tprideditandoerror'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['tprideditandoerror'] = true
                    respuesta = false
                }

                if(dat['cat-1']){
                    if(dat['cat-1'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['cat-1error'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['cat-1error'] = true
                    respuesta = false
                }

                if(dat['cat-2']){
                    if(dat['cat-2'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['cat-2error'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['cat-2error'] = true
                    respuesta = false
                }
                
                if(dat['cat-3']){
                    if(dat['cat-3'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['cat-3error'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['cat-3error'] = true
                    respuesta = false
                }

                if(dat['cat-4']){
                    if(dat['cat-4'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['cat-4error'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['cat-4error'] = true
                    respuesta = false
                }

                if(dat['cat-5']){
                    if(dat['cat-5'].length == 0){
                        data_rebate[posdatrebate]['data'][posdata]['cat-5error'] = true
                        respuesta = false
                    }
                }else{
                    data_rebate[posdatrebate]['data'][posdata]['cat-5error'] = true
                    respuesta = false
                }
                
            }

        })
    })

    dispatch({
        type: OBTENER_REBATES_ACTUALES_REBATE,
        payload : data_rebate
    })

    return respuesta
    

}


export const EliminarRebateMensualReducer = (
    porcentajedesde,
    porcentajehasta,
    porcentajerebate,
    tprid,
    treid
) => async (dispatch, getState) => {

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    dispatch({
        type : CARGANDO_DATA_REBATE,
        payload : true
    })

    await fetch(config.api+'eliminar-rebate-mensual',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                anio : anioSeleccionadoFiltro,
                dia  : "01",
                mes  : mesSeleccionadoFiltro,

                porcentajedesde: porcentajedesde,
                porcentajehasta: porcentajehasta,
                porcentajerebate: porcentajerebate,
                tprid: tprid,
                treid: treid,
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
                
                dispatch(ObtenerRebatesActualesReducer())
                message.success(data.mensaje)
            }else{
                message.error(data.mensaje)
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type : CARGANDO_DATA_REBATE,
        payload : false
    })

}