import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_DATOS_USUARIOS,
    CARGANDO_TABLA_DATOS_USUARIOS,
    OBTENER_DATOS_PAISES,
    OBTENER_DATOS_TIPOS_USUARIOS,
    FILTRO_TIPO_USUARIOS_ADM_USUARIO,
    SELECCIONAR_TODO_FILTRO_TIPO_USUARIOS_ADM_USUARIO
} from '../../../../Constantes/Administrativo/Usuarios/Usuarios'

import {
    SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    SELECCIONAR_UNA_ZONA_DESCARGAR
} from "../../../../Constantes/Sucursales";

import { message } from 'antd'

export const dataUsuarios = (pagina) => async ( dispatch, getState ) => {

    let tiposUsuario = getState().usuarios.tiposUsuarios

    dispatch({
        type: CARGANDO_TABLA_DATOS_USUARIOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'usuarios/mostrar?page='+pagina,
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken: localStorage.getItem('usutoken'),
                re_tipoUsuario : tiposUsuario
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
                    type: OBTENER_DATOS_USUARIOS,
                    payload: {
                        datos: data.datos.data,
                        paginasTotales: data.datos.last_page,
                        paginaActual: data.datos.current_page,
                        indexRegistro: data.datos.from,
                        cargandoSpin: false ,
                        data_datos_adm_usuarios: data.datos
                    }
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const dataPaises = () => async ( dispatch, getState ) => {

    await fetch(config.api+'mostrar/pais',
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
            if(data){
                dispatch({
                    type: OBTENER_DATOS_PAISES,
                    payload: data.datos
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const dataTiposUsuarios = () => async ( dispatch, getState ) => {

    await fetch(config.api+'mostrar/tpus',
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
            if (data) {
                let tipoUsuario = data.datos
                 await tipoUsuario.map((tipo) => {
                    tipo['seleccionado'] = true
                })
                dispatch({
                    type: OBTENER_DATOS_TIPOS_USUARIOS,
                    payload: tipoUsuario
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const crearUsuario = (usuario) => async ( dispatch, getState ) => {

    let respuesta = false
    const sucursalesUsuario = getState().sucursales.sucursalesUsuario

    usuario.sucursales = sucursalesUsuario

    await fetch(config.api+'usuarios/crear',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(usuario),
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
                message.success(data.mensaje)
            }else{
                message.error(data.mensaje)
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    return respuesta
}

export const SeleccionarTodoFiltroTipoUsuario = (valor) => async (dispatch, getState) => {
    let tiposUsuario = getState().usuarios.tiposUsuarios

    await tiposUsuario.map((tipo, pos) => {
        tiposUsuario[pos]['seleccionado'] = valor
    })

    dispatch({
        type: FILTRO_TIPO_USUARIOS_ADM_USUARIO,
        payload : tiposUsuario
    })

    dispatch({
        type: SELECCIONAR_TODO_FILTRO_TIPO_USUARIOS_ADM_USUARIO,
        payload : valor
    })
}

export const SeleccionarFiltroTipoUsuario = (posicion, valor) => async (dispatch, getState) => {
    let tiposUsuario = getState().usuarios.tiposUsuarios

    tiposUsuario[posicion]['seleccionado'] = valor

    dispatch({
        type: FILTRO_TIPO_USUARIOS_ADM_USUARIO,
        payload: tiposUsuario
    })
}
// SELECCIONAR DISTRIBUIDORAS PARA CREAR UN USUARIO

export const SeleccionarTodoSucursalesCrearUsuarioReducer = (accion) => (dispatch, getState) => {

    let zonas = getState().sucursales.zonas
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario
  
    zonas.map((zona, pos) => {
      zonas[pos]['zonpromocioncrear'] = accion
    })
  
    sucursalesUsuario.map((sucursal, pos) => {
      sucursalesUsuario[pos]['sucpromocioncrear'] = accion
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

export const SeleccionarZonaCrearUsuarioReducer = (posicion, accion) => (dispatch, getState) => {
  
    let zonas = getState().sucursales.zonas
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario
  
    zonas[posicion]['zonpromocioncrear'] = accion
    
    sucursalesUsuario.map((sucursal, pos) => {
      if(sucursal.zonid == zonas[posicion]['zonid']){
        sucursalesUsuario[pos]['sucpromocioncrear'] = accion
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

export const SeleccionarSucursalCrearUsuarioReducer = (posicion, accion) => async (dispatch, getState) => {
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario
    sucursalesUsuario[posicion]['sucpromocioncrear'] = accion
    let zonidSelccionado = sucursalesUsuario[posicion]['zonid']
  
    let zonas = getState().sucursales.zonas
  
    let zonaMarcarSeleccionado = true
  
    await sucursalesUsuario.map((sucursal) => {
      if(sucursal.zonid == zonidSelccionado){
  
        if(sucursal.sucpromocioncrear){
          if(sucursal.sucpromocioncrear == false){
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
        zonas[pos]['zonpromocioncrear'] = zonaMarcarSeleccionado
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