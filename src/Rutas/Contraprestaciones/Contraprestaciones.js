import React from 'react'
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {
    ActivarCarouselTablaContraprestacionesReducer
} from '../../Redux/Acciones/Contraprestaciones/Contraprestaciones'

const Contraprestaciones = () => {

    const dispatch = useDispatch()

    const {
        data_tablas_contraprestaciones
    } = useSelector(({contraprestaciones}) => contraprestaciones);

    return (
        <div
            className='Contenedor-Contraprestaciones'
        >
            <div className='Wbold-S26-H35-C1E1E1E'>
                Contraprestaciones
            </div>

            <div style={{marginTop:'20px', marginLeft:'80px', marginRight:'80px', position:'relative'}}>
                <div className='Contenedor-Tabla-Contraprestaciones'>
                    {
                        data_tablas_contraprestaciones.map((dat, pos) => {
                            return(
                                <table 
                                    className={
                                        dat.retroceder == true
                                        ?
                                        dat.mostrando == true
                                        ?'Tabla-Contraprestaciones Tabla-Contraprestaciones-Retroceder-Mostrar'
                                        :dat.ocultando == true
                                            ?'Tabla-Contraprestaciones Tabla-Contraprestaciones-Retroceder-Ocultar'
                                            :'Tabla-Contraprestaciones'

                                        :
                                        dat.mostrando == true
                                        ?'Tabla-Contraprestaciones Tabla-Contraprestaciones-Mostrar'
                                        :dat.ocultando == true
                                            ?'Tabla-Contraprestaciones Tabla-Contraprestaciones-Ocultar'
                                            :'Tabla-Contraprestaciones'
                                    }
                                >
                                    <thead>
                                        <tr className='Wbold-S16-H21-CFFFFFF'>
                                            <th>
                                                Cliente {pos+1}
                                            </th>
                                            <th>
                                                Contraprestaciones
                                            </th>
                                            <th>
                                                Métrica
                                            </th>
                                            <th>
                                                Infant
                                            </th>
                                            <th>
                                                Wipes
                                            </th>
                                            <th>
                                                Family
                                            </th>
                                            <th>
                                                Adult
                                            </th>
                                            <th>
                                                Fem
                                            </th>
                                            <th>
                                                Gran Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            [{},{},{},{},{},{},{},{}].map((dat, pos) => {
                                                return(
                                                    <tr className='W600-S14-H19-L0015-C1E1E1E'>
                                                        <td>
                                                            {
                                                                pos == 0
                                                                ?"Tottus"
                                                                :null
                                                            }
                                                        </td>
                                                        <td>
                                                            Driver de crecimiento escalonado
                                                        </td>
                                                        <td>
                                                            Sell In
                                                        </td>
                                                        <td>
                                                            9.27%
                                                        </td>
                                                        <td>
                                                            11.02%
                                                        </td>
                                                        <td>
                                                            9.77%
                                                        </td>
                                                        <td>
                                                            9.27%
                                                        </td>
                                                        <td>
                                                            9.02%
                                                        </td>
                                                        <td className='Wbold-S16-H21-C1E1E1E'>
                                                            123%
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className='Wbold-S16-H21-C1E1E1E' style={{background:'#E5E5E5'}}>
                                            <td></td>
                                            <td>
                                                Total
                                            </td>
                                            <td></td>
                                            <td>
                                                12.56%
                                            </td>
                                            <td>
                                                14.31%
                                            </td>
                                            <td>
                                                13.06%
                                            </td>
                                            <td>
                                                12.56%
                                            </td>
                                            <td>
                                                12.31%
                                            </td>
                                            <td>
                                                
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })
                    }
                </div>

                <div 
                    className='Btn-Flecha-Retroceder-Contraprestaciones'
                    onClick={async () => {
                        console.log(data_tablas_contraprestaciones)
                        await dispatch(ActivarCarouselTablaContraprestacionesReducer("retroceder"))
                    }}
                >
                    <LeftOutlined />
                </div>
                <div 
                    className='Btn-Flecha-Avanzar-Contraprestaciones'
                    onClick={async () => {
                        console.log(data_tablas_contraprestaciones)
                        await dispatch(ActivarCarouselTablaContraprestacionesReducer())
                    }}
                >
                    <RightOutlined />
                </div>
            </div>
        </div>
    )
}

export default Contraprestaciones