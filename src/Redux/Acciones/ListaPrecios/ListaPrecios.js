import {
    OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
    OBTENER_DATA_EXCEL_LISTA_PRECIOS,
    CARGANDO_TABLA_LISTA_PRECIOS,

    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_LISTA_PRECIOS,
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_LISTA_PRECIOS,
    CARGANDO_BTN_EXCEL_DESCARGAR_LISTA_PRECIOS,
    OBTENER_DATA_FILTRO_LISTA_PRECIOS,
    OBTENER_DATA_CONFIGURACION_PAGINATE_DATA_LISTA_PRECIOS,
    ACTIVAR_DUPLICADOS_COMPLEJOS_LISTA_PRECIOS,

    FILTRO_CUSTOMER_GROUP_LISTA_PRECIOS,
    SELECCIONAR_TODO_FILTRO_GRUPO_LISTA_PRECIOS
} from '../../../Constantes/ListaPrecios/ListaPrecios'
import config from '../../../config'
import { estadoRequestReducer } from "../EstadoRequest"
import { ArmarFiltroLpReducer, EstadoSeleccionarTodoFiltrosReducer } from "./ArmarFiltrosLp"

function SortArray(x, y){
    if (x.orden < y.orden) {return -1;}
    if (x.orden > y.orden) {return 1;}
    return 0;
}

export const ObtenerGrupoDisponiblesReducer = () =>async (dispatch, getState) => {

    await fetch(config.api+'obtener-grupos-disponibles',
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
                'api-token': localStorage.getItem('usutoken'),
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
                type: OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
                payload : data.data
            })

            let grupos = data.data
            grupos[0]['seleccionadoFiltro'] = true

            dispatch({
                type: FILTRO_CUSTOMER_GROUP_LISTA_PRECIOS,
                payload : grupos
            })

            let grupoData = data.data

            if(grupoData.length > 0){

                dispatch(ObtenerDataExcelListaPreciosReducer(grupoData[0]['treid'], 0))
            }

        }
    }).catch((error)=> {
        console.log(error)
    });

    return true
}

export const ObtenerDataExcelListaPreciosReducer = (treid, posicion, numeropagina = 1, tresid = []) =>async (dispatch, getState) => {

    dispatch({
        type: CARGANDO_TABLA_LISTA_PRECIOS,
        payload: true
    })

    let grupos_disponibles_lista_precios = getState().listaPrecios.grupos_disponibles_lista_precios
    const duplicados_complejos_activados_lista_precios = getState().listaPrecios.duplicados_complejos_activados_lista_precios

    await grupos_disponibles_lista_precios.map((grupo, pos) => {
        if(pos == posicion){
            grupos_disponibles_lista_precios[pos]['cargando'] = true
            grupos_disponibles_lista_precios[pos]['seleccionado'] = true
        }else{
            grupos_disponibles_lista_precios[pos]['cargando'] = false
            grupos_disponibles_lista_precios[pos]['seleccionado'] = false
        }
    })

    dispatch({
        type: OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
        payload : grupos_disponibles_lista_precios
    })

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    let dataRpta = []

    await fetch(config.api+'exportar-excel-lista-precios?page='+numeropagina,
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
                anio     : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                treid    : treid,
                duplicados : duplicados_complejos_activados_lista_precios,
                tresid : tresid
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
        if(estadoRequest === true){

            let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.excel)

            dispatch({
                type: OBTENER_DATA_CONFIGURACION_PAGINATE_DATA_LISTA_PRECIOS,
                payload : data.data
            })

            await dispatch({
                type: OBTENER_DATA_EXCEL_LISTA_PRECIOS,
                payload : {
                    excel : data_excel_descargar,
                    tabla : data.data.data,
                }
            })

            dataRpta = data_excel_descargar

            await dispatch({
                type: OBTENER_DATA_FILTRO_LISTA_PRECIOS,
                payload : {
                    fil_dat_customer_group : data.arr_filtro_customer_group_lp,
                    fil_dat_categorias     : data.arr_filtro_categorias_lp,
                    fil_dat_subcategorias  : data.arr_filtro_subcategorias_lp,
                    fil_dat_formato        : data.arr_filtro_formato_lp,
                    fil_dat_codsap         : data.arr_filtro_codsap_lp,
                    fil_dat_material       : data.arr_filtro_materiales_lp
                }
            })

            dispatch(EstadoSeleccionarTodoFiltrosReducer())
        }

    }).catch((error)=> {
        console.log(error)
    });

    grupos_disponibles_lista_precios[posicion]['cargando'] = false

    dispatch({
        type: OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
        payload : grupos_disponibles_lista_precios
    })

    dispatch({
        type: CARGANDO_TABLA_LISTA_PRECIOS,
        payload: false
    })

    return dataRpta
}

