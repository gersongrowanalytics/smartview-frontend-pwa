import { estadoRequestReducer } from "../EstadoRequest"
import {message} from "antd";
import {
    REINICIAR_PROMOCIONES,
    OBTENER_PROMOCIONES_EXITO,
    OBTENER_PROMOCIONES_FAIL,
    SELECCIONAR_PROMOCION,
    OBTENER_CANALES_DE_PROMOCIONES_FAIL,
    ACTUALIZAR_CATEGORIAS_DE_PROMOCIONES,
    ACTUALIZAR_COLOR_SELECCIONADO_PROMOCION,
    OBTENER_CANALES_DE_PROMOCIONES_EXITO,
    ACTUALIZAR_CANALES_DE_PROMOCIONES,
    CAMBIAR_DISENIO_PROMOCIONES
} from '../../../Constantes/Promociones/Promociones'
import config from '../../../config'

export const obtenerPromocionesReducer = () =>async (dispatch, getState) => {
    const {
        diaFiltroSelec,
        mesFiltroSelec,
        anoFiltroSelec
    } = getState().fechas

    const {
        idSucursalUsuarioSelec,
    } = getState().sucursales

    await fetch(config.api+'promociones/mostrar/categorias',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                // usutoken : localStorage.getItem('usutoken'),
                usutoken : "HJ0t4xbw7zmQdZnpAyhffbMORIn8RpD9cUyRihQmXejkIOgmym6fuDOyWag0",
                // sucid    : idSucursalUsuarioSelec,
                // dia      : diaFiltroSelec,
                // mes      : mesFiltroSelec,
                // ano      : anoFiltroSelec,
                ano: "2022",
                dia: "01",
                mes: "ENE",
                sucid: 9
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                // 'api_token': localStorage.getItem('usutoken'),
                // 'api-token': localStorage.getItem('usutoken'),
                'api_token': "HJ0t4xbw7zmQdZnpAyhffbMORIn8RpD9cUyRihQmXejkIOgmym6fuDOyWag0",
                'api-token': "HJ0t4xbw7zmQdZnpAyhffbMORIn8RpD9cUyRihQmXejkIOgmym6fuDOyWag0",
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
            if(data.respuesta === true){
                dispatch({
                    type    : REINICIAR_PROMOCIONES,
                    payload : false
                })
                dispatch({
                    type: OBTENER_PROMOCIONES_EXITO,
                    payload: {
                        "datos" : data.datos,
                        "fecha" : data.fechaActualiza
                    }
                })
            }else{
                dispatch({
                    type: OBTENER_PROMOCIONES_FAIL,
                    payload: data.datos
                })
            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const seleccionarPromocionReducer = (accion) => {
    return {
        type: SELECCIONAR_PROMOCION,
        payload: accion
    }
}

export const seleccionarCategoriaReducer = (scaid, limpiarCanales, posicion) => async (dispatch, getState) => {

    if(limpiarCanales == true){
        dispatch({
            type: OBTENER_CANALES_DE_PROMOCIONES_FAIL,
            payload: []
        })
    }

    let {categoriasPromociones, deseleccionarPromocion} = getState().promociones

    let colorSeleccionado = '';
    categoriasPromociones.map((categoria, nuevaposicion) => {
        if(categoria.scaid === scaid){
            categoriasPromociones[nuevaposicion]['seleccionado'] = true
            colorSeleccionado = categoria.catcolor
        }else{
            categoriasPromociones[nuevaposicion]['seleccionado'] = false
        }
    })

    dispatch({
        type: ACTUALIZAR_CATEGORIAS_DE_PROMOCIONES,
        payload: categoriasPromociones
    })

    dispatch({
        type: ACTUALIZAR_COLOR_SELECCIONADO_PROMOCION,
        payload: colorSeleccionado
    })

    let canalesObtenidos = []

    await fetch(config.api+'promociones/mostrar/promociones',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken  : localStorage.getItem('usutoken'),
                scaid     : scaid,
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
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request
        const reiniciandoPromociones = getState().promociones.reiniciandoPromociones

        if(estadoRequest === true){
            if(reiniciandoPromociones == false){
                if(data.respuesta === true){
                    canalesObtenidos = data.datos
                    dispatch({
                        type: OBTENER_CANALES_DE_PROMOCIONES_EXITO,
                        payload: {
                            canalesPromociones : data.datos,
                            scaid              : scaid
                        }
                    })
                    
                }else{
                    dispatch({
                        type: editarPromocionReducer,
                        payload: data.datos
                    })
                }
            }else{

                dispatch({
                    type    : REINICIAR_PROMOCIONES,
                    payload : false
                })

            }
        }
    }).catch((error)=> {
        dispatch({
            type: OBTENER_CANALES_DE_PROMOCIONES_FAIL,
            payload: []
        })
    });

    categoriasPromociones[posicion]['canales'] = canalesObtenidos

    dispatch({
        type: ACTUALIZAR_CATEGORIAS_DE_PROMOCIONES,
        payload: categoriasPromociones
    })

}

export const editarPromocionReducer = (posicionCanal, posicionPromocion) => async (dispatch, getState) => {

    let {canalesPromociones} = getState().promociones
    canalesPromociones[posicionCanal]['promociones'][posicionPromocion]['guardando'] = !canalesPromociones[posicionCanal]['promociones'][posicionPromocion]['guardando']
    dispatch({
        type: ACTUALIZAR_CANALES_DE_PROMOCIONES,
        payload: canalesPromociones
    })
}

export const CambiarDisenioPromocionesReducer = () => (dispatch, getState) => {

    const {
        mostrarDisenioPromocionesPrincipal
    } = getState().promociones

    dispatch({
        type: CAMBIAR_DISENIO_PROMOCIONES,
        payload: !mostrarDisenioPromocionesPrincipal
    })
}

export const aceptarEdicionPromocionReducer = (posicionCanal, posicionPromocion, scaid, cspid, valorizado, planchas) => async (dispatch, getState) => {

    let {canalesPromociones, scaidSeleccionado} = getState().promociones
    canalesPromociones[posicionCanal]['promociones'][posicionPromocion]['guardando'] = false
    // dispatch({
    //     type: ACTUALIZAR_CANALES_DE_PROMOCIONES,
    //     payload: canalesPromociones
    // })


    await fetch(config.api+'promociones/editar',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken    : localStorage.getItem('usutoken'),
                cspid       : cspid,
                valorizado  : valorizado,
                planchas    : planchas
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
        	if(data.respuesta === true){
            	dispatch(seleccionarCategoriaReducer(scaidSeleccionado, false))
            	message.success(data.mensaje) 
        	}else{
            	message.error(data.mensaje) 
        	}
      	}
    }).catch((error)=> {
		console.log(error)
		message.error("Lo sentimos, ocurrio un error del servidor (Frntd)") 
    });
}

