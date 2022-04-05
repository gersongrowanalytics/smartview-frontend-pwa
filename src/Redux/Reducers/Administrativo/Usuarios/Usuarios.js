import {
    OBTENER_DATOS_USUARIOS,
    CARGANDO_TABLA_DATOS_USUARIOS,
    OBTENER_DATOS_PAISES,
    OBTENER_DATOS_TIPOS_USUARIOS
} from '../../../../Constantes/Administrativo/Usuarios/Usuarios'

const INIT_STATE = {
    cargandoTablaUsuarios: false,
    usuarios: [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
    paisesUsuario: [],
    tiposUsuarios: []
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
            return {
                ...state,
                usuarios: action.payload.datos,
                paginasTotales: action.payload.paginasTotales,
                paginaActual: action.payload.paginaActual,
                indexRegistro: action.payload.indexRegistro,
                cargandoTablaUsuarios: action.payload.cargandoSpin
            }
        }
        case OBTENER_DATOS_PAISES: {
            return {
                ...state,
                paisesUsuario: action.payload
            }
        }
        case OBTENER_DATOS_TIPOS_USUARIOS: {
            return {
                ...state,
                tiposUsuarios: action.payload
            }
        }
        default:
            return state;
    }
}
