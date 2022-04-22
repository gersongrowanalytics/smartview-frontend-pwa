import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_ELEMENTOS_ENVIADOS,
    CARGANDO_TABLA_DATOS_ELEMENTOS_ENVIADOS,
    OBTENER_DATOS_PAGINATE_ELEMENTOS_ENVIADOS,
    CARGANDO_BTN_MODAL_ELEMENTOS_ENVIADOS,
    OBTENER_DATOS_TIPOS_ELEMENTOS_ENVIADOS,
    FILTRO_TIPO_ENVIO_ELEMENTOS_ENVIADOS,
    SELECCIONAR_TODO_FILTRO_TIPO_ENVIO_ELEMENTOS_ENVIADOS
} from '../../../Constantes/ElementosEnviados/ElementosEnviados'

export const dataElementosEnviados = (pagina) => async ( dispatch, getState ) => {
    let tiposEnvio = getState().elementosEnviados.tiposElementosEnviados

    dispatch({
        type: CARGANDO_TABLA_DATOS_ELEMENTOS_ENVIADOS,
        payload: {
            cargandoSpin: true
        }
    })
    if (tiposEnvio) {
        await fetch(config.api+'mostrar-elementos-enviados?page='+pagina,
            {
                mode:'cors',
                method: 'POST',
                body: JSON.stringify({
                    usutoken : localStorage.getItem('usutoken'),
                    $re_tiposEnvio: tiposEnvio
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
                    dispatch({
                        type: OBTENER_DATOS_PAGINATE_ELEMENTOS_ENVIADOS,
                        payload : data.datos
                    })

                    dispatch({
                        type: OBTENER_DATOS_ELEMENTOS_ENVIADOS,
                        payload: {
                            datos: data.datos.data,
                            paginasTotales: data.datos.last_page,
                            paginaActual: data.datos.current_page,
                            indexRegistro: data.datos.from,
                            cargandoSpin: false 
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

export const enviarCorreoPromociones = (datosElementoEnviado) => async ( dispatch, getState ) => {
    
    let respuesta = false
    let tipoPromocion
    dispatch({
        type: CARGANDO_BTN_MODAL_ELEMENTOS_ENVIADOS,
        payload: true
    })

    if (datosElementoEnviado.ucetipo == 'Promociones Activas') {
        tipoPromocion = '/promociones/mail/enviar-correo-promociones-activas'
    } else if (datosElementoEnviado.ucetipo == 'Promociones Nuevas'){
        tipoPromocion = '/promociones/mail/enviar-correo-promociones-nuevas'
    }

    await fetch(config.api+tipoPromocion,
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                sucursales : JSON.parse(datosElementoEnviado.ucesucursales),
                fecha: datosElementoEnviado.ucefecha
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
                respuesta = true
                dispatch({
                    type: CARGANDO_BTN_MODAL_ELEMENTOS_ENVIADOS,
                    payload: false
                })
            }
        }
    }).catch((error)=> {
        console.log(error)
    });
    return respuesta
}   

export const  eliminarCorreoPromociones = (datosElementoEnviado) => async ( dispatch, getState ) => {
    
    let respuesta = false

    dispatch({
        type: CARGANDO_BTN_MODAL_ELEMENTOS_ENVIADOS,
        payload: true
    })

    await fetch(config.api+'/eliminar-elementos-enviados',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                re_uceid : datosElementoEnviado.uceid
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
                respuesta = true
                dispatch({
                    type: CARGANDO_BTN_MODAL_ELEMENTOS_ENVIADOS,
                    payload: false
                })
            }
        }
    }).catch((error)=> {
        console.log(error)
    });
    return respuesta
}   

export const dataTiposElementosEnviados = () => async ( dispatch, getState ) => {
    
    await fetch(config.api+'mostrar-tipos-elementos-enviados',
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
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_DATOS_TIPOS_ELEMENTOS_ENVIADOS,
                    payload : data.datos
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const SeleccionarTodoFiltroTipoEnvio = (valor) => async (dispatch, getState) => {
    let tiposEnvio = getState().elementosEnviados.tiposElementosEnviados

    await tiposEnvio.map((tipo, pos) => {
        tiposEnvio[pos]['seleccionado'] = valor
    })

    dispatch({
        type: FILTRO_TIPO_ENVIO_ELEMENTOS_ENVIADOS,
        payload : tiposEnvio
    })

    dispatch({
        type: SELECCIONAR_TODO_FILTRO_TIPO_ENVIO_ELEMENTOS_ENVIADOS,
        payload : valor
    })
}

export const SeleccionarFiltroTipoEnvio = (posicion, valor) => async (dispatch, getState) => {
    let tiposEnvio = getState().elementosEnviados.tiposElementosEnviados

    tiposEnvio[posicion]['seleccionado'] = valor

    dispatch({
        type: FILTRO_TIPO_ENVIO_ELEMENTOS_ENVIADOS,
        payload : tiposEnvio
    })
}