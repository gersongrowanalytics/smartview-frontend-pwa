import {
    OBTENER_UNICAMENTE_DATA_LISTA_PRECIOS,
    CARGANDO_ELIMINAR_FILA_LISTA_PRECIOS,
    CARGANDO_EDITAR_FILA_LISTA_PRECIOS
} from '../../../Constantes/ListaPrecios/ListaPrecios'
import { estadoRequestReducer } from "../EstadoRequest"
import config from '../../../config'
import {
    ObtenerDataExcelListaPreciosReducer
} from './ListaPrecios'

export const HabilitarEdicionLpReducer = (posicion) =>async (dispatch, getState) => {

    let data_tabla_lista_precios = getState().listaPrecios.data_tabla_lista_precios

    data_tabla_lista_precios[posicion]['editando'] = true
    if(data_tabla_lista_precios[posicion]['ltpeditandonombre'] == true){
        data_tabla_lista_precios[posicion]['pronombreeditando'] = data_tabla_lista_precios[posicion]['ltpdescripcionproducto']
    }else{
        data_tabla_lista_precios[posicion]['pronombreeditando'] = data_tabla_lista_precios[posicion]['pronombre']
    }
    
    
    dispatch({
        type: OBTENER_UNICAMENTE_DATA_LISTA_PRECIOS,
        payload: data_tabla_lista_precios
    })

}

export const CambiarValorInputLpReducer = (posicion, valor) => async (dispatch, getState) => {

    let data_tabla_lista_precios = getState().listaPrecios.data_tabla_lista_precios

    data_tabla_lista_precios[posicion]['pronombreeditando'] = valor
    
    dispatch({
        type: OBTENER_UNICAMENTE_DATA_LISTA_PRECIOS,
        payload: data_tabla_lista_precios
    })

}

export const EliminarLpReducer = (ltpid) => async (dispatch, getState) => {

    const grupos_disponibles_lista_precios = getState().listaPrecios.grupos_disponibles_lista_precios

    dispatch({
        type: CARGANDO_ELIMINAR_FILA_LISTA_PRECIOS,
        payload: true
    })

    await fetch(config.api+'eliminar-lista-precio',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
                ltpid : ltpid
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
            dispatch(ObtenerDataExcelListaPreciosReducer(grupos_disponibles_lista_precios[0]['treid'], 0))
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_ELIMINAR_FILA_LISTA_PRECIOS,
        payload: false
    })

    return true

}

export const EditarLpReducer = (posicion) => async (dispatch, getState) => {

    let data_tabla_lista_precios = getState().listaPrecios.data_tabla_lista_precios
    const grupos_disponibles_lista_precios = getState().listaPrecios.grupos_disponibles_lista_precios
    
    let id = data_tabla_lista_precios[posicion]['ltpid']
    let valor = data_tabla_lista_precios[posicion]['pronombreeditando']

    dispatch({
        type: CARGANDO_EDITAR_FILA_LISTA_PRECIOS,
        payload: true
    })

    await fetch(config.api+'editar-lista-precio',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
                ltpid : id,
                descproducto : valor
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
            dispatch(ObtenerDataExcelListaPreciosReducer(grupos_disponibles_lista_precios[0]['treid'], 0))   
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_EDITAR_FILA_LISTA_PRECIOS,
        payload: false
    })

}