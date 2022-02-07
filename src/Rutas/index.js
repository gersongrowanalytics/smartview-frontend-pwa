import React, {useEffect} from 'react'
import {Route, Routes } from "react-router-dom";
import Top from '../Componentes/Top/Top';
import '../Estilos/Rutas/Rutas.css'
import Ventas from './Ventas/Ventas'
import Promociones from './Promociones/Promociones'
import {obtenerSucursalesReducer} from '../Redux/Acciones/Sucursales'
import {useDispatch, useSelector} from "react-redux";

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
                </Routes>
            </div>
            
        </div>
    )
}

export default Rutas
