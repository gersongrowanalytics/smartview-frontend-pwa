import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_PERMISOS_TIPO_USUARIO,
    OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS
} from '../../../../Constantes/Administrativo/TiposUsuarios/TiposUsuarios'
import {message} from "antd"

export const ObtenerPermisosTipoUsuario = (tpuid) => async ( dispatch, getState ) => {

    await fetch(config.api+'tipos-usuarios/permisos/mostrar',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                // 'api-token'	   : localStorage.getItem('usutoken'),
                "re_tpuid" : tpuid
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
	.then( async res => {
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
	})
	.then(async data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest == true){
            if(data.respuesta == true){
                let tipoPermiso = data.datos
                let tipoUsuario = data.tipo_usuario
                let estadoTipoUsuario
                if(tipoUsuario[0]['estid'] == '1'){
                    estadoTipoUsuario = 'Activo'
                }else{
                    estadoTipoUsuario = 'Inactivo'
                }
                await definirEstadoSwitchTipoPermiso(tipoPermiso)
                dispatch({
                    type: OBTENER_PERMISOS_TIPO_USUARIO,
                    payload: {
                        permisosTipoUsuario : data.datos,
                        tpuid : tpuid,
                        tpunombre : tipoUsuario[0]['tpunombre'],
                        tpuimagen : tipoUsuario[0]['tpuimagen'],
                        tpufechainicio : tipoUsuario[0]['tpufechainicio'],
                        tpufechafinal : tipoUsuario[0]['tpufechafinal'],
                        estid : estadoTipoUsuario
                    }
                })
            }else{
                message.error(data.mensaje)                
            }
		}
	}).catch((error)=> {
        console.log(error)
	});
}

export const cambiarEstadoAbiertoTiposPermisos = (posicion) => (dispatch,getState) => {
    let permisosTipoUsuario = getState().tiposUsuarios.permisosTipoUsuario
    permisosTipoUsuario[posicion]['abrir_opciones'] = !permisosTipoUsuario[posicion]['abrir_opciones']
    dispatch({
        type: OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS,
        payload: permisosTipoUsuario
    })

}

export const cambiarEstadoPermisos = (posicionPermiso, posicionTipoPermiso) => (dispatch, getState) => {
    let permisosTipoUsuario = getState().tiposUsuarios.permisosTipoUsuario
    permisosTipoUsuario[posicionTipoPermiso]['permisos'][posicionPermiso]['seleccionado'] = !permisosTipoUsuario[posicionTipoPermiso]['permisos'][posicionPermiso]['seleccionado']
    permisosTipoUsuario[posicionTipoPermiso]['seleccionar_tipoPermiso'] = true
    permisosTipoUsuario[posicionTipoPermiso]['permisos'].map((tipoPermiso) => {
        if (tipoPermiso['seleccionado'] == false) {
            permisosTipoUsuario[posicionTipoPermiso]['seleccionar_tipoPermiso'] = false
        }
    })
    dispatch({
        type: OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS,
        payload: permisosTipoUsuario
    })
}

export const editarPermisosTipoUsuario = (tipoUsuarioDatos, permisosTipoUsuario, tpuid, editarTipoUsuario, editarPermisos) => async (dispatch, getState) => {

    await fetch(config.api+'tipos-usuarios/permisos/editar',
		{
			mode:'cors',
			method: 'POST',
			body: JSON.stringify({
                "re_tpuid" : tpuid,
                "re_permisos" : permisosTipoUsuario,
                "re_datosTipoUsuario" : tipoUsuarioDatos,
                "re_editarPermisos" : editarPermisos,
                "re_editarTipoUsuario" : editarTipoUsuario
            }),
			headers: {
				'Accept' 	   : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken')
			}
		}
	)
	.then( async res => {
        if(await dispatch(estadoRequestReducer(res.status))){
            return res.json()
        }
	})
	.then(async data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest == true){
            if(data.respuesta == true){
                console.log(data)
                dispatch({
                    type: OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS,
                    payload: permisosTipoUsuario
                })
                message.success(data.mensaje) 
            }else{
                message.error(data.mensaje)                
            }
		}
	}).catch((error)=> {
        console.log(error)
	});
}

export const definirEstadoSwitchTipoPermiso = async (tipoPermiso) => {
    await tipoPermiso.map((tpe) => {
        tpe['abrir_opciones'] = false
        tpe['seleccionar_tipoPermiso'] = true
        tpe['permisos'].map((permiso) => {
            if (permiso['seleccionado'] == false) {
                return tpe['seleccionar_tipoPermiso'] = false
            }   
        });
    })
    return tipoPermiso
}

export const cambiarEstadoTipoPermiso = (estado, posicionTipoPermiso) => (dispatch, getState) => {
    let permisosTipoUsuario = getState().tiposUsuarios.permisosTipoUsuario
    if (estado == true) {
        permisosTipoUsuario[posicionTipoPermiso]['permisos'].map((permiso) => {
            permiso['seleccionado'] = true
        })
        permisosTipoUsuario[posicionTipoPermiso]['seleccionar_tipoPermiso'] = true
        
        dispatch({
            type: OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS,
            payload: permisosTipoUsuario
        })
    }else if(estado == false){
        permisosTipoUsuario[posicionTipoPermiso]['permisos'].map((permiso) => {
            permiso['seleccionado'] = false
        })
        permisosTipoUsuario[posicionTipoPermiso]['seleccionar_tipoPermiso'] = false

        dispatch({
            type: OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS,
            payload: permisosTipoUsuario
        })
    }
}
