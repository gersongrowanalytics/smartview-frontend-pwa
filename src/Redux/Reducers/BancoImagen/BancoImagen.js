import {
    OBTENER_DATOS_IMAGENES,
    OBTENER_DATOS_EDITANDO_SINIMAGENES,
    OBTENER_DATOS_EDITANDO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_SINIMAGENES,
    OBTENER_DATOS_SINIMAGENES,
    CARGANDO_TABLA_DATOS_IMAGENES
} from '../../../Constantes/BancoImagen/BancoImagen'

const INIT_STATE = {
    prosSinImagenes : [],
    prosConImagenes : [],
    cargandoTablaBancoImagen : false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CARGANDO_TABLA_DATOS_IMAGENES: {
            return {
                ...state,
                cargandoTablaBancoImagen: action.payload
            }
        }
        case OBTENER_DATOS_IMAGENES: {
            return {
                ...state,
                prosSinImagenes: JSON.parse(action.payload.SinImagenes),
                prosConImagenes: JSON.parse(action.payload.ConImagenes),
                cargandoTablaBancoImagen: action.payload.cargandoTablaBancoImagen
            }
        }
        case OBTENER_DATOS_EDITANDO_SINIMAGENES: {
            return {
                ...state,
                prosSinImagenes: JSON.parse(action.payload.SinImagenes),
            }
        }
        case OBTENER_DATOS_EDITANDO_CONIMAGENES: {
            return {
                ...state,
                prosConImagenes: JSON.parse(action.payload.ConImagenes),
            }
        }
        case OBTENER_DATOS_FILTRADO_SINIMAGENES: {
            return {
                ...state,
                prosSinImagenes: JSON.parse(action.payload.SinImagenes),
            }
        }
        case OBTENER_DATOS_FILTRADO_CONIMAGENES: {
            return {
                ...state,
                prosConImagenes: JSON.parse(action.payload.ConImagenes),
            }
        }
        case OBTENER_DATOS_SINIMAGENES: {
            return {
                ...state,
                prosSinImagenes: JSON.parse(action.payload.SinImagenes),
            }
        }
        default:
            return state;
    }
}
