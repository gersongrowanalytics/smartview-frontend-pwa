import {
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_PROMOCIONES_LIQUIDADAS,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS,
    OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGPROMOCIONES_LIQUIDADAS
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {

    agrupacion_columnas_filtros_descargar_promocionesliquidadas : [
        {
            "agrupacion" : "fechas",
            "agrupacionHml": "Fecha de Promociones Liquidadas",
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

    columnas_filtro_descargar_promocionesliquidadas : [
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
            "agrupacion" : "cliente",
            "columna" : "GBA",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "Ejecutivo",
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
            "columna" : "SKU",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Producto",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Sku a Bonificar",
            "seleccionado" : false
        },

        {
            "agrupacion" : "materiales",
            "columna" : "Producto a Bonificar",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Concepto",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Compra (UND)",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Bonificación (UND)",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Mecánica",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Planchas a rotar o (Sell Out)",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "# Combos",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Reconocer x Combo S/IGV",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Reconocer x PL S/IGV",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Total Soles S/IGV",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "LIQUIDACION:  Sell out planchas",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "LIQUIDACION: Combos usados",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "LIQUIDACION: Valorizado",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "LIQUIDACION: Total a Pagar",
            "seleccionado" : false
        },

    ],

    columnas_seleccionadas_filtro_descarga_promocionesliquidadas : [],

    data_descargar_excel_promocionesliquidadas : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR_PROMOCIONES_LIQUIDADAS:{
            return {
                ...state,
                agrupacion_columnas_filtros_descargar_promocionesliquidadas : action.payload
            }
        }
        case SELECCIONAR_COLUMNA_FILTRO_DESCARGA_PROMOCIONES_LIQUIDADAS: {
            return {
                ...state,
                columnas_filtro_descargar_promocionesliquidadas : action.payload.columnas,
                columnas_seleccionadas_filtro_descarga_promocionesliquidadas : action.payload.columnasseleccionadas
            }
        }
        case OBTENER_DATA_DESCARGAR_EXCEL_REPORTEPAGPROMOCIONES_LIQUIDADAS: {
            return {
                ...state,
                data_descargar_excel_promocionesliquidadas : action.payload
            }
        }
        default:
            return state;
    }
}
