import React, {useEffect, useState} from 'react'
import { Row, Col, Modal, Spin, Tooltip, Input } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../../Estilos/Rutas/Administrativo/AdministrativoPermisos.css'
import Agregar from '../../../Assets/Img/Administrativo/Usuarios/Agregar-blue.png'
import FlechaAbajo from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import FlechaAbajoNegro from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo.png'
import { LeftOutlined, LoadingOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import {
    dataPermisos,
    HabilitarEditarPermisosReducer
} from '../../../Redux/Acciones/Administrativo/Permisos/Permisos'
import IconoEditar from '../../../Assets/Img/Administrativo/Permisos/editar.png'
import IconoEditarBlanco from '../../../Assets/Img/Administrativo/Permisos/editarBlanco.png'
import IconoEliminar from '../../../Assets/Img/Administrativo/Permisos/eliminar.png'
import IconoEliminarBlanco from '../../../Assets/Img/Administrativo/Permisos/eliminarBlanco.png'
import IconoGuardar from '../../../Assets/Img/Administrativo/Permisos/guardar.png'

const Permisos = () => {

    const dispatch = useDispatch()
    const [btnSeleccionado, setBtnSeleccionado] = useState("PERMISOS")
    const [paginaActualTabla, setpaginaActualTabla] = useState("1")
    const [mostrarModalCrear, setmostrarModalCrear] = useState(false)
    const [mostrarSelectCategoria, setmostrarSelectCategoria] = useState(false)
    const [categoriaSeleccionada, setcategoriaSeleccionada] = useState("0")
    const [txtBuscarPermiso, setTxtBuscarPermiso] = useState("")
    const a = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14']
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
    
    const { 
        permisos,
        cargandoTablaPermisos,
        paginasTotales,
        paginaActual,
        indexRegistro,
        data_paginate_permisos,
        data_tipos_permisos
    } = useSelector(({permisos}) => permisos);

    const SeleccionarCategoria = (valor) => {
        setcategoriaSeleccionada(valor)
        setmostrarSelectCategoria(false)
    }

    const paginaAnterior = (pagina) => {
        if (cargandoTablaPermisos == false) {
            let paginaAnterior = parseFloat(pagina) - 1;
            if (pagina == "1") {
                setpaginaActualTabla("1")
            }else{
                setpaginaActualTabla(paginaAnterior)
            }
        }
    }

    const paginaSiguiente = (pagina) => {
        if (cargandoTablaPermisos == false) {
            let paginaSiguiente = parseFloat(pagina) + 1;
            if (pagina == paginasTotales) {
                setpaginaActualTabla(paginasTotales)
            }else{
                setpaginaActualTabla(paginaSiguiente)
            }
        }
    }

    const obtenerFecha = (fechaSinFormato) => {
        if (fechaSinFormato == null) {
            return "NaN"
        }else{
            let date = new Date(fechaSinFormato)
            let dia = date.getDay() + 1
            let mes = date.getMonth() 
            let anio = date.getFullYear()
            return dia+" "+meses[mes]+" "+anio
        }
    }

    const cargarDatosTabla = async(paginaActualTabla) => {
        await dispatch(dataPermisos(paginaActualTabla))
    }

    useEffect(() => {
        cargarDatosTabla(paginaActualTabla)
    },[paginaActualTabla])

    return (
        <div 
            className='Contenedor-Administrativo'
            style={{
                marginBottom:'200px'
            }}
        >
            <Row>
                <Col lg={24} xl={24}>
                    <div className='Titulo-Administrativo'>Administrador</div>
                </Col>
            </Row>
            <Row>
                <Col lg={13} xl={13}>
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
                <Col lg={11} xl={11}>
                    <div className='Contenedor-Btn-Adm-Usuarios'>
                        <div 
                            className='Input-Buscar-Permisos'
                            style={{
                                width: '49%',
                                marginRight: '10px'
                        }}>
                            <Input 
                                suffix = { <SearchOutlined/>}
                                className='Busqueda-Permisos'
                                placeholder='Buscar'
                                value={txtBuscarPermiso}
                                onChange={(e) => {
                                    setTxtBuscarPermiso(e.target.value)
                                }}
                            />
                        </div>
                        <div className='Paginacion-Control-Archivo' style={{paddingTop:'0px'}}>
                            {/* <div>1 - {paginasTotales} de {paginaActual}</div> */}
                            
                            {
                                data_paginate_permisos
                                ?<div>{data_paginate_permisos.from} - {data_paginate_permisos.to} de {data_paginate_permisos.total}</div>
                                :null
                            }
                            
                            
                            <LeftOutlined 
                                style={{marginLeft:'9px'}}
                                onClick={() => paginaAnterior(paginaActualTabla)}
                            />
                            <RightOutlined
                                style={{marginLeft:'34px'}}
                                onClick={() => paginaSiguiente(paginaActualTabla)}
                            />
                        </div>
                        <div 
                            className='Btn-Crear-Administrativo-Usuario'
                            onClick={() => {
                                setmostrarModalCrear(true)
                            }}
                        >
                            <span className='Texto-Btn-Adm-Usuarios'>Crear</span>
                            <img src={Agregar} style={{width: '25px'}}></img>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl={24} style={{display:'flex',justifyContent:'center'}}>
                    <Spin
                        size='large'
                        spinning={cargandoTablaPermisos}
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                    >
                        <div className='Contenedor-Tabla-Permisos'>
                            <table className='Tabla-Adm-Permisos'>
                                <thead>
                                    <tr>
                                        <th style={{width:'10%'}}>
                                            <div>
                                                <span>Item</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th  style={{width:'15%'}}>
                                            <div>
                                                <span>Categoría</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'20%'}}>
                                            <div>
                                                <span>Permiso</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'20%'}}>
                                            <div>
                                                <span>Slug</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'20%'}}>
                                            <div>
                                                <span>Ruta</span>
                                            </div>
                                        </th>
                                        <th style={{width:'15%'}}>
                                            <div>
                                                <span>Fecha de Creación</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        permisos.map((permiso, posicion) => {
                                            
                                            return(
                                                permiso.tpenombre.includes(txtBuscarPermiso) || permiso.tpenombre.toLowerCase().includes(txtBuscarPermiso.toLowerCase()) ||
                                                permiso.pemnombre.includes(txtBuscarPermiso) || permiso.pemnombre.toLowerCase().includes(txtBuscarPermiso.toLowerCase()) ||
                                                permiso.pemslug.includes(txtBuscarPermiso) || permiso.pemslug.toLowerCase().includes(txtBuscarPermiso.toLowerCase()) ||
                                                permiso.pemruta.includes(txtBuscarPermiso) || permiso.pemruta.toLowerCase().includes(txtBuscarPermiso.toLowerCase())
                                                ?
                                                <tr
                                                    className='Contenedor-Fila-Permisos'
                                                >
                                                    <td
                                                        style={{
                                                            padding: "11px 0px 11px 0px"
                                                        }}
                                                    >
                                                        {indexRegistro + posicion}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlignLast: "left"
                                                        }}
                                                    >
                                                        {permiso.tpenombre}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "left",
                                                            paddingRight: "40px"
                                                        }}
                                                    >
                                                        <div 
                                                            className='Texto-Columna' 
                                                            style={{width: '220px'}}
                                                            title={permiso.pemnombre}
                                                        >
                                                            {permiso.pemnombre}
                                                        </div>
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: "left"
                                                        }}
                                                    >
                                                        <div 
                                                            className='Texto-Columna' 
                                                            style={{width: '220px'}}
                                                            title={permiso.pemslug}
                                                        >
                                                            {permiso.pemslug}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div 
                                                            className='Texto-Columna' 
                                                            style={{width: '220px'}}
                                                            title={permiso.pemruta}
                                                        >
                                                            {permiso.pemruta}
                                                        </div>
                                                    </td>
                                                    <td>

                                                        <div
                                                            style={{
                                                                // display:'flex',
                                                                alignItems: 'center',
                                                                placeContent: 'center'
                                                            }}
                                                            className="Contenedor-Opciones-Permisos"
                                                        >
                                                            <Tooltip
                                                                placement="bottom" 
                                                                title={"Editar"}
                                                            >
                                                                <div
                                                                    style={{ marginRight: "12px"}}
                                                                    className="Contenedor-Icono-Opciones-Permisos"
                                                                > 
                                                                    <img className='Icono-Editar-Permisos' src={IconoEditar} /> 
                                                                    <img className='Icono-Editar-Permisos-Blanco' src={IconoEditarBlanco} /> 
                                                                </div>
                                                            </Tooltip>

                                                            <Tooltip
                                                                placement="bottom" 
                                                                title={"Eliminar"}
                                                            >
                                                                <div
                                                                    style={{ marginRight: "10px", }}
                                                                    className="Contenedor-Icono-Opciones-Permisos"
                                                                > 
                                                                    <img className='Icono-Eliminar-Permisos' src={IconoEliminar} />
                                                                    <img className='Icono-Eliminar-Permisos-Blanco' src={IconoEliminarBlanco} />
                                                                </div>
                                                            </Tooltip>
                                                            <Tooltip
                                                                placement="bottom" 
                                                                title={"Guardar"}
                                                            >
                                                                <div
                                                                    style={{}}
                                                                    className="Contenedor-Icono-Opciones-Permisos"
                                                                > 
                                                                    <img className='Icono-Guardar-Permisos' src={IconoGuardar} /> 
                                                                </div>
                                                            </Tooltip>
                                                            
                                                        </div>
                                                        
                                                        <div
                                                            className='Contenedor-Fecha-Permisos'
                                                        >
                                                            {obtenerFecha(permiso.created_at)}
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
                visible={mostrarModalCrear}
                footer={null}
                closeIcon={<div></div>}
                width="371px"
                height="289px"
                className='Caja-Modal-CrearPermiso'
                onCancel={() => setmostrarModalCrear(false)}
            >
                <div>
                    <div className='Titulo-Modal-Crear-Permiso'>
                        Nuevo Permiso
                    </div>
                    <div>
                        <Row style={{marginTop:'21px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Categoría</span>
                            </Col>
                            <Col xl={17}>
                                <div className='Modal-Select-Crear-Permiso'>
                                    {
                                        categoriaSeleccionada != "0" ? (
                                            <div className='Texto-Categoria-Seleccionada-Modal'>{categoriaSeleccionada}</div>
                                        ) : (
                                            <input className='Modal-Input-Select-Crear-Permiso' placeholder='Escribir aquí'/>
                                        )
                                    }
                                    <img 
                                        src={FlechaAbajoNegro} 
                                        style={{width: '20px', cursor:'pointer'}}
                                        onClick={()=>setmostrarSelectCategoria(!mostrarSelectCategoria)}
                                    />
                                </div>
                                <div 
                                    className={mostrarSelectCategoria == true 
                                            ? 'Contenedor-Select-Categoria-Modal'
                                            : 'Contenedor-Select-Categoria-Modal-Ocultar'}
                                >
                                    {
                                        data_tipos_permisos.map((tpe)=>{
                                            return (
                                                <div 
                                                    className='Opciones-Select-Categoria-Modal'
                                                    onClick={()=> {
                                                        SeleccionarCategoria(tpe.tpenombre)
                                                    }}
                                                >
                                                    <span>{tpe.tpenombre}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Permiso:</span>
                            </Col>
                            <Col xl={17}>
                                <input className='Modal-Input-Crear-Permiso' placeholder='Escribir aquí'/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Slug:</span>
                            </Col>
                            <Col xl={17}>
                                <input className='Modal-Input-Crear-Permiso' placeholder='Escribir aquí'/>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '16px', marginBottom:'21px'}}>
                            <Col xl={7}>
                                <span className='Campo-Texto-Modal-Crear-Permiso'>Ruta:</span>
                            </Col>
                            <Col xl={17} >
                                <input className='Modal-Input-Crear-Permiso' placeholder='Escribir aquí'/>
                            </Col>
                        </Row>
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <button className='Boton-Aceptar-Eliminar-Modal'>
                            Guardar
                        </button>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setmostrarModalCrear(false)
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

export default Permisos