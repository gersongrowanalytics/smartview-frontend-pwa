import React, {useEffect} from 'react';
import FiltrosPromociones from '../../Componentes/Filtros/FiltrosPromociones';
import BannerPromociones from '../../Assets/Img/Promociones/bannerPromociones.png'
import CarouselPromociones from '../../Componentes/Rutas/Promociones/CarouselPromociones';
import {useDispatch, useSelector} from "react-redux";
import {
    obtenerPromocionesReducer,
    seleccionarPromocionReducer,
    seleccionarCategoriaReducer
} from '../../Redux/Acciones/Promociones/Promociones'
import { wait } from '@testing-library/dom'
import IconoCalendarioPromocion from '../../Assets/Img/Promociones/calendario.png'
import IconoNoPromocion from '../../Assets/Img/Promociones/nopromocion.png'
import NumberFormat from 'react-number-format';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import '../../Estilos/Rutas/Promociones/index.css'
import '../../Estilos/Rutas/Promociones/nuevocanalpromociones.css'
import CanalPromociones from '../../Componentes/Rutas/Promociones/CanalPromociones';

const Promociones = () => {

    const dispatch = useDispatch();
    const {
        categoriasPromociones, 
        seleccionoPromocion, 
        canalesPromociones,
        colorSeleciconadoPromo,
        mostrarDisenioPromocionesPrincipal
    } = useSelector(({promociones}) => promociones);

    const {permisos} = useSelector(({auth}) => auth);
    
    // const {seleccionarFiltroZona} = useSelector(({zonas}) => zonas);

    const seleccionarCategoria = async (scaid, posicion, catid) =>  {
        // console.log(seleccionarFiltroZona)

        // if(seleccionarFiltroZona == true){
            // await dispatch(seleccionarPromocionReducer(true))
            // await dispatch(seleccionarCategoriaXZonaReducer(scaid, true, catid))
        // }else{
            await dispatch(seleccionarPromocionReducer(true))
            await dispatch(seleccionarCategoriaReducer(scaid, true, posicion))
        // }
    }

    const deseleccionarCategoria = async () => {
        // dispatch(reiniciarPromocionesReducer())
    }

    useEffect(() => {

        dispatch(obtenerPromocionesReducer())

    }, [])

    
    return (
        <div>
            <FiltrosPromociones />
            
            <div className='Contenedor-Img-Banner-Ventas'>
                <img className='Contenedor-Img-Banner-Ventas' src={BannerPromociones} />
            </div>

            <div style={{marginTop:'20px'}}></div>

            <CarouselPromociones 
                heading                 = "Example Slider"   
                slides                  = {categoriasPromociones} 
                seleccionarCategoria    = {seleccionarCategoria}
                seleccionoPromocion     = {seleccionoPromocion}
                deseleccionarCategoria  = {deseleccionarCategoria}
                seleccionarFiltroZona   = {false}
            />


            {
                mostrarDisenioPromocionesPrincipal == true
                ?canalesPromociones.map((item, posicion) => {
                    return (
                        <CanalPromociones
                            posicionCanal   = {posicion}
                            cscid           = {item.cscid}
                            nombreCanal     = {item.cannombre}
                            promociones     = {item.promociones}
                            porcentaje      = {item.porcentaje}
                            colorSeleciconadoPromo = {colorSeleciconadoPromo}
                            permisos        = {permisos}
                        />
                    )
                })
                :null
            }



            {/* NUEVO VISTADO DE CANALES POR PROMOCIONES */}


                

            {
                mostrarDisenioPromocionesPrincipal == true
                ?null
                :<div id="Contenedor-Canales-Promociones">
                    <div className="scenes">
                        
                        {
                            canalesPromociones.map((canal) => {

                                // let subiendo = false

                                // while(subiendo == true){
                                //     document.getElementById('Contenedor-Canales-Promociones').scrollTop = document.getElementById('Contenedor-Canales-Promociones').scrollTop - 10
                                // }

                                return (
                                    <div className="Fila-Canal-Promocion">
                                        <div
                                            // onClick={() => console.log(colorSeleciconadoPromo)} 
                                            className="Cabecera-Canal-Promocion Wbold-S16-H21-CFFFFFF"
                                            style={{
                                                background:colorSeleciconadoPromo
                                            }}
                                            onClick={() => {
                                                
                                            }}
                                            onMouseEnter={() => {
                                                
                                                while(document.getElementById('Contenedor-Canales-Promociones').scrollTop = 0){
                                                    document.getElementById('Contenedor-Canales-Promociones').scrollTop = document.getElementById('Contenedor-Canales-Promociones').scrollTop - 10
                                                    wait(1000)
                                                }

                                            }}
                                            onMouseLeave={() => {
                                                // subiendo = false
                                            }}
                                        >
                                            {canal.cannombre}
                                        </div>

                                        <div>
                                        {
                                            canal.promocionesOrdenadas.map((promocion, posicionPromocion) => {
                                                return(
                                                    posicionPromocion+1 == canal.promocionesOrdenadas.length
                                                    ?promocion.cspid == 0
                                                        // ?null
                                                        ?<CardPromocionClass 
                                                            promocion = {promocion}
                                                            posicionPromocion = {posicionPromocion}
                                                            colorSeleciconadoPromo = {
                                                                promocion.cspid == 0 || promocion.prmmecanica == ""
                                                                ?"red"
                                                                :colorSeleciconadoPromo
                                                            }
                                                        />
                                                        :<CardPromocionClass 
                                                            promocion = {promocion}
                                                            posicionPromocion = {posicionPromocion}
                                                            colorSeleciconadoPromo = {
                                                                promocion.cspid == 0 || promocion.prmmecanica == ""
                                                                ?"red"
                                                                :colorSeleciconadoPromo
                                                            }
                                                        />
                                                    :<CardPromocionClass 
                                                        promocion = {promocion}
                                                        posicionPromocion = {posicionPromocion}
                                                        colorSeleciconadoPromo = {
                                                            promocion.cspid == 0 || promocion.prmmecanica == ""
                                                            ?"red"
                                                            :colorSeleciconadoPromo
                                                        }
                                                    />
                                                )
                                            })
                                        }
                                        </div>
                                        
                                    </div>
                                )
                            })
                        }

                        
                    </div>
                </div>
            }



        </div>
    )
};







