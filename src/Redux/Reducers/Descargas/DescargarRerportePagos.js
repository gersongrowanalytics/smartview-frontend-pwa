import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_REPORTEPAGOS,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS,
    OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGOS_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {

    agrupacion_columnas_filtros_descargar_reportepagos : [
        {
            "agrupacion" : "fechas",
            "agrupacionHml": "Fecha de Reporte Pagos",
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

    columnas_filtro_descargar_reportepagos : [
        {
            "agrupacion" : "fechas",
            "columna" : "Año promoción",
            "seleccionado" : false
        },

        {
            "agrupacion" : "fechas",
            "columna" : "Mes promoción",
            "seleccionado" : false
        },

        {
            "agrupacion" : "fechas",
            "columna" : "Fecha Doc.",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "GBA",
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
            "agrupacion" : "metricas",
            "columna" : "Concepto",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Tipo Doc.",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Nro. Doc.",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Importe (sin igv)",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Moneda local",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Texto",
            "seleccionado" : false
        },

    ],

    columnas_seleccionadas_filtro_descarga_reportepagos : [],

    data_descargar_excel_reportepagos : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_REPORTEPAGOS:{
            return {
                ...state,
                agrupacion_columnas_filtros_descargar_reportepagos : action.payload
            }
        }
        case SELECCIONAR_COLUMNA_FILTRO_DESCARGA_REPORTEPAGOS: {
            return {
                ...state,
                columnas_filtro_descargar_reportepagos : action.payload.columnas,
                columnas_seleccionadas_filtro_descarga_reportepagos : action.payload.columnasseleccionadas
            }
        }
        case OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGOS_DESCARGAR: {
            return {
                ...state,
                data_descargar_excel_reportepagos : action.payload
            }
        }
        default:
            return state;
    }
}
