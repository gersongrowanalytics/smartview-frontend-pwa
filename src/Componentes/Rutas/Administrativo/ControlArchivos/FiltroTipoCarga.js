import React from 'react'
import FlechaAbajo from '../../../../Assets/Img/ElementosEnviados/Angulo-abajo.png'
import { Checkbox  } from 'antd'

const FiltroTipoCarga = (props) => {

    const titulo = props.titulo
    const mostrarCuerpo = props.mostrarCuerpo
    const setMostrarCuerpo = props.setMostrarCuerpo
    const funSeleccionarTodo = props.funSeleccionarTodo
    const seleccionartodo = props.seleccionartodo
    const aceptarFiltro = props.aceptarFiltro
    const tiposControlArchivo = props.tiposControlArchivo
    const seleccionarTipo = props.seleccionarTipo

    return (
        <div 
            style={{
                marginLeft: '16px',
                position: "relative",
                height: "100%"
            }}
        >
            <div 
                className='Btn-Tipo-Carga' 
                style={{width:'143px', paddingLeft:'12px'}}
                onClick={() => {
                    setMostrarCuerpo(!mostrarCuerpo)
                }}
            >
                <span>{titulo}</span>
                <img src={FlechaAbajo} style={{width:'26px'}}/>
            </div>
            {
                mostrarCuerpo == true ? (
                    <div className='Contenedor-Filtro-TipoCarga'>
                        <div className='Titulo-Filtro-TipoCarga'>
                            <Checkbox 
                                onChange={(e) => {
                                    // console.log(e.target.checked)
                                    funSeleccionarTodo(e.target.checked)
                                }}
                                className="Check-Filtro-TipoCarga W400-S12-H16-C1E1E1E-L0015"
                                checked={seleccionartodo}
                            >Seleccionar Todo</Checkbox>
                        </div>
                        <div className='Cuerpo-Filtro-TipoCarga'>
                            {
                                tiposControlArchivo.map((tipo, pos) => {
                                    return(
                                        <div
                                            style={{marginBottom:'5px'}}
                                        >
                                            <Checkbox 
                                                onChange={(e) => {
                                                    seleccionarTipo(pos, e.target.checked)
                                                }}
                                                className="Check-Filtro-TipoCarga W400-S12-H16-C1E1E1E-L0015"
                                                checked={tipo.seleccionado}
                                            >
                                                {
                                                    tipo.tcanombre
                                                }
                                            </Checkbox>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='Btns-Filtro-TipoCarga'>
                            <div 
                                className='Btn-Aceptar-Filtro-TipoCarga W700-S10-H13-CFFFFFF-L0015' 
                                onClick={() => {
                                    // console.log(tiposElementosEnviados)
                                    aceptarFiltro()
                                    setMostrarCuerpo(false)
                                }}
                            >
                                Aceptar
                            </div>
                            <div 
                                className='Btn-Cancelar-Filtro-TipoCarga W600-S10-H13-C1E1E1E-L0015'
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

export default FiltroTipoCarga