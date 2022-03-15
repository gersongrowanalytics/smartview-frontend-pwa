import React, {useState} from 'react'
import { Row, Col, Switch } from 'antd'
import '../../Estilos/Rutas/Administrativo/AdministrativoPerfil.css'
import FlechaAbajo from '../../Assets/Img/Administrativo/caret-down-black.png'
import FlechaDerecha from '../../Assets/Img/Administrativo/caret-right-black.png'
import ImagenPerfil from '../../Assets/Img/Administrativo/Completo-Administrador.png'
import Editar from '../../Assets/Img/Administrativo/Editar-white.png'
import Cerrar from '../../Assets/Img/Administrativo/Cortar.png'

const AdministrativoPerfil = () => {

    const [btnSeleccionado, setBtnSeleccionado] = useState("TIPOS")
    const [anioSeleccionado, setanioSeleccionado] = useState("0")
    const [mesSeleccionado, setmesSeleccionado] = useState("0")
    const [canalesSeleccionados, setcanalesSeleccionados] = useState("0")
    const [anioOpcionesAbierto, setanioOpcionesAbierto] = useState(false)
    const [mesOpcionesAbierto, setmesOpcionesAbierto] = useState(false)
    const [canalOpcionesAbierto, setcanalOpcionesAbierto] = useState(false)

    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre']
    const canales = ['Canal Moderno', 'Canal Tradicional']

    const SeleccionarAño = (valor) => {
        setanioSeleccionado(valor)
        setanioOpcionesAbierto(false)
    }
    const SeleccionarMes = (valor) => {
        setmesSeleccionado(valor)
        setmesOpcionesAbierto(false)
    }

    console.log(anioOpcionesAbierto)
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
                        <div 
                            className={btnSeleccionado == 'TIPOS' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'159px'}}
                            onClick={() => {setBtnSeleccionado("TIPOS")}}
                        >
                            Tipos Usuarios
                        </div>
                        <div 
                            className={btnSeleccionado == 'USUARIOS' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'149px'}}
                            onClick={() => {setBtnSeleccionado("USUARIOS")}}
                        >
                            Usuarios
                        </div>
                        <div 
                            className={btnSeleccionado == 'PERMISOS' 
                                ? 'Btn-Seleccionado-Administrativo' 
                                : 'Btn-NoSeleccionado-Administrativo'}
                            style={{width:'135px'}}
                            onClick={() => {setBtnSeleccionado("PERMISOS")}}
                        >
                            Permisos
                        </div>
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
                        
                        <div className='Select-Canal-Perfil'>
                            {
                                canalOpcionesAbierto == true ? 
                                (
                                    <>
                                        <div className='Campo-Switch-Abrir-Cerrar' onClick={() => setcanalOpcionesAbierto(!canalOpcionesAbierto)}>
                                            <img src={FlechaAbajo} style={{width: '11px', marginRight: '7px'}}></img>
                                            <span className='Texto-Select-Canal-Perfil' >Canal</span>
                                        </div>
                                        <Switch size="small" />
                                    </>
                                    
                                ) : (
                                    <>  
                                        <div className='Campo-Switch-Abrir-Cerrar' onClick={() => setcanalOpcionesAbierto(!canalOpcionesAbierto)}>
                                            <img src={FlechaDerecha} style={{width: '7px', marginRight: '9px'}} ></img>
                                            <span className='Texto-Select-Canal-Perfil'>Canal</span>
                                        </div>
                                        <Switch size="small" />
                                    </>
                                    
                                )
                            }
                        </div>
                        <div 
                            className={canalOpcionesAbierto == true 
                            ? 'Contenido-Select-Canal'
                            : 'Contenido-Select-Canal-Oculto'}    
                        >
                            {
                                canales.map((canal)=>{
                                    return (
                                        <>
                                            <div className='Opciones-Select-Canal-Perfil'>
                                                {canal}
                                            </div>
                                            {/* <Switch size="small" /> */}
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className='Select-Canal-Perfil'>
                            <img src={FlechaDerecha} style={{width: '5px', marginRight: '9px'}}></img>
                            <span className='Texto-Select-Canal-Perfil'>Opciones</span>
                        </div>
                        <div className='Select-Canal-Perfil'>
                            <img src={FlechaDerecha} style={{width: '5px', marginRight: '9px'}}></img>
                            <span className='Texto-Select-Canal-Perfil'>Soporte</span>
                        </div>
                        <div className='Select-Canal-Perfil'>
                            <img src={FlechaDerecha} style={{width: '5px', marginRight: '9px'}}></img>
                            <span className='Texto-Select-Canal-Perfil'>Descarga</span>
                        </div>
                        <div className='Select-Canal-Perfil'>
                            <img src={FlechaDerecha} style={{width: '5px', marginRight: '9px'}}></img>
                            <span className='Texto-Select-Canal-Perfil'>Upload</span>
                        </div>
                        <div className='Btn-Guardar-Perfil'>Guardar</div>
                    </div>
                </Col>
                <Col xl={12}>
                    <div className='Contenedor-Imagen-Perfil'>
                        <img src={ImagenPerfil} style={{width: '80%'}}></img>
                        <div className='Contenedor-Informacion-Perfil'>
                            <div>Administrador</div>
                            <div style={{fontWeight:'400'}}>Activo</div>
                            <div style={{fontWeight:'400'}}>Fecha inicio: 07 Enero 2022</div>
                            <div style={{fontWeight:'400'}}>Fecha Fin: 07 Enero 2022</div>
                            <div className='Circulo-Editar-Perfil'>
                                <img src={Editar} style={{width: '14px'}}></img>
                            </div>
                        </div>
                        
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
}

export default AdministrativoPerfil