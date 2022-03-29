import React, {useEffect, useState} from 'react'
import { Row, Col, Spin } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../../Estilos/Rutas/Administrativo/AdministrativoControlArchivo.css'
import FlechaAbajo from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import Excel from '../../../Assets/Img/Administrativo/ControlArchivo/excel.png'
import BanderaPeru from '../../../Assets/Img/Administrativo/Usuarios/Bandera-Perú.png'
import {
    dataControlArchivos
} from '../../../Redux/Acciones/ControlArchivos/ControlArchivos'
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@ant-design/icons';


const ControlArchivo = () => {

    const [btnSeleccionado, setBtnSeleccionado] = useState("CONTROL")
    const [paginaActualTabla, setpaginaActualTabla] = useState("1")
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']

    const dispatch = useDispatch()
    const { 
        archivosSubidos,
        paginasTotales,
        paginaActual,
        indexRegistro,
        cargandoTablaControlArchivos
    } = useSelector(({controlArchivos}) => controlArchivos);

    const cargarDatosTabla = async(paginaActualTabla) => {
        await dispatch(dataControlArchivos(paginaActualTabla))
    }

    const obtenerFechaHora = (fechaSinFormato, tipo) => {
        if (fechaSinFormato == null) {
            return "NaN"
        }else{
            let date = new Date(fechaSinFormato)
            if (tipo == 'fecha') {
                let dia = date.getDay() + 1
                let mes = date.getMonth() 
                let anio = date.getFullYear()
                return dia+" "+meses[mes]+" "+anio
            }else{
                let hora = date.getHours()
                let minutos = date.getMinutes()
                let minutosTxt = minutos.toString();
                return hora+":"+ minutosTxt.padStart(2,"0")
            }
        }
    }

    const paginaAnterior = (pagina) => {
        if (cargandoTablaControlArchivos == false) {
            let paginaAnterior = parseFloat(pagina) - 1;
            if (pagina == "1") {
                setpaginaActualTabla("1")
            }else{
                setpaginaActualTabla(paginaAnterior)
            }
        }
    }

    const paginaSiguiente = (pagina) => {
        if (cargandoTablaControlArchivos == false) {
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
        <div className='Contenedor-Administrativo'>
            <Row>
                <Col lg={24} xl={24}>
                    <div className='Titulo-Administrativo'>Administrador</div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} xl={12}>
                    <div className='Caja-Botones-Administrativo'>
                        <Link to='/administrativo'>
                            <div 
                                className={btnSeleccionado == 'TIPOS' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'159px'}}
                                onClick={() => {setBtnSeleccionado("TIPOS")}}
                            >
                                Tipos Usuarios
                            </div>
                        </Link>
                        <Link to='/administrativo/usuarios'>
                            <div 
                                className={btnSeleccionado == 'USUARIOS' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'149px'}}
                                onClick={() => {setBtnSeleccionado("USUARIOS")}}
                            >
                                Usuarios
                            </div>
                        </Link>
                        <Link to='/administrativo/permisos'>
                            <div 
                                className={btnSeleccionado == 'PERMISOS' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'135px'}}
                                onClick={() => {setBtnSeleccionado("PERMISOS")}}
                            >
                                Permisos
                            </div>
                        </Link>
                        <Link to='/administrativo/control-archivo'>
                            <div 
                                className={btnSeleccionado == 'CONTROL' 
                                    ? 'Btn-Seleccionado-Administrativo' 
                                    : 'Btn-NoSeleccionado-Administrativo'}
                                style={{width:'135px'}}
                                onClick={() => {setBtnSeleccionado("CONTROL")}}
                            >
                                Control de archivo
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className='Paginacion-Control-Archivo'>
                        <div>1 - {paginasTotales} de {paginaActual}</div>
                        <LeftOutlined 
                            style={{marginLeft:'9px'}}
                            onClick={() => paginaAnterior(paginaActualTabla)}
                        />
                        <RightOutlined
                            style={{marginLeft:'34px'}}
                            onClick={() => paginaSiguiente(paginaActualTabla)}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl={24}>
                    <Spin
                        size='large'
                        spinning={cargandoTablaControlArchivos}
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                    >
                        <div className='Contenedor-Tabla-Control'>
                            <table className='Tabla-Adm-Control'>
                                <thead>
                                    <tr>
                                        <th style={{width:'9%'}}>
                                            <div>
                                                <span>Item</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th style={{width:'22%'}}>
                                            <div>
                                                <span>Archivo</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Tipo</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Nombre Apellido</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Pais</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Estado</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Fecha</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                        <th>
                                            <div>
                                                <span>Hora</span>
                                                <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        archivosSubidos.map((archivo, posicion)=> {
                                            return(
                                                <tr>
                                                    <td>
                                                        {itemTabla(posicion)}
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <img src={Excel} style={{width:'30px'}}/>
                                                            <span>{archivo.carnombrearchivo}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {archivo.tcanombre}
                                                    </td>
                                                    <td>
                                                        Nombre Apellido Apellido
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <span>PE</span>
                                                            <img src={BanderaPeru} style={{width:'30px', marginLeft:'4px'}}/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {archivo.estid}
                                                    </td>
                                                    <td>
                                                        {obtenerFechaHora(archivo.created_at,'fecha')}
                                                    </td>
                                                    <td>
                                                        {obtenerFechaHora(archivo.created_at,'hora')}
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
        </div>
    )
}

export default ControlArchivo