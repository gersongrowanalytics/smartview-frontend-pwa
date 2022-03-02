import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_REPORTEPAGOS,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS,
    OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGOS_DESCARGAR,
    CARGANDO_BTN_EXCEL_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

function SortArray(x, y){
    if (x.orden < y.orden) {return -1;}
    if (x.orden > y.orden) {return 1;}
    return 0;
}

export const SeleccionarTodoColumnasFiltroDescargarReportePagosReducer = (accion) => (dispatch, getState) => {

    const {
        columnas_filtro_descargar_reportepagos
    } = getState().descargarRerportePagos

    let nuevoArray = []

    columnas_filtro_descargar_reportepagos.map((columna, pos) => {
        columnas_filtro_descargar_reportepagos[pos]['seleccionado'] = accion
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
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS,
        payload: {
            columnas : columnas_filtro_descargar_reportepagos,
            columnasseleccionadas : nuevoArray
        }
    })

}

export const AbrirAgrupacionColumnaFiltrosDescargarReportePagosReducer = (posicion, accion) => async (dispatch, getState) => {

    const {
        agrupacion_columnas_filtros_descargar_reportepagos
    } = getState().descargarRerportePagos

    agrupacion_columnas_filtros_descargar_reportepagos[posicion]['abierto'] = accion

    dispatch({
        type: ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_REPORTEPAGOS,
        payload: agrupacion_columnas_filtros_descargar_reportepagos
    })
}

export const SeleccionarColumnaFiltroDescargaReportePagosReducer = (posicion, accion) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_reportepagos,
        columnas_seleccionadas_filtro_descarga_reportepagos
    } = getState().descargarRerportePagos

    if(accion == true){
        
        columnas_filtro_descargar_reportepagos[posicion]['seleccionado'] = accion

        columnas_seleccionadas_filtro_descarga_reportepagos.push({
            "agrupacion"    : columnas_filtro_descargar_reportepagos[posicion]['agrupacion'],
            "columna"       : columnas_filtro_descargar_reportepagos[posicion]['columna'],
            "seleccionado"  : true,
            "orden"         : parseFloat(columnas_seleccionadas_filtro_descarga_reportepagos.length)+1
        })
    }else{

        await columnas_filtro_descargar_reportepagos.map( async (columna, pos) => {
            if(columna.columna == columnas_seleccionadas_filtro_descarga_reportepagos[posicion]['columna']){
                columnas_filtro_descargar_reportepagos[pos]['seleccionado'] = accion
            }
        })

        columnas_seleccionadas_filtro_descarga_reportepagos.splice(posicion, 1)
    }
    

    columnas_seleccionadas_filtro_descarga_reportepagos = columnas_seleccionadas_filtro_descarga_reportepagos.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS,
        payload: {
            columnas : columnas_filtro_descargar_reportepagos,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_reportepagos
        }
    })

}

export const CambiarOrdenColumnasFiltroDescargaReportePagosReducer = (nuevoorden, accion, pos) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_reportepagos,
        columnas_seleccionadas_filtro_descarga_reportepagos
    } = getState().descargarRerportePagos

    await columnas_seleccionadas_filtro_descarga_reportepagos.map((columnas, posicion) => {

        if(columnas.orden == nuevoorden){

            if(accion == "SUBIR"){
                columnas_seleccionadas_filtro_descarga_reportepagos[posicion]['orden'] = parseFloat(nuevoorden) + 1
            }else{
                columnas_seleccionadas_filtro_descarga_reportepagos[posicion]['orden'] = parseFloat(nuevoorden) - 1
            }

        }

    })

    columnas_seleccionadas_filtro_descarga_reportepagos[pos]['orden'] = nuevoorden

    columnas_seleccionadas_filtro_descarga_reportepagos = columnas_seleccionadas_filtro_descarga_reportepagos.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS,
        payload: {
            columnas : columnas_filtro_descargar_reportepagos,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_reportepagos
        }
    })


}

export const ObtenerDataDescargarExcelReportePagosReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR,
        payload: true
    })

    const columnas_seleccionadas_filtro_descarga_reportepagos = getState().descargarRerportePagos.columnas_seleccionadas_filtro_descarga_reportepagos

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    localStorage.setItem('columnasfiltrodescargareportepagos', JSON.stringify(columnas_seleccionadas_filtro_descarga_reportepagos))
    
    await fetch(config.api+'promociones/descargar/reporte-pagos-unicamente-fecha',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                usutoken : localStorage.getItem('usutoken'),
                sucs     : sucursalesUsuario,
                columnas : columnas_seleccionadas_filtro_descarga_reportepagos
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
                
                let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.datosReconocimiento)

                dispatch({
                    type: OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGOS_DESCARGAR,
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

    let arrColumnas = JSON.parse(localStorage.getItem('columnasfiltrodescargareportepagos'))

    const {
        columnas_filtro_descargar_reportepagos,
        columnas_seleccionadas_filtro_descarga_reportepagos
    } = getState().descargarRerportePagos

    let nuevoArray = arrColumnas

    await columnas_filtro_descargar_reportepagos.map((columna, pos) => {

        arrColumnas.map((col) => {
            if(col.columna == columna.columna){
                columnas_filtro_descargar_reportepagos[pos]['seleccionado'] = true
            }
        })
    })

    dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS,
        payload: {
            columnas : columnas_filtro_descargar_reportepagos,
            columnasseleccionadas : nuevoArray
        }
    })

}