import {
    OBTENER_VENTAS
} from '../../../Constantes/Ventas/Ventas'

const INIT_STATE = {
    data_ventas : []
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_VENTAS: {
            return {
                ...state,
                data_ventas : action.payload
            }
        }
        default:
            return state;
    }
}
