import {
    OBTENER_DATOS_CONTROL_ARCHIVOS,
    CARGANDO_TABLA_DATOS_CONTROL_ARCHIVOS
} from '../../../Constantes/ControlArchivos/ControlArchivos'

const INIT_STATE = {
    cargandoTablaControlArchivos: false,
    archivosSubidos : [],
    paginasTotales: "",
    paginaActual: "",
    indexRegistro: ""
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
                cargandoTablaControlArchivos: action.payload.cargandoSpin
            }
        }
        default:
            return state;
    }
}
