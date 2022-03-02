import {
    ACTIVAR_CAROUSEL_TABLA_CONTRAPRESTACIONES
} from '../../../Constantes/Contraprestaciones/Contraprestaciones'

const INIT_STATE = {
    data_tablas_contraprestaciones : [
        {
            "retroceder" : false,
            "ocultando" : false,
            "mostrando" : false
        },
        {
            "retroceder" : false,
            "ocultando" : false,
            "mostrando" : true
        },
        {
            "retroceder" : false,
            "ocultando" : false,
            "mostrando" : false
        }
    ]
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIVAR_CAROUSEL_TABLA_CONTRAPRESTACIONES: {
            return {
                ...state,
                data_tablas_contraprestaciones : action.payload
            }
        }
        default:
            return state;
    }
}
