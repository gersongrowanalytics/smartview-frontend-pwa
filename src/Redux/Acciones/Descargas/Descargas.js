import {
    MODULO_DESCARGA_SELECCIONADO,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA,
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR,
    OBTENER_DATA_DESCARGAR_EXCEL_PROMOCIONES_DESCARGAR,
    CARGANDO_BTN_EXCEL_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

function SortArray(x, y){
    if (x.orden < y.orden) {return -1;}
    if (x.orden > y.orden) {return 1;}
    return 0;
}

export const SeleccionarModuloDescargaReducer = (accion) => {
    return {
        type: MODULO_DESCARGA_SELECCIONADO,
        payload: accion
    }
}

export const AbrirAgrupacionColumnaFiltrosDescargarReducer = (posicion, accion) => async (dispatch, getState) => {

    const {
        agrupacion_columnas_filtros_descargar
    } = getState().descargas

    agrupacion_columnas_filtros_descargar[posicion]['abierto'] = accion

    dispatch({
        type: ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR,
        payload: agrupacion_columnas_filtros_descargar
    })
}

export const SeleccionarColumnaFiltroDescargaReducer = (posicion, accion) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar,
        columnas_seleccionadas_filtro_descarga
    } = getState().descargas

    

    if(accion == true){
        
        columnas_filtro_descargar[posicion]['seleccionado'] = accion

        columnas_seleccionadas_filtro_descarga.push({
            "agrupacion"    : columnas_filtro_descargar[posicion]['agrupacion'],
            "columna"       : columnas_filtro_descargar[posicion]['columna'],
            "seleccionado"  : true,
            "orden"         : parseFloat(columnas_seleccionadas_filtro_descarga.length)+1
        })
    }else{

        await columnas_filtro_descargar.map( async (columna, pos) => {
            if(columna.columna == columnas_seleccionadas_filtro_descarga[posicion]['columna']){
                columnas_filtro_descargar[pos]['seleccionado'] = accion
            }
        })

        columnas_seleccionadas_filtro_descarga.splice(posicion, 1)
    }
    

    columnas_seleccionadas_filtro_descarga = columnas_seleccionadas_filtro_descarga.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA,
        payload: {
            columnas : columnas_filtro_descargar,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga
        }
    })



}

export const SeleccionarTodoColumnasFiltroDescargarReducer = (accion) => (dispatch, getState) => {

    const {
        columnas_filtro_descargar,
        columnas_seleccionadas_filtro_descarga
    } = getState().descargas

    let nuevoArray = []

    columnas_filtro_descargar.map((columna, pos) => {
        columnas_filtro_descargar[pos]['seleccionado'] = accion
        if(accion == true){
            nuevoArray.push({
                "agrupacion"    : columna.agrupacion,
                "columna"       : columna.columna,
                "seleccionado"  : true,
                "orden"         : parseFloat(pos) + 1
            })
        }
    })

    dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA,
        payload: {
            columnas : columnas_filtro_descargar,
            columnasseleccionadas : nuevoArray
        }
    })

}

export const CambiarOrdenColumnasFiltroDescargaReducer = (nuevoorden, accion, pos) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar,
        columnas_seleccionadas_filtro_descarga
    } = getState().descargas

    await columnas_seleccionadas_filtro_descarga.map((columnas, posicion) => {

        if(columnas.orden == nuevoorden){

            if(accion == "SUBIR"){
                columnas_seleccionadas_filtro_descarga[posicion]['orden'] = parseFloat(nuevoorden) + 1
            }else{
                columnas_seleccionadas_filtro_descarga[posicion]['orden'] = parseFloat(nuevoorden) - 1
            }

        }

    })

    columnas_seleccionadas_filtro_descarga[pos]['orden'] = nuevoorden

    columnas_seleccionadas_filtro_descarga = columnas_seleccionadas_filtro_descarga.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA,
        payload: {
            columnas : columnas_filtro_descargar,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga
        }
    })


}

export const ObtenerDataDescargarExcelReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR,
        payload: true
    })
    
    const columnas_seleccionadas_filtro_descarga = getState().descargas.columnas_seleccionadas_filtro_descarga

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    localStorage.setItem('columnasfiltrodescargapromociones', JSON.stringify(columnas_seleccionadas_filtro_descarga))


    await fetch(config.api+'promociones/descargar/especificos',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                usutoken : localStorage.getItem('usutoken'),
                sucs     : sucursalesUsuario,
                columnas : columnas_seleccionadas_filtro_descarga
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
                
                let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.datos)

                dispatch({
                    type: OBTENER_DATA_DESCARGAR_EXCEL_PROMOCIONES_DESCARGAR,
                    payload: data_excel_descargar
                })
                
            }else{
                
            }
        }
    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR,
        payload: false
    })

    return true

}

export const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {

    await data_excel_descargar[0]['data'].map((dato, posicion) => {
        data_excel_descargar[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return data_excel_descargar
}

export const ArmarColumnasSeleccionadasDescargarPromocionesReducer = () => async (dispatch, getState) => {

    let arrColumnas = JSON.parse(localStorage.getItem('columnasfiltrodescargapromociones'))

    const {
        columnas_filtro_descargar,
        columnas_seleccionadas_filtro_descarga
    } = getState().descargas

    let nuevoArray = arrColumnas

    await columnas_filtro_descargar.map((columna, pos) => {

        arrColumnas.map((col) => {
            if(col.columna == columna.columna){
                columnas_filtro_descargar[pos]['seleccionado'] = true
            }
        })
    })

    dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA,
        payload: {
            columnas : columnas_filtro_descargar,
            columnasseleccionadas : nuevoArray
        }
    })

}
