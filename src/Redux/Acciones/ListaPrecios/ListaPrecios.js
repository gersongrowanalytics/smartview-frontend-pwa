import {
    OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
    OBTENER_DATA_EXCEL_LISTA_PRECIOS,
    CARGANDO_TABLA_LISTA_PRECIOS
} from '../../../Constantes/ListaPrecios/ListaPrecios'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const ObtenerGrupoDisponiblesReducer = () =>async (dispatch, getState) => {

    await fetch(config.api+'obtener-grupos-disponibles',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
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
            
            dispatch({
                type: OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
                payload : data.data
            })

            let grupoData = data.data

            if(grupoData.length > 0){

                dispatch(ObtenerDataExcelListaPreciosReducer(grupoData[0]['treid'], 0))
            }

        }
    }).catch((error)=> {
        console.log(error)
    });

    return true
}

export const ObtenerDataExcelListaPreciosReducer = (treid, posicion) =>async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_TABLA_LISTA_PRECIOS,
        payload: true
    })

    let grupos_disponibles_lista_precios = getState().listaPrecios.grupos_disponibles_lista_precios

    await grupos_disponibles_lista_precios.map((grupo, pos) => {
        if(pos == posicion){
            grupos_disponibles_lista_precios[pos]['cargando'] = true
            grupos_disponibles_lista_precios[pos]['seleccionado'] = true
        }else{
            grupos_disponibles_lista_precios[pos]['cargando'] = false
            grupos_disponibles_lista_precios[pos]['seleccionado'] = false
        }
    })

    dispatch({
        type: OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
        payload : grupos_disponibles_lista_precios
    })

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    let dataRpta = []

    await fetch(config.api+'exportar-excel-lista-precios',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
                anio     : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                treid    : treid,
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
        if(estadoRequest === true){

            let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.excel)

            dispatch({
                type: OBTENER_DATA_EXCEL_LISTA_PRECIOS,
                payload : {
                    excel : data_excel_descargar,
                    tabla : data.data,

                }
            })

            dataRpta = data_excel_descargar
        }

    }).catch((error)=> {
        console.log(error)
    });

    grupos_disponibles_lista_precios[posicion]['cargando'] = false

    dispatch({
        type: OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
        payload : grupos_disponibles_lista_precios
    })

    dispatch({
        type: CARGANDO_TABLA_LISTA_PRECIOS,
        payload: false
    })

    return dataRpta
}

export const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {

    await data_excel_descargar[0]['data'].map((dato, posicion) => {
        data_excel_descargar[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return data_excel_descargar
}