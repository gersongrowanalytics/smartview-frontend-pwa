import React from 'react'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    OBTENER_DATOS_IMAGENES,
    OBTENER_DATOS_EDITANDO_SINIMAGENES,
    OBTENER_DATOS_EDITANDO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_SINIMAGENES,
    OBTENER_DATOS_SINIMAGENES,
    CARGANDO_TABLA_DATOS_IMAGENES,
    MOSTRAR_CARGANDO_EDITAR_REGISTRO
} from '../../../Constantes/BancoImagen/BancoImagen'

export const dataBancoImagen = () => async ( dispatch, getState ) => {

    dispatch({
        type: CARGANDO_TABLA_DATOS_IMAGENES,
        payload: true
    })

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
        console.log('DATA OBTENEDIA')
        console.log(data)
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data){

                console.log('NUEVA OBTENEDIA')
                let dataConImagenes =  data.prosConImagenes
                let dataSinImagen = data.prosSinImagenes
                // dataConImagenes
                console.log(dataConImagenes)
                console.log(dataSinImagen)
                // await dataConImagenes.map((imagenes, pos) => {
                //     dataConImagenes[pos]['mostrando'] = true
                //     dataConImagenes[pos]['imagenPrev'] = "0"
                // });
                await dataSinImagen.map((imagenes, pos) => {
                    dataSinImagen[pos]['mostrando'] = true
                    dataSinImagen[pos]['imagenPrev'] = "0"
                });
                dispatch({
                    type: OBTENER_DATOS_IMAGENES,
                    payload: {
                        ConImagenes: dataConImagenes,
                        SinImagenes: dataSinImagen,
                        Inactivos: data.prosVencidos,
                        cargandoTablaBancoImagen: false 
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
                if (prosSinImagenes[pos]['imagenPrev'] == '0') {
                    prosSinImagenes[pos]['editando'] = false
                }else{
                    prosSinImagenes[pos]['editando'] = true
                }
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
                if (prosConImagenes[pos]['imagenPrev'] == '0') {
                    prosConImagenes[pos]['editando'] = false
                }else{
                    prosConImagenes[pos]['editando'] = true
                }
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

export const BusquedaBancoImagenReducer = (filtro, urlImagen) => async (dispatch, getState) => {
    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if(urlImagen === "/"){
        await prosSinImagenes.map((imagenes, pos) => {
            if(imagenes.prosku && imagenes.pronombre){
                if((imagenes.prosku).indexOf(filtro)  >= 0 || (imagenes.pronombre).indexOf(filtro) >= 0){
                    prosSinImagenes[pos]['mostrando'] = true
                }else{
                    prosSinImagenes[pos]['mostrando'] = false
                }
            }
        })
        dispatch({
            type: OBTENER_DATOS_FILTRADO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes),
                cargandoRegistroEditar:  false
            }
        })
    }else{
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
                ConImagenes: JSON.stringify(prosConImagenes),
                cargandoRegistroEditar:  false
            }
        })
    }
    
}

export const OpcionesImagenPrevImagenReducer = (valor, posicion, urlImagen) => async (dispatch, getState) => {

    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if(urlImagen === "/"){
        await prosSinImagenes.map((imagenes, pos)=>{
            if (pos == posicion) {
                prosSinImagenes[pos]['imagenPrev'] = valor
            }
        })
        dispatch({
            type: OBTENER_DATOS_FILTRADO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes), 
                cargandoRegistroEditar:  false
            }
        })
    }else{
        await prosConImagenes.map((imagenes, pos)=>{
            if (pos == posicion) {
                prosConImagenes[pos]['imagenPrev'] = valor
            }
        })
        dispatch({
            type: OBTENER_DATOS_FILTRADO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes),
                cargandoRegistroEditar:  false 
            }
        })
    }
}

export const AgregarImagenBancoImagenReducer = (imagen, prosku, posicion, urlImagen) => async (dispatch, getState) => {
    
    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

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
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                if (urlImagen === "/") {
                    await prosSinImagenes.map((imagenes, pos)=>{
                        if (pos == posicion) {
                            prosSinImagenes[pos]['proimagen'] = imagen
                            prosSinImagenes[pos]['imagenPrev'] = "0"
                            prosSinImagenes[pos]['editando'] = false
                        }
                    })
                }else{
                    await prosConImagenes.map((imagenes, pos)=>{
                        if (pos == posicion) {
                            prosConImagenes[pos]['proimagen'] = imagen
                            prosConImagenes[pos]['imagenPrev'] = "0"
                            prosConImagenes[pos]['editando'] = false
                            prosConImagenes[pos]['cargandoSpin'] = false
                        }
                    })
                }
            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });
    if (urlImagen === "/") {
        dispatch({
            type: OBTENER_DATOS_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes), 
                cargandoRegistroEditar:  false
            }
        })
    }else{
        dispatch({
            type: OBTENER_DATOS_FILTRADO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes),
                cargandoRegistroEditar:  false
            }
        })
    }
    
}

