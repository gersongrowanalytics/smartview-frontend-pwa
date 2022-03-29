import {
    REINICIAR_PROMOCIONES,
    OBTENER_PROMOCIONES_EXITO,
    OBTENER_PROMOCIONES_FAIL,
    SELECCIONAR_PROMOCION,
    OBTENER_CANALES_DE_PROMOCIONES_FAIL,
    ACTUALIZAR_CATEGORIAS_DE_PROMOCIONES,
    ACTUALIZAR_COLOR_SELECCIONADO_PROMOCION,
    OBTENER_CANALES_DE_PROMOCIONES_EXITO,
    ACTUALIZAR_CANALES_DE_PROMOCIONES,
    CAMBIAR_DISENIO_PROMOCIONES,
    MOSTRAR_PROMOCIONES_NUEVAS
} from "../../../Constantes/Promociones/Promociones";

const INIT_STATE = {
    categoriasPromociones : [],
    fechaActualizacionPromocion : "",
    obtuvoPromociones           : false,
    canalesPromociones          : [],
    seleccionoPromocion         : false,
    colorSeleciconadoPromo      : 'transparent',
    vistaPromocionSeleccionado  : false,
    deseleccionarPromocion      : false,
    promocionesExcel            : [],
    promocionesExcelEspecifico  : [],
    scaidSeleccionado           : 0,
    reiniciandoPromociones      : false,

    mostrarDisenioPromocionesPrincipal : false,
    mostrar_promociones_nuevas : false,
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case OBTENER_PROMOCIONES_EXITO: {
            return {
                ...state,
                categoriasPromociones: action.payload.datos,
                fechaActualizacionPromocion: action.payload.fecha,
                obtuvoPromociones : true,
                canalesPromociones : []
            }
        }
        case REINICIAR_PROMOCIONES: {
            return {
                ...state,
                obtuvoPromociones           : false,
                canalesPromociones          : [],
                seleccionoPromocion         : false,
                colorSeleciconadoPromo      : 'transparent',
                vistaPromocionSeleccionado  : false,
                deseleccionarPromocion      : false,
                fechaActualizacionPromocion : "",
                promocionesExcel            : [],
                promocionesExcelEspecifico  : [],
                scaidSeleccionado           : 0,

                reiniciandoPromociones      : action.payload //OJO
            }
        }
        case OBTENER_PROMOCIONES_FAIL: {
            return {
                ...state,
                categoriasPromociones : action.payload,
                obtuvoPromociones : true
            }
        }
        case SELECCIONAR_PROMOCION: {
            return {
                ...state,
                seleccionoPromocion : action.payload,
            }
        }
        case OBTENER_CANALES_DE_PROMOCIONES_FAIL: {
            return {
                ...state,
                canalesPromociones : [],
            }
        }
        case ACTUALIZAR_CATEGORIAS_DE_PROMOCIONES: {
            return {
                ...state,
                categoriasPromociones : action.payload,
            }
        }
        case ACTUALIZAR_COLOR_SELECCIONADO_PROMOCION: {
            return {
                ...state,
                colorSeleciconadoPromo : action.payload,
            }
        }
        case OBTENER_CANALES_DE_PROMOCIONES_EXITO: {
            return {
                ...state,
                canalesPromociones : action.payload.canalesPromociones,
                scaidSeleccionado  : action.payload.scaid
            }
        }
        case ACTUALIZAR_CANALES_DE_PROMOCIONES: {
            return {
                ...state,
                canalesPromociones : action.payload,
            }
        }
        case CAMBIAR_DISENIO_PROMOCIONES: {
            return {
                ...state,
                mostrarDisenioPromocionesPrincipal : action.payload
            }
        }
        case MOSTRAR_PROMOCIONES_NUEVAS: {
            return {
                ...state,
                mostrar_promociones_nuevas : action.payload
            }
        }
    default:
        return state;
    }
}
