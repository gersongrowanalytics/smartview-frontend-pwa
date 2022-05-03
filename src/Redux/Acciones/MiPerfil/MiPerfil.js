import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const EditarPerfilReducer = (datos) => async(dispatch, getState) => {
    
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
            if(data.respuesta == true){
                console.log('EDICION CORRECTA')
                localStorage.setItem('pernombre', datos.re_nombre)
                localStorage.setItem('perapellidopaterno', datos.re_apellidoPaterno)
                localStorage.setItem('perapellidomaterno', datos.re_apellidoMaterno)
                localStorage.setItem('usuusuario', datos.re_correo)
                localStorage.setItem('percelular', datos.re_telefono)
                localStorage.setItem('perdireccion', datos.re_direccion)
            }else{
                
            }
        }
    }).catch((error)=> {
        console.log("EditarPerfilReducer: "+error)
    });

}

// export const AgregarImagenPerfilReducer = (imagen) => async(dispatch, getState) => {

//     let datosUsuarios = getState().auth.datosUsuarioLogeado

//     await datosUsuarios.map((dato, pos) => {
//         datosUsuarios['imagenPrev'] = imagen
//     })

// }