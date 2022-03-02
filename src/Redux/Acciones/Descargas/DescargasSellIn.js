import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLIN,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN,
    OBTENER_DATA_DESCARGAR_EXCEL_SELLIN_DESCARGAR,
    CARGANDO_BTN_EXCEL_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

function SortArray(x, y){
    if (x.orden < y.orden) {return -1;}
    if (x.orden > y.orden) {return 1;}
    return 0;
}

export const SeleccionarTodoColumnasFiltroDescargarSellInReducer = (accion) => (dispatch, getState) => {

    const {
        columnas_filtro_descargar_sellin
    } = getState().descargasSellIn

    let nuevoArray = []

    columnas_filtro_descargar_sellin.map((columna, pos) => {
        columnas_filtro_descargar_sellin[pos]['seleccionado'] = accion
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
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN,
        payload: {
            columnas : columnas_filtro_descargar_sellin,
            columnasseleccionadas : nuevoArray
        }
    })

}

export const AbrirAgrupacionColumnaFiltrosDescargarSellInReducer = (posicion, accion) => async (dispatch, getState) => {

    const {
        agrupacion_columnas_filtros_descargar_sellin
    } = getState().descargasSellIn

    agrupacion_columnas_filtros_descargar_sellin[posicion]['abierto'] = accion

    dispatch({
        type: ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLIN,
        payload: agrupacion_columnas_filtros_descargar_sellin
    })
}

export const SeleccionarColumnaFiltroDescargaSellInReducer = (posicion, accion) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_sellin,
        columnas_seleccionadas_filtro_descarga_sellin
    } = getState().descargasSellIn

    if(accion == true){
        
        columnas_filtro_descargar_sellin[posicion]['seleccionado'] = accion

        columnas_seleccionadas_filtro_descarga_sellin.push({
            "agrupacion"    : columnas_filtro_descargar_sellin[posicion]['agrupacion'],
            "columna"       : columnas_filtro_descargar_sellin[posicion]['columna'],
            "seleccionado"  : true,
            "orden"         : parseFloat(columnas_seleccionadas_filtro_descarga_sellin.length)+1
        })
    }else{

        await columnas_filtro_descargar_sellin.map( async (columna, pos) => {
            if(columna.columna == columnas_seleccionadas_filtro_descarga_sellin[posicion]['columna']){
                columnas_filtro_descargar_sellin[pos]['seleccionado'] = accion
            }
        })

        columnas_seleccionadas_filtro_descarga_sellin.splice(posicion, 1)
    }
    

    columnas_seleccionadas_filtro_descarga_sellin = columnas_seleccionadas_filtro_descarga_sellin.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN,
        payload: {
            columnas : columnas_filtro_descargar_sellin,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_sellin
        }
    })

}

export const CambiarOrdenColumnasFiltroDescargaSellInReducer = (nuevoorden, accion, pos) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_sellin,
        columnas_seleccionadas_filtro_descarga_sellin
    } = getState().descargasSellIn

    await columnas_seleccionadas_filtro_descarga_sellin.map((columnas, posicion) => {

        if(columnas.orden == nuevoorden){

            if(accion == "SUBIR"){
                columnas_seleccionadas_filtro_descarga_sellin[posicion]['orden'] = parseFloat(nuevoorden) + 1
            }else{
                columnas_seleccionadas_filtro_descarga_sellin[posicion]['orden'] = parseFloat(nuevoorden) - 1
            }

        }

    })

    columnas_seleccionadas_filtro_descarga_sellin[pos]['orden'] = nuevoorden

    columnas_seleccionadas_filtro_descarga_sellin = columnas_seleccionadas_filtro_descarga_sellin.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN,
        payload: {
            columnas : columnas_filtro_descargar_sellin,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_sellin
        }
    })


}

export const ObtenerDataDescargarExcelSellInReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR,
        payload: true
    })

    const columnas_seleccionadas_filtro_descarga_sellin = getState().descargasSellIn.columnas_seleccionadas_filtro_descarga_sellin

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    localStorage.setItem('columnasfiltrodescargasellin', JSON.stringify(columnas_seleccionadas_filtro_descarga_sellin))
    

    await fetch(config.api+'ventas/descargar/especificos/si',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                usutoken : localStorage.getItem('usutoken'),
                sucs     : sucursalesUsuario,
                columnas : columnas_seleccionadas_filtro_descarga_sellin
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
                    type: OBTENER_DATA_DESCARGAR_EXCEL_SELLIN_DESCARGAR,
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

export const ArmarColumnasSeleccionadasDescargarSellInReducer = () => async (dispatch, getState) => {

    let arrColumnas = JSON.parse(localStorage.getItem('columnasfiltrodescargasellin'))

    const {
        columnas_filtro_descargar_sellin,
        columnas_seleccionadas_filtro_descarga
    } = getState().descargasSellIn

    let nuevoArray = arrColumnas

    await columnas_filtro_descargar_sellin.map((columna, pos) => {

        arrColumnas.map((col) => {
            if(col.columna == columna.columna){
                columnas_filtro_descargar_sellin[pos]['seleccionado'] = true
            }
        })
    })

    dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN,
        payload: {
            columnas : columnas_filtro_descargar_sellin,
            columnasseleccionadas : nuevoArray
        }
    })

}