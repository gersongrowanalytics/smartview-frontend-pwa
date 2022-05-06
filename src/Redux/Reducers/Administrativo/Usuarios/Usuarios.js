import {
    OBTENER_DATOS_USUARIOS,
    CARGANDO_TABLA_DATOS_USUARIOS,
    OBTENER_DATOS_PAISES,
    OBTENER_DATOS_TIPOS_USUARIOS,
    FILTRO_TIPO_USUARIOS_ADM_USUARIO,
    SELECCIONAR_TODO_FILTRO_TIPO_USUARIOS_ADM_USUARIO,
    OBTENER_DATOS_REPORTE_EXCEL_USUARIOS,
    ARMAR_LISTA_PAISES_SELECCIONADOS_USUARIO
} from '../../../../Constantes/Administrativo/Usuarios/Usuarios'

const INIT_STATE = {
    cargandoTablaUsuarios: false,
    usuarios: [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
    paisesUsuario: [],
    tiposUsuarios: [],
    datosReporteExcelUsuarios : [],

    //FILTRO
    fil_selectodo_data_tipo_usuario: true,
    data_datos_adm_usuarios : {}
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
                cargandoTablaUsuarios: action.payload.cargandoSpin,
                data_datos_adm_usuarios : action.payload.data_datos_adm_usuarios
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
        case FILTRO_TIPO_USUARIOS_ADM_USUARIO: {
            return {
                ...state,
                tiposUsuarios: action.payload
            }
        }
        case SELECCIONAR_TODO_FILTRO_TIPO_USUARIOS_ADM_USUARIO: {
            return {
                ...state,
                fil_selectodo_data_tipo_usuario: action.payload
            }
        }
        case OBTENER_DATOS_REPORTE_EXCEL_USUARIOS: {
            return {
                ...state,
                datosReporteExcelUsuarios: action.payload
            }
        }
        case ARMAR_LISTA_PAISES_SELECCIONADOS_USUARIO: {
            return {
                ...state,
                paisesUsuario: action.payload
            }
        }
        default:
            return state;
    }
}
