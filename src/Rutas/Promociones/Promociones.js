import React, {useEffect, useState} from 'react';
import FiltrosPromociones from '../../Componentes/Filtros/FiltrosPromociones';
import BannerPromociones from '../../Assets/Img/Promociones/bannerPromociones.png'
import CarouselPromociones from '../../Componentes/Rutas/Promociones/CarouselPromociones';
import {useDispatch, useSelector} from "react-redux";
import {
    obtenerPromocionesReducer,
    seleccionarPromocionReducer,
    seleccionarCategoriaReducer,
    ObtenerPromocionesAcumuladasReducer,
    SeleccionarCategoriaXZonaAcumuladaReducer
} from '../../Redux/Acciones/Promociones/Promociones'
import { wait } from '@testing-library/dom'
import IconoCalendarioPromocion from '../../Assets/Img/Promociones/calendario.png'
import { Modal } from 'antd';
import IconoNoPromocion from '../../Assets/Img/Promociones/nopromocion.png'
import IconoNoPromocionAzul from '../../Assets/Img/Promociones/nopromocionazul.png'
import IconoNoPromocionRojo from '../../Assets/Img/Promociones/nopromocionrojo.png'
import IconoNoPromocionMorado from '../../Assets/Img/Promociones/nopromocionmorado.png'
import IconoNoPromocionVerde from '../../Assets/Img/Promociones/nopromocionverde.png'
import IconoNoPromocionRosado from '../../Assets/Img/Promociones/nopromocionrosado.png'
import IconoNoPromocionCeleste from '../../Assets/Img/Promociones/nopromocionceleste.png'

import NumberFormat from 'react-number-format';
import funFomratoDecimal from '../../Funciones/funFormatoDecimal'
import '../../Estilos/Rutas/Promociones/index.css'
import '../../Estilos/Rutas/Promociones/nuevocanalpromociones.css'
import CanalPromociones from '../../Componentes/Rutas/Promociones/CanalPromociones';

import ImgNoticiaPromocion from '../../Assets/Img/Promociones/noticiapromocion.png'
import GifPromNuevas from '../../Assets/Gif/promnuevas.gif'
import '../../Estilos/Rutas/Promociones/Promociones.css'

