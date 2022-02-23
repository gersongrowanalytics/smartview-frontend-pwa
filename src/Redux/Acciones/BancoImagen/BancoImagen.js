import React from 'react'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_IMAGENES,
    OBTENER_DATOS_EDITANDO_SINIMAGENES,
    OBTENER_DATOS_EDITANDO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_CONIMAGENES
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
                await (data.prosConImagenes).map((imagenes, pos) => {
                    data.prosConImagenes[pos]['mostrando'] = true
                    data.prosConImagenes[pos]['imagenPrev'] = "0"
                });
                await (data.prosSinImagenes).map((imagenes, pos) => {
                    data.prosSinImagenes[pos]['mostrando'] = true
                    data.prosConImagenes[pos]['imagenPrev'] = "0"
                });
                dispatch({
                    type: OBTENER_DATOS_IMAGENES,
                    payload: {
                        ConImagenes: JSON.stringify(data.prosConImagenes), 
                        SinImagenes: JSON.stringify(data.prosSinImagenes) 
                    }
                })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}


export const EditandoFilaBancoImagenesReducer = (posicion, urlImagen) => async (dispatch, getState) => {

    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if(urlImagen === "/"){
        await prosSinImagenes.map((imagenes, pos) => {
            if(pos == posicion){
                prosSinImagenes[pos]['editando'] = true
            }else{
                prosSinImagenes[pos]['editando'] = false
            }
        })
        dispatch({
            type: OBTENER_DATOS_EDITANDO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes) 
            }
        })
    }else{
        await prosConImagenes.map((imagenes, pos) => {
            if(pos == posicion){
                prosConImagenes[pos]['editando'] = true
            }else{
                prosConImagenes[pos]['editando'] = false
            }
        })
        dispatch({
            type: OBTENER_DATOS_EDITANDO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes) 
            }
        })
    }
}

export const BusquedaBancoImagenReducer = (filtro) => async (dispatch, getState) => {
    let prosConImagenes = getState().bancoImagen.prosConImagenes

    await prosConImagenes.map((imagenes, pos) => {

        if(imagenes.prosku && imagenes.pronombre){
            if((imagenes.prosku).indexOf(filtro)  >= 0 || (imagenes.pronombre).indexOf(filtro) >= 0){
                prosConImagenes[pos]['mostrando'] = true
            }else{
                prosConImagenes[pos]['mostrando'] = false
            }
        }
        
    })
    dispatch({
        type: OBTENER_DATOS_FILTRADO_CONIMAGENES,
        payload: {
            ConImagenes: JSON.stringify(prosConImagenes) 
        }
    })
}

export const AgregarImagenBancoImagenReducer = (imagen, prosku) => async (dispatch, getState) => {
    await fetch(config.api+'control-promociones/asignar-imagen-producto',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                // usutoken    : localStorage.getItem('usutoken'),
                req_imagen  : imagen,
                req_prosku  : prosku
            }),
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                // 'api_token': localStorage.getItem('usutoken'),
                // 'api-token': localStorage.getItem('usutoken'),
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
            if(data){
                // dispatch({
                //     type: OBTENER_DATOS_FILTRADO_CONIMAGENES,
                //     payload: {
                //         ConImagenes: JSON.stringify(data.prosConImagenes) 
                //     }
                // })
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
}

export const OpcionesImagenPrevImagenReducer = (valor, posicion) => async (dispatch, getState) => {
    let prosConImagenes = getState().bancoImagen.prosConImagenes
    await prosConImagenes.map((imagenes, pos)=>{
        if (pos == posicion) {
            prosConImagenes[pos]['imagenPrev'] = valor
        }
    })
    dispatch({
        type: OBTENER_DATOS_FILTRADO_CONIMAGENES,
        payload: {
            ConImagenes: JSON.stringify(prosConImagenes) 
        }
    })
}

