import { 
    OBTENER_DATA_DESCARGA_LP,
    OBTENER_TIPOS_REBATES,
    OBTENER_CANALES_SUCURSALES
} from '../../../Constantes/LogicaLP/LogicaLP';

const INIT_STATE = {
    sucursalesExcel: [],
    datosExcel: [],
    tiposRebates: [],
    canalesSucursales: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_DATA_DESCARGA_LP:{
            return {
                ...state,
                datosExcel: action.payload.datos,
                sucursalesExcel: action.payload.sucursales
            }
        }
        case OBTENER_TIPOS_REBATES:{
            return {
                ...state,
                tiposRebates: action.payload
            }
        }
        case OBTENER_CANALES_SUCURSALES:{
            return {
                ...state,
                canalesSucursales: action.payload
            }
        }
        default:
            return state;
    }
}
