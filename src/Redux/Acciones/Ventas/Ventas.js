import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_VENTAS,
    OBTENER_DATA_REBATE_BONUS_VENTAS
} from '../../../Constantes/Ventas/Ventas'
import {
    APLICANDO_FILTROS_CORRESPONDIENTES,
    CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
    SELECCIONAR_CASS,
    SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    SELECCIONAR_UNA_ZONA_DESCARGAR,
    SELECCIONAR_UN_GRUPO_DESCARGAR
} from '../../../Constantes/Sucursales'

export const ObtenerVentasReducer = () =>async (dispatch, getState) => {

    const idSucursalUsuarioSelec = getState().sucursales.idSucursalUsuarioSelec
    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    await fetch(config.api+'ventas/mostrar',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                sucid    : idSucursalUsuarioSelec,
                usutoken : localStorage.getItem('usutoken'),
                mostrarTodasCategorias : true
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
                    type: OBTENER_VENTAS,
                    payload: data.datos
                })

                dispatch({
                    type: OBTENER_DATA_REBATE_BONUS_VENTAS,
                    payload: data.rebatebonus
                })


            }else{
                
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

}

export const ObtenerVentasAcumuladaReducer = (eliminandoFiltro = false) => async (dispatch, getState) => {

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
    
    await fetch(config.api+'ventas/mostrar/acumulado',
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
                mostrarTodasCategorias : true
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
                    type: OBTENER_VENTAS,
                    payload: data.datos
                })

            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    if(eliminandoFiltro == true){
        let aplicantoFiltro = true
        let numeroAplicandoFiltro = 0

        await sucursalesUsuario.map((sucursal) => {
            if(sucursal.check == true){
                // aplicantoFiltro = true
                numeroAplicandoFiltro = numeroAplicandoFiltro + 1
            }
        })

        if(numeroAplicandoFiltro <= 1){
            aplicantoFiltro = false
        }

        dispatch({
            type: CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
            payload : aplicantoFiltro
        })
    }

    dispatch({
        type: "CARGANDO_TODA_PLATAFORMA_CONFIGURACION",
        payload : false
    })
    
    // dispatch({
    //     type: CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
    //     payload : false
    // })
    

}