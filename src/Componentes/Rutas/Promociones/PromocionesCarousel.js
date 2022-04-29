import React from 'react';
import '../../../Estilos/Rutas/Promociones/PromocionCarousel.scss'
import {Col, Row, Card, Button, Modal, message, Spin } from "antd";
import funFomratoDecimal from '../../../Funciones/funFormatoDecimal'
import NumberFormat from 'react-number-format';
import {
  PERMISO_BOTON_EDITAR_PROMOCION,
  PERMISO_CODIGO_PROMOCION
} from "../../../Constantes/PermisosTypes"
import {funPermisosObtenidos} from '../../../Funciones/funPermiso'
import IconoCalendarioPromocion from '../../../Assets/Img/Promociones/calendario.png'
import IconoRegalo from '../../../Assets/Img/Promociones/regalo.png'

// =========================
// Slide
// =========================
const confirm = Modal.confirm;

class Slide extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editando : false,
			inputPlanchas : this.props.slide.cspplanchas,
			txtValorizado : this.props.slide.cspvalorizado,

			editandoPromocion       : false,
			fileProducto            : null,
			fileBonificado          : null,
			imagenPreviewProducto   : null,
			imagenPreviewBonificado : null,
			prbid                   : 0,
			prpid                   : 0
		}
		this.handleMouseMove = this.handleMouseMove.bind(this)
		this.handleMouseLeave = this.handleMouseLeave.bind(this)
		this.handleSlideClick = this.handleSlideClick.bind(this)
		this.imageLoaded = this.imageLoaded.bind(this)
		this.obtenerValorizado = this.obtenerValorizado.bind(this)
		this.slide = React.createRef()
		this.habilitarDesabilitarEdicionPromocion = this.habilitarDesabilitarEdicionPromocion.bind(this)
		this.seleccionarImagenProducto = this.seleccionarImagenProducto.bind(this)
		this.seleccionarImagenBonificado = this.seleccionarImagenBonificado.bind(this)
		this.mandarEditarImagenPromocion = this.mandarEditarImagenPromocion.bind(this)
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



  	// MODAL

	showConfirm() {
		confirm({
			title: '¿Desea guardar los cambios?',
			content: 'Esta opción se activará al cierre del mes',
			onCancelar() {
				console.log('Cancelar');
			},
			onAceptar(){

			}
		});
	}

	obtenerValorizado(e){
		let nuevoValor;
		if(e.target.value == ""){
			nuevoValor = 0
		}else{
			nuevoValor = parseInt(e.target.value)
		}
		
		
		this.setState({
			inputPlanchas : nuevoValor
		})

		if(this.props.slide.cspcantidadplancha == 'NA'){
			this.setState({
				txtValorizado : 0
			})
		}else{
			if(nuevoValor <= this.props.slide.cspcantidadplancha){
				let nuevoValorizado = nuevoValor*this.props.slide.csptotalplancha
				this.setState({
				txtValorizado : nuevoValorizado
				})
			}else{
				let nuevoValorizado = this.props.slide.cspcantidadplancha*this.props.slide.csptotalplancha
				this.setState({
				txtValorizado : nuevoValorizado
				})
			}
		}
	}

	// SELECCIOJNAR ARCHIVOS DE  
	seleccionarImagenProducto(prpid) {
		this.setState({
			prpid : prpid
		})  
		this.refs.seleccionarImagenProductoRef.click();
	}

	seleccionarImagenBonificado(prbid) {
		this.setState({
			prbid : prbid
		})  
		this.refs.seleccionarImagenBonificadoRef.click();
	}

	async cambioInputFileProducto(event){
		event.stopPropagation();
		event.preventDefault();
		if(event.target.files.length > 0){
			let reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onloadend = () => {
				this.setState({
					fileProducto: reader.result
				});
			};
			this.setState({
				imagenPreviewProducto :  URL.createObjectURL(event.target.files[0])
			})
		}else{
			message.error('Lo sentimos, es necesario seleccionar una imagen') 
		}
	}

	async cambioInputFileBonificado(event){
		event.stopPropagation();
		event.preventDefault();
		if(event.target.files.length > 0){
			let reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onloadend = () => {
				this.setState({
					fileBonificado: reader.result
				});
			};
			this.setState({
				imagenPreviewBonificado :  URL.createObjectURL(event.target.files[0])
			})
		}else{
			message.error('Lo sentimos, es necesario seleccionar una imagen') 
		}
	}

	habilitarDesabilitarEdicionPromocion(){
		this.setState({
			editandoPromocion : !this.state.editandoPromocion,
			fileProducto            : null,
			fileBonificado          : null,
			imagenPreviewProducto   : null,
			imagenPreviewBonificado : null,
			prbid                   : 0,
			prpid                   : 0
		})
	}

	async mandarEditarImagenPromocion(){
		await this.props.editarImagenesPromocion(
			this.state.prpid,
			this.state.prbid,
			this.state.fileProducto,
			this.state.fileBonificado,
			this.props.posicion
		)
		this.habilitarDesabilitarEdicionPromocion()
	}

	render() {
		const { 
			guardando, productos, productosbonificados, index,
			cspcantidadcombo,
			cspcompletado,
			cspplanchas,
			cspvalorizado,
			prmcodigo,
			cspid,
			tprnombre,
			cspcantidadplancha,
			cargando,
			cspgratis,
			cspnuevo,
			fechainicio,
			fechafinal
		} = this.props.slide
		
		const permisosUsuario                = this.props.permisos
		const posicionPromocion              = this.props.posicion
		const editarPromocion                = this.props.editarPromocion
		const colorSeleciconadoPromo         = this.props.colorSeleciconadoPromo
		const aceptarEdicionPromocionReducer = this.props.aceptarEdicionPromocionReducer
		const editarImagenesPromocion        = this.props.editarImagenesPromocion

		const current = this.props.current
		let classNames = 'slidePromocion'
		
		if (current === index) classNames += ' slide--currentPromocion'
		else if (current - 1 === index) classNames += ' slide--previous'
		else if (current + 1 === index) classNames += ' slide--next'
			
		return (
			<li 
				ref={this.slide}
				className={classNames} 
				onMouseMove={this.handleMouseMove}
				onMouseLeave={this.handleMouseLeave}
			>
				<div className="slide__image-wrapperPromocion">
					<Spin spinning={cargando == undefined ? false : cargando} tip="Cargando...">
						<Card style={{
							borderRadius:'20px',
							width:'385px',
							height: '270px',
							border:'1px solid '+colorSeleciconadoPromo, 
						}}>
						<div 
							style={{
								background:colorSeleciconadoPromo
							}}
							className="Card-Fecha-Vigencia-Promocion-nuevo"
						>
							<div className="Primera-Parte-Fecha-Vigencia-Promocion">
								<img src={IconoCalendarioPromocion} className="Icono-Calendario-Promocion" />
							</div>
							<div className="Segunda-Parte-Fecha-Vigencia-Promocion">
								<div className="Fecha-Inicio-Vigencia-Promocion">Ini {fechainicio ?fechainicio :"01/10"}</div>
								<div className="Fecha-Final-Vigencia-Promocion">Fin {fechafinal ?fechafinal :"30/10"}</div>
							</div>
						</div>

						{
							funPermisosObtenidos(
								permisosUsuario,
								PERMISO_BOTON_EDITAR_PROMOCION,
								<div id ="contenedorBtnEditarPromocion">
									{
									this.state.editandoPromocion == true
									?this.state.imagenPreviewProducto != null || this.state.imagenPreviewBonificado != null
										?<div id="contenedorIconosEdicion">
										<span 
											onClick = {() => this.habilitarDesabilitarEdicionPromocion()}
											id="btnEditarPromocion" 
											// className="gx-size-50 gx-border gx-border-danger gx-text-danger gx-justify-content-center gx-align-items-center gx-rounded-circle"
										>
											<i className="icon icon-close-circle" id="iconoCancelarEdicionPequeno"/>
										</span>
										{" "}
										<span 
											onClick = {() => 
											this.mandarEditarImagenPromocion()
											}
											id="btnEditarPromocion" 
											className="">
											<i className="icon icon-check-circle-o" id="iconoGuardarEdicion"/>
										</span>
										</div>
										:<span 
										onClick = {() => this.habilitarDesabilitarEdicionPromocion()}
										id="btnEditarPromocion" 
										className="gx-size-40 gx-border gx-border-danger gx-text-danger gx-flex-row gx-justify-content-center gx-align-items-center gx-rounded-circle">
										<i className="icon icon-close" id="iconoCancelarEdicion"/>
										</span>
									:<span 
										onClick = {() => this.habilitarDesabilitarEdicionPromocion()}
										id="btnEditarPromocion" 
										className="gx-size-40 gx-border gx-border-primary gx-text-primary gx-flex-row gx-justify-content-center gx-align-items-center gx-rounded-circle">
										<i className="icon icon-edit" id="iconoEditar"/>
									</span>
									}
								</div>
							)
						}

						{
							funPermisosObtenidos(
								permisosUsuario,
								PERMISO_CODIGO_PROMOCION,
								<div id="contenedorPalabraCodigoPromocion">
									{prmcodigo}
								</div>
							)
						}
						{
							cspnuevo == 1
							?<div id="insigniaNuevo"> 
								<img alt="" src={require("../../../Assets/Img/Promociones/etiquetaNuevo.png")} width="62px" height="99px"/>
							</div>
							:null
						}

						{
							cspcompletado == true
							?<div id="insigniaCompletado">
								Completado
								<img alt="" src={require("../../../Assets/Img/Promociones/estrellaCompletado.png")} width="25px" height="25px"/>
							</div>
							:null
						}
							<Row style={{textAlign: "center"}}>
								<Col 
									xl={24} md={24} sm={24} xs={24} className="gx-text-center" 
									style={{
										marginBottom:'20px', marginTop:'-10px',
										textAlign: "center"
									}} 
								>
									
									<span 
										id="tituloCombos"
										style={{
											color:colorSeleciconadoPromo, 
									}}>
										{
										cspcantidadplancha == 'NA'
										?0
										:<NumberFormat value={funFomratoDecimal(cspcantidadplancha, 0)} displayType={'text'} thousandSeparator={true} />
										}
									
										{" Planchas"}
										<br/>
									</span>
									
									<div id="txt_totalPlanchas" style={{color: colorSeleciconadoPromo+"B3", }}>
										{"Total de Combos: "}
										{
										cspcantidadcombo == 'NA'
										?0
										:<NumberFormat value={funFomratoDecimal(cspcantidadcombo, 0)} displayType={'text'} thousandSeparator={true} />
										}
										
										<br/>
									</div>

									<span 
										id="tituloVenta">
										{tprnombre+" "}
										{/* Bonificación */}
									</span>
								</Col>
							</Row>
							<Row
								style={{
									textAlign: "-webkit-center",
									marginTop: "-8px"
								}}
							>
								{
									productos.map((producto, posicion) => {
										return (
											posicion == 0
											?<Col xl={11} md={11} sm={11} xs={11}>
												<Row className="gx-text-center">
													<Col xl={24} md={24}>
														<input 
															type="file" 
															id="file" 
															ref="seleccionarImagenProductoRef" 
															style={{display: "none"}} 
															onChange={(e) => this.cambioInputFileProducto(e)} 
														/>
														{
														this.state.editandoPromocion == true
														?<div
															onClick = {() => this.seleccionarImagenProducto(producto.prpid)} 
															id="contenedorImagenProducto">
															<img 
																src={
																	this.state.imagenPreviewProducto == null
																	?"https://cdn.pixabay.com/photo/2017/11/10/05/24/upload-2935442_960_720.png"
																	:this.state.imagenPreviewProducto
																} 
																width="105px" 
																height="59px" 
																id="imagenProducto"
															/>
															{/* <i className="icon icon-edit" id="iconoEditarProducto"/> */}
														</div>
														:<>
															<img src={producto.prpimagen} width="105px" height="59px"/>                                            
															{
															funPermisosObtenidos(
																permisosUsuario,
																"promociones.mostrar.sku.promocion",
																<div>{producto.prosku}</div>
															)
															}
														</>
														}
														
														
													</Col>
													<Col xl={24} md={24} className="gx-text-center">
														<div
															style={{
																marginTop: "1px"
															}} 
															id="txtProducto" >{producto.prpproductoppt}<br/></div>
														<div id="txtSubProducto" title={producto.prpcomprappt}>
															{
															producto.prpcomprappt.substr(0, 28)
															}
														</div>
													</Col>
												</Row>
											</Col>
											:null
										)
									})
								}
								<Col xl={2} md={2} sm={2} xs={2} />
								<Col xl={11} md={11} sm={11} xs={11}>
									<Row>
										{
											productosbonificados.map((productoBonificado, posicion) => {
												return(
													posicion == 0
													?<Col xl={24} md={24} className="gx-text-center" style={{marginTop:'-20px'}}>
														<input 
														type="file" 
														id="file" 
														ref="seleccionarImagenBonificadoRef" 
														style={{display: "none"}} 
														onChange={(e) => this.cambioInputFileBonificado(e)} 
														/>

														{
														<div  style={{width:'100%'}} className="gx-text-center">
															{
															cspgratis == 1
															?<div id="entornoGratis" style={{marginLeft: "-0px"}}>
																<div>
																	<img src={IconoRegalo} alt='' id="imggratis"/>
																	<span id="txtgratis"> Gratis </span>
																</div>
																</div>
															:<div id="entornoGratisSinColor"></div>
															}
														</div>
														}
														{
														this.state.editandoPromocion == true
														?<div
															onClick = {() => this.seleccionarImagenBonificado(productoBonificado.prbid)} 
															id="contenedorImagenProductoBonificado">
															<img 
															src={
																this.state.imagenPreviewBonificado == null
																?"https://cdn.pixabay.com/photo/2017/11/10/05/24/upload-2935442_960_720.png"
																:this.state.imagenPreviewBonificado
															} 
															width="105px" 
															height="59px" 
															/>
															{/* <i className="icon icon-edit" id="iconoEditarProducto"/> */}
														</div>
														:<>
															<img src={productoBonificado.prbimagen} width="105px" height="59px"/>
															{/* miomio */}
															{
															funPermisosObtenidos(
																permisosUsuario,
																"promociones.mostrar.sku.promocion",
																<div>{productoBonificado.prosku}</div>
															)
															}
														</>
														}
														
														
														<div id="txtProducto" >{productoBonificado.prbproductoppt}<br/></div>
														<div id="txtSubProducto" title={productoBonificado.prbcomprappt}>
															{
															productoBonificado.prbproductoppt == "Dscto"
															?<div>{funFomratoDecimal((productoBonificado.prbcomprappt*100), 2)}% (S/{<NumberFormat value={funFomratoDecimal(((productoBonificado.prbcomprappt*100) * this.props.slide.csptotal), 2)} displayType={'text'} thousandSeparator={true} /> })</div>
															:productoBonificado.prbcomprappt.substr(0, 28)
															}
															
														</div>
														</Col>           
													:null
												)
											})
										}
									</Row>
								</Col>
							</Row>
							<Row style={{textAlign: "center"}}>
							<Col xl={11} md={11} sm={11} xs={11} className="gx-text-center" >
							<p 
								id="txtPlanchas"
							>
								Planchas<br/>
								{
								this.state.editando == true
								?<input 
									id="inputPlanchas" 
									type="number"
									value={this.state.inputPlanchas}
									onChange={this.obtenerValorizado}
								/>
								:<div id="inputPlanchasBloqueado">
									{cspplanchas}
								</div>
								}
							</p>
							</Col>
							<Col xl={2} md={2} sm={2} xs={2} />
							<Col xl={11} md={11} sm={11} xs={11} className="gx-text-center">
								<p  id="tituloValorizado">Valorizado<br/>
								<b id="precioValorizado">
									S/
									<NumberFormat value={
									funFomratoDecimal(this.state.txtValorizado, 2)} displayType={'text'} thousandSeparator={true} />
								</b>
								</p>
							</Col>
							<Col xl={24} md={24} sm={24} xs={24} className="gx-text-center" style={{marginTop:'0'}}>
							<Button 
								id="txtBtnEditar"
								style={{background: colorSeleciconadoPromo}}
								onClick={() => {
								if(this.state.editando == false){
									this.setState({
									editando : true
									})
								}else{
									editarPromocion(posicionPromocion)
								}
								}}
							>
								Editar
							</Button>
							</Col>
							</Row>
							{
							guardando == true
							?<div style={{background:'rgba(102,102,102,0.7)', width:'100%', height:'100%', position:'absolute', left:0, top:0, borderRadius:'20px'}}>
								<div style={{background:'transparent', width:'100%', height:'100%', position:'absolute', left:0, top:0, borderRadius:'20px'}} onClick={() => editarPromocion(posicionPromocion)} />
								<Row style={{alignItems:'center', width:'105%', height:'100%', justifyContent:'center'}}>
								<Card style={{  background:'#2BBEE0', border:'none', width:'170px', height:'150px', borderRadius:'20px', textAlign:'center' }}>
									<div id="tituloConfirmacion" >¿Desea guardar los cambios?</div>
									<div style={{marginTop:'3px'}} />
									<div style={{color:'white'}} id="descripcionConfirmacion">Esta opción se activará al cierre del mes<br/></div>
									<Button 
										id="btnEditar"
										style={{border:'1px solid #fff', color:'white', borderRadius:'25px', background:'transparent'}} 
										onClick={() => 
											aceptarEdicionPromocionReducer(posicionPromocion, this.props.scaid, cspid, this.state.txtValorizado, this.state.inputPlanchas)
										}
									>
									Aceptar
									</Button>
								</Card>
								</Row>
							</div>
							:null
							}
							<div id="ultimaColumnaCarouselPromocion"></div>
						</Card> 
					</Spin>
				</div>
			</li>
		)
	}
}



