import React, {useEffect, useState} from 'react'
import { Row, Col, Spin, Input, Tooltip, Modal } from 'antd'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import '../../../Estilos/Rutas/Administrativo/AdministrativoControlArchivo.css'
import FlechaAbajo from '../../../Assets/Img/Administrativo/Usuarios/Angulo-pequeno-hacia-abajo-white.png'
import Excel from '../../../Assets/Img/Administrativo/ControlArchivo/excel.png'
import BanderaPeru from '../../../Assets/Img/Administrativo/Usuarios/Bandera-Perú.png'
import {
    dataControlArchivos,
    dataTiposCargaArchivo,
    EliminarControlArchivosReducer,
    SeleccionarTodoFiltroTipoCarga,
    SeleccionarFiltroTipoCarga,
    dataReporteArchivosReducer
} from '../../../Redux/Acciones/ControlArchivos/ControlArchivos'
import { LeftOutlined, LoadingOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import IconoEditar from '../../../Assets/Img/Administrativo/Permisos/editar.png'
import IconoEditarBlanco from '../../../Assets/Img/Administrativo/Permisos/editarBlanco.png'
import IconoEliminar from '../../../Assets/Img/Administrativo/Permisos/eliminar.png'
import IconoEliminarBlanco from '../../../Assets/Img/Administrativo/Permisos/eliminarBlanco.png'
import IconoGuardar from '../../../Assets/Img/Administrativo/Permisos/guardar.png'
import IconoGuardarBlanco from '../../../Assets/Img/Administrativo/ControlArchivo/Guardar-white.png'
import Moment from 'moment';
import FiltroTipoCarga from '../../../Componentes/Rutas/Administrativo/ControlArchivos/FiltroTipoCarga';
import ReactExport from 'react-data-export';

const ControlArchivo = () => {

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

    const [btnSeleccionado, setBtnSeleccionado] = useState("CONTROL")
    const [paginaActualTabla, setpaginaActualTabla] = useState("1")
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
    const [txtBuscarControlArchivo, setTxtBuscarControlArchivo] = useState("")
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false)
    const [idRegistroControlArchivo, setIdRegistroControlArchivo] = useState("")
    const [filtroTipoCarga, setFiltroTipoCarga] = useState(false)

    const dispatch = useDispatch()
    const { 
        archivosSubidos,
        tiposCargArchivos,
        paginasTotales,
        paginaActual,
        indexRegistro,
        cargandoTablaControlArchivos,
        cargandoBtnModal,
        data_controlarchivos,
        fil_selectodo_data_tipo_carga,
        datosReporteExcelArchivosSubidos
    } = useSelector(({controlArchivos}) => controlArchivos);

    // console.log(datosReporteExcelArchivosSubidos)

    const cargarDatosTabla = async(paginaActualTabla) => {
        await dispatch(dataControlArchivos(paginaActualTabla))
        await dispatch(dataTiposCargaArchivo())
        await dispatch(dataReporteArchivosReducer('2021-07-01','2021-07-30'))
    }

    const obtenerFechaHora = (fechaSinFormato, tipo) => {

        let nuevaFecha = fechaSinFormato.split(" ")
        let dia  = nuevaFecha[0]
        let mes  = nuevaFecha[1]
        let anio = nuevaFecha[2]
    
        if(mes == "Apr"){
            mes = "Abr"
        }else if(mes == "Jan"){
            mes = "Ene"
        }else if(mes == "Dec"){
            mes = "Dic"
        }else if(mes == "Sep"){
            mes = "Set"
        }else if(mes == "Aug"){
            mes = "Ago"
        }
    
        return dia+" "+mes+" "+anio
        // return fechaSinFormato
    
        // if (fechaSinFormato == null) {
        //     return "NaN"
        // }else{
        //     let date = new Date(fechaSinFormato)
        //     if (tipo == 'fecha') {
        //         let dia = date.getDay()
        //         let mes = date.getMonth() 
        //         let anio = date.getFullYear()
        //         return dia+" "+meses[mes]+" "+anio
        //     }else{
        //         let hora = date.getHours()
        //         let minutos = date.getMinutes()
        //         let minutosTxt = minutos.toString();
        //         return hora+":"+ minutosTxt.padStart(2,"0")
        //     }
        // }
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

    const eliminarControlArchivos = async() => {
        if (await dispatch(EliminarControlArchivosReducer(idRegistroControlArchivo)) == true) {
            setMostrarModalEliminar(false)
            setIdRegistroControlArchivo("")
            cargarDatosTabla(paginaActualTabla)
        }
    }

    useEffect(() => {
        cargarDatosTabla(paginaActualTabla)
    },[paginaActualTabla])

    Moment.locale('en');

    return (
        <div className='Contenedor-Administrativo'>
            <Row>
                <Col lg={24} xl={24}>
                    <div className='Titulo-Administrativo'>Administrador</div>
                </Col>
            </Row>
            <Row>
                <Col lg={15} xl={15}>
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
                        <FiltroTipoCarga
                            titulo = {"Tipo de Carga"}
                            mostrarCuerpo = {filtroTipoCarga}
                            setMostrarCuerpo = {() => {
                                setFiltroTipoCarga(!filtroTipoCarga)
                            }}
                            funSeleccionarTodo = {(valor) => {
                                dispatch(SeleccionarTodoFiltroTipoCarga(valor))
                            }}
                            seleccionartodo = {fil_selectodo_data_tipo_carga}
                            aceptarFiltro = {() => {
                                dispatch(dataControlArchivos(paginaActualTabla))
                            }}
                            seleccionarTipo = {(posicion, valor) => {
                                dispatch(SeleccionarFiltroTipoCarga(posicion, valor))
                            }}
                            tiposControlArchivo = {tiposCargArchivos}
                        />
                    </div>
                </Col>
                <Col xl={9}>
                    <div className='Contenedor-Btn-Adm-Usuarios'>
                        <div className='Input-Buscar-Control-Archivo'
                            style={{
                            width: '64%',
                            marginRight: '10px'
                        }}>
                            <Input 
                                suffix = { <SearchOutlined/>}
                                className='Busqueda-Control-Archivos'
                                placeholder='Buscar'
                                value={txtBuscarControlArchivo}
                                onChange={(e) => {
                                    setTxtBuscarControlArchivo(e.target.value)
                                }}
                            />
                        </div>
                        <div className='Paginacion-Control-Archivo'>
                            <div>{data_controlarchivos.from} - {data_controlarchivos.to} de {data_controlarchivos.total}</div>
                            <LeftOutlined 
                                style={{marginLeft:'9px'}}
                                onClick={() => paginaAnterior(paginaActualTabla)}
                            />
                            <RightOutlined
                                style={{marginLeft:'34px'}}
                                onClick={() => paginaSiguiente(paginaActualTabla)}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl={24} style={{display:'flex',justifyContent:'center'}}>
                    <Spin
                        size='large'
                        spinning={cargandoTablaControlArchivos}
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                    >
                        <div className='Contenedor-Tabla-Control'>
                            <table className='Tabla-Adm-Control'>
                                <thead>
                                    <tr>
                                        <th style={{width:'7%'}}>
                                            <div>
                                                <span>Item</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'22%'}}>
                                            <div>
                                                <span>Archivo</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'16%'}}>
                                            <div>
                                                <span>Tipo</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'22%'}}>
                                            <div className='Contenedor-Cabecera-Nombre-Apellido'>
                                                <span>Nombre Apellido</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'8%'}}>
                                            <div>
                                                <span>Pais</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'8%'}}>
                                            <div>
                                                <span>Estado</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{width:'8%'}}>
                                            <div>
                                                <span>Fecha</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                        <th style={{ width: '9%' }}>
                                            <div>
                                                <span>Hora</span>
                                                {/* <img src={FlechaAbajo} style={{width:'7px', marginLeft: '10px'}}/> */}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        archivosSubidos.map((archivo, posicion)=> {
                                            return(
                                                archivo.carnombrearchivo.includes(txtBuscarControlArchivo) || archivo.carnombrearchivo.toLowerCase().includes(txtBuscarControlArchivo.toLowerCase()) ||
                                                archivo.tcanombre.includes(txtBuscarControlArchivo) || archivo.tcanombre.toLowerCase().includes(txtBuscarControlArchivo.toLowerCase())
                                                ?
                                                <tr
                                                    className='Contenedor-Fila-Permisos'
                                                >
                                                    <td>
                                                        {itemTabla(posicion)}
                                                    </td>
                                                    <td>
                                                        <div className='Contenedor-Columna-Archivo'>
                                                            <img src={Excel} style={{width:'30px'}}/>
                                                            <div 
                                                                className='Texto-Columna-Archivo' 
                                                            >
                                                                <a href={archivo.carurl}>
                                                                    {archivo.carnombrearchivo}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{textAlign:'initial'}}>
                                                        {archivo.tcanombre}
                                                    </td>
                                                    <td style={{textAlign:'initial'}}>
                                                        <div className='Texto-Columna-Nombre'>{archivo.pernombrecompleto}</div>
                                                    </td>
                                                    <td>
                                                        <div >
                                                            <span>PE</span>
                                                            <img src={BanderaPeru} style={{width:'30px', marginLeft:'4px'}}/>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* { archivo.estid } */}
                                                        Cargado
                                                    </td>
                                                    <td>
                                                        {obtenerFechaHora(Moment(archivo.created_at).format('D MMM YYYY'))}
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
                                                            {/* <Tooltip
                                                                placement="bottom" 
                                                                title={"Editar"}
                                                            >
                                                                <div
                                                                    style={{ marginRight: "12px"}}
                                                                    className="Contenedor-Icono-Opciones-Permisos"
                                                                    onClick={() => {
                                                                        let editando = true
                                                                        // if(permiso.editando == true){
                                                                        //     editando = false
                                                                        // }
                                                                        
                                                                        // dispatch(HabilitarEditarPermisosReducer(posicion, editando))

                                                                    }}
                                                                > 
                                                                    <img className='Icono-Editar-Permisos' src={IconoEditar} /> 
                                                                    <img className='Icono-Editar-Permisos-Blanco' src={IconoEditarBlanco} /> 
                                                                </div>
                                                            </Tooltip> */}

                                                            <Tooltip
                                                                placement="bottom" 
                                                                title={"Eliminar"}
                                                            >
                                                                <div
                                                                    style={{ marginRight: "10px", }}
                                                                    className="Contenedor-Icono-Opciones-Permisos"
                                                                    onClick={() => {
                                                                        setMostrarModalEliminar(true)
                                                                        setIdRegistroControlArchivo(archivo.carid)
                                                                    }}
                                                                > 
                                                                    <img className='Icono-Eliminar-Permisos' src={IconoEliminar} />
                                                                    <img className='Icono-Eliminar-Permisos-Blanco' src={IconoEliminarBlanco} />
                                                                </div>
                                                            </Tooltip>
                                                            {/* <Tooltip
                                                                placement="bottom" 
                                                                title={"Guardar"}
                                                            >
                                                                <div
                                                                    style={{}}
                                                                    className="Contenedor-Icono-Opciones-Permisos"
                                                                    onClick={() => {
                                                                        // dispatch(EditarPermisoReducer(
                                                                        //     permiso.pemid,
                                                                        //     permiso.nombreEditando,
                                                                        //     permiso.slugEditando,
                                                                        //     permiso.rutaEditando,
                                                                        //     paginaActualTabla
                                                                        // ))
                                                                    }}
                                                                > 
                                                                    <img className='Icono-Guardar-Permisos' src={IconoGuardar} />
                                                                    <img className='Icono-Guardar-Permisos-Blanco' src={IconoGuardarBlanco}/> 
                                                                </div>
                                                            </Tooltip> */}
                                                        </div>
                                                        <div className='Contenedor-Fecha-Permisos'>
                                                            {Moment(archivo.created_at).format('H:mm')}
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
                visible={mostrarModalEliminar}
                footer={null}
                closeIcon={<div></div>}
                width="371px"
                // height="289px"
                className='Caja-Modal-CrearPermiso'
                onCancel={() => setMostrarModalEliminar(false)}
            >
                <div>
                    <div className='Titulo-Modal-Reenviar-Elemento'>
                        Eliminar Archivo
                    </div>
                    <div className='Texto-Modal-Reenviar-Elemento'>
                        ¿Está seguro que desea eliminar el archivo?
                    </div>
                    <div className='Contenedor-Botones-Modal'>
                        <Spin
                            spinning={cargandoBtnModal}
                        >
                            <button 
                                className='Boton-Aceptar-Eliminar-Modal'
                                onClick={() => eliminarControlArchivos()}
                            >
                                Aceptar
                            </button>
                        </Spin>
                        <button 
                            className='Boton-Cancelar-Eliminar-Modal'
                            onClick={() => {
                                setMostrarModalEliminar(false)
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div> 
            </Modal>
           {/* <div>
                <ExcelFile 
                    filename="ReporteControlArchivos"
                    element={<button>Reporte Control Archivos</button>}>
                    <ExcelSheet 
                        dataSet={datosReporteExcelArchivosSubidos}                        
                        name="ReporteControlArchivos"
                    />
                </ExcelFile>
            </div>*/}
        </div>
    )
}

export default ControlArchivo