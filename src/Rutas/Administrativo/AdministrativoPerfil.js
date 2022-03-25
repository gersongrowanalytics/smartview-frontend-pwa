import React, {useEffect, useState} from 'react'
import { Row, Col, Switch } from 'antd'
import { Link } from "react-router-dom"
import '../../Estilos/Rutas/Administrativo/AdministrativoPerfil.css'
import FlechaAbajo from '../../Assets/Img/Administrativo/Perfil/caret-down-black.png'
import FlechaDerecha from '../../Assets/Img/Administrativo/Perfil/caret-right-black.png'
import ImagenPerfil from '../../Assets/Img/Administrativo/Perfil/Completo-Administrador.png'
import Editar from '../../Assets/Img/Administrativo/Perfil/Editar-white.png'
import Cerrar from '../../Assets/Img/Administrativo/Perfil/Cortar.png'
import Check from  '../../Assets/Img/Administrativo/Perfil/Palomita-white.png'

const AdministrativoPerfil = () => {

    const [btnSeleccionado, setBtnSeleccionado] = useState("TIPOS")
    const [anioSeleccionado, setanioSeleccionado] = useState("0")
    const [mesSeleccionado, setmesSeleccionado] = useState("0")
    const [canalesSeleccionados, setcanalesSeleccionados] = useState(true)
    const [editando, seteditando] = useState(false)
    const [canalModerno, setcanalModerno] = useState(true)
    const [canalTradicional, setcanalTradicional] = useState(true)
    
    const [anioOpcionesAbierto, setanioOpcionesAbierto] = useState(false)
    const [mesOpcionesAbierto, setmesOpcionesAbierto] = useState(false)
    const [canalOpcionesAbierto, setcanalOpcionesAbierto] = useState(false)
    const [opcionesOpcionesAbierto, setopcionesOpcionesAbierto] = useState(false)
    const [soporteOpcionesAbierto, setsoporteOpcionesAbierto] = useState(false)
    const [descargaOpcionesAbierto, setdescargaOpcionesAbierto] = useState(false)
    const [uploadOpcionesAbierto, setuploadOpcionesAbierto] = useState(false)
    const [tradicionalOpcionesAbierto, settradicionalOpcionesAbierto] = useState(false)
    const [modernoOpcionesAbierto, setmodernoOpcionesAbierto] = useState(false)

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre']
    const canales = ['Canal Moderno', 'Canal Tradicional']
    const opciones = ['Venta Moderno', 'Venta Tradicional', 'Promociones Tradicional','Lista de Precios','Banco de Imágenes']
    const soportes = ['Enviar SMS Wsp', 'Elementos enviados', 'Administrador']
    const descargas = ['Tradicional','Moderno']
    const uploads = ['Sell In', 'Objetivos Sell In', 'Objetivos Sell Out', 'Mecánica Promocional', 'Rebate', 'Actualizar Productos',
                    'Actualizar Distribuidoras','Reconocimientos de pagos','Promociones liquidadas']
    const tradicionales = ["Sell In", 'Sell Out','Rebate','Promociones','Reportes de pago','Catálogo']
    const modernos = ['Sell In','Sell Out','Contraprestaciones']

    const SeleccionarAño = (valor) => {
        setanioSeleccionado(valor)
        setanioOpcionesAbierto(false)
    }
    const SeleccionarMes = (valor) => {
        setmesSeleccionado(valor)
        setmesOpcionesAbierto(false)
    }
    const SeleccionarCanales = (valor) => {
        setcanalesSeleccionados(valor)
        setcanalModerno(valor)
        setcanalTradicional(valor)
    }
    const SeleccionarSubCanal = (valor, posicion) => {
        
        if (posicion == '0') {
            setcanalModerno(valor)
        }else if (posicion == '1') {
            setcanalTradicional(valor)
        }
        
    }
  
    const AbrirSubmoduloDescarga = (posicion) => {
        if (posicion == "0") {
            settradicionalOpcionesAbierto(!tradicionalOpcionesAbierto)
        }else if(posicion == "1"){
            setmodernoOpcionesAbierto(!modernoOpcionesAbierto)
        }
    }

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
                        
                        <div 
                            className={btnSeleccionado == 'CONTROL' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'135px'}}
                            onClick={() => {setBtnSeleccionado("CONTROL")}}
                        >
                            Control de archivo
                        </div>
                    </div>
                </Col>
                <Col lg={12} xl={12}>
                    <div className='Contenedor-Busqueda-Administrativo'>
                        <input 
                            className='Busqueda-Administrativo'
                            placeholder='Buscar'
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl={12}>
                    <div className='Contenedor-Perfil'>
                        <div className='Titulo-Perfil'>
                            Administrador
                        </div>
                        {/* AÑO */}
                        <div className='Fila-Select-Anio-Mes-Perfil'>
                            <div    
                                className='Select-Anio-Perfil'
                                onClick={() => setanioOpcionesAbierto(!anioOpcionesAbierto)}
                            >
                                <span className='Texto-Select-Anio-Perfil'>Año</span>
                                <img src={FlechaAbajo} style={{width: '11px'}}></img>
                            </div>
                            <div 
                                className={anioOpcionesAbierto == true 
                                    ? 'Contenido-Select-Anio'
                                    : 'Contenido-Select-Anio-Oculto'}
                            >
                                <div 
                                    className='Opciones-Select-Anio' 
                                    onClick={() => SeleccionarAño(2020)}
                                >
                                    2020
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2021)}
                                >
                                    2021
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2022)}
                                >
                                    2022
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2023)}
                                >
                                    2023
                                </div>
                                <div 
                                    className='Opciones-Select-Anio'
                                    onClick={() => SeleccionarAño(2024)}
                                >
                                    2024
                                </div>
                            </div>
                            {
                                anioSeleccionado != "0" 
                                ? (
                                    <div className='Anio-Mes-Seleccionado'>
                                        <span className='Texto-Anio-Mes-Seleccionado'>
                                            {anioSeleccionado}
                                        </span>
                                        <img 
                                            src={Cerrar} 
                                            style={{width: '11px', cursor: 'pointer'}}
                                            onClick={() => setanioSeleccionado(0)}
                                        ></img>
                                    </div>
                                ) : null
                            }
                            
                        </div>
                        {/* MES */}
                        <div className='Fila-Select-Anio-Mes-Perfil'>
                            <div 
                                className='Select-Mes-Perfil'
                                onClick={() => setmesOpcionesAbierto(!mesOpcionesAbierto)}
                            >
                                <span className='Texto-Select-Mes-Perfil'>Mes</span>
                                <img src={FlechaAbajo} style={{width: '11px'}}></img>
                            </div>
                            <div 
                                className={mesOpcionesAbierto == true 
                                    ? 'Contenido-Select-Mes'
                                    : 'Contenido-Select-Mes-Oculto'}
                            >
                                {
                                    meses.map((mes)=>{
                                        return (
                                            <div 
                                                className='Opciones-Select-Anio'
                                                onClick={() => SeleccionarMes(mes)}
                                            >
                                                {mes}
                                            </div>
                                        );
                                    })
                                }
                                
                            </div>
                            {
                                mesSeleccionado != "0" 
                                ? (
                                    <div className='Anio-Mes-Seleccionado'>
                                        <span className='Texto-Anio-Mes-Seleccionado'>
                                            {mesSeleccionado}
                                        </span>
                                        <img 
                                            src={Cerrar} 
                                            style={{width: '11px', cursor: 'pointer'}}
                                            onClick={() => setmesSeleccionado(0)}
                                        ></img>
                                    </div>
                                ) : null
                            }
                        </div>
                        {/* CANAL */}
                        <div className='Select-Canal-Perfil'>
                            <div 
                                className='Campo-Switch-Abrir-Cerrar' 
                                onClick={() => setcanalOpcionesAbierto(!canalOpcionesAbierto)}
                            >
                                {
                                    canalOpcionesAbierto == true ? (
                                        <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                    ) : (
                                        <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                    )
                                }
                                <span className='Texto-Select-Canal-Perfil' >Canal</span>
                            </div>
                            <div className='Switch-Estilos Switch-Modulo'>
                                <Switch 
                                    size="small" 
                                    onChange={(e) => SeleccionarCanales(e)} 
                                    defaultChecked={canalesSeleccionados}
                                />
                            </div>
                        </div>
                        <div 
                            className={canalOpcionesAbierto == true 
                            ? 'Contenido-Select-Canal'
                            : 'Contenido-Select-Canal-Oculto'}    
                        >
                            {
                                canales.map((canal, posicion)=>{
                                    return (
                                        <>
                                            <div className='Opciones-Select-Canal-Perfil Switch-Submodulo'>
                                                <div>
                                                    {canal}
                                                </div>
                                                <Switch 
                                                    size="small" 
                                                    style={{marginRight:'12px'}} 
                                                    checked={posicion == '0' ? canalModerno : canalTradicional}
                                                    onChange={(e) => SeleccionarSubCanal(e, posicion)}
                                                />
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        {/* OPCIONES */}
                        <div className='Select-Canal-Perfil'>
                            <div className='Campo-Switch-Abrir-Cerrar' onClick={() => setopcionesOpcionesAbierto(!opcionesOpcionesAbierto)}>
                                {
                                    opcionesOpcionesAbierto == true ? (
                                        <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                    ) : (
                                        <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                    )
                                }
                                <span className='Texto-Select-Canal-Perfil' >Opciones</span>
                            </div>
                            <div className='Switch-Estilos Switch-Modulo'>
                                <Switch size="small"/>
                            </div>
                        </div>
                        <div 
                            className={opcionesOpcionesAbierto == true 
                            ? 'Contenido-Select-Canal'
                            : 'Contenido-Select-Canal-Oculto'}    
                        >
                            {
                                opciones.map((opcion)=>{
                                    return (
                                        <>
                                            <div className='Opciones-Select-Canal-Perfil Switch-Submodulo'>
                                                <div>
                                                    {opcion}
                                                </div>
                                                <Switch size="small" style={{marginRight:'12px'}}/>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        {/* SOPORTE */}
                        <div className='Select-Canal-Perfil'>
                            <div 
                                className='Campo-Switch-Abrir-Cerrar' 
                                onClick={() => setsoporteOpcionesAbierto(!soporteOpcionesAbierto)}
                            >
                                {
                                    soporteOpcionesAbierto == true ? (
                                        <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                    ) : (
                                        <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                    )
                                }
                                <span className='Texto-Select-Canal-Perfil' >Soporte</span>
                            </div>
                            <div className='Switch-Estilos Switch-Modulo'>
                                <Switch size="small"/>
                            </div>
                        </div>
                        <div 
                            className={soporteOpcionesAbierto == true 
                            ? 'Contenido-Select-Canal'
                            : 'Contenido-Select-Canal-Oculto'}    
                        >
                            {
                                soportes.map((soporte)=>{
                                    return (
                                        <>
                                            <div className='Opciones-Select-Canal-Perfil Switch-Submodulo'>
                                                <div>
                                                    {soporte}
                                                </div>
                                                <Switch size="small" style={{marginRight:'12px'}}/>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        {/* DESCARGA */}
                        <div className='Select-Canal-Perfil'>
                            <div 
                                className='Campo-Switch-Abrir-Cerrar' 
                                onClick={() => setdescargaOpcionesAbierto(!descargaOpcionesAbierto)}
                            >
                                {
                                    descargaOpcionesAbierto == true ? (
                                        <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                    ) : (
                                        <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                    )
                                }
                                <span className='Texto-Select-Canal-Perfil' >Descarga</span>
                            </div>
                            <div className='Switch-Estilos Switch-Modulo'>
                                <Switch size="small"/>
                            </div>
                        </div>
                        <div 
                            className={descargaOpcionesAbierto == true 
                            ? 'Contenido-Select-Canal'
                            : 'Contenido-Select-Canal-Oculto'}    
                        >
                            {
                                descargas.map((descarga, posicion)=>{
                                    
                                    return (
                                        <>
                                            <div className='Opciones-Select-Descarga-Perfil'>
                                                <div 
                                                    className='Campo-Switch-Abrir-Cerrar-SubModulo-Descarga'
                                                    onClick={() => AbrirSubmoduloDescarga(posicion)}
                                                >
                                                    {
                                                        ((tradicionalOpcionesAbierto == true && posicion == "0") || (modernoOpcionesAbierto == true && posicion == "1" )) ? (
                                                            <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                                        ) : (
                                                            <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                                        )
                                                    }
                                                    <span>
                                                        {descarga}
                                                    </span>
                                                </div>
                                                <div className='Switch-Estilos Switch-Submodulo'>
                                                    <Switch size="small" style={{marginRight:'12px'}}/>
                                                </div>
                                            </div>
                                            <div 
                                                className={(tradicionalOpcionesAbierto == true && posicion == "0")
                                                    ? 'Contenido-Select-Canal'
                                                    : 'Contenido-Select-Canal-Oculto'}      
                                            >
                                                {
                                                    tradicionales.map((tradicional) => {
                                                        return (
                                                            <>
                                                                <div className='Opciones-Select-Canal-Perfil Submodulo-Descarga Switch-Submodulo'>
                                                                    <div style={{marginLeft: '20px'}}>
                                                                        {tradicional}
                                                                    </div>
                                                                    <Switch size="small" style={{marginRight:'12px'}}/>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div 
                                                className={(modernoOpcionesAbierto == true && posicion == "1" )
                                                    ? 'Contenido-Select-Canal'
                                                    : 'Contenido-Select-Canal-Oculto'}      
                                            >
                                                {
                                                    modernos.map((moderno) => {
                                                        return (
                                                            <>
                                                                <div className='Opciones-Select-Canal-Perfil Switch-Submodulo'>
                                                                    <div style={{marginLeft: '20px'}}>
                                                                        {moderno}
                                                                    </div>
                                                                    <Switch size="small" style={{marginRight:'12px'}}/>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                            
                                        </>
                                    )
                                })
                            }
                        </div>
                        {/* UPLOAD */}
                        <div className='Select-Canal-Perfil'>
                            <div 
                                className='Campo-Switch-Abrir-Cerrar' 
                                onClick={() => setuploadOpcionesAbierto(!uploadOpcionesAbierto)}
                            >
                                {
                                    uploadOpcionesAbierto == true ? (
                                        <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                    ) : (
                                        <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                    )
                                }
                                <span className='Texto-Select-Canal-Perfil' >Upload</span>
                            </div>
                            <div className='Switch-Estilos Switch-Modulo'>
                                <Switch size="small"/>
                            </div>
                        </div>
                        <div 
                            className={uploadOpcionesAbierto == true 
                            ? 'Contenido-Select-Canal'
                            : 'Contenido-Select-Canal-Oculto'}    
                        >
                            {
                                uploads.map((upload)=>{
                                    return (
                                        <>
                                            <div className='Opciones-Select-Canal-Perfil Switch-Submodulo'>
                                                <div>
                                                    {upload}
                                                </div>
                                                <Switch size="small" style={{marginRight:'12px'}}/>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className='Btn-Guardar-Perfil'>Guardar</div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className='Contenedor-Imagen-Perfil'>
                        <img src={ImagenPerfil} style={{width: '80%'}}></img>
                        <div className='Contenedor-Informacion-Perfil'>
                            {
                                editando == true ? (
                                    <input value='Administrador' className='Input-Administrativo-Perfil' style={{fontWeight: '700'}}/>
                                ) : (
                                    <div>Administrador</div>
                                )
                            }
                            {
                                 editando == true ? (
                                    <input value='Activo' className='Input-Administrativo-Perfil'/>
                                 ) : (
                                    <div style={{fontWeight:'400'}}>Activo</div>
                                 )
                            }
                            {
                                 editando == true ? (
                                    <input value='Fecha inicio: 07 Enero 2022' className='Input-Administrativo-Perfil'/>
                                 ) : (
                                    <div style={{fontWeight:'400'}}>Fecha inicio: 07 Enero 2022</div>
                                 )
                            }
                            {
                                 editando == true ? (
                                    <input value='Fecha Fin: 07 Enero 2022' className='Input-Administrativo-Perfil'/>
                                 ) : (
                                    <div style={{fontWeight:'400'}}>Fecha Fin: 07 Enero 2022</div>
                                 )
                            }                            
                            <div 
                                className={ editando == true 
                                    ? 'Circulo-Editar-Check-Perfil'
                                    : 'Circulo-Editar-Perfil'}
                                onClick={() => seteditando(!editando)}
                            >
                                {
                                    editando == true ? (
                                        <img src={Check} style={{width: '28px'}}></img>
                                    ) : (
                                        <img src={Editar} style={{width: '14px'}}></img>
                                    )
                                }
                                
                            </div>
                        </div>
                        
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
}

export default AdministrativoPerfil