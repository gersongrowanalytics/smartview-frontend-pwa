import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_ELEMENTOS_ENVIADOS,
    CARGANDO_TABLA_DATOS_ELEMENTOS_ENVIADOS,
    OBTENER_DATOS_PAGINATE_ELEMENTOS_ENVIADOS
} from '../../../Constantes/ElementosEnviados/ElementosEnviados'

export const dataElementosEnviados = (pagina) => async ( dispatch, getState ) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_ELEMENTOS_ENVIADOS,
        payload: {
            cargandoSpin: true
        }
    })

    await fetch(config.api+'mostrar-elementos-enviados?page='+pagina,
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
                    type: OBTENER_DATOS_PAGINATE_ELEMENTOS_ENVIADOS,
                    payload : data.datos
                })

                dispatch({
                    type: OBTENER_DATOS_ELEMENTOS_ENVIADOS,
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