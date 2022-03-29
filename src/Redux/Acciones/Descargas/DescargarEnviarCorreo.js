import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    CARGANDO_BTN_ENVIAR_CORREO_DESCARGA,
    NOMBRE_ARCHIVO_ENVIAR_CORREO_DESCARGA
} from '../../../Constantes/Descargas/Descargas'

export const EnviarCorreoDescargarReducer = (txtPara, txtAsunto, txtMensaje, infoDataCorreo, nombreArchivoCorreoExcel, tituloArchivoCorreoExcel) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_ENVIAR_CORREO_DESCARGA,
        payload: true
    })

    const modulo_descarga_seleccionado = getState().descargas.modulo_descarga_seleccionado
    
    let dataEnviar = {
        para    : txtPara,
        asunto  : txtAsunto,
        mensaje : txtMensaje,
        data    : infoDataCorreo,
        titulo  : tituloArchivoCorreoExcel,
        nombreexcel : nombreArchivoCorreoExcel
    }

    if(modulo_descarga_seleccionado == "Sell In"){
        
        const data_descargar_excel_sellin = getState().descargasSellIn.data_descargar_excel_sellin

        dataEnviar.data = data_descargar_excel_sellin

    }else if(modulo_descarga_seleccionado == "Sell Out"){

        const data_descargar_excel_sellout = getState().descargarSellOut.data_descargar_excel_sellout
        dataEnviar.data = data_descargar_excel_sellout

    }else if(modulo_descarga_seleccionado == "Rebate"){

        

    }else if(modulo_descarga_seleccionado == "Promociones"){

        const data_descargar_excel_promociones = getState().descargas.data_descargar_excel_promociones
        dataEnviar.data = data_descargar_excel_promociones

    }else if(modulo_descarga_seleccionado == "Reporte de pagos"){

        const data_descargar_excel_reportepagos = getState().descargarRerportePagos.data_descargar_excel_reportepagos
        dataEnviar.data = data_descargar_excel_reportepagos

    }else if(modulo_descarga_seleccionado == "Promociones Liquidadas"){

        const data_descargar_excel_promocionesliquidadas = getState().descargarPromocionesLiquidadas.data_descargar_excel_promocionesliquidadas
        dataEnviar.data = data_descargar_excel_promocionesliquidadas

    }else if(modulo_descarga_seleccionado == "Catalogo"){

    }

    await fetch(config.api+'descargas-enviar-correo',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify(dataEnviar),
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
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request

        if(estadoRequest === true){

            dispatch({
                type: NOMBRE_ARCHIVO_ENVIAR_CORREO_DESCARGA,
                payload: data.excel
            })
            
        }
        
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_BTN_ENVIAR_CORREO_DESCARGA,
        payload: false
    })


    return true
}

export const EnviarCorreoDescargarFormadoReducer = (
    txtPara, txtAsunto, txtMensaje, nombreExcel, espdf = false,

    titulo = "",
    columnas = [],


) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_ENVIAR_CORREO_DESCARGA,
        payload: true
    })

    let rpta = true

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    await fetch(config.api+'enviar-correo-adjunto',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                asunto : txtAsunto,
                destinatario : txtPara,
                mensaje : txtMensaje,
                excel : nombreExcel,
                espdf : espdf,

                titulo   : titulo,
                columnas : columnas,
                sucs     : sucursalesUsuario,
                anio     : anioSeleccionadoFiltro,
                mes      : mesSeleccionadoFiltro,
                dia      : "01",


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
    .then(data => {
        const estadoRequest = getState().estadoRequest.init_request

        if(estadoRequest === true){

            
        }else{
            rpta = false
        }
        
    }).catch((error)=> {
        console.log(error)
        rpta = false
    });

    dispatch({
        type: CARGANDO_BTN_ENVIAR_CORREO_DESCARGA,
        payload: false
    })


    return rpta
}

export const CambiarNombreArchivoAdjuntoEnvioCorreoReducer = (nuevonombre) => (dispatch, getState) => {
    dispatch({
        type: NOMBRE_ARCHIVO_ENVIAR_CORREO_DESCARGA,
        payload: nuevonombre
    })
}