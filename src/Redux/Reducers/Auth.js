import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  MOSTRAR_FORMULARIO_LOGIN,
  OBTENER_PERMISOS_USUARIO,
  OBTENER_DATOS_USUARIO_LOGIN,
  CARGANDO_BTN_LOGIN,
  DATA_RECUPERAR,
  SELECCIONAR_OTRO_CANAL_SISTEMA,
  MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN
} from "../../Constantes/ActionTypes";
import {
  OBTENER_PAISES_SISTEMA,
  SELECCIONAR_PAIS_ESPECIFICO
} from "../../Constantes/PermisosTypes"

const INIT_STATE = {
  loader       : false,
  alertMessage : '',
  showMessage  : false,
  initURL      : '',
  authUser     : localStorage.getItem('user_id'),
  mostrarForm  : false,
  permisos     : [],
  listaPaises  : [],
  paisSeleccionado : {},
  datosUsuarioLogeado : {},
  cargandoLogin : false,
  data_recupear : {},
  canal_seleccionado : "Tradicional",

  mostrar_terminos_condiciones_login : false,

  cargando_vista_inicio_sistema: true,

  mostrar_cargando_preload_sistema : true
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false
      }
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      }
    }
    case MOSTRAR_FORMULARIO_LOGIN:{
      return{
        ...state,
        mostrarForm: action.payload,
      }
    }
    case OBTENER_PERMISOS_USUARIO: {
      return {
        ...state,
        permisos : action.payload
      }
    }
    case OBTENER_PAISES_SISTEMA: {
      return {
        ...state,
        listaPaises : action.payload
      }
    }
    case SELECCIONAR_PAIS_ESPECIFICO: {
      return {
        ...state,
        paisSeleccionado : action.payload
      }
    }
    case OBTENER_DATOS_USUARIO_LOGIN: {
      return {
        ...state,
        datosUsuarioLogeado : action.payload
      }
    }
    case CARGANDO_BTN_LOGIN: {
      return {
        ...state,
        cargandoLogin : action.payload
      }
    }
    case DATA_RECUPERAR: {
      return {
        ...state,
        data_recupear : action.payload
      }
    }

    case SELECCIONAR_OTRO_CANAL_SISTEMA: {
      return {
        ...state,
        canal_seleccionado : action.payload
      }
    }
    case MOSTRAR_TERMINOS_CONDICIONES_DATA_LOGIN: {
      return {
        ...state,
        mostrar_terminos_condiciones_login : action.payload
      }
    }

    case "CARGANDO_VISTA_INICIO_SISTEMA": {
      return {
        ...state,
        cargando_vista_inicio_sistema : action.payload
      }
    }

    case "MOSTRAR_CARGANDO_PRELOAD_SISTEMA": {
      return {
        ...state,
        mostrar_cargando_preload_sistema : action.payload
      }
    }
    
    default:
      return state;
  }
}