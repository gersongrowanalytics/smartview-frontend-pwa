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
                let tpunombre
                let tpuimagen
                let tpufechainicio
                let tpufechafinal
                let estid
                await tipoPermiso.map((tpe) => {
                    tpe['abrir_opciones'] = false
                })
                await tipoUsuario.map((tu) => {
                    tpunombre = tu.tpunombre
                    tpuimagen = tu.tpuimagen
                    tpufechainicio = tu.tpufechainicio
                    tpufechafinal = tu.tpufechafinal
                    estid = tu.estid
                })
                dispatch({
                    type: OBTENER_PERMISOS_TIPO_USUARIO,
                    payload: {
                        permisosTipoUsuario : data.datos,
                        tpuid : tpuid,
                        tpunombre : tpunombre,
                        tpuimagen : tpuimagen,
                        tpufechainicio : tpufechainicio,
                        tpufechafinal : tpufechafinal,
                        estid : estid
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