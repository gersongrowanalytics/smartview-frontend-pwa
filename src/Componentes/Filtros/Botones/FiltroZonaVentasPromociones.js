import React, {useState, useEffect} from 'react';
import { Row, Col } from 'antd';
import IconoFlechaAbajo from '../../../Assets/Img/Filtros/flechaAbajo.png'
import '../../../Estilos/Componentes/Elementos/FiltroZonaVentasPromociones.css'
import {useDispatch, useSelector} from "react-redux";
import {
    SeleccionarSucursalReducer
} from '../../../Redux/Acciones/Sucursales'

const FiltroZonaVentasPromociones = (props) => {

    const dispatch = useDispatch()

    const [mostrarCuerpoFiltro, setMostrarCuerpoFiltro] = useState(false)

    const [idCanalSeleccionada, setIdCanalSeleccionada] = useState(0)
    const [idZonaSeleccionada, setIdZonaSeleccionada] = useState(0)

    const [sucursalSeleccionada, setSucursalSeleccionada] = useState("")


    const {
        cass,
        zonas,
        gsus,
        sucursalesUsuario,
        idSucursalUsuarioSelec
    } = useSelector(({sucursales}) => sucursales);

    const Titulo = props.titulo

    useEffect(() => {

        sucursalesUsuario.map((sucursal) => {
            if(idSucursalUsuarioSelec == sucursal.sucid){
                setSucursalSeleccionada(sucursal.sucnombre)
            }
        })

    }, [sucursalesUsuario])

    return (
        <>
            <div
                style={{
                    // width: "170px",
                    position:'relative',
                    // marginRight:'20px'
                }}
            >
                <div
                    className='Borde-Filtro-Contenedor W600-S14-H19-C1E1E1E'
                    onClick={() => setMostrarCuerpoFiltro(!mostrarCuerpoFiltro)}
                >
                    <div >
                        {
                            sucursalSeleccionada == ""
                            ?Titulo
                            :sucursalSeleccionada
                            
                        }
                    </div>
                    <div>
                        <img src={IconoFlechaAbajo} className='Icono-Flecha-Abajo-Filtro-Ventas' />
                    </div>
                </div>
                {
                    mostrarCuerpoFiltro == true
                    ?<div className='Contenedor-Cuerpo-Filtro-Zonas-Ventas-Promociones'>

                        <div>
                            {
                                cass.map((cas) => {
                                    return(
                                        <div 
                                            className='Fila-Filtro-Zona-Ventas-Promociones Wnormal-S14-H19-L0015-C1E1E1E' 
                                            onClick={ async () => {
                                                if(idCanalSeleccionada == cas.casid){
                                                    setIdCanalSeleccionada(0)
                                                }else{
                                                    setIdCanalSeleccionada(cas.casid)
                                                    let quitarFiltroZona = true
                                                    await zonas.map((zona, pos) => {
                                                        
                                                        if(idZonaSeleccionada == zona.zonid){
                                                            if(zona.casid == cas.casid){
                                                                quitarFiltroZona = false
                                                            }
                                                        }

                                                    })

                                                    if(quitarFiltroZona == true){
                                                        setIdZonaSeleccionada(0)
                                                    }
                                                }
                                            }}
                                            style={
                                                idCanalSeleccionada == cas.casid
                                                ?{background:'#FFFF00',textDecoration:'underline'}
                                                :{}
                                            }
                                        >
                                            {cas.casnombre}
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div style={{paddingRight:'15px'}}>
                            {
                                zonas.map((zona) => {
                                    return( 
                                        idCanalSeleccionada == 0
                                        ?<div 
                                            className='Fila-Filtro-Zona-Ventas-Promociones Wnormal-S14-H19-L0015-C1E1E1E' 
                                            onClick={() => {
                                                if(idZonaSeleccionada == zona.zonid){
                                                    setIdZonaSeleccionada(0)
                                                }else{
                                                    setIdZonaSeleccionada(zona.zonid)
                                                }
                                            }}
                                            style={
                                                idZonaSeleccionada == zona.zonid
                                                ?{background:'#FFFF00', textDecoration:'underline'}
                                                :{}
                                            }
                                        >
                                            {zona.zonnombre}
                                        </div>
                                        :idCanalSeleccionada == zona.casid
                                            ?<div 
                                                className='Fila-Filtro-Zona-Ventas-Promociones Wnormal-S14-H19-L0015-C1E1E1E' 
                                                onClick={() => {
                                                    if(idZonaSeleccionada == zona.zonid){
                                                        setIdZonaSeleccionada(0)
                                                    }else{
                                                        setIdZonaSeleccionada(zona.zonid)
                                                    }
                                                }}
                                                style={
                                                    idZonaSeleccionada == zona.zonid
                                                    ?{background:'#FFFF00', textDecoration:'underline'}
                                                    :{}
                                                }
                                            >
                                                {zona.zonnombre}
                                            </div>
                                            :null
                                    )
                                })
                            }
                        </div>

                        <div style={{display:'flex'}} onClick={() => console.log(sucursalesUsuario)}>
                            {
                                gsus.map((gsu) => {
                                    return (
                                        idCanalSeleccionada == 0
                                        ?idZonaSeleccionada == 0
                                            ?<div style={{paddingRight:'20px'}}>
                                                <div 
                                                    className='Wbold-S14-H19-L0015-C1E1E1E'
                                                >
                                                    {gsu.gsunombre}
                                                </div>
                                                {
                                                    sucursalesUsuario.map((sucursal) => {
                                                        return(
                                                            idCanalSeleccionada == 0
                                                            ?sucursal.gsuid == gsu.gsuid
                                                                ?<div 
                                                                    className='Item-Sucursal-Filtro'
                                                                    onClick={() => {
                                                                        setSucursalSeleccionada(sucursal.sucnombre)
                                                                        setMostrarCuerpoFiltro(false)
                                                                        dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                    }}
                                                                >
                                                                    {sucursal.sucnombre}
                                                                </div>
                                                                :null
                                                            :idCanalSeleccionada == sucursal.casid
                                                                ?sucursal.gsuid == gsu.gsuid
                                                                    ?<div 
                                                                        className='Item-Sucursal-Filtro'
                                                                        onClick={() => {
                                                                            setSucursalSeleccionada(sucursal.sucnombre)
                                                                            setMostrarCuerpoFiltro(false)
                                                                            dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                        }}
                                                                    >
                                                                        {sucursal.sucnombre}
                                                                    </div>
                                                                    :null
                                                                :null
                                                        )
                                                    })
                                                }
                                            </div>
                                            :gsu.zonas.map((gsuzona) => {
                                                return(
                                                    idZonaSeleccionada == gsuzona
                                                    ?<div style={{paddingRight:'20px'}}>
                                                        <div 
                                                            className='Wbold-S14-H19-L0015-C1E1E1E'
                                                        >
                                                            {gsu.gsunombre}
                                                        </div>
                                                        {
                                                            sucursalesUsuario.map((sucursal) => {
                                                                return(
                                                                    idCanalSeleccionada == 0
                                                                    ?sucursal.gsuid == gsu.gsuid
                                                                        ?<div 
                                                                            className='Item-Sucursal-Filtro'
                                                                            onClick={() => {
                                                                                setSucursalSeleccionada(sucursal.sucnombre)
                                                                                setMostrarCuerpoFiltro(false)
                                                                                dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                            }}
                                                                        >
                                                                            {sucursal.sucnombre}
                                                                        </div>
                                                                        :null
                                                                    :idCanalSeleccionada == sucursal.casid
                                                                        ?sucursal.gsuid == gsu.gsuid
                                                                            ?<div 
                                                                                className='Item-Sucursal-Filtro'
                                                                                onClick={() => {
                                                                                    setSucursalSeleccionada(sucursal.sucnombre)
                                                                                    setMostrarCuerpoFiltro(false)
                                                                                    dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                }}
                                                                            >
                                                                                {sucursal.sucnombre}
                                                                            </div>
                                                                            :null
                                                                        :null
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :null
                                                )
                                            })
                                        :idZonaSeleccionada == 0
                                            ?gsu.canales.map((gsucan) => {
                                                return (
                                                    idCanalSeleccionada == gsucan
                                                    ?<div style={{paddingRight:'20px'}}>
                                                        <div 
                                                            className='Wbold-S14-H19-L0015-C1E1E1E'
                                                        >
                                                            {gsu.gsunombre}
                                                        </div>
                                                        {
                                                            sucursalesUsuario.map((sucursal) => {
                                                                return(
                                                                    idCanalSeleccionada == 0
                                                                    ?sucursal.gsuid == gsu.gsuid
                                                                        ?<div 
                                                                            className='Item-Sucursal-Filtro'
                                                                            onClick={() => {
                                                                                setSucursalSeleccionada(sucursal.sucnombre)
                                                                                setMostrarCuerpoFiltro(false)
                                                                                dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                            }}
                                                                        >
                                                                            {sucursal.sucnombre}
                                                                        </div>
                                                                        :null
                                                                    :idCanalSeleccionada == sucursal.casid
                                                                        ?sucursal.gsuid == gsu.gsuid
                                                                            ?<div 
                                                                                className='Item-Sucursal-Filtro'
                                                                                onClick={() => {
                                                                                    setSucursalSeleccionada(sucursal.sucnombre)
                                                                                    setMostrarCuerpoFiltro(false)
                                                                                    dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                }}
                                                                            >
                                                                                {sucursal.sucnombre}
                                                                            </div>
                                                                            :null
                                                                        :null
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :null
                                                )
                                            })
                                            :gsu.zonas.map((gsuzona) => {
                                                return(
                                                    idZonaSeleccionada == gsuzona
                                                    ?<div style={{paddingRight:'20px'}}>
                                                        <div 
                                                            className='Wbold-S14-H19-L0015-C1E1E1E'
                                                        >
                                                            {gsu.gsunombre}
                                                        </div>
                                                        {
                                                            sucursalesUsuario.map((sucursal) => {
                                                                return(
                                                                    idCanalSeleccionada == 0
                                                                    ?sucursal.gsuid == gsu.gsuid
                                                                        ?<div 
                                                                            className='Item-Sucursal-Filtro'
                                                                            onClick={() => {
                                                                                setSucursalSeleccionada(sucursal.sucnombre)
                                                                                setMostrarCuerpoFiltro(false)
                                                                                dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                            }}
                                                                        >
                                                                            {sucursal.sucnombre}
                                                                        </div>
                                                                        :null
                                                                    :idCanalSeleccionada == sucursal.casid
                                                                        ?sucursal.gsuid == gsu.gsuid
                                                                            ?<div 
                                                                                className='Item-Sucursal-Filtro'
                                                                                onClick={() => {
                                                                                    setSucursalSeleccionada(sucursal.sucnombre)
                                                                                    setMostrarCuerpoFiltro(false)
                                                                                    dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                }}
                                                                            >
                                                                                {sucursal.sucnombre}
                                                                            </div>
                                                                            :null
                                                                        :null
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :null
                                                )
                                            })
                                    )
                                })
                            }
                        </div>

                    </div>
                    :null
                }
            </div>
        </>
    )
};

export default FiltroZonaVentasPromociones;
