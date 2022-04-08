import {
    OBTENER_PERMISOS_TIPO_USUARIO
} from '../../../../Constantes/Administrativo/TiposUsuarios/TiposUsuarios'

const INIT_STATE = {
    permisosTipoUsuario: [],
    tpuid: ""
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case OBTENER_PERMISOS_TIPO_USUARIO: {
            return {
                ...state,
                permisosTipoUsuario: action.payload.permisosTipoUsuario,
                tpuid: action.payload.tpuid
            }
        }
        default:
            return state;
    }
}
