import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_TABLA_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_BTN_MODAL_CONTROL_ARCHIVOS,
    SELECCIONAR_TODO_FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
    FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
    OBTENER_DATOS_TIPOS_CARGA
} from '../../../Constantes/ControlArchivos/ControlArchivos'

export const dataControlArchivos = (pagina) => async ( dispatch, getState ) => {

    let tiposCarga = getState().controlArchivos.tiposCargArchivos

    dispatch({
        type: CARGANDO_TABLA_DATOS_CONTROL_ARCHIVOS,
        payload: {
            cargandoSpin: true
        }
    })

    if (tiposCarga) {
        await fetch(config.api+'mostrar/archivos-subidos?page='+pagina,
            {
                mode:'cors',
                method: 'POST',
                body: JSON.stringify({
                    usutoken: localStorage.getItem('usutoken'),
                    re_tiposCarga: tiposCarga
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
                if(data){
                    dispatch({
                        type: OBTENER_DATOS_CONTROL_ARCHIVOS,
                        payload: {
                            datos: data.datos.data,
                            paginasTotales: data.datos.last_page,
                            paginaActual: data.datos.current_page,
                            indexRegistro: data.datos.from,
                            cargandoSpin: false,
                            data_controlarchivos : data.datos
                        }
                    })
                }else{

                }
            }
        }).catch((error)=> {
            console.log(error)
        });
    }

}

export const EliminarControlArchivosReducer = (idControlArchivo) => async (dispatch, getState) => {
    
    let respuesta = false

    dispatch({
        type: CARGANDO_BTN_MODAL_CONTROL_ARCHIVOS,
        payload: true
    })

    await fetch(config.api+'eliminar/archivos-subidos',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                re_carid : idControlArchivo
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
        if (estadoRequest == true) {
            if (data.respuesta == true) {
                respuesta = true
                dispatch({
                    type: CARGANDO_BTN_MODAL_CONTROL_ARCHIVOS,
                    payload: false
                })
            }
        }
    }).catch((error)=> {
        console.log(error)
    });
    return respuesta

}

export const dataTiposCargaArchivo = () => async ( dispatch, getState ) => {

    await fetch(config.api+'mostrar/tcas',
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
            if (data.respuesta == true) {
                let tiposCarga = data.datos
                await tiposCarga.map((tipo) => {
                    tipo['seleccionado'] = true
                })
                dispatch({
                    type: OBTENER_DATOS_TIPOS_CARGA,
                    payload: tiposCarga
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const SeleccionarTodoFiltroTipoCarga = (valor) => async (dispatch, getState) => {
    let tiposCarga = getState().controlArchivos.tiposCargArchivos

    await tiposCarga.map((tipo, pos) => {
        tiposCarga[pos]['seleccionado'] = valor
    })

    dispatch({
        type: FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
        payload : tiposCarga
    })

    dispatch({
        type: SELECCIONAR_TODO_FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
        payload : valor
    })
}

export const SeleccionarFiltroTipoCarga = (posicion, valor) => async (dispatch, getState) => {
    let tiposCarga = getState().controlArchivos.tiposCargArchivos

    tiposCarga[posicion]['seleccionado'] = valor

    dispatch({
        type: FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
        payload : tiposCarga
    })
}

