import React, {Component} from 'react'
import { Row, Col, Button } from 'antd';
import GifCohete from '../../../Assets/Gif/cohete.gif'
import GifSaltando from '../../../Assets/Gif/saltando.gif'
import GifError from '../../../Assets/Gif/error.gif'
import GifCargando from '../../../Assets/Gif/cargandoCaminata.gif'
import GifAlerta from '../../../Assets/Gif/alertaGif.gif'
import config from '../../../config'
import {
    CloseOutlined,
    ExclamationOutlined
} from '@ant-design/icons';

class TarjetaCargaArchivo extends Component {

    constructor(props){
        super(props);
        this.state = {
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null,
            cargando         : this.props.cargando,
            archivoExito     : this.props.archivoExito,
            guardarCambios   : false,
            enviarCambios    : this.props.envcambios,
            archivoSelect : ""
        }   
        this.seleccionarFile = this.seleccionarFile.bind(this)
        this.eliminarArchivo = this.eliminarArchivo.bind(this)
        this.enviarCambios   = this.enviarCambios.bind(this)
    }

    seleccionarFile(e) {
        this.refs.subirArchivoInput.click();
    }

    async cambioInputFile(event){
        event.stopPropagation();
        event.preventDefault();
        this.state.fileSeleccionado = event.target.files[0];

        this.setState({
            subioArchivo  : true,
            nombreArchivo : this.state.fileSeleccionado['name'],
            archivoSelect : ""
        })
    }

    eliminarArchivo(){
        this.setState({
            subioArchivo     : false,
            nombreArchivo    : '',
            fileSeleccionado : null
        })
    }

    async enviarCambios(){
        this.setState({
            cargando : true
        })

        const formData = new FormData();
        formData.append('file',this.state.fileSeleccionado)
        
        let url = config.api+this.props.url

        let estadoaxios = await this.props.CargarArchivo(url, formData)

        if(estadoaxios == true){
            this.setState({
                archivoExito : true
            })
        }else{
            this.setState({
                archivoExito : false
            })
        }

        this.setState({
            enviarCambios   : true,
            guardarCambios  : false,
            cargando        : false,
            fileSeleccionado: null
        })

        this.eliminarArchivo()
    }
    
    render() {
        return (
            <>
                <input 
                    type="file" 
                    id="file" 
                    ref="subirArchivoInput" 
                    style={{display: "none"}} 
                    onChange={(e) => this.cambioInputFile(e)} 
                    value={this.state.archivoSelect}    
                />

                <div className='Contenedor-Tarjeta-Carga-Archivo'>


                    {
                        this.state.cargando == true
                        ?<div className='Cargando-Contenedor-Tarjeta-Carga-Archivo'>
                            <div>
                                <img 
                                    src={
                                        GifCargando
                                    } 
                                    className="Gif-Cargando-TarjetaCargaArchivo"
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        marginTop:'-20px'
                                    }}
                                >
                                    <div>
                                        <div className='Wbold-S12-H16-C1E1E1E'>
                                            Cargando
                                        </div>
                                        <div className='Wnormal-S11-H15-C1E1E1E'>
                                            Cargando 1 archivo
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :this.state.enviarCambios == true
                            ?<>
                                <div className='Cargando-Contenedor-Tarjeta-Carga-Archivo'>
                                    <div>
                                        {
                                            this.state.archivoExito == true
                                            ?<>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginBottom: "23px",
                                                        marginTop: "66px",
                                                        position: "absolute",
                                                        top: "20px",
                                                        width: "100%",
                                                        left: "0"
                                                    }}
                                                >
                                                    <img 
                                                        src={GifSaltando}
                                                        className="Gif-Exito-TarjetaCargaArchivo"
                                                    />
                                                </div>

                                                <div className='Wbold-S12-H16-C1E1E1E' style={{paddingLeft:'60px', paddingRight:'60px', paddingTop:'110px'}}>
                                                    ??Archivo subido con ??xito!
                                                </div>

