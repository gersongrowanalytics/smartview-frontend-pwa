import React, {useRef} from 'react';
import FiltroAnioVentasPromociones from './Botones/FiltroAnioVentasPromociones';
import FiltroCanalVentasPromociones from './Botones/FiltroCanalVentasPromociones';
import FiltroMesVentasPromociones from './Botones/FiltroMesVentasPromociones';
import IconoOjoPromociones from '../../Assets/Img/Promociones/Ojo.png'
import {
    CambiarDisenioPromocionesReducer
} from '../../Redux/Acciones/Promociones/Promociones'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
    SeleccionarModuloDescargaReducer,
} from '../../Redux/Acciones/Descargas/Descargas'
import FiltroZonaVentasPromociones from './Botones/FiltroZonaVentasPromociones';
import {
    CloseOutlined,
    RightOutlined,
    LeftOutlined
} from '@ant-design/icons';
import {
    EliminarFiltroAplicadoReducer
} from '../../Redux/Acciones/FiltrosVentasPromociones'

const FiltrosPromociones = () => {
    
    const dispatch = useDispatch();

    const {
        aplicandoFiltroCanal,
        aplicandoFiltroZona,
        aplicandoFiltroGrupo,
        aplicandoFiltroDt,

        cass,
        zonas,
        gsus,
        sucursalesUsuario,
        idSucursalUsuarioSelec
    } = useSelector(({sucursales}) => sucursales);

    const refFiltrosAplicados = useRef(null);

    const scroll = (scrollOffset) => {
        refFiltrosAplicados.current.scrollLeft += scrollOffset;
    };

    return (
        <div 
            className='Contenedor-Filtro-Ventas'
            style={{
                position:'fixed',
                width: "100%",
                height: "60px",
                background:'white',
                zIndex:'1',
                top:'90px'
            }}
        >

            {/* <FiltroCanalVentasPromociones 
                titulo = "Channel"
            /> */}

            <FiltroZonaVentasPromociones
                titulo = "Zona"
                filtro = "PROMOCIONES"
            />  

            <FiltroMesVentasPromociones />

            <FiltroAnioVentasPromociones />

            <div
                className='Filtro-Cambio-Disenio-Promociones'
                onClick={() => dispatch(CambiarDisenioPromocionesReducer())}
            >
                <img
                    src={IconoOjoPromociones}
                    className='Img-Ojo-Cambio-Disenio-Promociones'
                />                
            </div>
            <Link to="/descargas" onClick={() => dispatch(SeleccionarModuloDescargaReducer("Promociones"))}>
                <div className='Contenedor-Btn-Descargar-Ventas'>
                    <div className='Wbold-S14-H19-CFFFFFF'>Descargar</div>
                </div>
            </Link>

            <div className='W600-S14-H19-C1E1E1E' style={{marginLeft:'20px', marginRight:'20px', whiteSpace:'nowrap', position:'relative'}}>
                Filtro  aplicado:
                {
                    aplicandoFiltroCanal == true || aplicandoFiltroZona == true || aplicandoFiltroGrupo == true || aplicandoFiltroDt == true
                    ?<div 
                        className='Flecha-Retroceder-Scroll-Filtro-Aplicados'
                        onClick={() => {
                            scroll(-60)
                        }}
                    >
                        <LeftOutlined />
                    </div>
                    :null
                }
            </div>
            <div className='Contenedor-Botones-Filtro-Aplicados' ref={refFiltrosAplicados}>
                {

                    aplicandoFiltroCanal == true
                    ?<>
                        {
                            cass.map((cas, pos) => {
                                return (
                                    cas.check == true
                                    ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas'>
                                        {cas.casnombre}
                                        <div 
                                            style={{
                                                position:'absolute',
                                                right: "12px",
                                                fontSize: "12px",
                                                color: "#1E1E1E"
                                            }}
                                            onClick={() => dispatch(EliminarFiltroAplicadoReducer(pos))}
                                        >
                                            <CloseOutlined />
                                        </div>
                                    </div>
                                    :null
                                )
                            })
                        }
                    </>
                    :aplicandoFiltroZona == true
                        ?<>
                            {
                                zonas.map((zona, pos) => {
                                    return (
                                        zona.check == true
                                        ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas'>
                                            {zona.zonnombre}
                                            <div 
                                                style={{
                                                    position:'absolute',
                                                    right: "12px",
                                                    fontSize: "12px",
                                                    color: "#1E1E1E"
                                                }}
                                                onClick={() => dispatch(EliminarFiltroAplicadoReducer(pos))}
                                            >
                                                <CloseOutlined />
                                            </div>
                                        </div>
                                        :null
                                    )
                                })
                            }
                        </>
                        :aplicandoFiltroGrupo == true
                            ?<>
                                {
                                    gsus.map((gsu, pos) => {
                                        return (
                                            gsu.check == true
                                            ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas'>
                                                {gsu.gsunombre}
                                                <div 
                                                    style={{
                                                        position:'absolute',
                                                        right: "12px",
                                                        fontSize: "12px",
                                                        color: "#1E1E1E"
                                                    }}
                                                    onClick={() => dispatch(EliminarFiltroAplicadoReducer(pos))}
                                                >
                                                    <CloseOutlined />
                                                </div>
                                            </div>
                                            :null
                                        )
                                    })
                                }
                            </>
                            :aplicandoFiltroDt == true
                                ?<>
                                    {
                                        sucursalesUsuario.map((sucursal, pos) => {
                                            return (
                                                sucursal.check == true
                                                ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas'>
                                                    {sucursal.sucnombre}
                                                    <div 
                                                        style={{
                                                            position:'absolute',
                                                            right: "12px",
                                                            fontSize: "12px",
                                                            color: "#1E1E1E"
                                                        }}
                                                        onClick={() => dispatch(EliminarFiltroAplicadoReducer(pos))}
                                                    >
                                                        <CloseOutlined />
                                                    </div>
                                                </div>
                                                :null
                                            )
                                        })
                                    }
                                </>
                                :<>
                                    {
                                        sucursalesUsuario.map((sucursal) => {
                                            return(
                                                sucursal.sucid == idSucursalUsuarioSelec
                                                ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas'>
                                                    {sucursal.sucnombre}
                                                    <div 
                                                        style={{
                                                            position:'absolute',
                                                            right: "12px",
                                                            fontSize: "12px",
                                                            color: "#1E1E1E"
                                                        }}
                                                    >
                                                        <CloseOutlined />
                                                    </div>
                                                </div>
                                                :null
                                            )
                                        })
                                    }
                                </>
                }
            </div>

            <div 
                className='Flecha-Avanzar-Scroll-Filtro-Aplicados'
                onClick={() => {
                    scroll(60)
                }}
            >
                <RightOutlined />
            </div>
        </div>
    )
};

export default FiltrosPromociones;
