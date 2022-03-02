import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLOUT,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT,
    OBTENER_DATA_DESCARGAR_EXCEL_SELLOUT_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {

    agrupacion_columnas_filtros_descargar_sellout : [
        {
            "agrupacion" : "fechas",
            "agrupacionHml": "Fecha de Sell Out",
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

    columnas_filtro_descargar_sellout : [
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
            "columna" : "NIV",
            "seleccionado" : false
        },

    ],

    columnas_seleccionadas_filtro_descarga_sellout : [],

    data_descargar_excel_sellout : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_SELLOUT:{
            return {
                ...state,
                agrupacion_columnas_filtros_descargar_sellout : action.payload
            }
        }
        case SELECCIONAR_COLUMNA_FILTRO_DESCARGA_SELLOUT: {
            return {
                ...state,
                columnas_filtro_descargar_sellout : action.payload.columnas,
                columnas_seleccionadas_filtro_descarga_sellout : action.payload.columnasseleccionadas
            }
        }
        case OBTENER_DATA_DESCARGAR_EXCEL_SELLOUT_DESCARGAR: {
            return {
                ...state,
                data_descargar_excel_sellout : action.payload
            }
        }
        default:
            return state;
    }
}
