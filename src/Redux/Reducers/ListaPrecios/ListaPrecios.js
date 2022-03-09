import {
    OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
    OBTENER_DATA_EXCEL_LISTA_PRECIOS,
    CARGANDO_TABLA_LISTA_PRECIOS,

    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_LISTA_PRECIOS,
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_LISTA_PRECIOS,
    OBTENER_DATA_DESCARGAR_EXCEL_LISTAPRECIOS_DESCARGAR,
    CARGANDO_BTN_EXCEL_DESCARGAR_LISTA_PRECIOS
} from '../../../Constantes/ListaPrecios/ListaPrecios'

const INIT_STATE = {
    grupos_disponibles_lista_precios : [],
    data_excel_lista_precios : [],
    data_tabla_lista_precios : [],
    cargando_datos_tabla_lista_precios : false,


    agrupacion_columnas_filtros_descargar_listaprecios : [
        {
            "agrupacion" : "fechas",
            "agrupacionHml": "Fecha LP",
            "abierto" : false
        },

        {
            "agrupacion" : "materiales",
            "agrupacionHml": "Materiales",
            "abierto" : false
        },

        {
            "agrupacion" : "metricas",
            "agrupacionHml": "Metricas",
            "abierto" : false
        },

        {
            "agrupacion" : "mayorista",
            "agrupacionHml": "Mayorista",
            "abierto" : false
        },

        {
            "agrupacion" : "minorista",
            "agrupacionHml": "Minorista",
            "abierto" : false
        },

        {
            "agrupacion" : "bodega",
            "agrupacionHml": "Bodega",
            "abierto" : false
        },
    ],

    columnas_filtro_descargar_listaprecios : [
        {
            "agrupacion" : "fechas",
            "columna" : "Año",
            "seleccionado" : false
        },

        {
            "agrupacion" : "fechas",
            "columna" : "Mes",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Categoría",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Subcategoría",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Código SAP",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "EAN",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Descripción de producto",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Und. Venta",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Precio Lista S/IGV",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "% Alza",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "SD/TPR",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Precio Lista C/IGV",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "mayorista",
            "columna"      : "MF Ruta Mayorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "mayorista",
            "columna"      : "Reventa Mayorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "mayorista",
            "columna"      : "Margen Mayorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "mayorista",
            "columna"      : "Marcaje Mayorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "minorista",
            "columna"      : "MF Ruta Minorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "minorista",
            "columna"      : "Reventa Minorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "minorista",
            "columna"      : "Margen Minorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "minorista",
            "columna"      : "Marcaje Minorista",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "bodega",
            "columna"      : "MF Ruta Horizontal",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "bodega",
            "columna"      : "Reventa Bodega",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "bodega",
            "columna"      : "Margen Bodega",
            "seleccionado" : false
        },

        {
            "agrupacion"   : "bodega",
            "columna"      : "PVP",
            "seleccionado" : false
        },

    ],

    columnas_seleccionadas_filtro_descarga_listaprecios : [],
    data_descargar_excel_listaprecios : [],
    cargando_btn_excel_listaprecios : false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_LISTA_PRECIOS:{
            return {
                ...state,
                agrupacion_columnas_filtros_descargar_listaprecios : action.payload
            }
        }
        case OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS: {
            return {
                ...state,
                grupos_disponibles_lista_precios: action.payload,
            }
        }
        case OBTENER_DATA_EXCEL_LISTA_PRECIOS: {
            return {
                ...state,
                data_excel_lista_precios: action.payload.excel,
                data_tabla_lista_precios: action.payload.tabla
            }
        }
        case CARGANDO_TABLA_LISTA_PRECIOS: {
            return {
                ...state,
                cargando_datos_tabla_lista_precios : action.payload
            }
        }
        case SELECCIONAR_COLUMNA_FILTRO_DESCARGA_LISTA_PRECIOS: {
            return {
                ...state,
                columnas_filtro_descargar_listaprecios : action.payload.columnas,
                columnas_seleccionadas_filtro_descarga_listaprecios : action.payload.columnasseleccionadas
            }
        }
        case OBTENER_DATA_DESCARGAR_EXCEL_LISTAPRECIOS_DESCARGAR: {
            return {
                ...state,
                data_descargar_excel_listaprecios : action.payload
            }
        }
        case CARGANDO_BTN_EXCEL_DESCARGAR_LISTA_PRECIOS: {
            return {
                ...state,
                cargando_btn_excel_listaprecios : action.payload
            }
        }
    default:
        return state;
    }
}
