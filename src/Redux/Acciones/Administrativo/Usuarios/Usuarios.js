import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_DATOS_USUARIOS,
    CARGANDO_TABLA_DATOS_USUARIOS
} from '../../../../Constantes/Administrativo/Usuarios/Usuarios'

export const dataUsuarios = (pagina) => async ( dispatch, getState ) => {

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
                    type: OBTENER_DATOS_USUARIOS,
                    payload: {
                        datos: data.datos.data,
                        paginasTotales: data.datos.last_page,
                        paginaActual: data.datos.current_page,
                        indexRegistro: data.datos.from,
                        cargandoSpin: false 
                    }
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}