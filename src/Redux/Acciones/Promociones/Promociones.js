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
import {
    APLICANDO_FILTROS_CORRESPONDIENTES,
    CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
    SELECCIONAR_CASS,
    SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    SELECCIONAR_UNA_ZONA_DESCARGAR,
    SELECCIONAR_UN_GRUPO_DESCARGAR
} from '../../../Constantes/Sucursales'


export const obtenerPromocionesReducer = () =>async (dispatch, getState) => {

    const idSucursalUsuarioSelec = getState().sucursales.idSucursalUsuarioSelec
    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    await fetch(config.api+'promociones/mostrar/categorias',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                sucid    : idSucursalUsuarioSelec,
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

    dispatch({
        type: APLICANDO_FILTROS_CORRESPONDIENTES,
        payload : {
            aplicandoCanal : false,
            aplicandoZona  : false,
            aplicandoGrupo : false,
            aplicandoDt    : false,
        }
    })

    let cass = getState().sucursales.cass
    let zonas = getState().sucursales.zonas
    let gsus = getState().sucursales.gsus
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    await cass.map((canal, posCas) => {
        cass[posCas]['check'] = false
    })

    await zonas.map((gsu, posZon) => {
        zonas[posZon]['check'] = false
    })

    await gsus.map((suc, posGsu) => {
        gsus[posGsu]['check'] = false
    })

    await sucursalesUsuario.map((suc, posSuc) => {
        if(idSucursalUsuarioSelec == suc.sucid){
            sucursalesUsuario[posSuc]['check'] = true
        }else{
            sucursalesUsuario[posSuc]['check'] = false
        }
    })

    dispatch({
        type: SELECCIONAR_CASS,
        payload : cass
    })

    dispatch({
        type: SELECCIONAR_UNA_ZONA_DESCARGAR,
        payload : zonas
    })

    dispatch({
        type: SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
        payload : sucursalesUsuario
    })

    dispatch({
        type: SELECCIONAR_UN_GRUPO_DESCARGAR,
        payload : gsus
    })

    dispatch({
        type: CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
        payload : false
    })

    return true
}

export const seleccionarPromocionReducer = (accion) => {
    return {
        type: SELECCIONAR_PROMOCION,
        payload: accion
    }
}

export const seleccionarCategoriaXZonaReducer = (scaid, limpiarCanales, catid) => async (dispatch, getState) => {

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


    // 
    const {
        diaFiltroSelec,
        mesFiltroSelec,
        anoFiltroSelec
    } = getState().fechas

    const {
        zonaidseleccionado,
        gsuidSeleccionado,
        casidSeleccionado
    } = getState().zonas
    // 

    await fetch(config.api+'promociones/mostrar/promociones/xzona',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken  : localStorage.getItem('usutoken'),
                catid   : catid,
                zonid   : zonaidseleccionado,
                gsuid   : gsuidSeleccionado,
                casid   : casidSeleccionado,
                mes     : mesFiltroSelec,
                ano     : anoFiltroSelec,
                dia     : diaFiltroSelec,
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
        console.log(error)
        dispatch({
            type: OBTENER_CANALES_DE_PROMOCIONES_FAIL,
            payload: []
        })
    });
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

export const seleccionarCategoriaPdfReducer = (scaid) => async (dispatch, getState) => {

    let rpta = []

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

        if(estadoRequest === true){
            if(data.respuesta === true){
                
                rpta = data.datos
                
            }else{
                
            }
        }
    }).catch((error)=> {
        
    });

    return rpta

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

export const ObtenerPromocionesAcumuladasReducer = () => async (dispatch, getState) => {

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    const aplicandoFiltroCanal = getState().sucursales.aplicandoFiltroCanal
    const aplicandoFiltroZona = getState().sucursales.aplicandoFiltroZona
    const aplicandoFiltroGrupo = getState().sucursales.aplicandoFiltroGrupo
    const aplicandoFiltroDt = getState().sucursales.aplicandoFiltroDt

    const cass = getState().sucursales.cass
    const zonas = getState().sucursales.zonas
    const gsus = getState().sucursales.gsus
    const sucursalesUsuario = getState().sucursales.sucursalesUsuario

    await fetch(config.api+'promociones/mostrar/categorias/acumulado',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,

                aplicandoFiltroCanal  : aplicandoFiltroCanal,
                aplicandoFiltroZona   : aplicandoFiltroZona,
                aplicandoFiltroGrupo  : aplicandoFiltroGrupo,
                aplicandoFiltroDt     : aplicandoFiltroDt,

                cass  : cass,
                zonas : zonas,
                gsus  : gsus,
                sucursalesUsuario : sucursalesUsuario,

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

    return true

}

export const SeleccionarCategoriaXZonaAcumuladaReducer = (scaid, limpiarCanales, catid) => async (dispatch, getState) => {

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


    // 

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    const aplicandoFiltroCanal = getState().sucursales.aplicandoFiltroCanal
    const aplicandoFiltroZona = getState().sucursales.aplicandoFiltroZona
    const aplicandoFiltroGrupo = getState().sucursales.aplicandoFiltroGrupo
    const aplicandoFiltroDt = getState().sucursales.aplicandoFiltroDt

    const cass = getState().sucursales.cass
    const zonas = getState().sucursales.zonas
    const gsus = getState().sucursales.gsus
    const sucursalesUsuario = getState().sucursales.sucursalesUsuario
    // 

    await fetch(config.api+'promociones/mostrar/promociones/promos-acumuladas',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken  : localStorage.getItem('usutoken'),
                catid   : catid,

                mes     : mesSeleccionadoFiltro,
                ano     : anioSeleccionadoFiltro,
                dia      : "01",

                aplicandoFiltroCanal  : aplicandoFiltroCanal,
                aplicandoFiltroZona   : aplicandoFiltroZona,
                aplicandoFiltroGrupo  : aplicandoFiltroGrupo,
                aplicandoFiltroDt     : aplicandoFiltroDt,

                cass  : cass,
                zonas : zonas,
                gsus  : gsus,
                sucursalesUsuario : sucursalesUsuario,
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
        console.log(error)
        dispatch({
            type: OBTENER_CANALES_DE_PROMOCIONES_FAIL,
            payload: []
        })
    });
}