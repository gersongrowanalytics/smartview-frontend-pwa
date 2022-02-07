import config from '../../config'
import {
    OBTENER_SUCURSALES_USUARIO_EXITO,
    OBTENER_SUCURSALES_USUARIO_FAIL,
    FILTRO_SELECCIONAR_SUCURSAL_USUARIO,
    REINICIAR_SUCURSALES_USUARIO,
    OBTENER_SUCURSALES_USUARIO,
} from "../../Constantes/Sucursales";
import { estadoRequestReducer } from "./EstadoRequest"

export const obtenerSucursalesReducer = () =>async (dispatch, getState) => {
    await fetch(config.api+'usuario/mostrar/sucursales',
      {
        mode:'cors',
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Accept' : 'application/json',
          'Content-type' : 'application/json',
          'api_token': localStorage.getItem('usutoken'),
          'api-token': localStorage.getItem('usutoken'),
        }
      }
    )
    .then( async res => {
      await dispatch(estadoRequestReducer(res.status))
      return res.json()
    })
    .then(async data => {
      const estadoRequest = getState().estadoRequest.init_request
      if(estadoRequest == true){
        if(data.respuesta == true){
            dispatch({
                type: OBTENER_SUCURSALES_USUARIO_EXITO,
                payload: {
                  datos : data.datos,
                  zonas : data.zonas,
                  cass  : data.cass,
                  gsus  : data.gsus,
                }
            })
        }else{
            dispatch({
                type: OBTENER_SUCURSALES_USUARIO_FAIL,
                payload: {
                  datos : data.datos,
                  zonas : data.zonas,
                  cass  : data.cass,
                  gsus  : data.gsus,
                }
            })
        }
      }
    }).catch((error)=> {
        dispatch({
            type: OBTENER_SUCURSALES_USUARIO_FAIL,
            payload: {
              datos : [],
              zonas : [],
              cass  : [],
              gsus  : []
            }
        })
    });
}