import React, {useRef, useState, useEffect} from 'react';
import FiltroAnioVentasPromociones from './Botones/FiltroAnioVentasPromociones';
import FiltroMesVentasPromociones from './Botones/FiltroMesVentasPromociones';
import IconoOjoPromociones from '../../Assets/Img/Promociones/Ojo.png'
import {
    CambiarDisenioPromocionesReducer,
    MostrarPromocionesNuevasReducer
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
import { Tooltip } from 'antd';
import IconoFlechaSiguiente from '../../Assets/Img/Filtros/flechasiguiente.png'
import IconoFlechaSiguienteBlanco from '../../Assets/Img/Filtros/flechablanco.png'
import IconoCerrarNegro from '../../Assets/Img/Filtros/cerrarnegro.png'
import IconoCerrarAzul from '../../Assets/Img/Filtros/cerrarazul.png'
import GifPromNuevas from '../../Assets/Gif/promnuevas.gif'

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

    const [avanzarAutomaticamente, setAvanzarAutomaticamente] = useState(false)
    const [mouseenavanzar, setMouseenavanzar] = useState("0")
    
    useEffect(() => {

        if(mouseenavanzar == "1"){
            
            setTimeout(() => {
                if(avanzarAutomaticamente == true){
                    setAvanzarAutomaticamente(false)
                }else{
                    setAvanzarAutomaticamente(true)
                }
                scroll(60)
            }, 200);
        }else if(mouseenavanzar == "2"){
            setTimeout(() => {
                if(avanzarAutomaticamente == true){
                    setAvanzarAutomaticamente(false)
                }else{
                    setAvanzarAutomaticamente(true)
                }
                scroll(-60)
            }, 200);
        }

    }, [avanzarAutomaticamente])




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
                <div style={{color:'transparent'}}>aaaaaaaa</div>
                <img
                    src={IconoOjoPromociones}
                    className='Img-Ojo-Cambio-Disenio-Promociones'
                />
            </div>

            <div
                className='Btn-Prom-Nueva'
                onClick={() => {
                    dispatch(MostrarPromocionesNuevasReducer())
                }}
            >
                <div className='W600-S14-H19-C1E1E1E-L0015'>
                    Prom. Nuevas
                </div>
                <img src={GifPromNuevas} className="Gif-Prm-Nuevas-Promociones" />
            </div>

            <Link to="/descargas" onClick={() => dispatch(SeleccionarModuloDescargaReducer("Promociones"))}>
                <div className='Contenedor-Btn-Descargar-Ventas'>
                    <div className='Wbold-S14-H19-CFFFFFF'>Descargar</div>
                </div>
            </Link>

            <div className='W600-S14-H19-C1E1E1E' style={{marginLeft:'20px', marginRight:'20px', whiteSpace:'nowrap', position:'relative'}}>
                Filtro aplicado:
                {
                    aplicandoFiltroCanal == true || aplicandoFiltroZona == true || aplicandoFiltroGrupo == true || aplicandoFiltroDt == true
                    ?<Tooltip
                        placement="bottom" 
                        title={"Retroceder"}
                    >
                        <div 
                            className='Flecha-Retroceder-Scroll-Filtro-Aplicados'
                            onClick={() => {
                                scroll(-60)
                            }}
                            onMouseEnter={() => {
                                setMouseenavanzar("2")
                                setAvanzarAutomaticamente(true)
                            }}
                            onMouseLeave={() => {
                                setAvanzarAutomaticamente(false)
                                setMouseenavanzar("0")
                            }}
                        >
                            {/* <LeftOutlined /> */}
                            <img src={IconoFlechaSiguiente} className="Icono-Retroceder-FiltroVentaPromociones" />
                            <img src={IconoFlechaSiguienteBlanco} className="Icono-Retroceder-FiltroVentaPromociones-Blanco" />
                        </div>
                    </Tooltip>
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
                                    ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas W600-S14-H19-C1E1E1E-L0015'>
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
                                            <img src={IconoCerrarNegro} className="Icono-Cerrar-Dt-FiltroVentas" />
                                            <img src={IconoCerrarAzul} className="Icono-Cerrar-Azul-Dt-FiltroVentas" />
                                            {/* <CloseOutlined /> */}
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
                                        ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas W600-S14-H19-C1E1E1E-L0015'>
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
                                                <img src={IconoCerrarNegro} className="Icono-Cerrar-Dt-FiltroVentas" />
                                                <img src={IconoCerrarAzul} className="Icono-Cerrar-Azul-Dt-FiltroVentas" />
                                                {/* <CloseOutlined /> */}
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
                                            ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas W600-S14-H19-C1E1E1E-L0015'>
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
                                                    <img src={IconoCerrarNegro} className="Icono-Cerrar-Dt-FiltroVentas" />
                                                    <img src={IconoCerrarAzul} className="Icono-Cerrar-Azul-Dt-FiltroVentas" />
                                                    {/* <CloseOutlined /> */}
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
                                                ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas W600-S14-H19-C1E1E1E-L0015'>
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
                                                        <img src={IconoCerrarNegro} className="Icono-Cerrar-Dt-FiltroVentas" />
                                                        <img src={IconoCerrarAzul} className="Icono-Cerrar-Azul-Dt-FiltroVentas" />
                                                        {/* <CloseOutlined /> */}
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
                                                ?<div className='Contenedor-Btn-Filtro-Aplicado-FiltroVentas W600-S14-H19-C1E1E1E-L0015'>
                                                    {sucursal.sucnombre}
                                                    <div 
                                                        style={{
                                                            position:'absolute',
                                                            right: "12px",
                                                            fontSize: "12px",
                                                            color: "#1E1E1E"
                                                        }}
                                                    >
                                                        <img src={IconoCerrarNegro} className="Icono-Cerrar-Dt-FiltroVentas" />
                                                        <img src={IconoCerrarAzul} className="Icono-Cerrar-Azul-Dt-FiltroVentas" />
                                                        {/* <CloseOutlined /> */}
                                                    </div>
                                                </div>
                                                :null
                                            )
                                        })
                                    }
                                </>
                }
            </div>
            

            <Tooltip
                placement="bottom" 
                title={"Avanzar"}
            >
                <div 
                    className='Flecha-Avanzar-Scroll-Filtro-Aplicados'
                    onClick={() => {
                        scroll(60)
                    }}
                    onMouseEnter={() => {
                        // scroll(60)
                        setMouseenavanzar("1")
                        setAvanzarAutomaticamente(true)
                    }}
                    onMouseLeave={() => {
                        setAvanzarAutomaticamente(false)
                        setMouseenavanzar("0")
                    }}
                >
                    {/* <RightOutlined /> */}
                    <img src={IconoFlechaSiguiente} className="Icono-Avanzar-FiltroVentaPromociones" />
                    <img src={IconoFlechaSiguienteBlanco} className="Icono-Avanzar-FiltroVentaPromociones-Blanco" />
                    {/* <img src={IconoFlechaSiguiente} className="Icono-Avanzar-FiltroVentaPromociones" /> */}
                </div>
            </Tooltip>
        </div>
    )
};

export default FiltrosPromociones;
