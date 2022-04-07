import {
    OBTENER_DATOS_ELEMENTOS_ENVIADOS,
    CARGANDO_TABLA_DATOS_ELEMENTOS_ENVIADOS,
    OBTENER_DATOS_PAGINATE_ELEMENTOS_ENVIADOS
} from '../../../Constantes/ElementosEnviados/ElementosEnviados'

const INIT_STATE = {
    cargandoTablaElementosEnviados: false,
    elementosEnviados : [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
    data_paginate_elementos_enviados : {}
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case CARGANDO_TABLA_DATOS_ELEMENTOS_ENVIADOS: {
            return {
                ...state,
                cargandoTablaElementosEnviados: action.payload.cargandoSpin
            }
        }
        case OBTENER_DATOS_ELEMENTOS_ENVIADOS: {
            return{
                ...state,
                elementosEnviados: action.payload.datos,
                paginasTotales: action.payload.paginasTotales,
                paginaActual: action.payload.paginaActual,
                indexRegistro: action.payload.indexRegistro,
                cargandoTablaElementosEnviados: action.payload.cargandoSpin
            }
        }
        case OBTENER_DATOS_PAGINATE_ELEMENTOS_ENVIADOS: {
            return {
                ...state,
                data_paginate_elementos_enviados : action.payload
            }
        }
        default:
            return state;
    }
}
