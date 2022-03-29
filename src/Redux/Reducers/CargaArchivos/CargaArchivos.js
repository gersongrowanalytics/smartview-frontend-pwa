import {
    GUARDAR_NOTIFICACIONES_CARGA_ARCHIVOS
} from '../../../Constantes/CargaArchivos/CargaArchivos'

const INIT_STATE = {
    notificaciones_data_carga_archivos : []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GUARDAR_NOTIFICACIONES_CARGA_ARCHIVOS: {
            return {
                ...state,
                notificaciones_data_carga_archivos : action.payload
            }
        }
        default:
            return state;
    }
}
