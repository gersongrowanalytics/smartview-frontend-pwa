import {
    OBTENER_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_TABLA_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_BTN_MODAL_CONTROL_ARCHIVOS
} from '../../../Constantes/ControlArchivos/ControlArchivos'

const INIT_STATE = {
    cargandoTablaControlArchivos: false,
    archivosSubidos : [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: "",
    cargandoBtnModal: false,
    data_controlarchivos : {}
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
        
        default:
            return state;
    }
}
