import {
    OBTENER_SUCURSALES_USUARIO_EXITO,
    OBTENER_SUCURSALES_USUARIO_FAIL,
    FILTRO_SELECCIONAR_SUCURSAL_USUARIO,
    REINICIAR_SUCURSALES_USUARIO,
    OBTENER_SUCURSALES_USUARIO,
    SELECCIONAR_UNA_SUCURSAL_DESCARGAR,
    SELECCIONAR_UNA_ZONA_DESCARGAR,
    SELECCIONAR_UN_GRUPO_DESCARGAR,
    SELECCIONAR_UN_GSUID,
    SELECCIONAR_CASS,
    SELECCIONAR_GRUPOS,
    SELECCIONAR_SUCURSALES,
    APLICANDO_FILTROS_CORRESPONDIENTES,
    CAMBIAR_APLICANDO_FILTRO_ACUMULADO,
    FILTRO_DISTRIBUIDORA_ELEMENTOS_ENVIADOS,
    SELECCIONAR_TODO_FILTRO_DISTRIBUIDORA_ELEMENTOS_ENVIADOS
} from "../../Constantes/Sucursales";

const INIT_STATE = {
    sucursalesUsuario       : [],
    obtuvoSucursalesUsuario : false,
    idSucursalUsuarioSelec  : 0,
    zonas                   : [],
    cass                    : [],
    gsus                    : [],
    gsuidSeleccionado       : 0,

    aplicandoFiltroCanal : false,
    aplicandoFiltroZona  : false,
    aplicandoFiltroGrupo : false,
    aplicandoFiltroDt    : false,
    aplicandoFiltroAcumulado : false,

    //FILTRO
    fil_selectodo_data_distribuidora : false
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
        case SELECCIONAR_UNA_SUCURSAL_DESCARGAR : {
            return {
                ...state,
                sucursalesUsuario : action.payload,
            }
        }
        case SELECCIONAR_UNA_ZONA_DESCARGAR : {
            return {
                ...state,
                zonas : action.payload,
            }
        }
        case SELECCIONAR_UN_GRUPO_DESCARGAR : {
            return {
                ...state,
                gsus : action.payload
            }
        }
        case SELECCIONAR_UN_GSUID: {
            return {
                ...state,
                gsuidSeleccionado : action.payload
            }
        }
        case SELECCIONAR_CASS: {
            return {
                ...state,
                cass : action.payload
            }
        }
        case APLICANDO_FILTROS_CORRESPONDIENTES: {
            return {
                ...state,
                aplicandoFiltroCanal : action.payload.aplicandoCanal,
                aplicandoFiltroZona  : action.payload.aplicandoZona,
                aplicandoFiltroGrupo : action.payload.aplicandoGrupo,
                aplicandoFiltroDt    : action.payload.aplicandoDt,
            }
        }
        case CAMBIAR_APLICANDO_FILTRO_ACUMULADO: {
            return {
                ...state,
                aplicandoFiltroAcumulado : action.payload
            }
        }
        case FILTRO_DISTRIBUIDORA_ELEMENTOS_ENVIADOS: {
            return {
                ...state,
                sucursalesUsuario: action.payload
            }
        }
        case SELECCIONAR_TODO_FILTRO_DISTRIBUIDORA_ELEMENTOS_ENVIADOS: {
            return {
                ...state,
                fil_selectodo_data_distribuidora: action.payload
            }
        }
        default:
            return state;
    }
}
  