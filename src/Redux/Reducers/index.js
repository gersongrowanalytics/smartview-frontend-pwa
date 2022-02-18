import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import EstadoRequest from './EstadoRequest'
import Auth from './Auth'
import Fechas from './Fechas'
import Sucursales from './Sucursales'
import Promociones from './Promociones/Promociones'
import Ventas from './Ventas/Ventas'
import BancoImagen from './BancoImagen/BancoImagen'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    estadoRequest : EstadoRequest,
    auth          : Auth,
    fechas        : Fechas,
    sucursales    : Sucursales,
    promociones   : Promociones,
    ventas        : Ventas,
    bancoImagen   : BancoImagen,
});

export default createRootReducer
