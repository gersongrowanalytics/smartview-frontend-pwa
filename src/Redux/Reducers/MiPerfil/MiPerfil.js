import { 
    CARGANDO_BTN_EDITAR_PERFIL
} from '../../../Constantes/MiPerfil/MiPerfil'

const INIT_STATE = {
    cargandoBtnEditar: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CARGANDO_BTN_EDITAR_PERFIL: {
            return {
                ...state,
                cargandoBtnEditar: action.payload
            }
        }
        default:
            return state;
    }
}