export const guardarImagenPromocionReducer = (
	prpid, 
	prbid, 
	producto, 
	bonificado, 
	posicionCanal, 
	posicionPromocion
) => async (dispatch, getState) => {


	let {canalesPromociones, scaidSeleccionado} = getState().promociones

    canalesPromociones[posicionCanal]['promociones'][posicionPromocion]['cargando'] = true

	dispatch({
        type: ACTUALIZAR_CANALES_DE_PROMOCIONES,
        payload: canalesPromociones
	})
	
  	await fetch(config.api+'promociones/editar/imagenes',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
				prpid			 : prpid,
				prbid			 : prbid,
				imagenProducto 	 : producto,
				imagenBonificado : bonificado
			}),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api_token'	   : localStorage.getItem('usutoken'),
				'api-token'	   : localStorage.getItem('usutoken'),
			}
		}
	)
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(data => {
		canalesPromociones[posicionCanal]['promociones'][posicionPromocion]['cargando'] = false
		dispatch({
			type: ACTUALIZAR_CANALES_DE_PROMOCIONES,
			payload: canalesPromociones
		})
      	const estadoRequest = getState().estadoRequest.init_request
      	if(estadoRequest === true){
        	if(data.respuesta === true){
				
				message.success(data.mensaje)
				dispatch(seleccionarCategoriaReducer(scaidSeleccionado, false))
        	}else{
				message.error(data.mensaje)
        	}
      	}
    }).catch((error)=> {
		canalesPromociones[posicionCanal]['promociones'][posicionPromocion]['cargando'] = false
		dispatch({
			type: ACTUALIZAR_CANALES_DE_PROMOCIONES,
			payload: canalesPromociones
		})
		console.log(error)
		message.error("Lo sentimos, ocurrio un error del servidor (Frntd)") 
  	});

}