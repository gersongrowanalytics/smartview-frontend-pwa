import {
    OBTENER_DATOS_USUARIOS,
    CARGANDO_TABLA_DATOS_USUARIOS
} from '../../../../Constantes/Administrativo/Usuarios/Usuarios'

const INIT_STATE = {
    cargandoTablaUsuarios: false,
    usuarios: [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: ""
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case CARGANDO_TABLA_DATOS_USUARIOS: {
            return {
                ...state,
                cargandoTablaUsuarios: action.payload.cargandoSpin
            }
        }
        case OBTENER_DATOS_USUARIOS: {
            return{
                ...state,
                usuarios: action.payload.datos,
                paginasTotales: action.payload.paginasTotales,
                paginaActual: action.payload.paginaActual,
                indexRegistro: action.payload.indexRegistro,
                cargandoTablaUsuarios: action.payload.cargandoSpin
            }
        }
        default:
            return state;
    }
}
