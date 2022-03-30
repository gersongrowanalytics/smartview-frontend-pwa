import {
    OBTENER_VENTAS,
    OBTENER_DATA_REBATE_BONUS_VENTAS
} from '../../../Constantes/Ventas/Ventas'

const INIT_STATE = {
    data_ventas : [],
    data_rebate_bonus_ventas : {}
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_VENTAS: {
            return {
                ...state,
                data_ventas : action.payload
            }
        }
        case OBTENER_DATA_REBATE_BONUS_VENTAS: {
            return {
                ...state,
                data_rebate_bonus_ventas : action.payload
            }
        }
        default:
            return state;
    }
}
