import React from 'react';
import './car.scss'
import ImagenHover from './ImagenHover'
import IconoFlecha from '../../../Assets/Img/Promociones/flecha.png'
import ResumenPromociones from './ResumenPromociones';

// =========================
// Slide
// =========================

class Slide extends React.Component {
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
    const totalPromos = this.props.totalPromos
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
        cantidadCodigosPromocion,
		cantidadPromocionesNuevas
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
            <ImagenHover 
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
                cantidadPromocionesNuevas = {cantidadPromocionesNuevas}
                cantidadPromocionesRegulares = {cantidadPromociones - cantidadPromocionesNuevas}
                cantidadCodigosPromocion = {cantidadCodigosPromocion}
                cantidadCanales = {cantidadCanales}
                totalPromos = {totalPromos}
            />
        </div>
      </li>
    )
  }
}



// =========================
// Slider
// =========================

class CarouselPromociones extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = { 
        current: 0,
        cambiando : false,

        activarCarouselAvanzar : false,
        activarCarouselRetroceder : false,
        actualizarPosicionCarouselPequeno : false
    }
    this.handlePreviousClick = this.handlePreviousClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.handleSlideClick = this.handleSlideClick.bind(this)
    this.seleccionarEspecifico = this.seleccionarEspecifico.bind(this)

    this.funActivarCarouselAvanzar = this.funActivarCarouselAvanzar.bind(this)
  }
  
  handlePreviousClick() {
    const previous = this.state.current - 1
        
    this.setState({ 
      current: (previous < 0) 
        ? this.props.slides.length - 1
        : previous
    })
  }

  seleccionarEspecifico(nuevo) {
    
    this.setState({ 
      current : nuevo
    })
  }
  
  handleNextClick() {
    const next = this.state.current + 1;
    
    this.setState({ 
      current: (next === this.props.slides.length) 
        ? 0
        : next
    })
  }
  
  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index
      })
    }
  }

  funActivarCarouselAvanzar(){
    if(this.state.activarCarouselAvanzar == false){
      this.setState({
        activarCarouselAvanzar : true
      })
    }
  }

  funActicarCarouselRetroceder(){
    if(this.state.activarCarouselRetroceder == false){
      this.setState({
        activarCarouselRetroceder : true
      })
    }
  }

  funDesactivarCarousel(){
    if(this.state.activarCarouselAvanzar == true){
      this.setState({
        activarCarouselAvanzar : false
      })
    }

    if(this.state.activarCarouselRetroceder == true){
      this.setState({
        activarCarouselRetroceder : false
      })
    }
  }

  render() {
    const { current, direction, activarCarouselAvanzar} = this.state
    const { slides, heading, seleccionarCategoria, seleccionoPromocion, deseleccionarCategoria, totalPromos, mostrar_promociones_nuevas } = this.props 
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)`,
      // 'transitionDuration': '1s'
    }

    if(this.state.activarCarouselAvanzar == true){
      setTimeout(() => {
        if(this.state.activarCarouselAvanzar == true){
          if(seleccionoPromocion == true){
            if(this.state.current <= 1.5){
              this.setState({
                current: this.state.current+0.03
              })
            }
          }else{
            if(this.state.current <= 3.1){
              this.setState({
                current: this.state.current+0.03
              })
            }
          }
        }
        
      }, 130);
    }

    if(this.state.activarCarouselRetroceder == true){
      if(this.state.current < 0){
        this.setState({
          current: 0,
          activarCarouselRetroceder : false
        })
      }
      setTimeout(() => {
        if(this.state.activarCarouselRetroceder == true){
          if(this.state.current >= 0){
            this.setState({
              current: this.state.current-0.3
            })
          }else{
            this.setState({
              current: 0
            })
          }
        }
        
      }, 130);
    }

    
    if(seleccionoPromocion == true){
      if(this.state.actualizarPosicionCarouselPequeno == false){
        if(this.state.current >= 1.5 ){
          this.setState({
            current : 1.5
          })
        }
        this.setState({
          actualizarPosicionCarouselPequeno : true
        })
      }
    }

    return (
      <div 
        className={
          seleccionoPromocion == true
          ?'sliderPequeno'
          :'slider'
        } 
        aria-labelledby={headingId}
        style={{
          position:'relative'
        }}
      >
        <ul className="slider__wrapper" style={wrapperTransform}>
          <h3 id={headingId} className="visuallyhidden">{heading}</h3>
          
          {slides.map((slide, posicion) => {
            return (
              <>
                {
                  posicion == 0
                  ? seleccionoPromocion == true
                    ?null
                  :<div
                      onClick={() => {
                        seleccionarCategoria(slide.scaid, posicion, slide.catid)
                      }}
                    >
                      <ResumenPromociones 
                        key                        = {posicion}
                        posicion                   = {posicion}
                        slide                      = {slide}
                        current                    = {current}
                        handleSlideClick           = {this.handleSlideClick}
                        seleccionado               = {slide.seleccionado}
                        nombre                     = {slide.catnombre}
                        fondo                      = {slide.catimagenfondo}
                        icono                      = {slide.caticono}
                        caticonoseleccionado       = {slide.caticonoseleccionado}
                        catcolor                   = {slide.catcolor}
                        colorhover                 = {slide.catcolorhover}
                        seleccionoPromocion        = {seleccionoPromocion}
                        catimagenfondoseleccionado = {slide.catimagenfondoseleccionado}
                      />
                    </div>
                  :null
                }
                {
                  mostrar_promociones_nuevas == true
                  ?slide.cantidadPromocionesNuevas > 0
                    ?<div
                      onClick={() => {
                        seleccionarCategoria(slide.scaid, posicion, slide.catid)
                      }}
                      onDoubleClick = {() => deseleccionarCategoria()}
                    >
                      <Slide
                        key                        = {posicion}
                        posicion                   = {posicion}
                        slide                      = {slide}
                        current                    = {current}
                        handleSlideClick           = {this.handleSlideClick}
                        seleccionado               = {slide.seleccionado}
                        nombre                     = {slide.catnombre}
                        fondo                      = {slide.catimagenfondo}
                        icono                      = {slide.caticono}
                        caticonoseleccionado       = {slide.caticonoseleccionado}
                        catcolor                   = {slide.catcolor}
                        colorhover                 = {slide.catcolorhover}
                        seleccionoPromocion        = {seleccionoPromocion}
                        catimagenfondoseleccionado = {slide.catimagenfondoseleccionado}
                        totalPromos = {totalPromos}
                      />
                    </div>
                    :null
                  :<div
                    onClick={() => {
                      seleccionarCategoria(slide.scaid, posicion, slide.catid)
                    }}
                    onDoubleClick = {() => deseleccionarCategoria()}
                  >
                    <Slide
                      key                        = {posicion}
                      posicion                   = {posicion}
                      slide                      = {slide}
                      current                    = {current}
                      handleSlideClick           = {this.handleSlideClick}
                      seleccionado               = {slide.seleccionado}
                      nombre                     = {slide.catnombre}
                      fondo                      = {slide.catimagenfondo}
                      icono                      = {slide.caticono}
                      caticonoseleccionado       = {slide.caticonoseleccionado}
                      catcolor                   = {slide.catcolor}
                      colorhover                 = {slide.catcolorhover}
                      seleccionoPromocion        = {seleccionoPromocion}
                      catimagenfondoseleccionado = {slide.catimagenfondoseleccionado}
                      totalPromos = {totalPromos}
                    />
                  </div>
                }
              </>
            )
          })}
        </ul>
        <div className='contenedorSliderCategoriasPromocion'>
          {
            this.state.current > 0
            ?<div 
              onMouseLeave={() =>{
                this.funDesactivarCarousel()
              }}
              onMouseEnter={() => {
                this.funActicarCarouselRetroceder()
              }} 
              id={
                seleccionoPromocion == true
                ?"primeraMitadSliderCategoriasPromocionPequeno"
                :"primeraMitadSliderCategoriasPromocion"
              } 
            ></div>
            :null
          }
          
          <div
            onMouseLeave={() =>{
              this.funDesactivarCarousel()
            }}
            onMouseEnter={() => {
              this.funActivarCarouselAvanzar()
            }} 
            id={
              seleccionoPromocion == true
              ?"segundaMitadSliderCategoriasPromocionPequeno"
              :"segundaMitadSliderCategoriasPromocion"
            }
           >

            </div>
        </div>
        
        {
          seleccionoPromocion == true
          ?<div 
            className='Flecha-Retroceder-Carousel-Promocion'
            style={{
              top: "70px",
              left: "40px"
            }}
            onClick={() => {
              if(this.state.current < 0){
                this.setState({
                  current: 0,
                })
              }

              if(this.state.current >= 0){
                this.setState({
                  current: this.state.current-1
                })
              }else{
                this.setState({
                  current: 0
                })
              }
            }}
          >
              <img className='Icono-Flecha-Retroceder-Carousel-Promocion' src={IconoFlecha} />
          </div>
          :<div 
            className='Flecha-Retroceder-Carousel-Promocion'
            onClick={() => {
              if(this.state.current < 0){
                this.setState({
                  current: 0,
                })
              }

              if(this.state.current >= 0){
                this.setState({
                  current: this.state.current-1
                })
              }else{
                this.setState({
                  current: 0
                })
              }
            }}
          >
              <img className='Icono-Flecha-Retroceder-Carousel-Promocion' src={IconoFlecha} />
          </div>
        }
        

        {
          seleccionoPromocion == true
          ?<div 
            className='Flecha-Avanzar-Carousel-Promocion'
            style={{
              top: "70px",
              // left: "40px"
            }}
            onClick={() => {
              if(seleccionoPromocion == true){
                if(this.state.current <= 1.5){
                  this.setState({
                    current: this.state.current+1
                  })
                }
              }else{
                if(this.state.current <= 3.1){
                  this.setState({
                    current: this.state.current+1
                  })
                }
              }
            }}
          >
            <img className='Icono-Flecha-Retroceder-Carousel-Promocion' src={IconoFlecha} />
          </div>
          :<div 
            className='Flecha-Avanzar-Carousel-Promocion'
            onClick={() => {
              if(seleccionoPromocion == true){
                if(this.state.current <= 1.5){
                  this.setState({
                    current: this.state.current+1
                  })
                }
              }else{
                if(this.state.current <= 3.1){
                  this.setState({
                    current: this.state.current+1
                  })
                }
              }
            }}
          >
            <img className='Icono-Flecha-Retroceder-Carousel-Promocion' src={IconoFlecha} />
          </div>
        }
      </div>
    )
  }
}

export default CarouselPromociones
// ReactDOM.render(<Slider heading="Example Slider" slides={slideData} />, document.getElementById('app'));