export const LimpiarArrayDescargarExcelReducer = async (data_excel_descargar) => {

    await data_excel_descargar[0]['data'].map((dato, posicion) => {
        data_excel_descargar[0]['data'][posicion].map((dat) => {
        dat.value = dat.value == null ?"" :dat.value
      })
    })
  
    return data_excel_descargar
}

export const SeleccionarTodoColumnasFiltroDescargarListaPreciosReducer = (accion) => (dispatch, getState) => {

    const {
        columnas_filtro_descargar_listaprecios
    } = getState().listaPrecios

    let nuevoArray = []

    columnas_filtro_descargar_listaprecios.map((columna, pos) => {
        columnas_filtro_descargar_listaprecios[pos]['seleccionado'] = accion
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
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_LISTA_PRECIOS,
        payload: {
            columnas : columnas_filtro_descargar_listaprecios,
            columnasseleccionadas : nuevoArray
        }
    })

}

export const AbrirAgrupacionColumnaFiltrosListaPreciosReducer = (posicion, accion) => async (dispatch, getState) => {

    const {
        agrupacion_columnas_filtros_descargar_listaprecios
    } = getState().listaPrecios

    agrupacion_columnas_filtros_descargar_listaprecios[posicion]['abierto'] = accion

    dispatch({
        type: ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_LISTA_PRECIOS,
        payload: agrupacion_columnas_filtros_descargar_listaprecios
    })
}

export const SeleccionarColumnaFiltroListaPreciosReducer = (posicion, accion) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_listaprecios,
        columnas_seleccionadas_filtro_descarga_listaprecios
    } = getState().listaPrecios

    

    if(accion == true){
        
        columnas_filtro_descargar_listaprecios[posicion]['seleccionado'] = accion

        columnas_seleccionadas_filtro_descarga_listaprecios.push({
            "agrupacion"    : columnas_filtro_descargar_listaprecios[posicion]['agrupacion'],
            "columna"       : columnas_filtro_descargar_listaprecios[posicion]['columna'],
            "seleccionado"  : true,
            "orden"         : parseFloat(columnas_seleccionadas_filtro_descarga_listaprecios.length)+1
        })
    }else{

        await columnas_filtro_descargar_listaprecios.map( async (columna, pos) => {
            if(columna.columna == columnas_seleccionadas_filtro_descarga_listaprecios[posicion]['columna']){
                columnas_filtro_descargar_listaprecios[pos]['seleccionado'] = accion
            }
        })

        columnas_seleccionadas_filtro_descarga_listaprecios.splice(posicion, 1)
    }
    

    columnas_seleccionadas_filtro_descarga_listaprecios = columnas_seleccionadas_filtro_descarga_listaprecios.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_LISTA_PRECIOS,
        payload: {
            columnas : columnas_filtro_descargar_listaprecios,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_listaprecios
        }
    })



}

export const CambiarOrdenColumnasFiltroListaPreciosReducer = (nuevoorden, accion, pos) => async (dispatch, getState) => {

    let {
        columnas_filtro_descargar_listaprecios,
        columnas_seleccionadas_filtro_descarga_listaprecios
    } = getState().listaPrecios

    await columnas_seleccionadas_filtro_descarga_listaprecios.map((columnas, posicion) => {

        if(columnas.orden == nuevoorden){

            if(accion == "SUBIR"){
                columnas_seleccionadas_filtro_descarga_listaprecios[posicion]['orden'] = parseFloat(nuevoorden) + 1
            }else{
                columnas_seleccionadas_filtro_descarga_listaprecios[posicion]['orden'] = parseFloat(nuevoorden) - 1
            }

        }

    })

    columnas_seleccionadas_filtro_descarga_listaprecios[pos]['orden'] = nuevoorden

    columnas_seleccionadas_filtro_descarga_listaprecios = columnas_seleccionadas_filtro_descarga_listaprecios.sort(SortArray);

    await dispatch({
        type: SELECCIONAR_COLUMNA_FILTRO_DESCARGA_LISTA_PRECIOS,
        payload: {
            columnas : columnas_filtro_descargar_listaprecios,
            columnasseleccionadas : columnas_seleccionadas_filtro_descarga_listaprecios
        }
    })


}

