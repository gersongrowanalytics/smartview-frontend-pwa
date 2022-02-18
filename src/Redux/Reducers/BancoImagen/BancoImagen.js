import {
    OBTENER_DATOS_IMAGENES
} from '../../../Constantes/BancoImagen/BancoImagen'

const INIT_STATE = {
    prosSinImagenes : [],
    prosConImagenes : []
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_DATOS_IMAGENES: {
            return {
                ...state,
                prosSinImagenes: action.payload.SinImagenes,
                prosConImagenes: action.payload.ConImagenes,
            }
        }
        default:
            return state;
    }
}
