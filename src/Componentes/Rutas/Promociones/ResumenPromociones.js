import React, {useEffect, useState} from 'react';
import ImagenHover from './ImagenHover'
import { useSelector} from "react-redux";
import {Col, Row} from "antd";
import IconoFlecha from '../../../Assets/Img/Promociones/iconoVerMas.png'

class ResumenPromociones extends React.Component {
    constructor(props) {
      super(props)
  
      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseLeave = this.handleMouseLeave.bind(this)
      this.handleSlideClick = this.handleSlideClick.bind(this)
      this.imageLoaded = this.imageLoaded.bind(this)
      this.slide = React.createRef()
    }
    
    handleMouseMove(event) {
      const el = this.slide.current
      const r = el.getBoundingClientRect()
  
      el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)))
      el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)))
    }
    
    handleMouseLeave(event) {    
      this.slide.current.style.setProperty('--x', 0)
      this.slide.current.style.setProperty('--y', 0)
    }
    
    handleSlideClick(event) {
      this.props.handleSlideClick(this.props.slide.index)
    }
    
    imageLoaded(event) {
      event.target.style.opacity = 1
    }
    
    render() {
      const { 
          seleccionado,
          catnombre,
          catimagenfondo,
          caticono,
          catcolorhover, 
          caticonoseleccionado,
          catcolor,
          catimagenfondoseleccionado,
          index,
          caticonohover,
          cantidadPromociones,
          cantidadCanales,
          cantidadCodigosPromocion
         } = this.props.slide
      const current = this.props.current
      const seleccionoPromocion  = this.props.seleccionoPromocion
      let classNames
      if(seleccionoPromocion == true){
        classNames = 'slidePequeno'
      }else{
        classNames = 'slide'
      }
      
      if (current === index) classNames += ' slide--current'
      else if (current - 1 === index) classNames += ' slide--previous'
      else if (current + 1 === index) classNames += ' slide--next'
          
      return (
        <li 
          ref={this.slide}
          className={classNames} 
          // onClick={this.handleSlideClick}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          style={
            this.props.posicion == 0 && seleccionoPromocion == true
            ?{marginLeft:'44px'}
            :null
          }
        >
          <div className="slide__image-wrapper">
              <CardResumenPromociones 
                  seleccionado  = {seleccionado}
                  nombre        = {catnombre}
                  fondo         = {catimagenfondo}
                  icono         = {caticono}
                  iconoSeleccionado = {caticonoseleccionado}
                  color         = {catcolor}
                  colorhover    = {catcolorhover}
                  catimagenfondoseleccionado = {catimagenfondoseleccionado}
                  caticonohover = {caticonohover}
                  cantidadPromociones = {cantidadPromociones}
                  cantidadCodigosPromocion = {cantidadCodigosPromocion}
                  cantidadCanales = {cantidadCanales}
              />
          </div>
        </li>
      )
    }
}

const CardResumenPromociones = (props) => {
    // const {seleccionarFiltroZona} = useSelector(({zonas}) => zonas);
    const {aplicandoFiltroAcumulado} = useSelector(({sucursales}) => sucursales);
    // const seleccionarFiltroZona = false

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

    const {seleccionoPromocion, arr_resumenPromociones} = useSelector(({promociones}) => promociones);

    const [PasoMouse, setPasoMouse] = useState(false)
    const [totalPromos, setTotalPromos] = useState(false)

    async function funObtenerTotalPromos (){
        

        return <div>asdasd</div>
    }

    useEffect(async () => {
        let totalPromos = 0
        arr_resumenPromociones.map((resumen) => {
            totalPromos = totalPromos + resumen.total
        })

        setTotalPromos(totalPromos)

    }, [arr_resumenPromociones])

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
                        // onMouseEnter={() => setPasoMouse(true)}
                        // onMouseLeave={() => setPasoMouse(false)}
                        style={
                        seleccionoPromocion == true
                        ?{ 
                            background: '#558CFF',
                            backgroundSize: '100% 100%', 
                            backgroundRepeat:'no-repeat',
                            height:'100%'
                        }
                        :{ 
                            background: '#558CFF',
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

                        <Row
                            style={{
                                paddingLeft:'30px',
                                paddingRight:'0px',
                                // paddingTop:'40px',
                                height:'100%',
                                paddingTop: "40px",
                                paddingBottom: "40px"
                            }}
                        >
                            <Col xl={6}></Col>
                            <Col 
                                xl={6}
                                style={{
                                    paddingBottom:'15px',
                                    textAlign: "-webkit-center"
                                }}
                            >
                                <div className='W700-S16-H21-CFFFFFF-L0015'>Prom.<br/>Regular</div>
                            </Col>
                            <Col 
                                xl={6}
                                style={{
                                    textAlign: "-webkit-center"
                                }}
                            >
                                <div className='W700-S16-H21-CFFFFFF-L0015'>Prom.<br/>Nueva</div>
                            </Col>
                            <Col 
                                xl={6}
                                style={{
                                    textAlign: "-webkit-center"
                                }}
                            >
                                <div className='W700-S16-H21-CFFFFFF-L0015'>Total</div>
                            </Col>

                            {
                                arr_resumenPromociones.map((resumen) => {
                                    return (
                                        <>
                                            <Col 
                                                xl={6}
                                                style={{
                                                    paddingBottom:'15px'
                                                }}
                                            >
                                                <div className='W700-S16-H21-CFFFFFF-L0015'>{resumen.catnombre}</div>
                                            </Col>
                                            <Col 
                                                xl={6}
                                                style={{
                                                    textAlign: "-webkit-center",
                                                    // font-weight: bold;
                                                }}
                                            >
                                                <div className='W400-S16-H21-CFFFFFF'>{resumen.regular}</div>
                                            </Col>
                                            <Col 
                                                xl={6}
                                                style={{
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <div className='W400-S16-H21-CFFFFFF'>{resumen.nueva}</div>
                                            </Col>
                                            <Col 
                                                xl={6}
                                                style={{
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <div className='W400-S16-H21-CFFFFFF'>{resumen.total}</div>
                                            </Col>
                                        </>
                                    )
                                })
                            }
                            <Col xl={24}>
                                <div
                                    style={{
                                        width:'100%',
                                        height:'1px',
                                        background:'white',
                                        marginBottom:'15px'
                                    }}
                                >

                                </div>
                            </Col>
                            <Col xl={18}>
                                <div
                                    className='W700-S23-H23-CFFFFFF'
                                >
                                    Total Promociones:
                                </div>
                            </Col>
                            <Col xl={6}>
                                <div
                                    className='W700-S23-H23-CFFFFFF'
                                >
                                    {
                                        totalPromos
                                    }
                                </div>
                            </Col>

                        </Row>
                        
                    </div>
                </span>
            </figure>
        </div>
    )
}


export default ResumenPromociones
