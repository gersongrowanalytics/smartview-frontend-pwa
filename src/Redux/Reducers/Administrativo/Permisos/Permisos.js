import {
    OBTENER_DATOS_PERMISOS,
    CARGANDO_TABLA_DATOS_PERMISOS,
    OBTENER_DATA_PERMISOS
} from '../../../../Constantes/Administrativo/Permisos/Permisos'

const INIT_STATE = {
    cargandoTablaPermisos: false,
    permisos: [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
    data_paginate_permisos : {},
    data_tipos_permisos : []
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
                cargandoTablaPermisos: action.payload.cargandoSpin,
                data_paginate_permisos: action.payload.data_paginate_permisos,
                data_tipos_permisos : action.payload.data_tipos_permisos,
            }
        }
        case OBTENER_DATA_PERMISOS: {
            return {
                ...state,
                permisos: action.payload,
            }
        }
        default:
            return state;
    }
}
