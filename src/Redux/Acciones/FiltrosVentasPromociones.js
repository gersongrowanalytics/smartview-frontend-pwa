import {
    SELECCIONAR_CASS,
    SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    SELECCIONAR_UNA_ZONA_DESCARGAR,
    SELECCIONAR_UN_GRUPO_DESCARGAR,
    APLICANDO_FILTROS_CORRESPONDIENTES,
    CAMBIAR_APLICANDO_FILTRO_ACUMULADO
} from '../../Constantes/Sucursales'

export const SeleccionarFiltroCanalReducer = (posicion, estado) => async (dispatch, getState) => {

    let cass = getState().sucursales.cass
    let zonas = getState().sucursales.zonas
    let gsus = getState().sucursales.gsus
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    cass[posicion]['check'] = estado

    await zonas.map((zona, posZona) => {
        
        // if(zona.casid == cass[posicion]['casid']){
        //     zonas[posZona]['check'] = estado
        // }else{
        //     zonas[posZona]['check'] = false
        // }
        zonas[posZona]['check'] = false
    })

    await gsus.map((gsu, posGsu) => {

        // gsu.canales.map((gsucanal) => {
        //     if(gsucanal == cass[posicion]['casid']){
        //         gsus[posGsu]['check'] = estado
        //     }else{
        //         gsus[posGsu]['check'] = false
        //     }
        // })
        gsus[posGsu]['check'] = false
    })

    await sucursalesUsuario.map((suc, posSuc) => {

        // if(suc.casid == cass[posicion]['casid']){
        //     sucursalesUsuario[posSuc]['check'] = estado
        // }else{
        //     sucursalesUsuario[posSuc]['check'] = false
        // }
        sucursalesUsuario[posSuc]['check'] = false
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
        type: APLICANDO_FILTROS_CORRESPONDIENTES,
        payload : {
            aplicandoCanal : true,
            aplicandoZona  : false,
            aplicandoGrupo : false,
            aplicandoDt    : false,
        }
    })

}

export const SeleccionarFiltroZonaReducer = (posicion, estado) => async (dispatch, getState) => {

    let cass = getState().sucursales.cass
    let zonas = getState().sucursales.zonas
    let gsus = getState().sucursales.gsus
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    zonas[posicion]['check'] = estado

    await cass.map((cas, posCas) => {
        cass[posCas]['check'] = false
    })

    await gsus.map((gsu, posGsu) => {

        // gsu.zonas.map((gsuzona) => {
        //     if(gsuzona == zonas[posicion]['zonid']){
        //         gsus[posGsu]['check'] = estado
        //     }else{
        //         gsus[posGsu]['check'] = false
        //     }
        // })
        gsus[posGsu]['check'] = false
    })

    await sucursalesUsuario.map((suc, posSuc) => {
        // if(suc.zonid == zonas[posicion]['zonid']){
        //     sucursalesUsuario[posSuc]['check'] = estado
        // }else{
        //     sucursalesUsuario[posSuc]['check'] = false
        // }
        sucursalesUsuario[posSuc]['check'] = false
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
        type: APLICANDO_FILTROS_CORRESPONDIENTES,
        payload : {
            aplicandoCanal : false,
            aplicandoZona  : true,
            aplicandoGrupo : false,
            aplicandoDt    : false,
        }
    })

}

export const SeleccionarFiltroGrupoReducer = (posicion, estado) => async (dispatch, getState) => {

    let cass = getState().sucursales.cass
    let zonas = getState().sucursales.zonas
    let gsus = getState().sucursales.gsus
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    gsus[posicion]['check'] = estado

    await cass.map((zona, posCas) => {
        cass[posCas]['check'] = false
    })

    await zonas.map((gsu, posZon) => {
        zonas[posZon]['check'] = false
    })

    await sucursalesUsuario.map((suc, posSuc) => {
        if(suc.gsuid == gsus[posicion]['gsuid']){
            sucursalesUsuario[posSuc]['check'] = estado
        }else{
            // sucursalesUsuario[posSuc]['check'] = false
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
        type: APLICANDO_FILTROS_CORRESPONDIENTES,
        payload : {
            aplicandoCanal : false,
            aplicandoZona  : false,
            aplicandoGrupo : true,
            aplicandoDt    : false,
        }
    })

}

export const SeleccionarFiltroSucursalesReducer = (posicion, estado) => async (dispatch, getState) => {

    let cass = getState().sucursales.cass
    let zonas = getState().sucursales.zonas
    let gsus = getState().sucursales.gsus
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    sucursalesUsuario[posicion]['check'] = estado

    await cass.map((canal, posCas) => {
        cass[posCas]['check'] = false
    })

    await zonas.map((gsu, posZon) => {
        zonas[posZon]['check'] = false
    })

    await gsus.map((suc, posGsu) => {
        gsus[posGsu]['check'] = false
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
        type: APLICANDO_FILTROS_CORRESPONDIENTES,
        payload : {
            aplicandoCanal : false,
            aplicandoZona  : false,
            aplicandoGrupo : false,
            aplicandoDt    : true,
        }
    })
}

export const CambiarAplicandoFiltroAcumuladoReducer = () => (dispatch, getState) => {

    const aplicandoFiltroCanal = getState().sucursales.aplicandoFiltroCanal
    const aplicandoFiltroZona = getState().sucursales.aplicandoFiltroZona
    const aplicandoFiltroGrupo = getState().sucursales.aplicandoFiltroGrupo
    const aplicandoFiltroDt = getState().sucursales.aplicandoFiltroDt

    if(aplicandoFiltroCanal == true || aplicandoFiltroZona == true || aplicandoFiltroGrupo == true || aplicandoFiltroDt == true){
        dispatch({
            type: CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
            payload : true
        })
    }

}

export const EliminarFiltroAplicadoReducer = (posicion) => (dispatch, getState) => {

    let aplicandoFiltroAcumulado = getState().sucursales.aplicandoFiltroAcumulado
    
    if(aplicandoFiltroAcumulado == true){

        const aplicandoFiltroCanal = getState().sucursales.aplicandoFiltroCanal
        const aplicandoFiltroZona  = getState().sucursales.aplicandoFiltroZona
        const aplicandoFiltroGrupo = getState().sucursales.aplicandoFiltroGrupo
        const aplicandoFiltroDt    = getState().sucursales.aplicandoFiltroDt

        if(aplicandoFiltroCanal == true ){
            let cass = getState().sucursales.cass

            cass[posicion]['check'] = false

            dispatch({
                type: SELECCIONAR_CASS,
                payload : cass
            })

        }else if(aplicandoFiltroZona == true){

            let zonas = getState().sucursales.zonas
            zonas[posicion]['check'] = false

            dispatch({
                type: SELECCIONAR_UNA_ZONA_DESCARGAR,
                payload : zonas
            })

        }else if(aplicandoFiltroGrupo == true){

            let gsus = getState().sucursales.gsus
            gsus[posicion]['check'] = false 

            dispatch({
                type: SELECCIONAR_UN_GRUPO_DESCARGAR,
                payload : gsus
            })

        }else if(aplicandoFiltroDt == true){

            let sucursalesUsuario = getState().sucursales.sucursalesUsuario
            sucursalesUsuario[posicion]['check'] = false

            dispatch({
                type: SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
                payload : sucursalesUsuario
            })
        }


    }else{

    }
    
}