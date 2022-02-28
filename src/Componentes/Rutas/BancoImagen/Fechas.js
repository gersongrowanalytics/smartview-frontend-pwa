import { Col, Row } from 'antd'
import React , { useState, useEffect} from 'react'
import '../../../Estilos/Componentes/Elementos/FechasBancoImagen.css'
import moment from 'moment';
import {ConstruirCalendarioActual, ContruirCalendarioSiguiente, ContruirCalendarioAnterior} from './ConstruirCalendario';

const Fechas = (props) => {

    const [mostrarFecha, setmostrarFecha] = useState(false)

    const fecha = new Date(props.fecha)
    console.log(props.fecha)
    let mes = fecha.getMonth()
    let anio = fecha.getFullYear()
    let dia = fecha.getDay()
    console.log(dia, mes, anio)

    let diasMes = new Date(anio, mes, 0).getDate()

    const mesesAbrev = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
    const mesesComp = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const diasSemanaTexto = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
    
    let fechaTexto = dia+' '+mesesAbrev[mes]+' '+anio

    const [calendarioActual, setCalendarioActual] = useState([])
    const [calendarioAnterior, setCalendarioAnterior] = useState([])
    const [calendarioSiguiente, setCalendarioSiguiente] = useState([])

    const [fechaActual, setFechaActual] = useState(moment([anio,mes,dia]))
    const [fechaAnterior, setFechaAnterior] = useState(moment([anio,mes-1,dia]))
    const [fechaSiguiente, setFechaSiguiente] = useState(moment([anio,mes+1,dia]))

    useEffect(() => {
        setCalendarioActual(ConstruirCalendarioActual(fechaActual))
        setCalendarioAnterior(ContruirCalendarioAnterior(fechaAnterior))
        setCalendarioSiguiente(ContruirCalendarioSiguiente(fechaSiguiente))
    }, [fechaActual])
    
    const MesesAnteriores = () => {
        return fechaActual.clone().subtract(2, "month")
    }

    const MesesSiguientes = () => {
        return fechaActual.clone().add(2, "month")
    }

    // onclick={()=> setFechaActual(MesesSiguientes())}

    const Hoy = (dia) => {
        console.log(anio, mes, dia)
        return dia.isSame(new Date(props.fecha), 'day')
    }

    const EstilosHoy = (dia, valor) => {
        if (Hoy(dia)) {
            return 'Dia-Actual'
        }else{
            return ""
        }
    }

    return (
        <div>
            <div
                className='Contenedor-Fecha'
                onClick={() => setmostrarFecha(true)}
            >
                <div className='Contenedor-Fecha-Texto'>
                    {fechaTexto}
                </div>
                
            </div>

            {
                mostrarFecha == true ? (
                    <div className='Contenedor-Mes-Global'>
                        <Row>
                            <Col xl={8} className='Contenedor-Mes'>
                                <Row>
                                    <Col xl={24}>
                                        <div className='Meses-Texto'>{mesesComp[mes-1]}{' '}{anio}</div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'18px'}}>
                                    <Col xl={24} className='Dias-Nombres'>
                                        {
                                            diasSemanaTexto.map((value, index) => {
                                                return (
                                                    <div key={index} className='Dias-Nombres-Texto'>{value}</div>
                                            )})
                                        }
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px'}}>
                                    <Col xl={24} className='Calendario'>
                                        {
                                            calendarioAnterior.map((week)=>(
                                                <div>
                                                    {week.map((day)=>(
                                                        <div className='Dia Dia-Seleccionado' onClick={()=>setFechaActual(day)}>
                                                            {day.format('D').toString()}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={8} className='Contenedor-Mes'>
                                <Row style={{paddingRight: '10px'}}>
                                    <Col xl={24} style={{textAlign: "-webkit-center"}}>
                                        <div className='Meses-Texto'>{mesesComp[mes]}{' '}{anio}</div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'18px'}}>
                                    <Col xl={24} className='Dias-Nombres'>
                                        {
                                            diasSemanaTexto.map((value, index) => {
                                                return (
                                                    <div key={index} className='Dias-Nombres-Texto'>{value}</div>
                                            )})
                                        }
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px'}}>
                                    <Col xl={24} className='Calendario'>
                                        {
                                            calendarioActual.map((week)=>(
                                                <div>
                                                    {week.map((day)=>(
                                                        <div className='Dia Dia-Seleccionado' id={EstilosHoy(day)} onClick={()=>setFechaActual(day)}>
                                                            {day.format('D').toString()}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={8} className='Contenedor-Mes'>
                                <Row style={{paddingRight: '10px'}}>
                                    <Col xl={24} style={{textAlign: "-webkit-center"}}>
                                        <div className='Meses-Texto'>{mesesComp[mes+1]}{' '}{anio}</div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop:'18px'}}>
                                    <Col xl={24} className='Dias-Nombres'>
                                        {
                                            diasSemanaTexto.map((value, index) => {
                                                return (
                                                    <div key={index} className='Dias-Nombres-Texto'>{value}</div>
                                            )})
                                        }
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '10px'}}>
                                    <Col xl={24} className='Calendario'>
                                        {
                                            calendarioSiguiente.map((week)=>(
                                                <div>
                                                    {week.map((day)=>(
                                                        <div className='Dia Dia-Seleccionado' onClick={()=>setFechaActual(day)}>
                                                            {day.format('D').toString()}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
}

export default Fechas