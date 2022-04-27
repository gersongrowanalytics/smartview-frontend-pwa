import React, {useState, useEffect} from 'react';
import { Row, Col, Checkbox } from 'antd';
import IconoFlechaAbajo from '../../../Assets/Img/Filtros/flechaAbajo.png'
import '../../../Estilos/Componentes/Elementos/FiltroZonaVentasPromociones.css'
import {useDispatch, useSelector} from "react-redux";
import {
    SeleccionarSucursalReducer
} from '../../../Redux/Acciones/Sucursales'
import {
    ObtenerVentasAcumuladaReducer
} from '../../../Redux/Acciones/Ventas/Ventas'

import {
    ObtenerPromocionesAcumuladasReducer
} from '../../../Redux/Acciones/Promociones/Promociones'

import {
    SeleccionarFiltroCanalReducer,
    SeleccionarFiltroZonaReducer,
    SeleccionarFiltroGrupoReducer,
    SeleccionarFiltroSucursalesReducer,
    CambiarAplicandoFiltroAcumuladoReducer
} from '../../../Redux/Acciones/FiltrosVentasPromociones'


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
        idSucursalUsuarioSelec,
        aplicandoFiltroAcumulado
    } = useSelector(({sucursales}) => sucursales);

    const Titulo = props.titulo
    const Filtro = props.filtro

    useEffect(() => {

        sucursalesUsuario.map((sucursal) => {
            if(idSucursalUsuarioSelec == sucursal.sucid){
                setSucursalSeleccionada(sucursal.sucnombre)
            }
        })

    }, [sucursalesUsuario])

    useEffect(() => {

        cass.map(async (cas, posCas) => {
            if(posCas == 1){
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
                    onMouseEnter={() => {
                        // console.log('enter mouse')
                        setMostrarCuerpoFiltro(true)
                        // alert('click enter')
                    }}
                >
                    <div >
                        {/* {
                            sucursalSeleccionada == ""
                            ?Titulo
                            :sucursalSeleccionada
                            
                        } */}
                        {"Sales Office"}
                    </div>
                    <div>
                        <img src={IconoFlechaAbajo} className='Icono-Flecha-Abajo-Filtro-Ventas' />
                    </div>
                </div>
                {
                    mostrarCuerpoFiltro == true
                    ?<div 
                        className='Linea-Filtro-Zona-Venta-Promociones'
                        onClick={() => {
                            // console.log(cass)
                            // console.log(zonas)
                            // console.log(gsus)
                            // console.log(sucursalesUsuario)
                            // console.log(idSucursalUsuarioSelec)
                            // console.log(aplicandoFiltroAcumulado)
                        }}
                    ></div>
                    :null
                }

                {
                    mostrarCuerpoFiltro == true
                    ?<div 
                        className='Contenedor-Cuerpo-Filtro-Zonas-Ventas-Promociones'
                        id="ID-Contenedor-Cuerpo-Filtro-Zonas-Ventas-Promociones"
                        style={
                            sucursalesUsuario.length == 1
                            ?{
                                width: "auto",
                                height:'auto'
                            }
                            :{}
                        }
                    >

                        <div>
                            {
                                sucursalesUsuario.length == 1
                                ?null
                                :cass.map((cas, posCas) => {
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
                                                ?{
                                                    background:'#E6F1FC',textDecoration:'underline',
                                                    borderLeft:'7px solid #3646C4'
                                                }
                                                :{borderLeft:'7px solid transparent'}
                                            }
                                        >

                                            <div style={{marginRight:'5px', position:'absolute', top: "6px"}}>
                                                <Checkbox 
                                                    className='Check-FiltroZonaVentasPromociones'
                                                    checked={cas.check} 
                                                    onChange={(e) => dispatch(SeleccionarFiltroCanalReducer(posCas, e.target.checked))}
                                                ></Checkbox>
                                            </div>
                                            <div style={{position:'absolute', left:'40px'}}>
                                                {cas.casnombre}
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        {
                            sucursalesUsuario.length == 1
                            ?null
                            :<div 
                                className='Linea-Filtro-Zonas-Ventas-Promociones'
                                style={{
                                    position: "relative"
                                }}
                            >
                                a
                            </div>
                        }

                        <div style={{paddingRight:'15px'}}>
                            {
                                sucursalesUsuario.length == 1
                                ?null
                                :zonas.map((zona, posZona) => {
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
                                                ?{background:'#E6F1FC', textDecoration:'underline'}
                                                :{}
                                            }
                                        >
                                            <div style={{marginRight:'5px', position:'absolute', top: "6px"}}>
                                                <Checkbox 
                                                    className='Check-FiltroZonaVentasPromociones'
                                                    onChange={(e) => dispatch(SeleccionarFiltroZonaReducer(posZona, e.target.checked))}
                                                    checked={zona.check} ></Checkbox>
                                            </div>
                                            <div style={{position:'absolute', left:'40px'}}>
                                                {zona.zonnombre}
                                            </div>
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
                                                    ?{background:'#E6F1FC', textDecoration:'underline'}
                                                    :{}
                                                }
                                            >
                                                <div style={{marginRight:'5px', position:'absolute', top: "6px"}}>
                                                    <Checkbox 
                                                        className='Check-FiltroZonaVentasPromociones'
                                                        onChange={(e) => dispatch(SeleccionarFiltroZonaReducer(posZona, e.target.checked))}
                                                        checked={zona.check}></Checkbox>
                                                </div>
                                                <div style={{position:'absolute', left:'40px'}}>
                                                    {zona.zonnombre}
                                                </div>
                                            </div>
                                            :null
                                    )
                                })
                            }
                        </div>
                        

                        {
                            sucursalesUsuario.length == 1
                            ?null
                            :<div 
                                className='Linea-Filtro-Zonas-Ventas-Promociones'
                                style={{
                                    position: "relative"
                                }}
                            >
                                a
                            </div>
                        }

                        {
                            sucursalesUsuario.length == 1
                            ?sucursalesUsuario.map((sucursal, posSucursal) => {
                                return(
                                    <div 
                                        className='Item-Sucursal-Filtro'
                                    >
                                        <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                            <Checkbox 
                                                className='Check-FiltroZonaVentasPromociones'
                                                onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                checked={sucursal.check}></Checkbox>
                                        </div>
                                        <div 
                                            style={{position:'absolute', left:'25px', top:'1px'}}
                                            onClick={() => {
                                                // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                // setSucursalSeleccionada(sucursal.sucnombre)
                                                // setMostrarCuerpoFiltro(false)
                                                // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                            }}
                                        >
                                            {sucursal.sucnombre}
                                        </div>
                                    </div>
                                )
                            })
                            :null
                        }


                        {
                            sucursalesUsuario.length == 1
                            ?null
                            :<div style={{display:'flex', paddingLeft:'15px'}} onClick={() => console.log(sucursalesUsuario)}>
                                {
                                    gsus.map((gsu, posGsu) => {
                                        return (
                                            gsu.gsuid != 0
                                            ?idCanalSeleccionada == 0
                                                ?idZonaSeleccionada == 0
                                                    ?<div style={{paddingRight:'20px'}}>
                                                        <div 
                                                            className='Wbold-S14-H19-L0015-C1E1E1E'
                                                            style={{
                                                                marginBottom:'4px', position:'relative',
                                                                width: "190px",
                                                                height: "30px",
                                                                display:'flex'
                                                            }}
                                                        >
                                                            <div style={{marginRight:'5px', position:'absolute', top: "4px"}}>
                                                                <Checkbox 
                                                                    className='Check-FiltroZonaVentasPromociones'
                                                                    onChange={(e) => dispatch(SeleccionarFiltroGrupoReducer(posGsu, e.target.checked))}
                                                                    checked={gsu.check}></Checkbox>
                                                            </div>
                                                            <div style={{position:'absolute', left:'25px', top: "4px"}}>
                                                                {gsu.gsunombre}
                                                            </div>
                                                        </div>
                                                        {
                                                            sucursalesUsuario.map((sucursal, posSucursal) => {
                                                                return(
                                                                    idCanalSeleccionada == 0
                                                                    ?sucursal.gsuid == gsu.gsuid
                                                                        ?<div 
                                                                            className='Item-Sucursal-Filtro'
                                                                            style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                        >
                                                                            <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                <Checkbox 
                                                                                    className='Check-FiltroZonaVentasPromociones'
                                                                                    onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                    checked={sucursal.check}></Checkbox>
                                                                            </div>
                                                                            <div 
                                                                                style={{position:'absolute', left:'25px', top:'1px'}}
                                                                                onClick={() => {
                                                                                    // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                    // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                    // setMostrarCuerpoFiltro(false)
                                                                                    // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                    dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                }}
                                                                            >
                                                                                {sucursal.sucnombre}
                                                                            </div>
                                                                        </div>
                                                                        :null
                                                                    :idCanalSeleccionada == sucursal.casid
                                                                        ?sucursal.gsuid == gsu.gsuid
                                                                            ?<div 
                                                                                className='Item-Sucursal-Filtro' 
                                                                                style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                            >
                                                                                <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                    <Checkbox 
                                                                                        className='Check-FiltroZonaVentasPromociones'
                                                                                        onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                        checked={sucursal.check}></Checkbox>
                                                                                </div>
                                                                                <div
                                                                                    onClick={() => {
                                                                                        // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                        // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                        // setMostrarCuerpoFiltro(false)
                                                                                        // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                        dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                    }} 
                                                                                    style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                    {sucursal.sucnombre}
                                                                                </div>
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
                                                                    style={{
                                                                        marginBottom:'4px', position:'relative',
                                                                        width: "190px",
                                                                        height: "30px",
                                                                        display:'flex'
                                                                    }}
                                                                >
                                                                    <div style={{marginRight:'5px', position:'absolute', top: "4px"}}>
                                                                        <Checkbox 
                                                                            className='Check-FiltroZonaVentasPromociones'
                                                                            onChange={(e) => dispatch(SeleccionarFiltroGrupoReducer(posGsu, e.target.checked))}
                                                                            checked={gsu.check}></Checkbox>
                                                                    </div>
                                                                    <div style={{position:'absolute', left:'25px', top: "4px"}}>
                                                                        {gsu.gsunombre}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    sucursalesUsuario.map((sucursal, posSucursal) => {
                                                                        return(
                                                                            idCanalSeleccionada == 0
                                                                            ?sucursal.gsuid == gsu.gsuid
                                                                                ?<div 
                                                                                    className='Item-Sucursal-Filtro'
                                                                                    style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                                >
                                                                                    <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                        <Checkbox 
                                                                                            className='Check-FiltroZonaVentasPromociones'
                                                                                            onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                            checked={sucursal.check}></Checkbox>
                                                                                    </div>
                                                                                    <div
                                                                                        onClick={() => {
                                                                                            // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                            // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                            // setMostrarCuerpoFiltro(false)
                                                                                            // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                            dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                        }} 
                                                                                        style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                        {sucursal.sucnombre}
                                                                                    </div>
                                                                                </div>
                                                                                :null
                                                                            :idCanalSeleccionada == sucursal.casid
                                                                                ?sucursal.gsuid == gsu.gsuid
                                                                                    ?<div 
                                                                                        className='Item-Sucursal-Filtro'
                                                                                        style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                                    >
                                                                                        <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                            <Checkbox 
                                                                                                className='Check-FiltroZonaVentasPromociones'
                                                                                                onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                                checked={sucursal.check}></Checkbox>
                                                                                        </div>
                                                                                        <div
                                                                                            onClick={() => {
                                                                                                // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                                // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                                // setMostrarCuerpoFiltro(false)
                                                                                                // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                                dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                            }} 
                                                                                            style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                            {sucursal.sucnombre}
                                                                                        </div>
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
                                                                    style={{
                                                                        marginBottom:'4px', position:'relative',
                                                                        width: "190px",
                                                                        height: "30px",
                                                                        display:'flex'
                                                                    }}
                                                                >
                                                                    <div style={{marginRight:'5px', position:'absolute', top: "4px"}}>
                                                                        <Checkbox 
                                                                            className='Check-FiltroZonaVentasPromociones'
                                                                            onChange={(e) => dispatch(SeleccionarFiltroGrupoReducer(posGsu, e.target.checked))}
                                                                            checked={gsu.check}></Checkbox>
                                                                    </div>
                                                                    <div style={{position:'absolute', left:'25px', top: "4px"}}>
                                                                        {gsu.gsunombre}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    sucursalesUsuario.map((sucursal, posSucursal) => {
                                                                        return(
                                                                            idCanalSeleccionada == 0
                                                                            ?sucursal.gsuid == gsu.gsuid
                                                                                ?<div 
                                                                                    className='Item-Sucursal-Filtro'
                                                                                    style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                                >
                                                                                    <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                        <Checkbox 
                                                                                            className='Check-FiltroZonaVentasPromociones'
                                                                                            onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                            checked={sucursal.check}></Checkbox>
                                                                                    </div>
                                                                                    <div
                                                                                        onClick={() => {
                                                                                            // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                            // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                            // setMostrarCuerpoFiltro(false)
                                                                                            // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                            dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                        }} 
                                                                                        style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                        {sucursal.sucnombre}
                                                                                    </div>
                                                                                </div>
                                                                                :null
                                                                            :idCanalSeleccionada == sucursal.casid
                                                                                ?sucursal.gsuid == gsu.gsuid
                                                                                    ?<div 
                                                                                        className='Item-Sucursal-Filtro'
                                                                                        style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                                    >
                                                                                        <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                            <Checkbox 
                                                                                                className='Check-FiltroZonaVentasPromociones'
                                                                                                onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                                checked={sucursal.check}></Checkbox>
                                                                                        </div>
                                                                                        <div
                                                                                            onClick={() => {
                                                                                                // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                                // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                                // setMostrarCuerpoFiltro(false)
                                                                                                // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                                dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                            }} 
                                                                                            style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                            {sucursal.sucnombre}
                                                                                        </div>
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
                                                                    style={{
                                                                        marginBottom:'4px', position:'relative',
                                                                        width: "190px",
                                                                        height: "30px",
                                                                        display:'flex'
                                                                    }}
                                                                >
                                                                    <div style={{marginRight:'5px', position:'absolute', top: "4px"}}>
                                                                        <Checkbox 
                                                                            className='Check-FiltroZonaVentasPromociones'
                                                                            onChange={(e) => dispatch(SeleccionarFiltroGrupoReducer(posGsu, e.target.checked))}
                                                                            checked={gsu.check}></Checkbox>
                                                                    </div>
                                                                    <div style={{position:'absolute', left:'25px', top: "4px"}}>
                                                                        {gsu.gsunombre}
                                                                    </div>
                                                                </div>
                                                                {
                                                                    sucursalesUsuario.map((sucursal, posSucursal) => {
                                                                        return(
                                                                            idCanalSeleccionada == 0
                                                                            ?sucursal.gsuid == gsu.gsuid
                                                                                ?<div 
                                                                                    className='Item-Sucursal-Filtro'
                                                                                    style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                                >
                                                                                    <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                        <Checkbox 
                                                                                            className='Check-FiltroZonaVentasPromociones'
                                                                                            onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                            checked={sucursal.check} ></Checkbox>
                                                                                    </div>
                                                                                    <div
                                                                                        onClick={() => {
                                                                                            // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                            // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                            // setMostrarCuerpoFiltro(false)
                                                                                            // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                            dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                        }} 
                                                                                        style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                        {sucursal.sucnombre}
                                                                                    </div>
                                                                                </div>
                                                                                :null
                                                                            :idCanalSeleccionada == sucursal.casid
                                                                                ?sucursal.gsuid == gsu.gsuid
                                                                                    ?<div 
                                                                                        className='Item-Sucursal-Filtro'
                                                                                        style={gsu.gsuid == 6?{width: "250px"}:{}}
                                                                                    >
                                                                                        <div style={{marginRight:'5px', position:'absolute', top: "2px"}}>
                                                                                            <Checkbox 
                                                                                                className='Check-FiltroZonaVentasPromociones'
                                                                                                onChange={(e) => dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, e.target.checked))}
                                                                                                checked={sucursal.check}></Checkbox>
                                                                                        </div>
                                                                                        <div
                                                                                            onClick={() => {
                                                                                                // CUANDO SELECCIONAMOS UNA SUCURSAL DESDE EL NOMBRE SE REINICIA TODO LO FILTRADO POR CHECKBOX Y SOLO SE FILTR EL SELECCIONADO
                                                                                                // setSucursalSeleccionada(sucursal.sucnombre)
                                                                                                // setMostrarCuerpoFiltro(false)
                                                                                                // dispatch(SeleccionarSucursalReducer(sucursal.sucid))
                                                                                                dispatch(SeleccionarFiltroSucursalesReducer(posSucursal, !sucursal.check))
                                                                                            }} 
                                                                                            style={{position:'absolute', left:'25px', top:'1px'}}>
                                                                                            {sucursal.sucnombre}
                                                                                        </div>
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
                                            :null
                                        )
                                    })
                                }
                            </div>
                        }

                    </div>
                    :null
                }
            </div>

            {
                mostrarCuerpoFiltro == true
                ?<div
                    onMouseEnter={() => {
                        setMostrarCuerpoFiltro(false)
                        if(Filtro == "VENTAS"){
                            if(aplicandoFiltroAcumulado == true){
                                dispatch(ObtenerVentasAcumuladaReducer())
                            }else{
                                dispatch(CambiarAplicandoFiltroAcumuladoReducer())
                            }
                        }else if(Filtro == "PROMOCIONES"){
                            if(aplicandoFiltroAcumulado == true){

                                dispatch(ObtenerPromocionesAcumuladasReducer())

                            }else{
                                dispatch(CambiarAplicandoFiltroAcumuladoReducer())
                            }
                        }
                    }}
                    style={{
                        position:'absolute',
                        width:'100%',
                        height:'100vh',
                        background:'black',
                        top:'0px',
                        left:'0',
                        zIndex:'1',
                        opacity:'0'
                    }}
                    onClick={() => {
                        setMostrarCuerpoFiltro(!mostrarCuerpoFiltro)

                        if(Filtro == "VENTAS"){
                            if(aplicandoFiltroAcumulado == true){
                                dispatch(ObtenerVentasAcumuladaReducer())
                            }else{
                                dispatch(CambiarAplicandoFiltroAcumuladoReducer())
                            }
                        }else if(Filtro == "PROMOCIONES"){
                            if(aplicandoFiltroAcumulado == true){

                                dispatch(ObtenerPromocionesAcumuladasReducer())

                            }else{
                                dispatch(CambiarAplicandoFiltroAcumuladoReducer())
                            }
                        }
                    }}
                >

                </div>
                :null
            }
        </>
    )
};

export default FiltroZonaVentasPromociones;
