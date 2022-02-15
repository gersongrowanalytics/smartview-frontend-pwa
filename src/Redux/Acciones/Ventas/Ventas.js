import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_VENTAS
} from '../../../Constantes/Ventas/Ventas'


export const ObtenerVentasReducer = () =>async (dispatch, getState) => {

    const idSucursalUsuarioSelec = getState().sucursales.idSucursalUsuarioSelec
    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    await fetch(config.api+'ventas/mostrar',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                sucid    : idSucursalUsuarioSelec,
                usutoken : localStorage.getItem('usutoken'),
            }),
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
                    type: OBTENER_VENTAS,
                    payload: data.datos
                })

            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}