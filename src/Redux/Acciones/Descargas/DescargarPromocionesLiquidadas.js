import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_PROMOCIONES_LIQUIDADAS,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS,
    OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGPROMOCIONES_LIQUIDADAS,
    CARGANDO_BTN_EXCEL_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

function SortArray(x, y){
    if (x.orden < y.orden) {return -1;}
    if (x.orden > y.orden) {return 1;}
    return 0;
}


export const SeleccionarTodoColumnasFiltroDescargarPromocionesLiquidadasReducer = (accion) => (dispatch, getState) => {

    const {
        columnas_filtro_descargar_promocionesliquidadas
    } = getState().descargarPromocionesLiquidadas

    let nuevoArray = []

    columnas_filtro_descargar_promocionesliquidadas.map((columna, pos) => {
        columnas_filtro_descargar_promocionesliquidadas[pos]['seleccionado'] = accion
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
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS,
        payload: {
            columnas : columnas_filtro_descargar_promocionesliquidadas,
            columnasseleccionadas : nuevoArray
        }
    })

}

export const AbrirAgrupacionColumnaFiltrosDescargarPromocionesLiquidadasReducer = (posicion, accion) => async (dispatch, getState) => {

    const {
        agrupacion_columnas_filtros_descargar_promocionesliquidadas
    } = getState().descargarPromocionesLiquidadas

    agrupacion_columnas_filtros_descargar_promocionesliquidadas[posicion]['abierto'] = accion

    dispatch({
        type: ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_PROMOCIONES_LIQUIDADAS,
        payload: agrupacion_columnas_filtros_descargar_promocionesliquidadas
    })
}

export const SeleccionarColumnaFiltroDescargaPromocionesLiquidadasReducer = (posicion, accion) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_promocionesliquidadas,
        columnas_seleccionadas_filtro_descarga_promocionesliquidadas
    } = getState().descargarPromocionesLiquidadas

    if(accion == true){
        
        columnas_filtro_descargar_promocionesliquidadas[posicion]['seleccionado'] = accion

        columnas_seleccionadas_filtro_descarga_promocionesliquidadas.push({
            "agrupacion"    : columnas_filtro_descargar_promocionesliquidadas[posicion]['agrupacion'],
            "columna"       : columnas_filtro_descargar_promocionesliquidadas[posicion]['columna'],
            "seleccionado"  : true,
            "orden"         : parseFloat(columnas_seleccionadas_filtro_descarga_promocionesliquidadas.length)+1
        })
    }else{

        await columnas_filtro_descargar_promocionesliquidadas.map( async (columna, pos) => {
            if(columna.columna == columnas_seleccionadas_filtro_descarga_promocionesliquidadas[posicion]['columna']){
                columnas_filtro_descargar_promocionesliquidadas[pos]['seleccionado'] = accion
            }
        })

        columnas_seleccionadas_filtro_descarga_promocionesliquidadas.splice(posicion, 1)
    }
    

    columnas_seleccionadas_filtro_descarga_promocionesliquidadas = columnas_seleccionadas_filtro_descarga_promocionesliquidadas.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS,
        payload: {
            columnas : columnas_filtro_descargar_promocionesliquidadas,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_promocionesliquidadas
        }
    })

}

export const CambiarOrdenColumnasFiltroDescargaPromocionesLiquidadasReducer = (nuevoorden, accion, pos) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_promocionesliquidadas,
        columnas_seleccionadas_filtro_descarga_promocionesliquidadas
    } = getState().descargarPromocionesLiquidadas

    await columnas_seleccionadas_filtro_descarga_promocionesliquidadas.map((columnas, posicion) => {

        if(columnas.orden == nuevoorden){

            if(accion == "SUBIR"){
                columnas_seleccionadas_filtro_descarga_promocionesliquidadas[posicion]['orden'] = parseFloat(nuevoorden) + 1
            }else{
                columnas_seleccionadas_filtro_descarga_promocionesliquidadas[posicion]['orden'] = parseFloat(nuevoorden) - 1
            }

        }

    })

    columnas_seleccionadas_filtro_descarga_promocionesliquidadas[pos]['orden'] = nuevoorden

    columnas_seleccionadas_filtro_descarga_promocionesliquidadas = columnas_seleccionadas_filtro_descarga_promocionesliquidadas.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS,
        payload: {
            columnas : columnas_filtro_descargar_promocionesliquidadas,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_promocionesliquidadas
        }
    })


}

export const ObtenerDataDescargarExcelPromocionesLiquidadasReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR,
        payload: true
    })

    const columnas_seleccionadas_filtro_descarga_promocionesliquidadas = getState().descargarPromocionesLiquidadas.columnas_seleccionadas_filtro_descarga_promocionesliquidadas

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    localStorage.setItem('columnasfiltrodescargapromocionesliquidadas', JSON.stringify(columnas_seleccionadas_filtro_descarga_promocionesliquidadas))
    
    await fetch(config.api+'promociones/descargar/reporte-promociones-liquidadas-fecha',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                usutoken : localStorage.getItem('usutoken'),
                sucs     : sucursalesUsuario,
                columnas : columnas_seleccionadas_filtro_descarga_promocionesliquidadas
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
                
                let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.datosPromociones)

                dispatch({
                    type: OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGPROMOCIONES_LIQUIDADAS,
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

export const ArmarColumnasSeleccionadasDescargarReportePagosReducer = () => async (dispatch, getState) => {

    let arrColumnas = JSON.parse(localStorage.getItem('columnasfiltrodescargapromocionesliquidadas'))

    const {
        columnas_filtro_descargar_promocionesliquidadas,
        columnas_seleccionadas_filtro_descarga_promocionesliquidadas
    } = getState().descargarPromocionesLiquidadas

    let nuevoArray = arrColumnas

    await columnas_filtro_descargar_promocionesliquidadas.map((columna, pos) => {

        arrColumnas.map((col) => {
            if(col.columna == columna.columna){
                columnas_filtro_descargar_promocionesliquidadas[pos]['seleccionado'] = true
            }
        })
    })

    dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS,
        payload: {
            columnas : columnas_filtro_descargar_promocionesliquidadas,
            columnasseleccionadas : nuevoArray
        }
    })

}