export const CancelarEditarBancoImagenReducer = (posicion, urlImagen) => async (dispatch, getState) => {
    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if (urlImagen === "/") {
        await prosSinImagenes.map((imagenes, pos)=>{
            if (pos == posicion) {
                prosSinImagenes[pos]['imagenPrev'] = "0"
                prosSinImagenes[pos]['editando'] = false
            }
        })
    
        dispatch({
            type: OBTENER_DATOS_FILTRADO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes) 
            }
        })
    }else{
        await prosConImagenes.map((imagenes, pos)=>{
            if (pos == posicion) {
                prosConImagenes[pos]['imagenPrev'] = "0"
                prosConImagenes[pos]['editando'] = false
            }
        })
    
        dispatch({
            type: OBTENER_DATOS_FILTRADO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes) 
            }
        })
    }
}

export const CargandoEditarFilaBancoImagenReducer = (accion, posicion, urlImagen) => async(dispatch, getState) => {
    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if (urlImagen === "/") {
        await prosSinImagenes.map((imagenes, pos)=>{
            if (pos == posicion) {
                prosSinImagenes[pos]['cargandoSpin'] = true
            }else{
                prosSinImagenes[pos]['cargandoSpin'] = false
            }
        })
    }else{
        await prosConImagenes.map((imagenes, pos)=>{
            if (pos == posicion) {
                prosConImagenes[pos]['cargandoSpin'] = true
            }else{
                prosConImagenes[pos]['cargandoSpin'] = false
            }
        })
    }
    dispatch({
        type: MOSTRAR_CARGANDO_EDITAR_REGISTRO,
        payload: accion
    })
}

export const EditandoImagenNuevoBancoImagenesReducer = (tipo, posicion) => async (dispatch, getState) => {

    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if(tipo == "PENDIENTES"){
        prosSinImagenes[posicion]['editando'] = true

        dispatch({
            type: OBTENER_DATOS_EDITANDO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes) 
            }
        })
    }else if(tipo == "ACTIVOS"){

        prosConImagenes[posicion]['editando'] = true

        dispatch({
            type: OBTENER_DATOS_EDITANDO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes) 
            }
        })

    }

}


export const EditarImagenNuevoBancoImagenReducer = (
    tipo, imagen, prosku, posicion, fechas
) => async (dispatch, getState) => {
    
    let prosConImagenes = getState().bancoImagen.prosConImagenes
    let prosSinImagenes = getState().bancoImagen.prosSinImagenes

    if(tipo == "PENDIENTES"){

        prosSinImagenes[posicion]['cargandoEdicion'] = true

        dispatch({
            type: OBTENER_DATOS_EDITANDO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes) 
            }
        })

    }else if(tipo == "ACTIVOS"){

        prosConImagenes[posicion]['cargandoEdicion'] = true

        dispatch({
            type: OBTENER_DATOS_EDITANDO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes) 
            }
        })

    }

    await fetch(config.api+'control-promociones/asignar-imagen-producto',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken    : localStorage.getItem('usutoken'),
                req_imagen  : imagen,
                req_prosku  : prosku,
                req_fechas  : fechas
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
    .then( async data => {
        const estadoRequest = getState().estadoRequest.init_request
        if(estadoRequest == true){
            if(data.respuesta == true){
                
                dispatch(dataBancoImagen())

            }else{

            }
        }
    }).catch((error)=> {
        console.log(error)
    });



    if(tipo == "PENDIENTES"){

        prosSinImagenes.splice(posicion,1)

        dispatch({
            type: OBTENER_DATOS_EDITANDO_SINIMAGENES,
            payload: {
                SinImagenes: JSON.stringify(prosSinImagenes) 
            }
        })

    }else if(tipo == "ACTIVOS"){

        prosConImagenes[posicion]['cargandoEdicion'] = false

        dispatch({
            type: OBTENER_DATOS_EDITANDO_CONIMAGENES,
            payload: {
                ConImagenes: JSON.stringify(prosConImagenes) 
            }
        })

    }
    
    return true
    
}



