import {
    OBTENER_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_TABLA_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_BTN_MODAL_CONTROL_ARCHIVOS,
    FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
    SELECCIONAR_TODO_FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS,
    OBTENER_DATOS_TIPOS_CARGA
} from '../../../Constantes/ControlArchivos/ControlArchivos'

const INIT_STATE = {
    cargandoTablaControlArchivos: false,
    archivosSubidos : [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
    cargandoBtnModal: false,
    data_controlarchivos: {},
    tiposCargArchivos: [],

    //FILTRO
    fil_selectodo_data_tipo_carga: true
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case CARGANDO_TABLA_DATOS_CONTROL_ARCHIVOS: {
            return {
                ...state,
                cargandoTablaControlArchivos: action.payload.cargandoSpin
            }
        }
        case OBTENER_DATOS_CONTROL_ARCHIVOS: {
            return{
                ...state,
                archivosSubidos: action.payload.datos,
                paginasTotales: action.payload.paginasTotales,
                paginaActual: action.payload.paginaActual,
                indexRegistro: action.payload.indexRegistro,
                cargandoTablaControlArchivos: action.payload.cargandoSpin,
                data_controlarchivos: action.payload.data_controlarchivos,
            }
        }
        case CARGANDO_BTN_MODAL_CONTROL_ARCHIVOS: {
            return {
                ...state,
                cargandoBtnModal : action.payload
            }
        }
        case OBTENER_DATOS_TIPOS_CARGA: {
            return {
                ...state,
                tiposCargArchivos: action.payload
            }
        }
        case FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS: {
            return {
                ...state,
                tiposCargArchivos: action.payload
            }
        }
        case SELECCIONAR_TODO_FILTRO_TIPO_CARGA_CONTROL_ARCHIVOS: {
            return {
                ...state,
                fil_selectodo_data_tipo_carga: action.payload
            }
        }
        default:
            return state;
    }
}
