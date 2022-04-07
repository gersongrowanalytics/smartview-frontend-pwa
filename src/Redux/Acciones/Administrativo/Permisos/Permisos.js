import config from '../../../../config'
import { estadoRequestReducer } from "../../EstadoRequest"
import {
    OBTENER_DATOS_PERMISOS,
    CARGANDO_TABLA_DATOS_PERMISOS,
} from '../../../../Constantes/Administrativo/Permisos/Permisos'

export const dataPermisos = (pagina) => async ( dispatch, getState ) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_PERMISOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'permisos/mostrar?page='+pagina,
        {
            mode:'cors',
            method: 'GET',
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
                dispatch({
                    type: OBTENER_DATOS_PERMISOS,
                    payload: {
                        datos: data.permisos.data,
                        paginasTotales: data.permisos.last_page,
                        paginaActual: data.permisos.current_page,
                        indexRegistro: data.permisos.from,
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