export const ObtenerDataDescargarExcelReducer = () => async (dispatch, getState) => {

    
    
    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR_LISTA_PRECIOS,
        payload: true
    })

    let grupos_disponibles_lista_precios = getState().listaPrecios.grupos_disponibles_lista_precios
    let treidSelec = 0
    await grupos_disponibles_lista_precios.map((grupo, pos) => {
        if(grupo.seleccionado == true){
            treidSelec = grupo.treid
        }
    })


    let columnas_seleccionadas_filtro_descarga_listaprecios = getState().listaPrecios.columnas_seleccionadas_filtro_descarga_listaprecios

    const mesSeleccionadoFiltro = getState().fechas.mesSeleccionadoFiltro
    const anioSeleccionadoFiltro = getState().fechas.anioSeleccionadoFiltro

    let dataRpta = []

    await fetch(config.api+'exportar-excel-lista-precios',
        {
            mode:'cors',
            method: 'POST',
            body: JSON.stringify({
                usutoken : localStorage.getItem('usutoken'),
                anio     : anioSeleccionadoFiltro,
                dia      : "01",
                mes      : mesSeleccionadoFiltro,
                treid    : treidSelec,
                columnas : columnas_seleccionadas_filtro_descarga_listaprecios
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
        if(estadoRequest === true){

            let data_excel_descargar = await LimpiarArrayDescargarExcelReducer(data.excel)

            dispatch({
                type: OBTENER_DATA_EXCEL_LISTA_PRECIOS,
                payload : {
                    excel : data_excel_descargar,
                    tabla : data.data,

                }
            })

            dataRpta = data_excel_descargar
        }

    }).catch((error)=> {
        console.log(error)
    });

    dispatch({
        type: CARGANDO_BTN_EXCEL_DESCARGAR_LISTA_PRECIOS,
        payload: false
    })

    return dataRpta

}

export const ActivarDuplicadosComplejosListaPreciosReducer = () => async (dispatch, getState) => {

    const duplicados_complejos_activados_lista_precios = getState().listaPrecios.duplicados_complejos_activados_lista_precios
    const grupos_disponibles_lista_precios = getState().listaPrecios.grupos_disponibles_lista_precios

    dispatch({
        type: ACTIVAR_DUPLICADOS_COMPLEJOS_LISTA_PRECIOS,
        payload : !duplicados_complejos_activados_lista_precios
    })

    dispatch(ObtenerDataExcelListaPreciosReducer(grupos_disponibles_lista_precios[0]['treid'], 0))
    
}


export const SeleccionarGrupoCustomerFiltroListaPreciosReducer = (posicion, valor) => async (dispatch, getState) => {

    let fil_grupo_customer_lista_precios = getState().listaPrecios.fil_grupo_customer_lista_precios

    fil_grupo_customer_lista_precios[posicion]['seleccionadoFiltro'] = valor

    dispatch({
        type: FILTRO_CUSTOMER_GROUP_LISTA_PRECIOS,
        payload : fil_grupo_customer_lista_precios
    })

    dispatch(IdentificarSeleccionoTodoGrupoCustomerFiltroListaPreciosReducer())
}

export const SeleccionarTodoGrupoCustomerFiltroListaPreciosReducer = (valor) => async (dispatch, getState) => {

    let fil_grupo_customer_lista_precios = getState().listaPrecios.fil_grupo_customer_lista_precios

    await fil_grupo_customer_lista_precios.map((filtro, pos) => {
        fil_grupo_customer_lista_precios[pos]['seleccionadoFiltro'] = valor
    })

    dispatch({
        type: FILTRO_CUSTOMER_GROUP_LISTA_PRECIOS,
        payload : fil_grupo_customer_lista_precios
    })

    dispatch({
        type: SELECCIONAR_TODO_FILTRO_GRUPO_LISTA_PRECIOS,
        payload : valor
    })
}

export const IdentificarSeleccionoTodoGrupoCustomerFiltroListaPreciosReducer = () => async (dispatch, getState) => {

    let seleccionoTodo = true

    let fil_grupo_customer_lista_precios = getState().listaPrecios.fil_grupo_customer_lista_precios

    await fil_grupo_customer_lista_precios.map((filtro, pos) => {
        if(filtro.seleccionadoFiltro != true){
            seleccionoTodo = false
        }
    })

    dispatch({
        type: SELECCIONAR_TODO_FILTRO_GRUPO_LISTA_PRECIOS,
        payload : seleccionoTodo
    })

}