import React, {useEffect} from 'react'
import {Route, Routes, Navigate } from "react-router-dom";
import Top from '../Componentes/Top/Top';
import '../Estilos/Rutas/Rutas.css'
import Ventas from './Ventas/Ventas'
import Promociones from './Promociones/Promociones'
import {obtenerSucursalesReducer} from '../Redux/Acciones/Sucursales'
import {useDispatch, useSelector} from "react-redux";
import BancoImagen from './BancoImagen/BancoImagen';

const Rutas = () => {

    const disptach = useDispatch()

    useEffect(() => {

        disptach(obtenerSucursalesReducer())

    }, [])

    return (
        <div>
            <Top />
            <div>
                {/* <Menu /> */}
                <Routes>
                    <Route exact path='/ventas' element={<Ventas/>}/>
                    <Route exact path='/promociones' element={<Promociones/>}/>
                    <Route exact path='/banco-imagen' element={<BancoImagen/>}/>
                    <Route path="*" element={<Navigate replace to="/ventas" />} />
                </Routes>
            </div>
            
        </div>
    )
}

export default Rutas
