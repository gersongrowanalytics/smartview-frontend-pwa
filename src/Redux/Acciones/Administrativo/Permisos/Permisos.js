import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_DATOS_PERMISOS,
    CARGANDO_TABLA_DATOS_PERMISOS,
    OBTENER_DATA_PERMISOS
} from '../../../../Constantes/Administrativo/Permisos/Permisos'

export const dataPermisos = (pagina) => async ( dispatch, getState ) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_PERMISOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'permisos/mostrar?page='+pagina,
        {
            mode:'cors',
            method: 'GET',
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
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_DATOS_PERMISOS,
                    payload: {
                        datos: data.permisos.data,
                        paginasTotales: data.permisos.last_page,
                        paginaActual: data.permisos.current_page,
                        indexRegistro: data.permisos.from,
                        cargandoSpin: false,
                        data_paginate_permisos : data.permisos,
                        data_tipos_permisos : data.tpes,
                    }
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const HabilitarEditarPermisosReducer = (posicion, editando) => async ( dispatch, getState ) => {

    let permisos = getState().permisos.permisos

    permisos[posicion]['editando'] = editando
    permisos[posicion]['nombreEditando'] = permisos[posicion]['pemnombre']
    permisos[posicion]['slugEditando'] = permisos[posicion]['pemslug']
    permisos[posicion]['rutaEditando'] = permisos[posicion]['pemruta']

    dispatch({
        type: OBTENER_DATA_PERMISOS,
        payload : permisos
    })

}

export const CambiarValorEditarPermisoReducer = (posicion, input, valor) => (dispatch, getState) => {

    let permisos = getState().permisos.permisos

    if(input == "nombre"){
        permisos[posicion]['nombreEditando'] = valor
    }else if(input == "slug"){
        permisos[posicion]['slugEditando'] = valor
    }else if(input == "ruta"){
        permisos[posicion]['rutaEditando'] = valor
    }

    dispatch({
        type: OBTENER_DATA_PERMISOS,
        payload : permisos
    })

}

export const EditarPermisoReducer = (pemid, nombre, slug, ruta, pagina) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_PERMISOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'permisos-editar',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                pemid : pemid,
                nombreEditando : nombre,
                slugEditado : slug,
                rutaEditada : ruta,
            }),
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
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
                dispatch(dataPermisos(pagina))

            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });

}

export const EliminarEditarPermisosReducer = (pemid, pagina) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_PERMISOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'permisos-eliminar',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                pemid : pemid
            }),
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
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
                dispatch(dataPermisos(pagina))

            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
    
}

export const CrearPermisoReducer = (tipoPermiso, permiso, slug, ruta, pagina) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_PERMISOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'permisos/crear',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                permiso : permiso,
                slug : slug,
                ruta : ruta,
                categoriaNueva : tipoPermiso,
            }),
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
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
                dispatch(dataPermisos(pagina))

            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    return true
    
}