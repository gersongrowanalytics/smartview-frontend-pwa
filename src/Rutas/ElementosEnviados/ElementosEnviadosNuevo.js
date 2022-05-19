import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { Row, Col, Spin, Modal, Input } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { LeftOutlined, RightOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import '../../Estilos/Rutas/ElementosEnviados/ElementosEnviadosNuevo.css'
import FlechaAbajo from '../../Assets/Img/ElementosEnviados/Angulo-abajo.png'
import FlechaAbajoBlanco from '../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import IconoTelegram from '../../Assets/Img/ElementosEnviados/Avión-Reenviar.png'
import IconoAvionVerde from '../../Assets/Img/ElementosEnviados/Avión-Enviado.png'
import IconoAvionRojo from '../../Assets/Img/ElementosEnviados/Avión-Pendiente.png'

import IconoReenviar from '../../Assets/Img/ElementosEnviados/Reenviar.png'
import IconoEliminar from '../../Assets/Img/ElementosEnviados/Eliminar.png'
import {
    dataElementosEnviados,
    enviarCorreoPromociones,
    eliminarCorreoPromociones,
    dataTiposElementosEnviados,
    SeleccionarTodoFiltroTipoEnvio,
    SeleccionarFiltroTipoEnvio
} from '../../Redux/Acciones/ElementosEnviados/ElementosEnviados.js'

import {
    SeleccionarTodoFiltroDistribuidora,
    SeleccionarFiltroDistribuidora
} from '../../Redux/Acciones/Sucursales'
import FiltroAnioVentasPromociones from '../../Componentes/Filtros/Botones/FiltroAnioVentasPromociones';
import FiltroMesVentasPromociones from '../../Componentes/Filtros/Botones/FiltroMesVentasPromociones';
import FiltroTipoEnvio from '../../Componentes/Rutas/ElementosEnviados/FiltroTipoEnvio';
import FiltroDistribuidora from '../../Componentes/Rutas/ElementosEnviados/FiltroDistribuidora';

const ElementosEnviadosNuevo = () => {

    const [modalAbiertoReenviar, setmodalAbiertoReenviar] = useState(false)
    const [modalAbiertoEliminar, setmodalAbiertoEliminar] = useState(false)
    const [paginaActualTabla, setpaginaActualTabla] = useState("1")
    let n = ['1','2','3','4','5','6','7','8','9']
    const [posicionFilaTabla, setposicionFilaTabla] = useState("")
    const [txtBuscarElementosEnviados, setTxtBuscarElementosEnviados] = useState("")
    const [filtroTipoEnvio, setFiltroTipoEnvio] = useState(false)
    const [filtroDistribuidora, setFiltroDistribuidora] = useState(false)

    const dispatch = useDispatch()
    const { 
        elementosEnviados,
        paginasTotales,
        paginaActual,
        indexRegistro,
        cargandoTablaElementosEnviados,
        data_paginate_elementos_enviados,
        cargandoBtnModal,
        tiposElementosEnviados,
        fil_selectodo_data_tipo_envio
    } = useSelector(({elementosEnviados}) => elementosEnviados);

    const {
        sucursalesUsuario,
        fil_selectodo_data_distribuidora
    } = useSelector(({sucursales}) => sucursales)

    const cargarDatosTabla = async(paginaActualTabla) => {
        await dispatch(dataTiposElementosEnviados())
        await dispatch(dataElementosEnviados(paginaActualTabla))
    }

    const paginaAnterior = (pagina) => {
        if (cargandoTablaElementosEnviados == false) {
            let paginaAnterior = parseFloat(pagina) - 1;
            if (pagina == "1") {
                setpaginaActualTabla("1")
            }else{
                setpaginaActualTabla(paginaAnterior)
            }
        }
    }

    const paginaSiguiente = (pagina) => {
        if (cargandoTablaElementosEnviados == false) {
            let paginaSiguiente = parseFloat(pagina) + 1;
            if (pagina == paginasTotales) {
                setpaginaActualTabla(paginasTotales)
            }else{
                setpaginaActualTabla(paginaSiguiente)
            }
        }
    }

    const itemTabla = (posicion) => {
        return indexRegistro + posicion
     }
 
    const  enviarCorreoElementos = async() => {
        if (await dispatch(enviarCorreoPromociones(elementosEnviados[posicionFilaTabla])) == true) {
            setmodalAbiertoReenviar(!modalAbiertoReenviar)
            setposicionFilaTabla("")
            cargarDatosTabla(paginaActualTabla)
        }
    }

    const eliminarCorreoElementos = async() => {
        if (await dispatch(eliminarCorreoPromociones(elementosEnviados[posicionFilaTabla])) == true) {
            setmodalAbiertoEliminar(!modalAbiertoEliminar)
            setposicionFilaTabla("")
            cargarDatosTabla(paginaActualTabla)
        }
    }

    useEffect(() => {
        cargarDatosTabla(paginaActualTabla)
    },[paginaActualTabla])

    return (
        <div className='Contenedor-Elementos-Enviados'>
            <Row>
                <Col lg={24} xl={24}>
                    <div className='Titulo-Elementos-Enviados'>Elementos Enviados </div>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <div className='Contenedor-Btn-Elementos-Enviados'>

                        <div
                            style={{marginLeft:'-20px'}}
                        >
                            <FiltroAnioVentasPromociones />
                        </div>
                        <div style={{marginRight:'20px', marginLeft:'20px'}}>
                            <FiltroMesVentasPromociones />                    
                        </div>
                        <FiltroTipoEnvio
                            titulo = {"Tipo de Envio"}
                            mostrarCuerpo = {filtroTipoEnvio}
                            setMostrarCuerpo = {() => {
                                setFiltroTipoEnvio(!filtroTipoEnvio)
                            }}
                            funSeleccionarTodo = {(valor) => {
                                dispatch(SeleccionarTodoFiltroTipoEnvio(valor))
                            }}
                            seleccionartodo = {fil_selectodo_data_tipo_envio}
                            aceptarFiltro = {() => {
                                dispatch(dataElementosEnviados(paginaActualTabla))
                            }}
                            seleccionarTipo = {(posicion, valor) => {
                                dispatch(SeleccionarFiltroTipoEnvio(posicion, valor))
                            }}
                            tiposElementosEnviados = {tiposElementosEnviados}
                        />
                        <FiltroDistribuidora
                            titulo = {"Distribuidora"}
                            mostrarCuerpo = {filtroDistribuidora}
                            setMostrarCuerpo = {() => {
                                setFiltroDistribuidora(!filtroDistribuidora)
                            }}
                            funSeleccionarTodo = {(valor) => {
                                dispatch(SeleccionarTodoFiltroDistribuidora(valor))
                            }}
                            seleccionartodo = {fil_selectodo_data_distribuidora}
                            aceptarFiltro = {() => {
                                dispatch(dataElementosEnviados(paginaActualTabla))
                            }}
                            seleccionarTipo = {(posicion, valor) => {
                                dispatch(SeleccionarFiltroDistribuidora(posicion, valor))
                            }}
                            distribuidora = {sucursalesUsuario}
                        />
                            
                        {/* <div className='Btn-Elementos-Enviados' style={{width:'143px', paddingLeft:'12px'}}>
                            <span>Distribuidora</span>
                            <img src={FlechaAbajo} style={{width:'26px'}}/>
                        </div> */}
                    </div>
                </Col>
                <Col xl={12}>
                    <div className='Paginacion-Elementos-Enviados'>
                        <div className='Input-Buscar-Elementos-Enviados'
                            style={{
                            width: '75%',
                            marginRight: '10px'
                        }}>
                            <Input 
                                suffix = { <SearchOutlined/>}
                                className='Busqueda-Elementos-Enviados'
                                placeholder='Buscar'
                                value={txtBuscarElementosEnviados}
                                onChange={(e) => {
                                    setTxtBuscarElementosEnviados(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <span>{data_paginate_elementos_enviados.from} - {data_paginate_elementos_enviados.to} de {data_paginate_elementos_enviados.total} </span>
                            <LeftOutlined 
                                style={{marginRight:'20px'}}
                                onClick={() => paginaAnterior(paginaActualTabla)}
                            />
                            <RightOutlined
                                 onClick={() => paginaSiguiente(paginaActualTabla)}
                            /> 
                        </div>
                    </div>  
                </Col>
            </Row>
            <Row
                style={{
                    textAlign: "-webkit-center",
                }}
            >
                <Col xl={24}>
                    <Spin
                        size='large'
                        // spinning={cargandoTablaElementosEnviados}
                        spinning={false}
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                    >
                        <div className='Contenedor-Tabla-Elementos-Enviados'>
                            <table className='Tabla-Elementos-Enviados'>
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                width: "64px"
                                            }}
                                        >
                                            <div>
                                                <span>Item</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Mes aperturado</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Tipo</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Asunto correo</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Distribuidora</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Destinatario</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Estado</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Fecha</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Hora</span>
                                                {/* <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{width:'60px'}}>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        elementosEnviados.map((data, pos) => {
                                            let sucursales = []
                                            if(data.ucesucursales){
                                                sucursales = JSON.parse(data.ucesucursales)
                                            }

                                            const newDate = new Date(data.ucefecha)
                                            const dia = newDate.getDate()+1;
                                            let mes = newDate.getMonth() + 1;
                                            const anio = newDate.getFullYear();

                                            if(mes == 1){
                                                mes = "Enero"
                                            }else if(mes == 2){
                                                mes = "Febrero"
                                            }else if(mes == 3){
                                                mes = "Marzo"
                                            }else if(mes == 4){
                                                mes = "Abril"
                                            }else if(mes == 5){
                                                mes = "Mayo"
                                            }else if(mes == 6){
                                                mes = "Junio"
                                            }else if(mes == 7){
                                                mes = "Julio"
                                            }else if(mes == 8){
                                                mes = "Agosto"
                                            }else if(mes == 9){
                                                mes = "Setiembre"
                                            }else if(mes == 10){
                                                mes = "Octubre"
                                            }else if(mes == 11){
                                                mes = "Noviembre"
                                            }else if(mes == 12){
                                                mes = "Diciembre"
                                            }

                                            return(
                                                data.ucetipo.includes(txtBuscarElementosEnviados) || data.ucetipo.toLowerCase().includes(txtBuscarElementosEnviados.toLowerCase()) ||
                                                data.dcedestinatario.includes(txtBuscarElementosEnviados) || data.dcedestinatario.toLowerCase().includes(txtBuscarElementosEnviados.toLowerCase())
                                                ?
                                                <tr
                                                    key={data.uceid}
                                                >
                                                    <td>
                                                        {pos+1}
                                                    </td>
                                                    <td>
                                                        {mes}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "-webkit-left"
                                                        }}
                                                    >
                                                        {data.ucetipo}
                                                    </td>
                                                    <td>
                                                        {data.uceasunto}
                                                    </td>
                                                    <td
                                                        onClick={() => {
                                                            // console.log(data.ucesucursales)
                                                            // console.log(JSON.parse(data.ucesucursales))
                                                        }}
                                                        style={{
                                                            position:'relative',
                                                            textAlign: "left"
                                                        }}
                                                        className="Celda-Lista-Sucursales-Elementos-Enviados"
                                                    >
                                                        {
                                                            sucursales.length > 0
                                                            ?sucursales[0]
                                                            :null
                                                        }
                                                        <div className='Contenedor-Lista-Sucursales-Elementos-Enviados'>
                                                            <Row>
                                                                {
                                                                    sucursales.length > 0
                                                                    ? sucursales.map((sucursal) => {
                                                                        return(
                                                                            <Col 
                                                                                xl={12}
                                                                                style={{
                                                                                    paddingRight:'20px'
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    title={sucursal}
                                                                                >
                                                                                    {sucursal.substr(0, 23)}
                                                                                </div>
                                                                            </Col>
                                                                        )
                                                                    })
                                                                    :null
                                                                }
                                                            </Row>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        {data.dcedestinatario}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "left",
                                                            paddingLeft: "5px"
                                                        }}
                                                    >
                                                        {
                                                            data.dceestado == 'E'
                                                            ?<>
                                                                <img src={IconoAvionVerde} style={{width:'19px',marginRight:'5px'}}/>
                                                                <span style={{color:'#00CA8A'}}>Enviado</span>
                                                            </>
                                                            :data.dceestado == 'R'
                                                                ?<>
                                                                    <img src={IconoTelegram} style={{width:'19px',marginRight:'5px'}}/>
                                                                    <span style={{color:'#558CFF'}}>Reenviado</span>
                                                                </>
                                                                :<>
                                                                    <img src={IconoAvionRojo} style={{width:'19px',marginRight:'5px'}}/>
                                                                    <span style={{color:'#EF2206'}}>Pendiente</span>
                                                                </>
                                                        }
                                                        {/* {
                                                            pos == 0 || pos == 1 || pos == 2
                                                            ?<img src={IconoAvionVerde} style={{width:'19px',marginRight:'5px'}}/>
                                                            :pos == 5 || pos == 8
                                                                ?<img src={IconoAvionRojo} style={{width:'19px',marginRight:'5px'}}/>
                                                                :<img src={IconoTelegram} style={{width:'19px',marginRight:'5px'}}/>
                                                        }

                                                        {
                                                            pos == 0 || pos == 1 || pos == 2
                                                            ?<span style={{color:'#00CA8A'}}>Enviado</span>
                                                            :pos == 5 || pos == 8
                                                                ?<span style={{color:'#EF2206'}}>Pendiente</span>
                                                                :<span style={{color:'#558CFF'}}>Reenviado</span>
                                                        } */}
                                                        
                                                        
                                                    </td>
                                                    <td
                                                        style={{
                                                            width:'100px'
                                                        }}
                                                    >
                                                        {/* {data.ucedia} {data.ucemes} {data.uceanio} */}
                                                        {dia} {mes} {anio}
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "45px"
                                                        }}
                                                    >
                                                        {data.ucehora}
                                                    </td>
                                                    <td>
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'                                                            
                                                        }}>
                                                            <div className='Fondo-Icono-Reenviar'>
                                                                <img 
                                                                    className='Icono-Reenviar'
                                                                    src={IconoReenviar} 
                                                                    style={{width:'16px'}}
                                                                    onClick={() => {
                                                                        setmodalAbiertoReenviar(!modalAbiertoReenviar)
                                                                        setposicionFilaTabla(pos)
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className='Fondo-Icono-Eliminar'>
                                                                <img 
                                                                    className='Icono-Eliminar'
                                                                    src={IconoEliminar} 
                                                                    style={{width:'16px'}}
                                                                    onClick={() => {
                                                                        setmodalAbiertoEliminar(!modalAbiertoEliminar)
                                                                        setposicionFilaTabla(pos)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                : null
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Spin>
                </Col>
            </Row>
            <Modal
                centered
                title={null}
                visible={modalAbiertoReenviar}
                footer={null}
                closeIcon={<div></div>}
                width="310px"
                height="139px"
                className='Caja-Modal-ReenviarElemento'
                onCancel={() => setmodalAbiertoReenviar(false)}
            >
                <div>
                    <div className='Titulo-Modal-Reenviar-Elemento'>
                        Reenviar Correo
                    </div>
                    <div className='Texto-Modal-Reenviar-Elemento'>
                        ¿Está seguro que desea reenviar el correo?
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <Spin
                            spinning={cargandoBtnModal}
                        >
                            <button 
                                className='Boton-Aceptar-Eliminar-Modal'
                                onClick={() => enviarCorreoElementos()}
                            >
                                Aceptar
                            </button>
                        </Spin>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmodalAbiertoReenviar(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                centered
                title={null}
                visible={modalAbiertoEliminar}
                footer={null}
                closeIcon={<div></div>}
                width="310px"
                height="139px"
                className='Caja-Modal-ReenviarElemento'
                onCancel={() => setmodalAbiertoEliminar(false)}
            >
                <div>
                    <div className='Titulo-Modal-Reenviar-Elemento'>
                        Eliminar Correo
                    </div>
                    <div className='Texto-Modal-Reenviar-Elemento'>
                        ¿Está seguro que desea eliminar el correo?
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <Spin
                            spinning={cargandoBtnModal}
                        >
                            <button 
                                className='Boton-Aceptar-Eliminar-Modal'
                                onClick={() => eliminarCorreoElementos()}
                            >
                                Aceptar
                            </button>
                        </Spin>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmodalAbiertoEliminar(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ElementosEnviadosNuevo