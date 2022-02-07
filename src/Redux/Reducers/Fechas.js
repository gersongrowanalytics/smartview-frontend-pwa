import {
    OBTENER_FECHAS_FILTRO_EXITO,
    OBTENER_FECHAS_FILTRO_FAIL,
    FILTRO_SELECCIONAR_FECHA_DIA,
    FILTRO_SELECCIONAR_FECHA_MES,
    FILTRO_SELECCIONAR_FECHA_ANO,
    REINICIAR_FECHAS,
    SELECCIONAR_MES_FILTRO,
    SELECCIONAR_ANIO_FILTRO,
} from "../../Constantes/FechasTypes";

const fecha = new Date();
const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DIC"]

const INIT_STATE = {
    fechasFiltro       : {"dias": [], "meses": [], "anos": []},
    obtuvoFechasFiltro : false,
    diaFiltroSelec : '',
    mesFiltroSelec : '',
    anoFiltroSelec : '',

    mesSeleccionadoFiltro : meses[fecha.getMonth()],
    anioSeleccionadoFiltro : fecha.getFullYear()
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case OBTENER_FECHAS_FILTRO_EXITO: {
        return {
            ...state,
            fechasFiltro: action.payload,
            obtuvoFechasFiltro : true,
            diaFiltroSelec  : action.payload.dias[0],
            mesFiltroSelec  : action.payload.meses[0],
            anoFiltroSelec  : action.payload.anos[0]
        }
      }
    case OBTENER_FECHAS_FILTRO_FAIL: {
        return {
            ...state,
            fechasFiltro: action.payload,
            obtuvoFechasFiltro : true
        }
    }
    case FILTRO_SELECCIONAR_FECHA_DIA: {
        return {
            ...state,
            diaFiltroSelec: action.payload
        }
    }
    case FILTRO_SELECCIONAR_FECHA_MES: {
        return {
            ...state,
            mesFiltroSelec: action.payload
        }
    }
    case FILTRO_SELECCIONAR_FECHA_ANO: {
        return {
            ...state,
            anoFiltroSelec: action.payload
        }
    }
    case REINICIAR_FECHAS: {
        return {
            ...state,
            fechasFiltro       : {"dias": [], "meses": [], "anos": []},
            obtuvoFechasFiltro : false,
            diaFiltroSelec : '',
            mesFiltroSelec : '',
            anoFiltroSelec : ''
        }
    }
    case SELECCIONAR_MES_FILTRO:{
        return {
            ...state,
            mesSeleccionadoFiltro : action.payload
        }
    }
    case SELECCIONAR_ANIO_FILTRO:{
        return {
            ...state,
            anioSeleccionadoFiltro : action.payload
        }
    }
    default:
        return state;
    }
  }
  