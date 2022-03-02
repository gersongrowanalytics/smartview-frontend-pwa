import config from '../../config'
import {
    OBTENER_SUCURSALES_USUARIO_EXITO,
    OBTENER_SUCURSALES_USUARIO_FAIL,
    FILTRO_SELECCIONAR_SUCURSAL_USUARIO,
    REINICIAR_SUCURSALES_USUARIO,
    OBTENER_SUCURSALES_USUARIO,
    SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    SELECCIONAR_UNA_ZONA_DESCARGAR,
    SELECCIONAR_UN_GRUPO_DESCARGAR,
    SELECCIONAR_UN_GSUID
} from "../../Constantes/Sucursales";
import { estadoRequestReducer } from "./EstadoRequest"

export const obtenerSucursalesReducer = () =>async (dispatch, getState) => {
    await fetch(config.api+'usuario/mostrar/sucursales',
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
                type: OBTENER_SUCURSALES_USUARIO_EXITO,
                payload: {
                  datos : data.datos,
                  zonas : data.zonas,
                  cass  : data.cass,
                  gsus  : data.gsus,
                }
            })
        }else{
            dispatch({
                type: OBTENER_SUCURSALES_USUARIO_FAIL,
                payload: {
                  datos : data.datos,
                  zonas : data.zonas,
                  cass  : data.cass,
                  gsus  : data.gsus,
                }
            })
        }
      }
    }).catch((error)=> {
        dispatch({
            type: OBTENER_SUCURSALES_USUARIO_FAIL,
            payload: {
              datos : [],
              zonas : [],
              cass  : [],
              gsus  : []
            }
        })
    });
}

export const SeleccionarSucursalReducer = (sucid) => async (dispatch, getState) => {
	
	dispatch({
		type: FILTRO_SELECCIONAR_SUCURSAL_USUARIO,
		payload : sucid
	})

}

export const SeleccionarSucursalDescargaReducer = (posicion, accion) => async (dispatch, getState) => {
  let sucursalesUsuario = getState().sucursales.sucursalesUsuario
  sucursalesUsuario[posicion]['sucpromociondescarga'] = accion
  let zonidSelccionado = sucursalesUsuario[posicion]['zonid']

  let zonas = getState().sucursales.zonas

  let zonaMarcarSeleccionado = true

  await sucursalesUsuario.map((sucursal) => {
    if(sucursal.zonid == zonidSelccionado){

      if(sucursal.sucpromociondescarga){
        if(sucursal.sucpromociondescarga == false){
          zonaMarcarSeleccionado = false
        }
      }else{
        zonaMarcarSeleccionado = false
      }
    }
  })

  if(accion == false){
    zonaMarcarSeleccionado = false
  }

  await zonas.map((zona, pos) => {
    if(zona.zonid == zonidSelccionado){
      zonas[pos]['zonpromociondescarga'] = zonaMarcarSeleccionado
    }
  })

  dispatch({
    type : SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    payload: sucursalesUsuario
  })

  dispatch({
    type : SELECCIONAR_UNA_ZONA_DESCARGAR,
    payload: zonas
  })
}

export const SeleccionarUnaSucursalDescargaReducer = (posicion, accion) => async (dispatch, getState) => {
  let sucursalesUsuario = getState().sucursales.sucursalesUsuario
  let gsus = getState().sucursales.gsus

  sucursalesUsuario.map((sucursal, pos) => {
    if(pos == posicion){
      sucursalesUsuario[pos]['sucpromociondescarga'] = true
    }else{
      sucursalesUsuario[pos]['sucpromociondescarga'] = false
    }
  })

  gsus.map((gsu, posGsu) => {
    gsus[posGsu]['gsupromociondescarga'] = false
  })
  

  dispatch({
    type : SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    payload: sucursalesUsuario
  })

  dispatch({
    type: SELECCIONAR_UN_GRUPO_DESCARGAR,
    payload : gsus
  })

  dispatch({
    type: FILTRO_SELECCIONAR_SUCURSAL_USUARIO,
    payload: sucursalesUsuario[posicion]['sucid']
  })

  dispatch({
    type: SELECCIONAR_UN_GSUID,
    payload : 0
  })
}

