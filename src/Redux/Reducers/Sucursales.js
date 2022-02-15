import {
    OBTENER_SUCURSALES_USUARIO_EXITO,
    OBTENER_SUCURSALES_USUARIO_FAIL,
    FILTRO_SELECCIONAR_SUCURSAL_USUARIO,
    REINICIAR_SUCURSALES_USUARIO,
    OBTENER_SUCURSALES_USUARIO,
    SELECCIONAR_SUCURSAL
} from "../../Constantes/Sucursales";

const INIT_STATE = {
    sucursalesUsuario       : [],
    obtuvoSucursalesUsuario : false,
    idSucursalUsuarioSelec  : 0,
    zonas                   : [],
    cass                    : [],
    gsus                    : [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_SUCURSALES_USUARIO_EXITO: {
            return {
                ...state,
                sucursalesUsuario       : action.payload.datos,
                obtuvoSucursalesUsuario : true,
                idSucursalUsuarioSelec  : action.payload.datos[0]['sucid'],
                zonas                   : action.payload.zonas,
                cass                    : action.payload.cass,
                gsus                    : action.payload.gsus,
            }
        }
        case OBTENER_SUCURSALES_USUARIO_FAIL: {
            return {
                ...state,
                sucursalesUsuario       : action.payload.datos,
                zonas                   : action.payload.zonas,
                obtuvoSucursalesUsuario : true,
                cass                    : action.payload.cass,
                gsus                    : action.payload.gsus,
            }
        }
        case FILTRO_SELECCIONAR_SUCURSAL_USUARIO: {
            return {
                ...state,
                idSucursalUsuarioSelec : action.payload
            }
        }
        case REINICIAR_SUCURSALES_USUARIO: {
            return {
                ...state,
                sucursalesUsuario       : [],
                obtuvoSucursalesUsuario : false,
                idSucursalUsuarioSelec  : 0
            }
        }
        case OBTENER_SUCURSALES_USUARIO : {
            return {
                ...state,
                sucursalesUsuario : action.payload.sucursalesUsuario,
                zonas : action.payload.zonas,
            }
        }
        default:
            return state;
    }
}
  