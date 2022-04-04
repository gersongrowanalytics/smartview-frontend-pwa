import {
    OBTENER_NOTIFICACIONES_USUARIO
} from "../../../Constantes/Notificaciones/Notificaciones";

const INIT_STATE = {
    notificaciones_usuario : [],
    not_nuevas_usuario     : [],
    not_antiguas_usuario   : [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_NOTIFICACIONES_USUARIO: {
            return {
                ...state,
                notificaciones_usuario : action.payload.notificaciones,
                not_nuevas_usuario     : action.payload.not_nuevas,
                not_antiguas_usuario   : action.payload.not_antiguas,
            }
        }
    default:
        return state;
    }
}