export const SeleccionarZonaDescargarReducer = (posicion, accion) => (dispatch, getState) => {
  
  let zonas = getState().sucursales.zonas
  let sucursalesUsuario = getState().sucursales.sucursalesUsuario

  zonas[posicion]['zonpromociondescarga'] = accion
  
  sucursalesUsuario.map((sucursal, pos) => {
    if(sucursal.zonid == zonas[posicion]['zonid']){
      sucursalesUsuario[pos]['sucpromociondescarga'] = accion
    }
  })
  
  dispatch({
    type : SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    payload: sucursalesUsuario
  })

  dispatch({
    type : SELECCIONAR_UNA_ZONA_DESCARGAR,
    payload: zonas
  })
}

export const SeleccionarTodoSucursalesDescargarReducer = (accion) => (dispatch, getState) => {

  let zonas = getState().sucursales.zonas
  let sucursalesUsuario = getState().sucursales.sucursalesUsuario

  zonas.map((zona, pos) => {
    zonas[pos]['zonpromociondescarga'] = accion
  })

  sucursalesUsuario.map((sucursal, pos) => {
    sucursalesUsuario[pos]['sucpromociondescarga'] = accion
  })

  dispatch({
    type : SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    payload: sucursalesUsuario
  })

  dispatch({
    type : SELECCIONAR_UNA_ZONA_DESCARGAR,
    payload: zonas
  })

}

export const SeleccionarSucursalesGrupoReduecer = (pos, accion) => async (dispatch, getState) => {

  let zonas = getState().sucursales.zonas
  let sucursalesUsuario = getState().sucursales.sucursalesUsuario
  let gsus = getState().sucursales.gsus

  let gsuidSeleccionado = gsus[pos]['gsuid']

  await sucursalesUsuario.map((sucursal, posicion) => {
    if(sucursal.gsuid == gsuidSeleccionado){
      sucursalesUsuario[posicion]['sucpromociondescarga'] = accion
    }
  })

  await zonas.map( async (zona, posZona) => {
    
    let zonaMarcarSeleccionado = true

    await sucursalesUsuario.map((sucursal) => {
      if(sucursal.zonid == zona.zonid){
  
        if(sucursal.sucpromociondescarga){
          if(sucursal.sucpromociondescarga == false){
            zonaMarcarSeleccionado = false
          }
        }else{
          zonaMarcarSeleccionado = false
        }
      }
    })

    if(accion == false){
      zonaMarcarSeleccionado = false
    }
  
    zonas[posZona]['zonpromociondescarga'] = zonaMarcarSeleccionado

  })

  dispatch({
    type : SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    payload: sucursalesUsuario
  })

  dispatch({
    type : SELECCIONAR_UNA_ZONA_DESCARGAR,
    payload: zonas
  })

  gsus[pos]['gsupromociondescarga'] = accion

  dispatch({
    type: SELECCIONAR_UN_GRUPO_DESCARGAR,
    payload : gsus
  })
}

export const SeleccionarUnaSucursalesGrupoReduecer = (pos, accion) => async (dispatch, getState) => {

  let sucursalesUsuario = getState().sucursales.sucursalesUsuario
  let gsus = getState().sucursales.gsus

  let gsuidSeleccionado = gsus[pos]['gsuid']

  await sucursalesUsuario.map((sucursal, posicion) => {
    if(sucursal.gsuid == gsuidSeleccionado){
      sucursalesUsuario[posicion]['sucpromociondescarga'] = true
    }else{
      sucursalesUsuario[posicion]['sucpromociondescarga'] = false
    }
  })

  gsus.map((gsu, posGsu) => {
    if(posGsu == pos){
      gsus[posGsu]['gsupromociondescarga'] = true
    }else{
      gsus[posGsu]['gsupromociondescarga'] = false
    }
  })

  dispatch({
    type : SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    payload: sucursalesUsuario
  })

  dispatch({
    type: SELECCIONAR_UN_GRUPO_DESCARGAR,
    payload : gsus
  })

  dispatch({
    type: SELECCIONAR_UN_GSUID,
    payload : gsuidSeleccionado
  })

}

export const SeleccionarTodosGruposReducer = (accion) => (dispatch, getState) => {

  let gsus = getState().sucursales.gsus

  gsus.map((gsu, pos) => {
    dispatch(SeleccionarSucursalesGrupoReduecer(pos, accion))
  })

}