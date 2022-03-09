import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import EstadoRequest from './EstadoRequest'
import Auth from './Auth'
import Fechas from './Fechas'
import Sucursales from './Sucursales'
import Promociones from './Promociones/Promociones'
import Ventas from './Ventas/Ventas'
import BancoImagen from './BancoImagen/BancoImagen'
import Descargas from './Descargas/Descargas'
import DescargasSellIn from './Descargas/DescargasSellIn'
import DescargarSellOut from './Descargas/DescargarSellOut'
import DescargarRerportePagos from './Descargas/DescargarRerportePagos'
import DescargarPromocionesLiquidadas from './Descargas/DescargarPromocionesLiquidadas'
import DescargarPdf from './Descargas/DescargarPdf'
import ListaPrecios from './ListaPrecios/ListaPrecios'
import CargaArchivos from './CargaArchivos/CargaArchivos'
import Contraprestaciones from './Contraprestaciones/Contraprestaciones'
import DescargarEnviarCorreo from './Descargas/DescargarEnviarCorreo'
import Setting from './Setting'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    estadoRequest : EstadoRequest,
    auth          : Auth,
    fechas        : Fechas,
    sucursales    : Sucursales,
    promociones   : Promociones,
    ventas        : Ventas,
    bancoImagen   : BancoImagen,
    descargas   : Descargas,
    descargasSellIn   : DescargasSellIn,
    descargarSellOut   : DescargarSellOut,
    descargarRerportePagos   : DescargarRerportePagos,
    descargarPromocionesLiquidadas   : DescargarPromocionesLiquidadas,
    descargarPdf   : DescargarPdf,
    listaPrecios   : ListaPrecios,
    cargaArchivos  : CargaArchivos,
    contraprestaciones : Contraprestaciones,
    descargarEnviarCorreo : DescargarEnviarCorreo,
    setting : Setting,
});

export default createRootReducer
