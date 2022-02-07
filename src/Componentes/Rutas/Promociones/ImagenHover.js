
import React, {useState} from 'react'
import './ImagenHover.css'
import {Col, Row} from "antd";
import { useSelector} from "react-redux";

const ImagenHover = (props) => {
    // const {seleccionarFiltroZona} = useSelector(({zonas}) => zonas);
    const seleccionarFiltroZona = false

    const {
        seleccionado, 
        nombre, 
        icono, 
        iconoSeleccionado, 
        fondo, 
        colorhover, 
        color, 
        catimagenfondoseleccionado, 
        caticonohover, 
        cantidadPromociones,
        cantidadCodigosPromocion,
        cantidadCanales
    } = props

    const {seleccionoPromocion} = useSelector(({promociones}) => promociones);

    const [PasoMouse, setPasoMouse] = useState(false)

    return (
        <div className="contenedorImgHover" >
            <figure 
                className='Figure-Imagen-Hover-Promociones'
                style={
                    seleccionado == true
                    ? {
                        marginTop:'2px',
                        height:'181px',
                        // background: 'rgba(0,0,0,0.15)',
                        background: 'transparent',
                        boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)',
                        width:'294px',
                    }
                    : seleccionoPromocion == true
                        ?{height: '164px', marginTop:'15px', width:'264px'}
                        :{height: '421px', marginTop:'15px'}
                }>
                <span className="gx-link gx-grid-thumb-cover">
                    <div 
                        onMouseEnter={() => setPasoMouse(true)}
                        onMouseLeave={() => setPasoMouse(false)}
                        style={
                        seleccionoPromocion == true
                        ?{ 
                            backgroundImage: "url("+catimagenfondoseleccionado+")", 
                            backgroundSize: '100% 100%', 
                            backgroundRepeat:'no-repeat',
                            height:'100%'
                        }
                        :{ 
                            backgroundImage: "url("+fondo+")", 
                            backgroundSize: '100% 100%', 
                            backgroundRepeat:'no-repeat',
                            height:'100%'
                        }} 
                        className={
                            PasoMouse == true
                            ?'Contenedor-Img-Figura-Promociones Contenedor-Img-Figura-Promociones-Mouse'
                            :'Contenedor-Img-Figura-Promociones'
                        }
                    >
                        <Row style={
                            seleccionoPromocion == true
                            ?{ height:'100%', alignContent:'center', paddingTop:'30px' }
                            :{ alignContent: 'flex-end', height:'100%', paddingBottom:'44px' }
                        }>
                            <Col xl={24} md={24} sm={24} xs={24}>
                                <div 
                                    className="gx-text-center" 
                                    style={{
                                        textAlignLast: "center",
                                        marginTop: "-40px"
                                    }}
                                >
                                    {
                                        seleccionoPromocion == true
                                        ?<div className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-sm-1">
                                            <span
                                                id={
                                                    seleccionoPromocion == true
                                                    ?"contenedorIconoSeleccionado"
                                                    :"contenedorIcono"
                                                }
                                                className={`gx-text-red gx-flex-row gx-justify-content-center gx-align-items-center gx-rounded-circle`}
                                                style={ 
                                                    seleccionado == true 
                                                    ?{
                                                        
                                                    } 
                                                    :{}}
                                            >
                                                <img 
                                                    alt="Remy Sharp" 
                                                    id={
                                                        seleccionoPromocion == true
                                                        ?"iconoImagenHoverSeleccionado"
                                                        :"iconoImagenHover"
                                                    }
                                                    width= "100px"
                                                    height= "100px"
                                                    src={
                                                        seleccionado == true
                                                        ?iconoSeleccionado
                                                        :icono
                                                    }
                                                /> 
                                            </span>
                                        </div>
                                        :null
                                    }
                                    {
                                        seleccionoPromocion == true
                                        ?<span 
                                            className="Wbold-S16-H21-CFFFFFF gx-text-white nombreCategoriaSeleccionado">{nombre}</span>
                                        :<div 
                                            className="contenedorNombreCategoria" 
                                            style={{background: color, textAlign: "-webkit-center"}}
                                        >
                                            <span 
                                                className="Wbold-S16-H21-CFFFFFF nombreCategoria Wbold-S18-H24-CFFFFFF">{nombre}</span>
                                        </div>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                </span>
                {
                    seleccionoPromocion == true
                    ?null
                    :<div 
                        className="capa" style={{background: 'rgba('+colorhover+')'}}
                        onMouseEnter={() => setPasoMouse(true)}
                        onMouseLeave={() => setPasoMouse(false)}
                    >
                        {/* <div style={{height:'15%', width:'15%', backgroundImage: "url('https://cdn4.iconfinder.com/data/icons/kids-and-toys-1/32/Kids__Kids_Baby_Diaper_Childhood_Nappy-512.png')", backgroundSize: '100% 100%', backgroundRepeat:'no-repeat'}} /> */}

                        <div 
                            className="" 
                            style={
                                seleccionado == true  
                                ?{
                                    width:"20%", 
                                    height:"20%", 
                                    backgroundImage: "url("+iconoSeleccionado+")", 
                                    backgroundSize: '70% 70%', backgroundRepeat:'no-repeat', backgroundPosition:'center', padding:'10px'
                                }
                                :{
                                    width:"68px", 
                                    height:"68px", 
                                    backgroundImage: "url("+caticonohover+")", 
                                    backgroundSize: '100% 100%', backgroundRepeat:'no-repeat', backgroundPosition:'center', padding:'10px'
                                }
                            } />
                        <br />
                        <h2>
                            <span 
                                style={{fontWeight:'500'}} 
                                id="nombreCategoriaHover" 
                                className='Wbold-S26-H35-CFFFFFF'
                            >
                                {nombre}<br/>
                            </span>
                            {
                                seleccionarFiltroZona == true
                                ?null
                                :<span 
                                    id="textoPromocionHover"
                                    className='Wnormal-S16-H21-CFFFFFF'
                                >Promoción:{seleccionarFiltroZona} {cantidadPromociones}<br/></span>
                            }
                            {
                                seleccionarFiltroZona == true
                                // ?<span id="textoPromocionHover">Código de Promociones: {cantidadCodigosPromocion}<br/></span>
                                ?<span 
                                    id="textoPromocionHover"
                                    className='Wnormal-S16-H21-CFFFFFF'
                                >Promoción: {cantidadCodigosPromocion}<br/></span>
                                :null
                            }
                            {
                                seleccionarFiltroZona == true
                                ?<span 
                                    id="textoPromocionHover"
                                    className='Wnormal-S16-H21-CFFFFFF'
                                >Canales: {cantidadCanales}</span>
                                :null
                            }
                        </h2>
                        
                        <span 
                            style={{color:'white'}} id="saberMasHover"
                            className='Wbold-S16-H21-CFFFFFF'
                        >
                            Para saber más<img alt="" src={require("../../../Assets/Img/Promociones/iconoVerMas.png")} width="22px" height="18px" className="iconoFlecha"/>
                            {/* <i className="icon icon-arrow-right gx-fs-l gx-ml-1 gx-d-inline-flex gx-vertical-align-middle"/> */}
                            
                        </span>
                    </div>
                }
            </figure>
        </div>
    )
}

export default ImagenHover
