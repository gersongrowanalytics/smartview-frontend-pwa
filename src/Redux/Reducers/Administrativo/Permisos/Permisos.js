import {
    OBTENER_DATOS_PERMISOS,
    CARGANDO_TABLA_DATOS_PERMISOS,
} from '../../../../Constantes/Administrativo/Permisos/Permisos'

const INIT_STATE = {
    cargandoTablaPermisos: false,
    permisos: [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case CARGANDO_TABLA_DATOS_PERMISOS: {
            return {
                ...state,
                cargandoTablaPermisos: action.payload.cargandoSpin
            }
        }
        case OBTENER_DATOS_PERMISOS: {
            return {
                ...state,
                permisos: action.payload.datos,
                paginasTotales: action.payload.paginasTotales,
                paginaActual: action.payload.paginaActual,
                indexRegistro: action.payload.indexRegistro,
                cargandoTablaPermisos: action.payload.cargandoSpin
            }
        }
        default:
            return state;
    }
}
