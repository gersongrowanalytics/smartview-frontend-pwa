import {
    CARGANDO_BTN_ENVIAR_CORREO_DESCARGA,
    NOMBRE_ARCHIVO_ENVIAR_CORREO_DESCARGA
} from '../../../Constantes/Descargas/Descargas'

const INIT_STATE = {
    cargando_btn_enviar_correo_descarga : false,
    nombre_archivo_enviar_correo_descargar : ""
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CARGANDO_BTN_ENVIAR_CORREO_DESCARGA: {
            return {
                ...state,
                cargando_btn_enviar_correo_descarga : action.payload
            }
        }
        case NOMBRE_ARCHIVO_ENVIAR_CORREO_DESCARGA: {
            return {
                ...state,
                nombre_archivo_enviar_correo_descargar : action.payload
            }
        }
        default:
            return state;
    }
}
