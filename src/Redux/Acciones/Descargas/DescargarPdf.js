import {
    obtenerPromocionesReducer,
    seleccionarCategoriaPdfReducer
} from '../Promociones/Promociones'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import {
    CARGANDO_BTN_EXCEL_DESCARGAR_PDF
} from '../../../Constantes/Descargas/Descargas'

export const DescargarPdfSucursalReducer = (refBtnPdf) => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR_PDF,
        payload : true
    })

    await dispatch(obtenerPromocionesReducer())

    let categoriasPromociones = getState().promociones.categoriasPromociones

    await categoriasPromociones.map( async (categoria, pos) => {
        categoriasPromociones[pos]['canales'] = await dispatch(seleccionarCategoriaPdfReducer(categoria.scaid))
    })

    console.log(categoriasPromociones)
    
    const idSucursalUsuarioSelec = getState().sucursales.idSucursalUsuarioSelec
    const gsuidSeleccionado = getState().sucursales.gsuidSeleccionado
    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    setTimeout(async function () {
        
        await fetch(config.api+'promociones/mostrar/pdf-generar',
            {
                mode:'cors',
                method: 'POST',
                body: JSON.stringify({
                    usutoken   : localStorage.getItem('usutoken'),
                    categorias : categoriasPromociones,
                    gsuid      : gsuidSeleccionado,
                    idsucursal : idSucursalUsuarioSelec,
                    dia        : "01",
                    mes        : mesSeleccionadoFiltro,
                    ano        : anioSeleccionadoFiltro,
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
                
            }
        }).catch((error)=> {
            
        });

    }, 1000);

    setTimeout(async function () {
        dispatch({
            type: CARGANDO_BTN_EXCEL_DESCARGAR_PDF,
            payload : false
        })
    }, 1000)

    setTimeout(async function () {
        refBtnPdf.current.click()
    }, 3000)


    return config.api+"/Sistema/Pdf/"+localStorage.getItem('usutoken')+".pdf"
}