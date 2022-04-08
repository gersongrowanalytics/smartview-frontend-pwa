import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_PERMISOS_TIPO_USUARIO
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
	.then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest == true){
            console.log(data)
            if(data.respuesta == true){
                dispatch({
                    type: OBTENER_PERMISOS_TIPO_USUARIO,
                    payload: {
                        permisosTipoUsuario : data.datos,
                        tpuid : tpuid
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