import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLOUT,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT,
    OBTENER_DATA_DESCARGAR_EXCEL_SELLOUT_DESCARGAR,
    CARGANDO_BTN_EXCEL_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"

function SortArray(x, y){
    if (x.orden < y.orden) {return -1;}
    if (x.orden > y.orden) {return 1;}
    return 0;
}

export const SeleccionarTodoColumnasFiltroDescargarSellOutReducer = (accion) => (dispatch, getState) => {

    const {
        columnas_filtro_descargar_sellout
    } = getState().descargarSellOut

    let nuevoArray = []

    columnas_filtro_descargar_sellout.map((columna, pos) => {
        columnas_filtro_descargar_sellout[pos]['seleccionado'] = accion
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
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT,
        payload: {
            columnas : columnas_filtro_descargar_sellout,
            columnasseleccionadas : nuevoArray
        }
    })

}

export const AbrirAgrupacionColumnaFiltrosDescargarSellOutReducer = (posicion, accion) => async (dispatch, getState) => {

    const {
        agrupacion_columnas_filtros_descargar_sellout
    } = getState().descargarSellOut

    agrupacion_columnas_filtros_descargar_sellout[posicion]['abierto'] = accion

    dispatch({
        type: ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLOUT,
        payload: agrupacion_columnas_filtros_descargar_sellout
    })
}

export const SeleccionarColumnaFiltroDescargaSellOutReducer = (posicion, accion) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_sellout,
        columnas_seleccionadas_filtro_descarga_sellout
    } = getState().descargarSellOut

    if(accion == true){
        
        columnas_filtro_descargar_sellout[posicion]['seleccionado'] = accion

        columnas_seleccionadas_filtro_descarga_sellout.push({
            "agrupacion"    : columnas_filtro_descargar_sellout[posicion]['agrupacion'],
            "columna"       : columnas_filtro_descargar_sellout[posicion]['columna'],
            "seleccionado"  : true,
            "orden"         : parseFloat(columnas_seleccionadas_filtro_descarga_sellout.length)+1
        })
    }else{

        await columnas_filtro_descargar_sellout.map( async (columna, pos) => {
            if(columna.columna == columnas_seleccionadas_filtro_descarga_sellout[posicion]['columna']){
                columnas_filtro_descargar_sellout[pos]['seleccionado'] = accion
            }
        })

        columnas_seleccionadas_filtro_descarga_sellout.splice(posicion, 1)
    }
    

    columnas_seleccionadas_filtro_descarga_sellout = columnas_seleccionadas_filtro_descarga_sellout.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT,
        payload: {
            columnas : columnas_filtro_descargar_sellout,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_sellout
        }
    })

}

export const CambiarOrdenColumnasFiltroDescargaSellOutReducer = (nuevoorden, accion, pos) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_sellout,
        columnas_seleccionadas_filtro_descarga_sellout
    } = getState().descargarSellOut

    await columnas_seleccionadas_filtro_descarga_sellout.map((columnas, posicion) => {

        if(columnas.orden == nuevoorden){

            if(accion == "SUBIR"){
                columnas_seleccionadas_filtro_descarga_sellout[posicion]['orden'] = parseFloat(nuevoorden) + 1
            }else{
                columnas_seleccionadas_filtro_descarga_sellout[posicion]['orden'] = parseFloat(nuevoorden) - 1
            }

        }

    })

    columnas_seleccionadas_filtro_descarga_sellout[pos]['orden'] = nuevoorden

    columnas_seleccionadas_filtro_descarga_sellout = columnas_seleccionadas_filtro_descarga_sellout.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT,
        payload: {
            columnas : columnas_filtro_descargar_sellout,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_sellout
        }
    })


}

export const ObtenerDataDescargarExcelSellOutReducer = () => async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR,
        payload: true
    })

    const columnas_seleccionadas_filtro_descarga_sellout = getState().descargarSellOut.columnas_seleccionadas_filtro_descarga_sellout

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro
    let sucursalesUsuario = getState().sucursales.sucursalesUsuario

    localStorage.setItem('columnasfiltrodescargasellout', JSON.stringify(columnas_seleccionadas_filtro_descarga_sellout))

    await fetch(config.api+'ventas/descargar/especificos/so',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                ano      : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                usutoken : localStorage.getItem('usutoken'),
                sucs     : sucursalesUsuario,
                columnas : columnas_seleccionadas_filtro_descarga_sellout
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
                    type: OBTENER_DATA_DESCARGAR_EXCEL_SELLOUT_DESCARGAR,
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

export const ArmarColumnasSeleccionadasDescargarSellOutReducer = () => async (dispatch, getState) => {

    let arrColumnas = JSON.parse(localStorage.getItem('columnasfiltrodescargasellout'))

    const {
        columnas_filtro_descargar_sellout,
        columnas_seleccionadas_filtro_descarga
    } = getState().descargarSellOut

    let nuevoArray = arrColumnas

    await columnas_filtro_descargar_sellout.map((columna, pos) => {

        arrColumnas.map((col) => {
            if(col.columna == columna.columna){
                columnas_filtro_descargar_sellout[pos]['seleccionado'] = true
            }
        })
    })

    dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT,
        payload: {
            columnas : columnas_filtro_descargar_sellout,
            columnasseleccionadas : nuevoArray
        }
    })

}