class CardPromocionClass extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txtValorizado : this.props.promocion.cspvalorizado,
            editando : false,
            inputPlanchas : this.props.promocion.cspplanchas,
        }
        this.obtenerValorizado = this.obtenerValorizado.bind(this)
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
    
        if(this.props.promocion.cspcantidadplancha == 'NA'){
            this.setState({
                txtValorizado : 0
            })
        }else{
            if(nuevoValor <= this.props.promocion.cspcantidadplancha){
                let nuevoValorizado = nuevoValor*this.props.promocion.csptotalplancha
                this.setState({
                    txtValorizado : nuevoValorizado
                })
            }else{
                let nuevoValorizado = this.props.promocion.cspcantidadplancha*this.props.promocion.csptotalplancha
                this.setState({
                    txtValorizado : nuevoValorizado
                })
            }
        }
    }

    render() {
        
        const promocion = this.props.promocion
        const colorSeleciconadoPromo = this.props.colorSeleciconadoPromo
        // const cspidPromocionSelec = promocion.cspid == 0
        const cspidPromocionSelec = promocion.cspid

        return (
            <div 
                className="Card-Promocion"
                style={{
                    border: "1px solid "+colorSeleciconadoPromo
                }}
            >
                <div 
                    style={{
                        background:colorSeleciconadoPromo
                    }}
                    className="Card-Fecha-Vigencia-Promocion"
                >
                    <div className="Primera-Parte-Fecha-Vigencia-Promocion">
                        <img src={IconoCalendarioPromocion} className="Icono-Calendario-Promocion" />
                    </div>
                    <div className="Segunda-Parte-Fecha-Vigencia-Promocion">
                        <div className="Fecha-Inicio-Vigencia-Promocion">Ini {promocion.fechainicio ?promocion.fechainicio :"01/10"}</div>
                        <div className="Fecha-Final-Vigencia-Promocion">Fin {promocion.fechafinal ?promocion.fechafinal :"30/10"}</div>
                    </div>
                </div>
                {
                    promocion.cspid == 0 || promocion.prmmecanica == ""
                    ?<div
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlignLast: "center"
                        }}
                    >
                        <div>
                            <img 
                                src={IconoNoPromocion}  
                                width= {"63px"}
                                height={"63px"}
                            /> 
                            <div
                                style={{color:'red'}}
                            > No hay promoción </div>
                        </div>
                        
                    </div>
                    : <>

                    <div 
                        className="Titulo-Card-Promocion Wbold-S14-H19"
                        style={{color:colorSeleciconadoPromo}}
                    >
                        {
                            promocion.cspcantidadplancha == 'NA'
                            ?0
                            :<NumberFormat value={funFomratoDecimal(promocion.cspcantidadplancha, 0)} displayType={'text'} thousandSeparator={true} />
                        } Planchas
                    </div>
                    <div className="Wbold-S11-H15-O07 Subtitulo-Card-Promocion" style={{color:colorSeleciconadoPromo, marginTop:'-5px'}}>
                        Total de Combos
                        {
                            promocion.cspcantidadcombo == 'NA'
                            ?0
                            :<>{": "}
                                <NumberFormat value={funFomratoDecimal(promocion.cspcantidadcombo, 0)} displayType={'text'} thousandSeparator={true} />
                            </>
                        }
                    </div>
                    <div className="Wbold-S10-H13-CFFBB37 Nombre-Tipo-Promocion-Card-Promocion">{promocion.tprnombre}</div>

                    <div className="Cuerpo-Card-Promocion">
                        {
                            promocion.productos.map((producto, posicionProducto) => {
                                return(
                                    posicionProducto == 0
                                    ?<div className="Primera-Cuerpo-Card-Promocion">
                                        <img 
                                            src={producto.prpimagen} 
                                            className="Imagen-Card-Promocion"
                                        />
                                        <div className="Nombre-Producto-Card-Promocion">{producto.prpproductoppt}</div>
                                        <div className="Descripcion-Producto-Card-Promocion" title={producto.prpcomprappt} >
                                        {
                                            producto.prpcomprappt.substr(0, 25)
                                        }
                                        </div>

                                        <div
                                            style={{
                                                marginTop:'5px',
                                            }} 
                                            className="Descripcion-Producto-Card-Promocion" 
                                        >Planchas</div>
                                        <div className="Valor-Producto-Card-Promocion">
                                            {
                                                this.state.editando == true
                                                ?<input 
                                                    id="inputPlanchas" 
                                                    type="number"
                                                    value={this.state.inputPlanchas}
                                                    onChange={this.obtenerValorizado}
                                                />
                                                :promocion.cspplanchas
                                            }
                                        </div>
                                    </div>
                                    :null
                                )
                            })
                        }
                        {
                            promocion.productosbonificados.map((bonificado, posicionBonificado) => {
                                return (
                                    posicionBonificado == 0
                                    ?<div className="Segunda-Cuerpo-Card-Promocion">
                                        {
                                            promocion.cspgratis == 1
                                            ?<div className="Contenedor-Descripcion-Gratis-Card-Promocion">
                                                <img src={require('../../Assets/Img/Promociones/regalo.png')} alt='' className="Icono-Gratis-Card-Promocion"/>
                                                <div className="Descripcion-Gratis-Card-Promocion">Gratis</div>
                                            </div>
                                            :null
                                        }
                                        <img 
                                            src={bonificado.prbimagen} 
                                            className="Imagen-Card-Promocion"
                                        />
                                        <div className="Nombre-Producto-Card-Promocion">{bonificado.prbproductoppt}</div>
                                        <div className="Descripcion-Producto-Card-Promocion" title={bonificado.prbcomprappt}>
                                            {
                                                bonificado.prbproductoppt == "Dscto"
                                                ?<div>
                                                    {
                                                        bonificado.prbcomprappt
                                                        ?promocion.csptotal
                                                        ?<>
                                                            {funFomratoDecimal((bonificado.prbcomprappt*100), 2)}% (S/{<NumberFormat value={funFomratoDecimal(((bonificado.prbcomprappt*100) * promocion.csptotal), 2)} displayType={'text'} thousandSeparator={true} /> })
                                                        </>
                                                        :null
                                                        :null
                                                    }
                                                </div>
                                                :bonificado.prbcomprappt ? bonificado.prbcomprappt.substr(0, 25) : 0
                                            }
                                        </div>
                                        <div
                                            style={{marginTop:'5px'}}  
                                            className="Descripcion-Producto-Card-Promocion" >Valorizado</div>
                                        <div className="Valor-Producto-Card-Promocion">
                                                S/
                                                <NumberFormat value={
                                                    funFomratoDecimal(this.state.txtValorizado, 2)} displayType={'text'} thousandSeparator={true} 
                                                />
                                        </div>
                                    </div>
                                    :null
                                )
                            })
                        }
                    </div>

                    <div 
                        className="Contenedor-Btn-Editar-Card-Promocion"
                        style={{
                            background: colorSeleciconadoPromo,
                            border: "1px solid "+colorSeleciconadoPromo
                        }}
                    >
                        <div 
                            className="Btn-Editar-Card-Promocion"
                            onClick={() => {
                                if(this.state.editando == false){
                                    this.setState({
                                        editando : true
                                    })
                                }else{
                                    // editarPromocion(posicionPromocion)
                                }
                            }}
                        >
                            Editar
                        </div>
                    </div>
                

                </>
                
                
                }
               
                
            
            </div>
        )
    }
}



export default Promociones;
