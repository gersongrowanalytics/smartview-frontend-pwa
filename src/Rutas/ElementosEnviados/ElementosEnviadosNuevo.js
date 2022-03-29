import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { Row, Col, Spin, Modal } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons'
import '../../Estilos/Rutas/ElementosEnviados/ElementosEnviadosNuevo.css'
import FlechaAbajo from '../../Assets/Img/ElementosEnviados/Angulo-abajo.png'
import FlechaAbajoBlanco from '../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import IconoTelegram from '../../Assets/Img/ElementosEnviados/Avión-Reenviar.png'
import IconoReenviar from '../../Assets/Img/ElementosEnviados/Reenviar.png'
import {
    dataElementosEnviados
} from '../../Redux/Acciones/ElementosEnviados/ElementosEnviados.js'

const ElementosEnviadosNuevo = () => {

    const [modalAbiertoReenviar, setmodalAbiertoReenviar] = useState(false)
    const [paginaActualTabla, setpaginaActualTabla] = useState("1")
    let n = ['1','2','3','4','5','6','7','8','9']

    const dispatch = useDispatch()
    const { 
        elementosEnviados,
        paginasTotales,
        paginaActual,
        indexRegistro,
        cargandoTablaElementosEnviados
    } = useSelector(({elementosEnviados}) => elementosEnviados);

    const cargarDatosTabla = async(paginaActualTabla) => {
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
                        <div className='Btn-Elementos-Enviados' style={{width:'84px'}}>
                            Año
                        </div>
                        <div className='Btn-Elementos-Enviados' style={{width:'84px'}}>
                            Mes
                        </div>
                        <div className='Btn-Elementos-Enviados' style={{width:'143px', paddingLeft:'12px'}}>
                            <span>Tipo de Envio</span>
                            <img src={FlechaAbajo} style={{width:'26px'}}/>
                        </div>
                        <div className='Btn-Elementos-Enviados' style={{width:'143px', paddingLeft:'12px'}}>
                            <span>Distribuidora</span>
                            <img src={FlechaAbajo} style={{width:'26px'}}/>
                        </div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className='Paginacion-Elementos-Enviados'>
                        <div>
                            <span>1 - 20 de 40 </span>
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
            <Row>
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
                                        <th>
                                            <div>
                                                <span>Item</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Tipo</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Distribuidora</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Destinatario</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Estado</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Fecha</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Hora</span>
                                                <img src={FlechaAbajoBlanco} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div style={{width:'30px'}}>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        n.map((e) => {
                                            return(
                                                <tr>
                                                    <td>
                                                        1
                                                    </td>
                                                    <td>
                                                        Prom. Nuevas
                                                    </td>
                                                    <td>
                                                        Despensa de la Selva
                                                    </td>
                                                    <td>
                                                        Nombredestino@.com.pe
                                                    </td>
                                                    <td>
                                                        <img src={IconoTelegram} style={{width:'19px',marginRight:'5px'}}/>
                                                        <span>Reenviado</span>
                                                    </td>
                                                    <td>
                                                        25 Mar 2022
                                                    </td>
                                                    <td>
                                                        8:00
                                                    </td>
                                                    <td>
                                                        <div className='Fondo-Icono-Reenviar'>
                                                            <img 
                                                                src={IconoReenviar} 
                                                                style={{width:'16px'}}
                                                                onClick={() => setmodalAbiertoReenviar(!modalAbiertoReenviar) }
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
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
                        <button className='Boton-Aceptar-Eliminar-Modal'>
                            Aceptar
                        </button>
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
        </div>
    )
}

export default ElementosEnviadosNuevo