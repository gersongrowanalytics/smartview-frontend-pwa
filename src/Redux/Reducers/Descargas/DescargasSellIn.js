import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLIN,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN,
    OBTENER_DATA_DESCARGAR_EXCEL_SELLIN_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {

    agrupacion_columnas_filtros_descargar_sellin : [
        {
            "agrupacion" : "fechas",
            "agrupacionHml": "Fecha de Sell In",
            "abierto" : false
        },

        {
            "agrupacion" : "cliente",
            "agrupacionHml": "Cliente",
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
    ],

    columnas_filtro_descargar_sellin : [
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
            "agrupacion" : "cliente",
            "columna" : "Región",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "Zona",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "Grupo",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "Sold To",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "Cliente Hml",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Categoría",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Sku",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Producto",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Cuota",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Real",
            "seleccionado" : false
        },

    ],

    columnas_seleccionadas_filtro_descarga_sellin : [],

    data_descargar_excel_sellin : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLIN:{
            return {
                ...state,
                agrupacion_columnas_filtros_descargar_sellin : action.payload
            }
        }
        case SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLIN: {
            return {
                ...state,
                columnas_filtro_descargar_sellin : action.payload.columnas,
                columnas_seleccionadas_filtro_descarga_sellin : action.payload.columnasseleccionadas
            }
        }
        case OBTENER_DATA_DESCARGAR_EXCEL_SELLIN_DESCARGAR: {
            return {
                ...state,
                data_descargar_excel_sellin : action.payload
            }
        }
        default:
            return state;
    }
}
