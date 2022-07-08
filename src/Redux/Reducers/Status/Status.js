import {
    OBTENER_DATOS_CONTROL_ARCHIVOS,
    OBTENER_DATOS_AREAS
} from '../../../Constantes/Status/Status'

const INIT_STATE = {
    data_control_archivos : [],
    data_areas : [],
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case OBTENER_DATOS_CONTROL_ARCHIVOS: {
            return {
                ...state,
                data_control_archivos: action.payload
            }
        }
        case OBTENER_DATOS_AREAS: {
            return {
                ...state,
                data_areas: action.payload
            }
        }
        default:
            return state;
    }
}