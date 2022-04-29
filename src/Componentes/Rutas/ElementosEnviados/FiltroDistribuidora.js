import React from 'react'
import FlechaAbajo from '../../../Assets/Img/ElementosEnviados/Angulo-abajo.png'
import { Checkbox  } from 'antd'

const FiltroDistribuidora = (props) => {

    const titulo = props.titulo
    const mostrarCuerpo = props.mostrarCuerpo
    const setMostrarCuerpo = props.setMostrarCuerpo
    const funSeleccionarTodo = props.funSeleccionarTodo
    const seleccionartodo = props.seleccionartodo
    const aceptarFiltro = props.aceptarFiltro
    const distribuidora = props.distribuidora
    const seleccionarTipo = props.seleccionarTipo

    return (
        <div 
            style={{
                position: "relative",
                height: "100%"
            }}
        >
            <div 
                className='Btn-Elementos-Enviados' 
                style={{width:'143px', paddingLeft:'12px'}}
                onClick={() => {
                    setMostrarCuerpo(!mostrarCuerpo)
                }}
            >
                <span>{titulo}</span>
                <img src={FlechaAbajo} style={{width:'22px'}}/>
            </div>
            {
                mostrarCuerpo == true ? (
                    <div className='Contenedor-Filtro-TipoEnvio'>
                        <div className='Titulo-Filtro-TipoEnvio'>
                            <Checkbox 
                                onChange={(e) => {
                                    // console.log(e.target.checked)
                                    funSeleccionarTodo(e.target.checked)
                                }}
                                className="Check-Filtro-TipoEnvio W400-S12-H16-C1E1E1E-L0015"
                                checked={seleccionartodo}
                            >Seleccionar Todo</Checkbox>
                        </div>
                        <div className='Cuerpo-Filtro-TipoEnvio'>
                            {
                                distribuidora.map((tipo, pos) => {
                                    return(
                                        <div
                                            style={{marginBottom:'5px'}}
                                        >
                                            <Checkbox 
                                                onChange={(e) => {
                                                    seleccionarTipo(pos, e.target.checked)
                                                }}
                                                className="Check-Filtro-TipoEnvio W400-S12-H16-C1E1E1E-L0015"
                                                checked={tipo.seleccionado}
                                                title={tipo.sucnombre}
                                            >
                                                <div
                                                    title={tipo.sucnombre}
                                                >
                                                    {
                                                        tipo.sucnombre.substr(0, 21)
                                                    }
                                                </div>
                                            </Checkbox>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='Btns-Filtro-TipoEnvio'>
                            <div 
                                className='Btn-Aceptar-Filtro-TipoEnvio W700-S10-H13-CFFFFFF-L0015' 
                                onClick={() => {
                                    // console.log(tiposElementosEnviados)
                                    aceptarFiltro()
                                    setMostrarCuerpo(false)
                                }}
                            >
                                Aceptar
                            </div>
                            <div 
                                className='Btn-Cancelar-Filtro-TipoEnvio W600-S10-H13-C1E1E1E-L0015'
                                onClick={() => {
                                    setMostrarCuerpo(false)
                                }}
                            >
                                Cancelar
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )
}

export default FiltroDistribuidora