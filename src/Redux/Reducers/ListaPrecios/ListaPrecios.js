import {
    OBTENER_GRUPOS_DISPONIBLES_LISTA_PRECIOS,
    OBTENER_DATA_EXCEL_LISTA_PRECIOS,
    CARGANDO_TABLA_LISTA_PRECIOS
} from '../../../Constantes/ListaPrecios/ListaPrecios'

const INIT_STATE = {
    grupos_disponibles_lista_precios : [],
    data_excel_lista_precios : [],
    data_tabla_lista_precios : [],
    cargando_datos_tabla_lista_precios : false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
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
    default:
        return state;
    }
}
