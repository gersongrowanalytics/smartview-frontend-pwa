import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

export const EditarPerfilReducer = (datos) => async(dispatch, getState) => {

    await fetch(config.api+'',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Accept' 	   : 'application/json',
                'Content-type' : 'application/json'
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