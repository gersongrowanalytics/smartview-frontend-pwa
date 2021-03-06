import React, {useEffect, useState} from 'react'
import FiltrosRebate from '../../../Componentes/Rutas/Rebate/FiltrosRebate'
import {Row, Col, notification} from "antd";
import '../../../Estilos/Rutas/Rebate/Bonus.css'
import ImgIconoRebate from '../../../Assets/Img/Ventas/rebatebonus.png'
import {useDispatch, useSelector} from "react-redux";
import {
    ObtenerDataRebateBonusReducer,
    SeleccionarCategoriaRebateBonusReducer,
    CrearRebateBonusReducer
} from '../../../Redux/Acciones/Rebate/Bonus/Bonus'

const Bonus = () => {

    const dispatch = useDispatch()
    const {
        mesSeleccionadoFiltro,
        anioSeleccionadoFiltro
    } = useSelector(({fechas}) => fechas);
    const {
        data_rebate_bonus,
        cargando_guardar_rebate_bonus
    } = useSelector(({rebate}) => rebate);

    useEffect(async () => {

        await dispatch(ObtenerDataRebateBonusReducer())

    }, [mesSeleccionadoFiltro, anioSeleccionadoFiltro])

    useEffect(async () => {
        if(data_rebate_bonus.rbbporcentaje){
            setTxtPorcentaje(data_rebate_bonus.rbbporcentaje)
        }else{
            setTxtPorcentaje(0)
        }
        
        setTxtDescripcion(data_rebate_bonus.rbbdescripcion)
    }, [data_rebate_bonus])

    const [txtPorcentaje, setTxtPorcentaje] = useState("")
    // const [txtDescripcion, setTxtDescripcion] = useState("Siempre que cumpla con lo siguiente: Cumplimiento de la cuota NIV al 100% sin incluir la categoría wipes. De lograr el cumplimiento, este rebate será cancelado el mes siguiente.")
    const [txtDescripcion, setTxtDescripcion] = useState("")
    const [editandoRebateBonus, setEditandoRebateBonus] = useState(false)

    return (
        <>

            <FiltrosRebate 
                guardarData = {() => {
                    let data = {
                        re_mes : mesSeleccionadoFiltro,
                        re_anio : anioSeleccionadoFiltro,
                        re_porcentaje : txtPorcentaje,
                        re_descripcion : txtDescripcion,
                        re_cats : data_rebate_bonus.cats
                    }
                    dispatch(CrearRebateBonusReducer(data))
                }}

                cargando_guardar = {cargando_guardar_rebate_bonus}
                editarData = {() => {
                    setEditandoRebateBonus(!editandoRebateBonus)
                }}
                editandoRebate = {editandoRebateBonus}
                mostrarCustomerGroup = {false}
            />

            <div>

                <Row>
                    <Col 
                        xl={6} 
                        style={{
                            paddingLeft:'80px'
                        }}
                    >
                        <div
                            className='Card-Porcentaje-Rebate-Bonus'
                        >
                            <div
                                className='W700-S20-H27-CFFFFFF-L0015'
                                
                            >
                                BONUS
                            </div>
                            <img 
                                src={ImgIconoRebate} 
                                className="Icono-Estrella-Rebate-Bonus"
                            />
                            <div
                                className='Txt-Porcentaje-Rebate-Bonus W700-S25-H33-CFFFFFF-L0015'
                            >
                                <input
                                    className='Input-Porcentaje-Rebate-Bonus'
                                    onChange={(e) => {
                                        setTxtPorcentaje(e.target.value)
                                    }}
                                    value={txtPorcentaje}
                                    disabled={
                                        editandoRebateBonus == true
                                        ?false
                                        :true
                                    }
                                />
                            </div>

                        </div>
                    </Col>
                    <Col 
                        xl={18}
                        style={{paddingRight:'80px'}}
                    >
                        <div
                            className='Card-Categorias-Rebate-Bonus'
                        >

                            <Row
                                style={{
                                    height:'100%'
                                }}
                            >
                                <Col xl={24}>
                                    <div
                                        className='W600-S14-H19-CC4C4C4-L0015 Titulo-Categorias-Rebate-Bonus'
                                    >
                                        Seleccionar a qué categorías aplicará el Bonus
                                    </div>
                                </Col>

                                {
                                    data_rebate_bonus.cats
                                    ?data_rebate_bonus.cats.map((cat, pos) => {
                                        return (
                                            <Col 
                                                xl={4}
                                                style={{
                                                    textAlign: "-webkit-center"
                                                }}
                                            >
                                                <div
                                                    className='Card-Categoria-Rebate-Bonus'
                                                    style={
                                                        cat.seleccionado == true
                                                        ?{
                                                            background: cat.catcolor,

                                                        }
                                                        :{
                                                            opacity: "0.3",
                                                            background: cat.catcolor,
                                                        }
                                                    }
                                                    onClick={async () => {

                                                        if(editandoRebateBonus == true){

                                                            await dispatch(SeleccionarCategoriaRebateBonusReducer(pos))
                                                            let categoriasNoIncluidas = ""

                                                            await data_rebate_bonus.cats.map((cat, pos) => {
                                                                if(cat['seleccionado'] == true){

                                                                }else{
                                                                    categoriasNoIncluidas = categoriasNoIncluidas+", "+cat.catnombreopcional
                                                                }
                                                            })

                                                            setTxtDescripcion("Siempre que cumpla con lo siguiente: Cumplimiento de la cuota NIV al 100% sin incluir la categoría "+categoriasNoIncluidas+". De lograr el cumplimiento, este rebate será cancelado el mes siguiente.")

                                                        }else{
                                                            
                                                            
                                                            notification.info({
                                                                message: `Notificación`,
                                                                description:'Lo sentimos debes habilitar la edición para poder cambiar las categorías.',
                                                                placement: 'topRight',
                                                            });

                                                            
                                                        }

                                                    }}
                                                >
                                                    <img 
                                                        src={cat.caticonohover} 
                                                        className="Icono-Blanco-Categorias-Bonus"
                                                    />
                                                </div>
                                                <div 
                                                    className={
                                                        cat.seleccionado == true
                                                        ?'W600-S14-H19-C1E1E1E-L0015'
                                                        :'W600-S14-H19-CC4C4C4-L0015'
                                                        
                                                    }
                                                >
                                                    {cat.catnombreopcional}
                                                </div>
                                            </Col>
                                        )
                                    })
                                    :null
                                }

                            </Row>

                        </div>
                    </Col>
                    <Col 
                        xl={24}
                        style={{paddingRight:'80px', paddingLeft:'80px', marginTop:'20px', marginBottom:'100px'}}
                    >
                        <div
                            className='Card-Descripcion-Rebate-Bonus W400-S14-H16-C1E1E1E'
                        >
                            <textarea 
                                className='Input-Descripcion-Rebate-Bonus'
                                onChange={(e) => {
                                    // console.log(e.target.value)
                                    setTxtDescripcion(e.target.value)
                                    // setTxtDescripcion("Hola")
                                }}
                                value={txtDescripcion}
                                disabled={
                                    editandoRebateBonus == true
                                    ?false
                                    :true
                                }
                            >
                            </textarea>
                            {/* Siempre que cumpla con lo siguiente: Cumplimiento de la cuota NIV al 100% sin incluir la categoría wipes. De lograr el cumplimiento, este rebate será cancelado el mes siguiente. */}
                        </div>
                    </Col>
                </Row>

                <div></div>
            </div>

        </>
    )
}

export default Bonus