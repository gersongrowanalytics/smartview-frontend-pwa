import {
    OBTENER_DATOS_USUARIO_LOGIN,
    MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN
} from "../../Constantes/ActionTypes";  
import config from '../../config'
import { estadoRequestReducer } from "./EstadoRequest"

export const AceptarCookiesReducer = () => (dispatch, getState) => {

    let datosUsuarioLogeado = getState().auth.datosUsuarioLogeado
  
    datosUsuarioLogeado.usuaceptoterminos = true
  
    dispatch({
      type: OBTENER_DATOS_USUARIO_LOGIN,
      payload: datosUsuarioLogeado
    })
  
    dispatch({
      type: MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN,
      payload: false
    })
  
    // const cookiesaceptadas = getState().settings.cookiesaceptadas
    // localStorage.setItem('cookiesaceptadas', "ACEPTADO")
    // dispatch({
    //   type: "ACEPTAR_COOKIES_CONFIGURACION",
    //   payload: !cookiesaceptadas
    // })
  
    dispatch(AceptarTerminosCondicionesReducer())
  
}
  
export const LeyendoCookiesReducer = (leyendo) => (dispatch, getState) => {
  
    dispatch({
      type: "LEYENDO_COOKIES_CONFIGURACION",
      payload: leyendo
    })
  
}

export const AceptarTerminosCondicionesReducer = () => async (dispatch, getState) => {

    await fetch(config.api+'aceptar-terminos-condiciones',
          {
              mode:'cors',
              method: 'POST',
              headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json',
                    'api-token'	   : localStorage.getItem('usutoken')
              }
      }
    )
    .then( async res => {
          await dispatch(estadoRequestReducer(res.status))
          return res.json()
    })
    .then(data => {
          const estadoRequest = getState().estadoRequest.init_request
          if(estadoRequest == true){
              if(data.respuesta == true){
  
                  
  
              }else{
                  
              }
          }
    }).catch((error)=> {
      console.log(error)
    });
  
}

export const ObtenerPermisosUsuarioReducer = () => async (dispatch, getState) => {

  	await fetch(config.api+'usuario/mostrar/permisos',
		{
			mode:'cors',
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-type' : 'application/json',
				'api-token'	   : localStorage.getItem('usutoken'),
				'api_token'	   : localStorage.getItem('usutoken')
			}
      	}
    )
    .then( async res => {
		await dispatch(estadoRequestReducer(res.status))
		return res.json()
    })
    .then(data => {
		const estadoRequest = getState().estadoRequest.init_request
		if(estadoRequest == true){
			if(data.respuesta == true){

				dispatch({
					type : "OBTENER_PERMISOS_USUARIO_CONFIGURACION",
					payload : data.datos
				})

			}else{
				
			}
		}
    }).catch((error)=> {
		console.log(error)
    });

}