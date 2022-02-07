import React, {useState} from 'react';
import IconoFlechaAbajo from '../../../Assets/Img/Filtros/flechaAbajo.png'

const FiltroCanalVentasPromociones = (props) => {

    const [mostrarCuerpoFiltro, setMostrarCuerpoFiltro] = useState(false)

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
                    ?<div className='Contenedor-Cuerpo-Filtro'>
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
                        </div>
                    </div>
                    :null
                }
            </div>
        </>
    )
};

export default FiltroCanalVentasPromociones;
