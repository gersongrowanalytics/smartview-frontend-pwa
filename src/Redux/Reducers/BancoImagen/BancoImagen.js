import {
    OBTENER_DATOS_IMAGENES,
    OBTENER_DATOS_EDITANDO_SINIMAGENES,
    OBTENER_DATOS_EDITANDO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_CONIMAGENES,
    OBTENER_DATOS_FILTRADO_SINIMAGENES,
    OBTENER_DATOS_SINIMAGENES,
    CARGANDO_TABLA_DATOS_IMAGENES,
    MOSTRAR_CARGANDO_EDITAR_REGISTRO
} from '../../../Constantes/BancoImagen/BancoImagen'

const INIT_STATE = {
    prosSinImagenes : [],
    prosConImagenes : [],
    prosInactivas : [],
    cargandoTablaBancoImagen : false,
    cargandoRegistroEditar : false
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
                prosSinImagenes : action.payload.SinImagenes,
                prosConImagenes : action.payload.ConImagenes,
                prosInactivas   : action.payload.Inactivos,
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
                cargandoRegistroEditar: action.payload.cargandoRegistroEditar
            }
        }
        case OBTENER_DATOS_FILTRADO_CONIMAGENES: {
            return {
                ...state,
                prosConImagenes: JSON.parse(action.payload.ConImagenes),
                cargandoRegistroEditar: action.payload.cargandoRegistroEditar
            }
        }
        case OBTENER_DATOS_SINIMAGENES: {
            return {
                ...state,
                prosSinImagenes: JSON.parse(action.payload.SinImagenes),
                cargandoTablaBancoImagen: action.payload.cargandoTablaBancoImagen
            }
        }
        case MOSTRAR_CARGANDO_EDITAR_REGISTRO: {
            return {
                ...state,
                cargandoRegistroEditar: action.payload
            }
        }
        default:
            return state;
    }
}
