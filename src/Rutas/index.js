import React, {useEffect} from 'react'
import {Route, Routes, Navigate } from "react-router-dom";
import Top from '../Componentes/Top/Top';
import '../Estilos/Rutas/Rutas.css'
import Ventas from './Ventas/Ventas'
import Promociones from './Promociones/Promociones'
import Descargas from './Descargas/Descargas'
import {obtenerSucursalesReducer} from '../Redux/Acciones/Sucursales'
import {useDispatch, useSelector} from "react-redux";
import BancoImagen from './BancoImagen/BancoImagen';
import ListaPrecios from '../Rutas/ListaPrecios/ListaPrecios'
import CargarArchivo from '../Rutas/CargarArchivo/CargarArchivo'
import Contraprestaciones from '../Rutas/Contraprestaciones/Contraprestaciones'
import Bottom from '../Componentes/Bottom/Bottom';

const Rutas = () => {

    const disptach = useDispatch()

    useEffect(() => {

        disptach(obtenerSucursalesReducer())

    }, [])

    return (
        <div>
            <Top />
            <div style={{marginTop:'30px'}}>
                {/* <Menu /> */}
                <Routes>
                    <Route exact path='/ventas' element={<Ventas/>}/>
                    <Route exact path='/promociones' element={<Promociones/>}/>
                    <Route exact path='/descargas' element={<Descargas/>}/>
                    <Route exact path='/lista-precios' element={<ListaPrecios/>}/>
                    <Route exact path='/banco-imagen' element={<BancoImagen/>}/>
                    <Route exact path='/carga-archivo' element={<CargarArchivo/>}/>
                    <Route exact path='/contraprestaciones' element={<Contraprestaciones/>}/>
                    <Route path="*" element={<Navigate replace to="/ventas" />} />
                </Routes>
            </div>
            <Bottom />
        </div>
    )
}

export default Rutas
