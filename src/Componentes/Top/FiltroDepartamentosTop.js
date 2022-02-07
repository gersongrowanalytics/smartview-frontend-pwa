import React, {useState} from 'react';
import IconoTradicional from '../../Assets/Img/Top/iconoTradicional.png'
import IconoDepartamento from '../../Assets/Img/Top/iconoDepartamento.png'
import IconoDepartamentoSelect from '../../Assets/Img/Top/iconoDepartamentoSelect.png'

import IconoVentas from '../../Assets/Img/Top/iconoVentas.png'
import IconoPromociones from '../../Assets/Img/Top/iconoPromociones.png'
import IconoListaPrecios from '../../Assets/Img/Top/iconoListaPrecios.png'
import IconoBancoImagenes from '../../Assets/Img/Top/iconoBancoImagenes.png'
import IconoFileUpload from '../../Assets/Img/Top/iconoFileUpload.png'

import {Link} from "react-router-dom";

const FiltroDepartamentosTop = () => {
    
    const [mostrarContenido, setMostrarContenido] = useState(false)
    const [pasoMouse, setPasoMouse] = useState(false)
    
    return (
        <div
            style={{position:'relative'}}
        >
            <div 
                className='Wbold-S14-H19-C1E1E1E Contenedor-Items-Top'
                onClick={() => setMostrarContenido(!mostrarContenido)}
                style={
                    mostrarContenido == true
                    ?{
                        background: "#000000",
                        color: "#FFFF00",
                    }
                    :{}
                }
                onMouseEnter={() => setPasoMouse(true)}
                onMouseLeave={() => setPasoMouse(false)}
            >
                {
                    mostrarContenido == true
                    ?<img className='Img-Icono-Top' src={IconoDepartamentoSelect} />
                    :pasoMouse == true
                    ?<img className='Img-Icono-Top' src={IconoDepartamentoSelect} />
                    :<img className='Img-Icono-Top' src={IconoDepartamento} />
                }
                Departamentos
            </div>
            {
                mostrarContenido == true
                ?<div 
                    className='Cuerpo-Item-Filtro-Top'
                    style={{
                        left: "20px"
                    }}
                >
                    <Link to="/ventas">
                        <div className='Fila-Cuerpo-Item-Filtro-Top'>
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoVentas} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Ventas</div>
                        </div>
                    </Link>

                    <Link to="/promociones">
                        <div className='Fila-Cuerpo-Item-Filtro-Top'>
                            <div>
                                <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoPromociones} />
                            </div>
                            <div className='Wnormal-S14-H19-C1E1E1E'>Promociones</div>
                        </div>
                    </Link>

                    <div className='Fila-Cuerpo-Item-Filtro-Top'>
                        <div>
                            <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoListaPrecios} />
                        </div>
                        <div className='Wnormal-S14-H19-C1E1E1E'>Lista de Precios</div>
                    </div>

                    <div className='Fila-Cuerpo-Item-Filtro-Top'>
                        <div>
                            <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoBancoImagenes} />
                        </div>
                        <div className='Wnormal-S14-H19-C1E1E1E'>Banco de Imágen</div>
                    </div>

                    <div className='Fila-Cuerpo-Item-Filtro-Top'>
                        <div>
                            <img className='Icono-Fila-Cuerpo-Item-Filtro-Top' src={IconoFileUpload} />
                        </div>
                        <div className='Wnormal-S14-H19-C1E1E1E'>File upload</div>
                    </div>
                </div>
                :null
            }
        </div>
    )
};

export default FiltroDepartamentosTop;
