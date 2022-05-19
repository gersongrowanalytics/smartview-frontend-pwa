import config from '../../../config'
import {
    CARGANDO_BTN_EDITAR_PERFIL
} from '../../../Constantes/MiPerfil/MiPerfil'
import { estadoRequestReducer } from "../EstadoRequest"

export const EditarPerfilReducer = (datos) => async (dispatch, getState) => {
    
    let respuesta = false

    dispatch({
        type: CARGANDO_BTN_EDITAR_PERFIL,
        payload: true
    })

    await fetch(config.api+'perfil/editar',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Accept' 	   : 'application/json',
                'Content-type' : 'application/json',
                'api_token': localStorage.getItem('usutoken'),
                'api-token': localStorage.getItem('usutoken')
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
            if (data.respuesta == true) {
                respuesta = true
                localStorage.setItem('pernombre', datos.re_nombre)
                localStorage.setItem('perapellidopaterno', datos.re_apellidoPaterno)
                localStorage.setItem('perapellidomaterno', datos.re_apellidoMaterno)
                localStorage.setItem('usuusuario', datos.re_correo)
                localStorage.setItem('percelular', datos.re_telefono)
                localStorage.setItem('perdireccion', datos.re_direccion)
                localStorage.setItem('usuimagen', datos.re_imagen)
                
                dispatch({
                    type: CARGANDO_BTN_EDITAR_PERFIL,
                    payload: false
                })
            }else{
                console.log('Error', data.mensaje)
            }
        }
    }).catch((error)=> {
        console.log("EditarPerfilReducer: "+error)
    });
    return respuesta
}

// export const AgregarImagenPerfilReducer = (imagen) => async(dispatch, getState) => {

//     let datosUsuarios = getState().auth.datosUsuarioLogeado

//     await datosUsuarios.map((dato, pos) => {
//         datosUsuarios['imagenPrev'] = imagen
//     })

// }