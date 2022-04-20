import {
    OBTENER_PERMISOS_TIPO_USUARIO,
    OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS
} from '../../../../Constantes/Administrativo/TiposUsuarios/TiposUsuarios'

const INIT_STATE = {
    permisosTipoUsuario: [],
    tpuid: "",
    tpunombre : "",
    tpuimagen : "",
    tpufechainicio : "",
    tpufechafinal : "",
    estid : ""
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case OBTENER_PERMISOS_TIPO_USUARIO: {
            return {
                ...state,
                permisosTipoUsuario: action.payload.permisosTipoUsuario,
                tpuid: action.payload.tpuid,
                tpunombre : action.payload.tpunombre,
                tpuimagen: action.payload.tpuimagen,
                tpufechainicio: action.payload.tpufechainicio,
                tpufechafinal: action.payload.tpufechafinal,
                estid: action.payload.estid
            }   
        }
        case OBTENER_UNICAMENTE_PERMISOS_TIPOS_USUARIOS:{
            return {
                ...state,
                permisosTipoUsuario: action.payload
            }
        }
        default:
            return state;
    }
}
