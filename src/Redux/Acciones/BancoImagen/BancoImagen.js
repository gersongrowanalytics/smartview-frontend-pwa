import React from 'react'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_IMAGENES
} from '../../../Constantes/BancoImagen/BancoImagen'

export const dataBancoImagen = () => async ( dispatch, getState ) => {
    await fetch(config.api+'control-promociones/mostrar-productos',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
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
            dispatch({
                type: OBTENER_DATOS_IMAGENES,
                payload: {
                    ConImagenes: JSON.stringify(data.prosConImagenes), 
                    SinImagenes: JSON.stringify(data.prosSinImagenes) 
                }
            })
        }
    }).catch((error)=> {
        
    });
}