const Promociones = () => {

    const dispatch = useDispatch();

    const {
        idSucursalUsuarioSelec,
        aplicandoFiltroAcumulado
    } = useSelector(({sucursales}) => sucursales);

    const {
        aplicandoFiltroFechas,
        anioSeleccionadoFiltro,
        mesSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);

    const {
        categoriasPromociones, 
        seleccionoPromocion, 
        canalesPromociones,
        colorSeleciconadoPromo,
        mostrarDisenioPromocionesPrincipal,
        mostrar_promociones_nuevas
    } = useSelector(({promociones}) => promociones);

    const {permisos, cargando_vista_inicio_sistema} = useSelector(({auth}) => auth);
    
    // const {seleccionarFiltroZona} = useSelector(({zonas}) => zonas);

    const seleccionarCategoria = async (scaid, posicion, catid) =>  {

        setCategoriaSeleccionada(catid)

        // if(seleccionarFiltroZona == true){
        if(aplicandoFiltroAcumulado == true){
            await dispatch(seleccionarPromocionReducer(true))
            // await dispatch(seleccionarCategoriaXZonaReducer(scaid, true, catid))
            await dispatch(SeleccionarCategoriaXZonaAcumuladaReducer(scaid, true, catid))

        }else{
            await dispatch(seleccionarPromocionReducer(true))
            await dispatch(seleccionarCategoriaReducer(scaid, true, posicion))
        }
    }

    const deseleccionarCategoria = async () => {
        // dispatch(reiniciarPromocionesReducer())
    }

    useEffect(() => {

        if(idSucursalUsuarioSelec != 0){
            dispatch(obtenerPromocionesReducer())
        }

    }, [idSucursalUsuarioSelec])

    useEffect(() => {

        if(aplicandoFiltroFechas == true){

            if(aplicandoFiltroAcumulado == true){
                dispatch(ObtenerPromocionesAcumuladasReducer())
            }else{
                if(idSucursalUsuarioSelec != 0){
                    dispatch(obtenerPromocionesReducer())
                }
            }
        }

    }, [mesSeleccionadoFiltro, anioSeleccionadoFiltro])

    useEffect(() => {

        if(aplicandoFiltroAcumulado == true){
            dispatch(ObtenerPromocionesAcumuladasReducer())
        }

    }, [aplicandoFiltroAcumulado])

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("0")
    const [mostrarNoticia, setMostrarNoticia] = useState(false)

    useEffect(() => {

        if(cargando_vista_inicio_sistema == true){

        }else{
    
            setTimeout(() => {
                setMostrarNoticia(true)
            }, 3000);
    
        }

    }, [cargando_vista_inicio_sistema])

    return (
        <div className='Cont-Promociones'>

            <Modal
                title={null}
                footer={null}
                centered
                visible={mostrarNoticia}
                // visible={false}
                closeIcon={<div></div>}
                width={"823px"}
                height={"436px"}
                style={{
                    background:'transparent',
                    borderRadius:'20px'
                }}
            >
                <div>
                    <img src={ImgNoticiaPromocion} className="Banner-Noticias-Promociones" />
                    <div className='Cont-Modal-Txt-Promociones'>
                        <div>
                            <div 
                                className='Wbold-S27-H36-C000000'
                                style={{textAlignLast: "center", marginBottom:'30px'}}
                            >
                                Noticia Importante
                            </div>
                            <div 
                                className='W600-S11-H15-C1E1E1E'
                                style={{
                                    textAlign: "justify"
                                }}
                            >
                                Por el presente correo, cumplo con informarle las tácticas promocionales para este mes con el número de combos/soles a reconocer por actividad y monto máximo de reconocimiento en valor por actividad respectivos por cada mecánica. Dichos montos no podrán excederse de no recibir una aprobación formal del área de Trade copiando al buzón _KC, Cuida tu negocio (Cuidatunegocio.kc@kcc.com), dejando claro que yo como ejecutivo no podré aprobar acciones adicionales sin antes pasar por las aprobaciones respectivas.<br/><br/>

                                Recordar que estos pagos serán vía notas de crédito, una vez compartido su cierre de ventas hasta el día 5 hábil del siguiente mes y se pagarán vía Notas de Crédito en el mismo siguiente mes. Si no envía el cierre dentro del plazo establecido, no se le pagará las tácticas promocionales dentro del próximo mes, sino un mes después de esto.<br/><br/>

                                De acuerdo a la nueva política de KC pongo en copia al correo interno _KC, Cuida tu negocio (Cuidatunegocio.kc@kcc.com), y estas acciones entran en validez desde la fecha 01 de Septiembre hasta fin de mes.

                            </div>

                            <div
                                style={{
                                    float: "right",
                                    marginTop: "20px"
                                }}
                            >
                                <div 
                                    className='Btn-Entendido-Modal-Promociones Wbold-S14-H19-L0015-CFFFFFF'
                                    onClick={() => setMostrarNoticia(false)}
                                >
                                    Entiendo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>

            <FiltrosPromociones />
            
            <div className='Contenedor-Img-Banner-Ventas'>
                <img className='Contenedor-Img-Banner-Ventas' src={BannerPromociones} />
            </div>

            <div style={{marginTop:'100px'}}></div>

            <CarouselPromociones 
                heading                  = "Example Slider"   
                slides                   = {categoriasPromociones} 
                seleccionarCategoria     = {seleccionarCategoria}
                seleccionoPromocion      = {seleccionoPromocion}
                deseleccionarCategoria   = {deseleccionarCategoria}
                seleccionarFiltroZona    = {false}
                aplicandoFiltroAcumulado = {aplicandoFiltroAcumulado}
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
                :<>
                    {
                        canalesPromociones.length > 0
                        ?<div id="Contenedor-Canales-Promociones" style={{marginBottom:'50px'}}>
                            <div className="scenes">
                                
                                {
                                    canalesPromociones.map((canal) => {
        
                                        // let subiendo = false
        
                                        // while(subiendo == true){
                                        //     document.getElementById('Contenedor-Canales-Promociones').scrollTop = document.getElementById('Contenedor-Canales-Promociones').scrollTop - 10
                                        // }
        
                                        return (
                                            canal.canalconnuevaspromos == true || mostrar_promociones_nuevas == false
                                            ?<div className="Fila-Canal-Promocion">
                                                <div
                                                    style={{
                                                        width: "339px",
                                                        height: "48px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        position: "sticky",
                                                        top: "0",
                                                        zIndex: "0"
                                                    }}
                                                >
                                                    <div
                                                        // onClick={() => console.log(colorSeleciconadoPromo)} 
                                                        className="Cabecera-Canal-Promocion Wbold-S16-H21-CFFFFFF"
                                                        style={{
                                                            background:colorSeleciconadoPromo,
                                                            background: "white",
                                                            position: "absolute",
                                                            borderRadius: "0",
                                                            height: "20px"
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
                                                        
                                                    </div>
                                                    <div
                                                        // onClick={() => console.log(colorSeleciconadoPromo)} 
                                                        className={
                                                            mostrar_promociones_nuevas == true
                                                            ?"Cabecera-Canal-Promocion Wbold-S16-H21-C1E1E1E"
                                                            :"Cabecera-Canal-Promocion Wbold-S16-H21-CFFFFFF"
                                                        }
                                                        style={
                                                            mostrar_promociones_nuevas == true
                                                            ?{
                                                                background:'#FEDD34',
                                                                color:'#1E1E1E !important'
                                                            }
                                                            :{
                                                                background:colorSeleciconadoPromo
                                                            }
                                                        }
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
                                                                        // ?"red"
                                                                        ?colorSeleciconadoPromo
                                                                        :colorSeleciconadoPromo
                                                                    }
                                                                    categoriaSeleccionada = {categoriaSeleccionada}
                                                                    mostrar_promociones_nuevas = {mostrar_promociones_nuevas}
                                                                />
                                                                :<CardPromocionClass 
                                                                    promocion = {promocion}
                                                                    posicionPromocion = {posicionPromocion}
                                                                    colorSeleciconadoPromo = {
                                                                        promocion.cspid == 0 || promocion.prmmecanica == ""
                                                                        // ?"red"
                                                                        ?colorSeleciconadoPromo
                                                                        :colorSeleciconadoPromo
                                                                    }
                                                                    categoriaSeleccionada = {categoriaSeleccionada}
                                                                    mostrar_promociones_nuevas = {mostrar_promociones_nuevas}
                                                                />
                                                            :<CardPromocionClass 
                                                                promocion = {promocion}
                                                                posicionPromocion = {posicionPromocion}
                                                                colorSeleciconadoPromo = {
                                                                    promocion.cspid == 0 || promocion.prmmecanica == ""
                                                                    // ?"red"
                                                                    ?colorSeleciconadoPromo
                                                                    :colorSeleciconadoPromo
                                                                }
                                                                categoriaSeleccionada = {categoriaSeleccionada}
                                                                mostrar_promociones_nuevas = {mostrar_promociones_nuevas}
                                                            />
                                                        )
                                                    })
                                                }
                                                </div>
                                                
                                            </div>
                                            :null
                                        )
                                    })
                                }
        
                                
                            </div>
                        </div>
                        :null
                    }
                </>
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
            categoriaSeleccionada : this.props.categoriaSeleccionada,
            mostrar_promociones_nuevas : this.props.mostrar_promociones_nuevas
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
        const categoriaSeleccionada = this.props.categoriaSeleccionada

        return (
            this.props.mostrar_promociones_nuevas == true
            ?promocion.cspnuevapromocion == true
                ?<div 
                    className="Card-Promocion"
                    style={
                        
                        promocion.cspnuevapromocion == true
                        ?{
                            border: "2px solid #FEDD34"
                        }
                        :{border: "1px solid "+colorSeleciconadoPromo}
                    
                    }
                >

                    {
                        promocion.cspnuevapromocion == true
                        ?<div
                            className='Cont-Gif-Nuevas-Promociones'
                        >
                            <img src={GifPromNuevas} className="Gif-Nuevas-Promociones" />
                        </div>
                        :null
                    }

                    {
                        promocion.cspid == 0 || promocion.prmmecanica == ""
                        ?null
                        :<>
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
                        </>
                    }
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

                                {
                                    categoriaSeleccionada == 1
                                    ?<img 
                                        src={IconoNoPromocionAzul}  
                                        width= {"63px"}
                                        height={"63px"}
                                    /> 
                                    :categoriaSeleccionada == 2
                                        ?<img 
                                            src={IconoNoPromocionRojo}  
                                            width= {"63px"}
                                            height={"63px"}
                                        /> 
                                        :categoriaSeleccionada == 3
                                            ?<img 
                                                src={IconoNoPromocionMorado}  
                                                width= {"63px"}
                                                height={"63px"}
                                            /> 
                                            :categoriaSeleccionada == 4
                                                ?<img 
                                                    src={IconoNoPromocionVerde}  
                                                    width= {"63px"}
                                                    height={"63px"}
                                                /> 
                                                :categoriaSeleccionada == 5
                                                    ?<img 
                                                        src={IconoNoPromocionRosado}  
                                                        width= {"63px"}
                                                        height={"63px"}
                                                    /> 
                                                    :<img 
                                                        src={IconoNoPromocionCeleste}  
                                                        width= {"63px"}
                                                        height={"63px"}
                                                    /> 
                                }
                                {/* <img 
                                    src={IconoNoPromocion}  
                                    width= {"63px"}
                                    height={"63px"}
                                />  */}
                                <div
                                    style={{color:colorSeleciconadoPromo}}
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
                                                    {/* <img src={require('../../Assets/Img/Promociones/regalo.png')} alt='' className="Icono-Gratis-Card-Promocion"/> */}
                                                    <div className="Descripcion-Gratis-Card-Promocion Wbold-S9-H12-CE41A37">Gratis</div>
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
                :null
            :<div 
                className="Card-Promocion"
                style={
                    
                    promocion.cspnuevapromocion == true
                    ?{
                        border: "2px solid #FEDD34"
                    }
                    :{border: "1px solid "+colorSeleciconadoPromo}
                
                }
            >

                {
                    promocion.cspnuevapromocion == true
                    ?<div
                        className='Cont-Gif-Nuevas-Promociones'
                    >
                        <img src={GifPromNuevas} className="Gif-Nuevas-Promociones" />
                    </div>
                    :null
                }

                {
                    promocion.cspid == 0 || promocion.prmmecanica == ""
                    ?null
                    :<>
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
                    </>
                }
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

                            {
                                categoriaSeleccionada == 1
                                ?<img 
                                    src={IconoNoPromocionAzul}  
                                    width= {"63px"}
                                    height={"63px"}
                                /> 
                                :categoriaSeleccionada == 2
                                    ?<img 
                                        src={IconoNoPromocionRojo}  
                                        width= {"63px"}
                                        height={"63px"}
                                    /> 
                                    :categoriaSeleccionada == 3
                                        ?<img 
                                            src={IconoNoPromocionMorado}  
                                            width= {"63px"}
                                            height={"63px"}
                                        /> 
                                        :categoriaSeleccionada == 4
                                            ?<img 
                                                src={IconoNoPromocionVerde}  
                                                width= {"63px"}
                                                height={"63px"}
                                            /> 
                                            :categoriaSeleccionada == 5
                                                ?<img 
                                                    src={IconoNoPromocionRosado}  
                                                    width= {"63px"}
                                                    height={"63px"}
                                                /> 
                                                :<img 
                                                    src={IconoNoPromocionCeleste}  
                                                    width= {"63px"}
                                                    height={"63px"}
                                                /> 
                            }
                            {/* <img 
                                src={IconoNoPromocion}  
                                width= {"63px"}
                                height={"63px"}
                            />  */}
                            <div
                                style={{color:colorSeleciconadoPromo}}
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
                                                {/* <img src={require('../../Assets/Img/Promociones/regalo.png')} alt='' className="Icono-Gratis-Card-Promocion"/> */}
                                                <div className="Descripcion-Gratis-Card-Promocion Wbold-S9-H12-CE41A37">Gratis</div>
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
