import React, {useState} from 'react';
import { Row, Col } from 'antd';
import IconoFlechaAbajo from '../../../Assets/Img/Filtros/flechaAbajo.png'
import '../../../Estilos/Componentes/Elementos/FiltroZonaVentasPromociones.css'
import {useDispatch, useSelector} from "react-redux";

const FiltroZonaVentasPromociones = (props) => {

    const [mostrarCuerpoFiltro, setMostrarCuerpoFiltro] = useState(false)
    const {
        cass,
        zonas,
        gsus
    } = useSelector(({sucursales}) => sucursales);

    
    const Titulo = props.titulo


    return (
        <>
            <div
                style={{
                    width: "170px",
                    position:'relative',
                    marginRight:'20px'
                }}
            >
                <div
                    className='Borde-Filtro-Contenedor W600-S14-H19-C1E1E1E'
                    onClick={() => setMostrarCuerpoFiltro(!mostrarCuerpoFiltro)}
                >
                    <div >
                        {Titulo}
                    </div>
                    <div>
                        <img src={IconoFlechaAbajo} className='Icono-Flecha-Abajo-Filtro-Ventas' />
                    </div>
                </div>
                {
                    mostrarCuerpoFiltro == true
                    ?<div className='Contenedor-Cuerpo-Filtro-Zonas-Ventas-Promociones'>

                        <Row>
                            <Col xl={6}>
                                {
                                    cass.map((cas) => {
                                        return(
                                            <div className='Fila-Filtro-Zona-Ventas-Promociones Wnormal-S14-H19-L0015-C1E1E1E' >
                                                {cas.casnombre}
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col xl={6}>
                                {
                                    zonas.map((zona) => {
                                        return( 
                                            <div className='Fila-Filtro-Zona-Ventas-Promociones Wnormal-S14-H19-L0015-C1E1E1E' >
                                                {zona.zonnombre}
                                            </div>
                                        )
                                    })
                                }
                            </Col>
                            <Col xl={12}>
                                <div style={{display:'flex'}}>
                                    {
                                        gsus.map((gsu) => {
                                            return (
                                                <div>
                                                    <div className='Wbold-S14-H19-L0015-C1E1E1E'>
                                                        {gsu.gsunombre}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>



{/*                         
                        <div className='Fila-Cuerpo-Filtro Wnormal-S14-H19-C1E1E1E' >
                            <div className='Linea-Fila-Filtro' ></div>
                            <div style={{paddingTop: "5px"}}>
                                {"Lima Note & Casco"}
                            </div>
                        </div>

                        <div className='Fila-Cuerpo-Filtro Wnormal-S14-H19-C1E1E1E' >
                            <div className='Linea-Fila-Filtro' ></div>
                            <div style={{paddingTop: "5px"}}>
                                {"Lima Note & Casco"}
                            </div>
                        </div> */}
                    </div>
                    :null
                }
            </div>
        </>
    )
};

export default FiltroZonaVentasPromociones;