// =========================
// Slider
// =========================

class PromocionesCarousel extends React.Component {
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
    const { current, direction, seleccionoPromocion } = this.state
    const { 
      slides, 
      heading, 
      editarPromocion, 
      colorSeleciconadoPromo, 
      porcentaje, 
      aceptarEdicionPromocionReducer, 
      scaid,
      permisos,
      editarImagenesPromocion
     } = this.props 
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
    const wrapperTransform = {
      'transform': `translateX(-${current * (100 / slides.length)}%)`
    }
    

    if(this.state.activarCarouselAvanzar == true){
      if(slides.length > 3){
        setTimeout(() => {
          if(this.state.activarCarouselAvanzar == true){
            if(this.state.current <= slides.length - 3){
              this.setState({
                current: this.state.current+0.1
              })
            }
          }
        }, 105);
      }
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
              current: this.state.current-0.1
            })
          }else{
            this.setState({
              current: 0
            })
          }
        }
      }, 105);
    }

    return (
      <div className='sliderPromocion' aria-labelledby={headingId}>
        <ul className="slider__wrapper_promocion" style={wrapperTransform}>
          <h3 id={headingId} class="visuallyhiddenPromocion">{heading}</h3>
          
          {slides.map((slide, posicion) => {
            return (
              // slide.cspcantidadcombo == 0
              slide.cspcantidadplancha == 0
              ?null
              :<div
                // onClick={() => seleccionarCategoria(slide.scaid, posicion)}
                // style={{marginTop:'20px'}}
                onMouseEnter={() => {
                    if(this.state.cambiando == true){

                    }else{
                        // this.setState({
                        //     cambiando : true
                        // })

                        // if(posicion == 0 && posicion == current){
                        //     setTimeout(() => {
                        //         this.setState({
                        //             cambiando : false
                        //         })
                        //     }, 500);
                        // }else if(posicion == current+1  ){
                        //     this.seleccionarEspecifico(current)
                        //     setTimeout(() => {
                        //         this.setState({
                        //             cambiando : false
                        //         })
                        //     }, 500);
                        // }else if(posicion > current){
                        //     setTimeout(() => {
                        //         this.handleNextClick();
                        //         this.setState({
                        //             cambiando : false
                        //         })
                        //     }, 500);
                        // }else if(posicion < current){
                        //     setTimeout(() => {
                        //         this.handlePreviousClick();
                        //         this.setState({
                        //             cambiando : false
                        //         })
                        //     }, 500);
                        // }else{
                        //     setTimeout(() => {
                        //         this.setState({
                        //             cambiando : false
                        //         })
                        //     }, 500);
                        // }
                    }
                }}
              >
                <Slide
                    key                     = {posicion}
                    posicion                = {posicion}
                    slide                   = {slide}
                    current                 = {current}
                    handleSlideClick        = {this.handleSlideClick}
                    seleccionado            = {slide.seleccionado}
                    editarPromocion         = {editarPromocion}
                    colorSeleciconadoPromo  = {colorSeleciconadoPromo}
                    editarImagenesPromocion = {editarImagenesPromocion}
                    aceptarEdicionPromocionReducer = {aceptarEdicionPromocionReducer}
                    scaid     = {scaid}
                    permisos  = {permisos}
                    
                />
              </div>
            )
          })}


          {/* ----------------------------------- */}
          {/* {
            porcentaje == 100
            ?<div
              onMouseEnter={() => {
              }}
            >
              <li 
                className={"slidePromocion"} 
              >
                <div className="slide__image-wrapperPromocion">
                    <Card 
                      style={{
                        borderRadius:'20px', 
                        backgroundImage: "url("+config.api+"Sistema/abs/img/cierreCompleto.png"+")", 
                        backgroundSize: '100% 100%', 
                        backgroundRepeat:'no-repeat', backgroundPosition:'center',
                        width:'385px',
                        height:'250px'
                      }}>
                        <Row className="gx-text-center" style={{width:'100%', height:'100%', marginTop:'5%'}}>
                          <Col xl={18} md={18}>
                            <span id="felicidades">¡Felicidades!</span>
                          </Col><Col xl={6} md={6} />
                          <Col xl={2} md={2} />
                          <Col xl={15} md={15}>
                            <span id="decripcionFelicidades">{porcentaje}%</span>
                          </Col><Col xl={7} md={7} />
                          <Col xl={18} md={18}>
                            <img alt="" src={require("assets/images/estrellas.png")} />
                          </Col><Col xl={6} md={6} />
                          <Col xl={1} md={1} />
                          <Col xl={15} md={15}>
                            <span id="decripcionFelicidades">Terminaste con éxito registrar tu cierre de mes</span>
                          </Col><Col xl={7} md={7} />
                        </Row>
                    </Card>
                </div>
              </li>
            </div>
            :<div
              onMouseEnter={() => {
              }}
            >
              <li 
                className={"slidePromocion"} 
              >
                <div className="slide__image-wrapperPromocion">
                    <Card 
                      style={{
                        borderRadius:'20px', 
                        backgroundImage: "url("+config.api+"Sistema/abs/img/cierreIncompleto.png"+")", 
                        backgroundSize: '100% 100%', 
                        backgroundRepeat:'no-repeat', backgroundPosition:'center',
                        width:'385px',
                        height:'250px'
                      }}>
                        <Row className="gx-text-center" style={{width:'100%', height:'100%', marginTop:'18%'}}>
                          <Col xl={15} md={15}>
                            <span id="upsPromocionHover" >¡Ups!</span>
                          </Col><Col xl={9} md={9} />
                          <Col xl={14} md={14} style={{marginTop:'10px'}}>
                            <span id="tuCierrePromocionHover">Tu cierre está a un {porcentaje}% al parecer no has terminado de registrar todo.</span>
                          </Col><Col xl={7} md={7} />
                        </Row>
                    </Card>
                </div>
              </li>
            </div>
          } */}
        </ul>
        <div 
          className   = "minorista"
          style       = {{ 
            background: colorSeleciconadoPromo, 
          }}
        >
          <div id="txtcanal"> {this.props.nombreCanal} </div>
            
        </div>
        <div className='contenedorSliderPromocion'>
            <div 
              onMouseLeave={() =>{
                this.funDesactivarCarousel()
              }}
              onMouseEnter={() => {
                this.funActicarCarouselRetroceder()
              }} 
              id="primeraMitadSliderPromocion" ></div>
            <div
              onMouseLeave={() =>{
                this.funDesactivarCarousel()
              }}
              onMouseEnter={() => {
                this.funActivarCarouselAvanzar()
              }} 
              id="segundaMitadSliderPromocion" >

              </div>
          </div>
    
      </div>
    )
  }
}

export default PromocionesCarousel