                                                 <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "35px",
                                                        position: "absolute",
                                                        bottom: "20px",
                                                        width: "100%",
                                                        left: "0"
                                                    }}
                                                >
                                                    <div 
                                                        className='Btn-Subir-Otro-CargaArchivos W600-S12-H16-C1E1E1E'
                                                        onClick={() => {
                                                            this.setState({
                                                                subioArchivo     : false,
                                                                nombreArchivo    : '',
                                                                fileSeleccionado : null,
                                                                cargando         : false,
                                                                archivoExito     : false,
                                                                guardarCambios   : false,
                                                                enviarCambios    : false,
                                                                archivoSelect : ""
                                                            })
                                                        }}
                                                    >
                                                        Subir Otro
                                                    </div>
                                                </div>
                                            </>
                                            :<>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                >

                                                    <div className="Icono-Error-TarjetaCargaArchivo">
                                                        {/* <div className="Icono-Interno-Error-TarjetaCargaArchivo"> */}
                                                            {/* <ExclamationOutlined 
                                                                style={{
                                                                    color: "white",
                                                                    fontSize: "100px"
                                                                }}
                                                            /> */}

                                                            <img 
                                                                src={
                                                                    GifAlerta
                                                                }

                                                                className="Icono-Alerta-Error-TarjetaCargaArchivos"
                                                            />
                                                        {/* </div> */}
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        textAlign: "center",
                                                        paddingLeft:'25px',
                                                        paddingRight:'25px',
                                                        marginTop:'24px',
                                                        position: "absolute",
                                                        width: "100%",
                                                        left: "0",

                                                    }}
                                                >
                                                    <div>
                                                        <div className='Wbold-S14-H19-CFF3742'>
                                                            ??Algo sali?? mal!
                                                        </div>
                                                        <div className='W600-S12-H16-CFF3742' style={{marginTop:'5px'}}> 
                                                            Tu archivo no se subi?? porque encontramos un error, por favor revisar tus notificaciones
                                                            {/* Encontramos un error en el archivo */}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "15px",
                                                        position: "absolute",
                                                        bottom: "20px",
                                                        width: "100%",
                                                        left: "0"
                                                    }}
                                                >
                                                    <div 
                                                        className='Btn-Subir-Otro-CargaArchivos W600-S12-H16-C1E1E1E'
                                                        onClick={() => {
                                                            this.setState({
                                                                subioArchivo     : false,
                                                                nombreArchivo    : '',
                                                                fileSeleccionado : null,
                                                                cargando         : false,
                                                                archivoExito     : false,
                                                                guardarCambios   : false,
                                                                enviarCambios    : false,
                                                                archivoSelect : ""
                                                            })
                                                        }}
                                                    >
                                                        Subir Otro
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </>
                            :
                                <>
                                    <div className='Primera-Contenedor-Tarjeta-Carga-Archivo'>
                                        <img 
                                            src={
                                                this.state.cargando == true
                                                    ?GifCargando
                                                    :this.state.enviarCambios == true
                                                        ?this.state.archivoExito == true
                                                            ?GifSaltando
                                                            :GifError
                                                        :GifCohete
                                            } 
                                            className="Gif-PrimeraParte-TarjetaCargaArchivo"
                                        />
                                    </div>
                                    <div className='Segunda-Contenedor-Tarjeta-Carga-Archivo'>
                                        <Row style={{height:'100%'}}>
                                            <Col 
                                                xl={8} style={{marginLeft:'-10px', textAlign: "-webkit-right"}} 
                                                onClick={this.seleccionarFile}
                                            >
                                                <div class="Contenedor-Icono-Btn-Plus-Svg">
                                                    <svg viewBox="0 0 72 72"><path d="M36.493 72C16.118 72 0 55.883 0 36.493 0 16.118 16.118 0 36.493 0 55.882 0 72 16.118 72 36.493 72 55.882 55.883 72 36.493 72zM34 34h-9c-.553 0-1 .452-1 1.01v1.98A1 1 0 0 0 25 38h9v9c0 .553.452 1 1.01 1h1.98A1 1 0 0 0 38 47v-9h9c.553 0 1-.452 1-1.01v-1.98A1 1 0 0 0 47 34h-9v-9c0-.553-.452-1-1.01-1h-1.98A1 1 0 0 0 34 25v9z" fill="#558CFF" fill-rule="nonzero"></path></svg>
                                                </div>
                                            </Col>
                                            <Col xl={16}>
                                                <div 
                                                    className='Titulo-Tarjeta-CargaArchivo'
                                                >
                                                    <div>
                                                        <div className='Wbold-S12-H16-C004FB8'>
                                                            {this.props.titulo}
                                                        </div>
                                                        <div className='Wnormal-S12-H16-C004FB8'>
                                                            {this.props.subtitulo}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={24} style={{marginTop:'-30px'}}>
                                                {
                                                    this.state.subioArchivo == true
                                                    ?<div 
                                                        className='Wnormal-S12-H16-C1876F2 Titulo-Archivo-Subido-CargaArchivo'
                                                        title={this.state.nombreArchivo}
                                                    >
                                                        {
                                                            this.state.nombreArchivo.length < 18
                                                            ?this.state.nombreArchivo
                                                            :this.state.nombreArchivo.substr(0,16)+" ... "+this.state.nombreArchivo.substr(this.state.nombreArchivo.length-5,this.state.nombreArchivo.length)
                                                        }
                                                        <div 
                                                            className='Icon-Cerrar-Tarjeta-CargaArchivo'
                                                            onClick={() => this.eliminarArchivo() }
                                                        >
                                                            <CloseOutlined />
                                                        </div>
                                                    </div>
                                                    :null
                                                }
                                            </Col>
                    
                                            <Col 
                                                xl={24}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    marginTop:'0px',
                                                    animationDelay: "2s",
                                                    position:'absolute',
                                                    bottom:'20px',
                                                    width:'100%',
                                                }}
                                            >
                                                <div>

                                                </div>
                                                {
                                                    this.state.subioArchivo == true
                                                    ?<Button 
                                                        className='Btn-Enviar-Seleccionado-CargaArchivos W600-S12-H16-CFFFFFF'
                                                        onClick = {() => {
                                                            this.enviarCambios()
                                                        }}
                                                        loading={this.state.cargando}
                                                    >
                                                        Enviar
                                                    </Button>
                                                    :<Button 
                                                        className='Btn-Enviar-CargaArchivos W600-S12-H16-C1E1E1E'
                                                    >
                                                        Enviar
                                                    </Button>
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                </>
                    }
                </div>
            </>
        )
    }
}

export default TarjetaCargaArchivo