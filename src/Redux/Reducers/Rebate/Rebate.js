import {
    OBTENER_GRUPOS_REBATES_REBATE,
    OBTENER_REBATES_ACTUALES_REBATE,
    OBTENER_REBATE_DESCARGAR_REBATE,
    CARGANDO_DATA_REBATE,
    SELECCIONAR_GRUPO_REBATE,
    OBTENER_DATA_REBATE_BONUS,
    OBTENER_DATA_REBATE_TRIMESTRAL,
    CARGANDO_DATA_REBATE_TRIMESTRAL
} from "../../../Constantes/Rebate/Rebate";

const INIT_STATE = {
    data_grupos_rebate : [],
    data_rebate : [],
    data_rebate_descargar : [],
    cargando_data_rebate : false,
    grupo_seleccionado_rebate : "",
    data_rebate_bonus : {},

    data_rebate_trimestral : [],
    cargando_data_rebate_trimestral : false,

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_REBATES_ACTUALES_REBATE: {
            return {
                ...state,
                data_rebate : action.payload
            }
        }
        case CARGANDO_DATA_REBATE : {
            return {
                ...state,
                cargando_data_rebate : action.payload
            }
        }
        case SELECCIONAR_GRUPO_REBATE: {
            return {
                ...state,
                grupo_seleccionado_rebate : action.payload
            }
        }
        case OBTENER_GRUPOS_REBATES_REBATE: {
            return {
                ...state,
                data_grupos_rebate : action.payload
            }
        }
        case OBTENER_REBATE_DESCARGAR_REBATE: {
            return {
                ...state,
                data_rebate_descargar : action.payload
            }
        }
        case OBTENER_DATA_REBATE_BONUS: {
            return {
                ...state,
                data_rebate_bonus : action.payload              
            }
        }
        case OBTENER_DATA_REBATE_TRIMESTRAL: {
            return {
                ...state,
                data_rebate_trimestral : action.payload
            }
        }
        case CARGANDO_DATA_REBATE_TRIMESTRAL: {
            return {
                ...state,
                cargando_data_rebate_trimestral : action.payload
            }
        }
    default:
        return state;
    }
}
  