import {
    MODULO_DESCARGA_SELECCIONADO,
    ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR,
    SELECCIONAR_COLUMNA_FILTRO_DESCARGA,
    OBTENER_DATA_DESCARGAR_EXCEL_PROMOCIONES_DESCARGAR,
    CARGANDO_BTN_EXCEL_DESCARGAR
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {
    modulo_descarga_seleccionado : "Sell In",
    agrupacion_columnas_filtros_descargar : [
        {
            "agrupacion" : "fechapromocion",
            "agrupacionHml": "Fecha de Promoción",
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

    columnas_filtro_descargar : [
        {
            "agrupacion" : "fechapromocion",
            "columna" : "Inicio Promoción",
            "seleccionado" : false
        },

        {
            "agrupacion" : "fechapromocion",
            "columna" : "Fin Promoción",
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
            "columna" : "Cliente Hml",
            "seleccionado" : false
        },

        {
            "agrupacion" : "cliente",
            "columna" : "Sold To",
            "seleccionado" : false
        },

        // {
        //     "agrupacion" : "cliente",
        //     "columna" : "Cliente",
        //     "seleccionado" : false
        // },

        {
            "agrupacion" : "materiales",
            "columna" : "Tipo de Cliente",
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
            "columna" : "Mecánica",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Planchas a rotar",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Reconocer x PL S/IGV",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "# Combos",
            "seleccionado" : false
        },

        {
            "agrupacion" : "metricas",
            "columna" : "Reconocer x Combo S/",
            "seleccionado" : false
        },

    ],

    columnas_seleccionadas_filtro_descarga : [],

    data_descargar_excel_promociones : [],

    cargando_btn_excel_descargar : false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case MODULO_DESCARGA_SELECCIONADO: {
            return {
                ...state,
                modulo_descarga_seleccionado : action.payload
            }
        }
        case ABRIR_AGRUPACION_COLUMNA_FILTRO_DESCARGAR:{
            return {
                ...state,
                agrupacion_columnas_filtros_descargar : action.payload
            }
        }
        case SELECCIONAR_COLUMNA_FILTRO_DESCARGA: {
            return {
                ...state,
                columnas_filtro_descargar : action.payload.columnas,
                columnas_seleccionadas_filtro_descarga : action.payload.columnasseleccionadas
            }
        }
        case OBTENER_DATA_DESCARGAR_EXCEL_PROMOCIONES_DESCARGAR: {
            return {
                ...state,
                data_descargar_excel_promociones : action.payload
            }
        }
        case CARGANDO_BTN_EXCEL_DESCARGAR: {
            return {
                ...state,
                cargando_btn_excel_descargar : action.payload
            }
        }
        default:
            return state;
    }
}
